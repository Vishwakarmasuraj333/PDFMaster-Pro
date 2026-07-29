import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
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

    const user = await prisma.user.findUnique({
      where: { email: lowerEmail },
    });

    if (!user) {
      return NextResponse.json(
        { success: false, message: 'No registered account found with this email address.' },
        { status: 404 }
      );
    }

    try {
      await createAndSendOTP(lowerEmail);
    } catch (smtpErr: any) {
      console.error('[FORGOT PASSWORD SMTP ERROR]', smtpErr.message);
      return NextResponse.json(
        { success: false, message: `Failed to send password reset OTP: ${smtpErr.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Password reset OTP sent to your email address.',
      email: lowerEmail,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || 'Forgot password request failed.' },
      { status: 500 }
    );
  }
}
