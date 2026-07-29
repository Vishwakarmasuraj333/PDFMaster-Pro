import { NextResponse } from 'next/server';
import { createAndSendOTP } from '@/lib/auth-store';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email address is required.' },
        { status: 400 }
      );
    }

    const lowerEmail = email.toLowerCase().trim();

    try {
      await createAndSendOTP(lowerEmail);
    } catch (smtpErr: any) {
      console.error('[RESEND OTP SMTP ERROR]', smtpErr.message);
    }

    return NextResponse.json({
      success: true,
      message: 'New 6-digit OTP code sent to your email address.',
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || 'Resend OTP error.' },
      { status: 500 }
    );
  }
}
