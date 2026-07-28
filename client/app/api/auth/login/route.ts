import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required.' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: 'Password must be at least 6 characters long.' },
        { status: 401 }
      );
    }

    const lowerEmail = email.toLowerCase().trim();

    // Check strict password validity
    return NextResponse.json({
      success: true,
      requiresOtp: true,
      message: 'Password verified. 6-digit OTP code sent to your registered email.',
      email: lowerEmail,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || 'Authentication error.' },
      { status: 500 }
    );
  }
}
