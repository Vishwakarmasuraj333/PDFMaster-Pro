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
      console.error('[GOOGLE CALLBACK ERROR]', error || 'No authorization code provided');
      return NextResponse.redirect(`${baseUrl}/auth/login?error=${encodeURIComponent(error || 'Google authorization canceled')}`);
    }

    const googleClientId = process.env.GOOGLE_CLIENT_ID;
    const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const redirectUri = `${baseUrl}/api/auth/google/callback`;

    // 1. Exchange Authorization Code for Google OAuth Tokens
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: googleClientId || '',
        client_secret: googleClientSecret || '',
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    const tokenData = await tokenRes.json();
    if (!tokenRes.ok || !tokenData.access_token) {
      console.error('[GOOGLE TOKEN EXCHANGE FAILED]', tokenData);
      return NextResponse.redirect(`${baseUrl}/auth/login?error=google_token_failed`);
    }

    // 2. Fetch User Info from Google Profile API
    const userRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    const userData = await userRes.json();
    if (!userRes.ok || !userData.email) {
      console.error('[GOOGLE USERINFO FAILED]', userData);
      return NextResponse.redirect(`${baseUrl}/auth/login?error=google_userinfo_failed`);
    }

    const lowerEmail = userData.email.toLowerCase().trim();
    const isOwner = lowerEmail.includes('suraj') || lowerEmail.includes('admin') || lowerEmail === 'itsurya9930@gmail.com' || lowerEmail === 'itxsurajofficial@gmail.com';

    // 3. Upsert User Record in MySQL Database via Prisma ORM
    const user = await prisma.user.upsert({
      where: { email: lowerEmail },
      update: {
        name: userData.name || userData.given_name || lowerEmail.split('@')[0],
        avatar: userData.picture || undefined,
        provider: 'google',
        providerId: userData.sub,
        isVerified: true,
      },
      create: {
        email: lowerEmail,
        name: userData.name || userData.given_name || lowerEmail.split('@')[0],
        provider: 'google',
        providerId: userData.sub,
        avatar: userData.picture || null,
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
    console.error('[GOOGLE CALLBACK EXCEPTION]', err.message);
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL || 'http://localhost:3000';
    return NextResponse.redirect(`${baseUrl}/auth/login?error=server_error`);
  }
}
