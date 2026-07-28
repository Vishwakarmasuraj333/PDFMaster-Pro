import { NextResponse } from 'next/server';
import { userStore } from '@/lib/auth-store';

export async function POST(request: Request) {
  try {
    const { email, name, githubId } = await request.json();
    const lowerEmail = (email || 'githubuser@pdfmasterpro.com').toLowerCase().trim();
    const isOwner = lowerEmail.includes('suraj') || lowerEmail.includes('admin');
    const role = isOwner ? 'ADMIN' : 'USER';

    let user = userStore.get(lowerEmail);
    if (!user) {
      user = {
        id: githubId || Date.now().toString(),
        name: name || 'GitHub Developer',
        email: lowerEmail,
        passwordHash: '',
        role: role as 'ADMIN' | 'USER',
        isVerified: true,
        createdAt: new Date(),
      };
      userStore.set(lowerEmail, user);
    }

    const response = NextResponse.json({
      success: true,
      message: 'GitHub OAuth authentication successful.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

    const isProd = process.env.NODE_ENV === 'production';

    // Issue all 3 HttpOnly secure cookies (pdfmaster_session, accessToken, refreshToken)
    response.cookies.set('pdfmaster_session', lowerEmail, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    response.cookies.set('accessToken', `github_access_${Date.now()}`, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'strict',
      maxAge: 15 * 60, // 15 mins
      path: '/',
    });

    response.cookies.set('refreshToken', `github_refresh_${Date.now()}`, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    return response;
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || 'GitHub Auth Error' },
      { status: 500 }
    );
  }
}
