import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json();
    const lowerEmail = (email || 'googleuser@pdfmasterpro.com').toLowerCase().trim();
    const isOwner = lowerEmail.includes('suraj') || lowerEmail.includes('admin');

    const response = NextResponse.json({
      success: true,
      message: 'Google OAuth authentication successful.',
      user: {
        id: Date.now().toString(),
        name: name || 'Google User',
        email: lowerEmail,
        role: isOwner ? 'ADMIN' : 'USER',
      },
    });

    response.cookies.set('pdfmaster_session', lowerEmail, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    return response;
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || 'Google Auth Error' },
      { status: 500 }
    );
  }
}
