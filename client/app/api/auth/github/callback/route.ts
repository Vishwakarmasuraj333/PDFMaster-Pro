import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { signAccessToken, signRefreshToken, setAuthCookies } from '@/lib/jwt-service';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL || 'http://localhost:3000';

    if (error || !code) {
      console.error('[GITHUB CALLBACK ERROR]', error || 'No authorization code provided');
      return NextResponse.redirect(`${baseUrl}/auth/login?error=${encodeURIComponent(error || 'GitHub authorization canceled')}`);
    }

    const githubClientId = process.env.GITHUB_CLIENT_ID;
    const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
    const redirectUri = `${baseUrl}/api/auth/github/callback`;

    // 1. Exchange Authorization Code for Access Token
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
      console.error('[GITHUB TOKEN EXCHANGE FAILED]', tokenData);
      return NextResponse.redirect(`${baseUrl}/auth/login?error=github_token_failed`);
    }

    const githubAccessToken = tokenData.access_token;

    // 2. Fetch User Profile
    const userRes = await fetch('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${githubAccessToken}`,
        'User-Agent': 'PDFMaster-Pro-App',
      },
    });

    const userData = await userRes.json();
    if (!userRes.ok || !userData.id) {
      console.error('[GITHUB USER PROFILE FAILED]', userData);
      return NextResponse.redirect(`${baseUrl}/auth/login?error=github_user_failed`);
    }

    let primaryEmail = userData.email;
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

    // 3. Upsert User in MySQL Database
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

    // 4. Issue JWT Session & Set HttpOnly Cookies
    const jwtAccessToken = signAccessToken(user);
    const jwtRefreshToken = signRefreshToken(user);

    const response = NextResponse.redirect(`${baseUrl}/tools`);
    setAuthCookies(response, jwtAccessToken, jwtRefreshToken, user.email);

    return response;
  } catch (err: any) {
    console.error('[GITHUB CALLBACK EXCEPTION]', err.message);
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL || 'http://localhost:3000';
    return NextResponse.redirect(`${baseUrl}/auth/login?error=server_error`);
  }
}
