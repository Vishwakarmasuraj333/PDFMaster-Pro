import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { signAccessToken, signRefreshToken, setAuthCookies } from '@/lib/jwt-service';
import { getBaseUrl } from '@/lib/oauth-helper';

export async function GET(request: Request) {
  const githubClientId = process.env.GITHUB_CLIENT_ID;
  const baseUrl = getBaseUrl(request);
  const redirectUri = `${baseUrl}/api/auth/github/callback`;

  console.log(`[GITHUB OAUTH GET] Request URL Origin: ${baseUrl} | redirect_uri: ${redirectUri}`);

  if (!githubClientId) {
    return NextResponse.json(
      { success: false, message: 'GITHUB_CLIENT_ID environment variable is missing on server.' },
      { status: 500 }
    );
  }

  // Set production scope: user:email read:user and force credential prompt
  const githubAuthUrl = `https://github.com/login/oauth/authorize?` +
    `client_id=${encodeURIComponent(githubClientId)}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&scope=${encodeURIComponent('user:email read:user')}` +
    `&prompt=consent` +
    `&allow_signup=true`;

  return NextResponse.redirect(githubAuthUrl);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code, accessToken: clientAccessToken } = body;

    const githubClientId = process.env.GITHUB_CLIENT_ID;
    const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
    const baseUrl = getBaseUrl(request);
    const redirectUri = `${baseUrl}/api/auth/github/callback`;

    console.log(`[GITHUB OAUTH POST] Request URL Origin: ${baseUrl} | redirect_uri: ${redirectUri}`);

    let githubAccessToken = clientAccessToken;

    if (code) {
      // Exchange Authorization Code for GitHub Access Token
      const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          client_id: githubClientId,
          client_secret: githubClientSecret,
          code,
          redirect_uri: redirectUri,
        }),
      });

      const tokenData = await tokenRes.json();
      if (!tokenRes.ok || !tokenData.access_token) {
        throw new Error(tokenData.error_description || 'Failed to exchange authorization code with GitHub.');
      }
      githubAccessToken = tokenData.access_token;
    }

    if (!githubAccessToken) {
      return NextResponse.json(
        { success: false, message: 'Authorization code or access token required for GitHub OAuth.' },
        { status: 400 }
      );
    }

    // Fetch GitHub Profile
    const userRes = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${githubAccessToken}`,
        'User-Agent': 'PDFMaster-Pro-App',
      },
    });

    const userData = await userRes.json();
    if (!userRes.ok || !userData.id) {
      throw new Error('Failed to fetch profile from GitHub API.');
    }

    let primaryEmail = userData.email;

    // Fetch Primary Email if email is private in profile
    if (!primaryEmail) {
      const emailRes = await fetch('https://api.github.com/user/emails', {
        headers: {
          Authorization: `Bearer ${githubAccessToken}`,
          'User-Agent': 'PDFMaster-Pro-App',
        },
      });

      const emails = await emailRes.json();
      if (Array.isArray(emails)) {
        const primary = emails.find((e: any) => e.primary && e.verified) || emails[0];
        if (primary && primary.email) {
          primaryEmail = primary.email;
        }
      }
    }

    if (!primaryEmail) {
      primaryEmail = `${userData.login}@github.user`;
    }

    const lowerEmail = primaryEmail.toLowerCase().trim();
    const isOwner = lowerEmail.includes('suraj') || lowerEmail.includes('admin') || lowerEmail === 'itsurya9930@gmail.com' || lowerEmail === 'itxsurajofficial@gmail.com';

    // Upsert User Record in MySQL Database via Prisma
    const user = await prisma.user.upsert({
      where: { email: lowerEmail },
      update: {
        name: userData.name || userData.login || lowerEmail.split('@')[0],
        avatar: userData.avatar_url || undefined,
        provider: 'github',
        providerId: String(userData.id),
        isVerified: true,
      },
      create: {
        email: lowerEmail,
        name: userData.name || userData.login || lowerEmail.split('@')[0],
        provider: 'github',
        providerId: String(userData.id),
        avatar: userData.avatar_url || null,
        role: isOwner ? 'ADMIN' : 'USER',
        isVerified: true,
      },
    });

    const jwtAccessToken = signAccessToken(user);
    const jwtRefreshToken = signRefreshToken(user);

    const response = NextResponse.json({
      success: true,
      message: 'Real GitHub OAuth authentication successful.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      },
    });

    setAuthCookies(response, jwtAccessToken, jwtRefreshToken, user.email);

    return response;
  } catch (err: any) {
    console.error('[GITHUB OAUTH ERROR]', err.message);
    return NextResponse.json(
      { success: false, message: err.message || 'GitHub OAuth Error' },
      { status: 500 }
    );
  }
}
