import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { signAccessToken, signRefreshToken } from '@/lib/jwt-service';
import { getBaseUrl } from '@/lib/oauth-helper';

export const dynamic = 'force-dynamic';

function buildCookieHeader(name: string, value: string, maxAge: number): string {
  const parts = [
    `${name}=${value}`,
    `Path=/`,
    `HttpOnly`,
    `SameSite=Lax`,
    `Max-Age=${maxAge}`,
  ];
  if (process.env.NODE_ENV === 'production') {
    parts.push('Secure');
  }
  return parts.join('; ');
}

function createRedirectHtml(targetUrl: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0;url=${targetUrl}">
  <title>Authenticating...</title>
  <style>
    body{margin:0;display:flex;align-items:center;justify-content:center;height:100vh;background:#0f172a;color:#f8fafc;font-family:system-ui,sans-serif}
    .c{text-align:center}
    .spinner{width:40px;height:40px;border:4px solid #334155;border-top:4px solid #fbbf24;border-radius:50%;animation:spin 0.8s linear infinite;margin:0 auto 16px}
    @keyframes spin{to{transform:rotate(360deg)}}
    p{font-size:14px;color:#94a3b8}
  </style>
</head>
<body>
  <div class="c">
    <div class="spinner"></div>
    <p>Authentication successful. Redirecting...</p>
  </div>
  <script>window.location.href="${targetUrl}";</script>
</body>
</html>`;
}

export async function GET(request: Request) {
  const baseUrl = getBaseUrl(request);
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error || !code) {
      console.error('[GITHUB CALLBACK ERROR]', error || 'No authorization code provided');
      return NextResponse.redirect(`${baseUrl}/auth/login?error=${encodeURIComponent(error || 'GitHub authorization canceled')}`);
    }

    const githubClientId = process.env.GITHUB_CLIENT_ID;
    const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
    const redirectUri = `${baseUrl}/api/auth/github/callback`;

    console.log(`[GITHUB CALLBACK GET] Exchanging code with redirect_uri: ${redirectUri}`);

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

    // 4. Issue JWT Session & Set HttpOnly Cookies via Set-Cookie headers on HTML response
    const jwtAccessToken = signAccessToken(user);
    const jwtRefreshToken = signRefreshToken(user);

    console.log(`[GITHUB CALLBACK] Auth success for: ${user.email} -> Redirecting to /tools`);

    const targetUrl = `${baseUrl}/tools`;
    const html = createRedirectHtml(targetUrl);

    const headers = new Headers();
    headers.set('Content-Type', 'text/html; charset=utf-8');
    headers.set('Cache-Control', 'no-store, no-cache, must-revalidate');
    headers.append('Set-Cookie', buildCookieHeader('accessToken', jwtAccessToken, 86400));
    headers.append('Set-Cookie', buildCookieHeader('refreshToken', jwtRefreshToken, 604800));
    headers.append('Set-Cookie', buildCookieHeader('pdfmaster_session', user.email, 604800));

    return new NextResponse(html, { status: 200, headers });
  } catch (err: any) {
    console.error('[GITHUB CALLBACK EXCEPTION]', err.message);
    return NextResponse.redirect(`${baseUrl}/auth/login?error=server_error`);
  }
}
