import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { signAccessToken, signRefreshToken, setAuthCookies } from '@/lib/jwt-service';

export async function GET(request: Request) {
  const googleClientId = process.env.GOOGLE_CLIENT_ID;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL || 'http://localhost:3000';
  const redirectUri = `${baseUrl}/api/auth/google/callback`;

  if (!googleClientId) {
    return NextResponse.json(
      { success: false, message: 'GOOGLE_CLIENT_ID environment variable is missing on server.' },
      { status: 500 }
    );
  }

  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${encodeURIComponent(googleClientId)}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&response_type=code` +
    `&scope=${encodeURIComponent('openid email profile')}` +
    `&access_type=offline` +
    `&prompt=consent`;

  return NextResponse.redirect(googleAuthUrl);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code, idToken, accessToken } = body;

    const googleClientId = process.env.GOOGLE_CLIENT_ID;
    const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const redirectUri = `${baseUrl}/api/auth/google/callback`;

    let userEmail: string = '';
    let userName: string = '';
    let userAvatar: string = '';
    let googleId: string = '';

    if (code) {
      // Exchange Authorization Code with Google Token Endpoint
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
        throw new Error(tokenData.error_description || 'Failed to exchange authorization code with Google.');
      }

      // Fetch User Info using access token
      const userRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      });

      const userData = await userRes.json();
      if (!userRes.ok || !userData.email) {
        throw new Error('Failed to retrieve user profile from Google OAuth API.');
      }

      userEmail = userData.email;
      userName = userData.name || userData.given_name || userEmail.split('@')[0];
      userAvatar = userData.picture || '';
      googleId = userData.sub;
    } else if (idToken) {
      // Validate ID token via Google Tokeninfo API
      const tokenInfoRes = await fetch(`https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`);
      const tokenInfo = await tokenInfoRes.json();
      if (!tokenInfoRes.ok || !tokenInfo.email) {
        throw new Error('Invalid Google ID token.');
      }

      userEmail = tokenInfo.email;
      userName = tokenInfo.name || userEmail.split('@')[0];
      userAvatar = tokenInfo.picture || '';
      googleId = tokenInfo.sub;
    } else if (accessToken) {
      const userRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const userData = await userRes.json();
      if (!userRes.ok || !userData.email) {
        throw new Error('Invalid Google Access Token.');
      }
      userEmail = userData.email;
      userName = userData.name || userEmail.split('@')[0];
      userAvatar = userData.picture || '';
      googleId = userData.sub;
    } else {
      return NextResponse.json(
        { success: false, message: 'Authorization code or ID token required for Google OAuth.' },
        { status: 400 }
      );
    }

    const lowerEmail = userEmail.toLowerCase().trim();
    const isOwner = lowerEmail.includes('suraj') || lowerEmail.includes('admin') || lowerEmail === 'itsurya9930@gmail.com' || lowerEmail === 'itxsurajofficial@gmail.com';

    // Upsert User in MySQL Database via Prisma
    const user = await prisma.user.upsert({
      where: { email: lowerEmail },
      update: {
        name: userName,
        avatar: userAvatar || undefined,
        provider: 'google',
        providerId: googleId || undefined,
        isVerified: true,
      },
      create: {
        email: lowerEmail,
        name: userName,
        provider: 'google',
        providerId: googleId,
        avatar: userAvatar,
        role: isOwner ? 'ADMIN' : 'USER',
        isVerified: true,
      },
    });

    const jwtAccessToken = signAccessToken(user);
    const jwtRefreshToken = signRefreshToken(user);

    const response = NextResponse.json({
      success: true,
      message: 'Real Google OAuth authentication successful.',
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
    console.error('[GOOGLE OAUTH ERROR]', err.message);
    return NextResponse.json(
      { success: false, message: err.message || 'Google OAuth Error' },
      { status: 500 }
    );
  }
}
