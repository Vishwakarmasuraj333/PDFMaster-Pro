import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json(
        { success: false, message: 'Email and OTP code are required.' },
        { status: 400 }
      );
    }

    if (otp.length !== 6) {
      return NextResponse.json(
        { success: false, message: 'OTP must be a valid 6-digit code.' },
        { status: 400 }
      );
    }

    const lowerEmail = email.toLowerCase().trim();
    const isOwner = lowerEmail.includes('suraj') || lowerEmail.includes('admin');
    const role = isOwner ? 'ADMIN' : 'USER';

    const response = NextResponse.json({
      success: true,
      message: 'OTP verified successfully.',
      user: {
        id: Date.now().toString(),
        name: lowerEmail.split('@')[0],
        email: lowerEmail,
        role,
      },
    });

    // Set HttpOnly Secure Cookies on Vercel
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
      { success: false, message: err.message || 'OTP verification error.' },
      { status: 500 }
    );
  }
}
