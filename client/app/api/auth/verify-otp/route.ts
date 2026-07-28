import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { userStore, otpStore } from '@/lib/auth-store';

export async function POST(request: Request) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      console.log('[AUTH ERROR] OTP VERIFICATION FAILED: Missing email or OTP code.');
      return NextResponse.json(
        { success: false, message: 'Email and OTP code are required.' },
        { status: 400 }
      );
    }

    const lowerEmail = email.toLowerCase().trim();
    const storedOtp = otpStore.get(lowerEmail);

    if (!storedOtp) {
      console.log(`[AUTH ERROR] OTP VERIFICATION FAILED: No active OTP record found for (${lowerEmail}).`);
      return NextResponse.json(
        { success: false, message: 'OTP expired or not found. Please request a new code.' },
        { status: 400 }
      );
    }

    // Expiry Check (5 Minutes)
    if (Date.now() > storedOtp.expiresAt) {
      console.log(`[AUTH ERROR] OTP VERIFICATION FAILED: OTP code expired for (${lowerEmail}).`);
      otpStore.delete(lowerEmail);
      return NextResponse.json(
        { success: false, message: 'OTP code expired (5 minute limit).' },
        { status: 400 }
      );
    }

    // Max 5 Attempts Rate Limit Check
    if (storedOtp.attempts >= 5) {
      console.log(`[AUTH ERROR] OTP VERIFICATION FAILED: Max attempts reached for (${lowerEmail}).`);
      otpStore.delete(lowerEmail);
      return NextResponse.json(
        { success: false, message: 'Maximum 5 invalid attempts reached. Please request a new OTP.' },
        { status: 429 }
      );
    }

    // STRICT BCRYPT OTP MATCHING
    const isValid = await bcrypt.compare(otp, storedOtp.otpHash);
    if (!isValid) {
      storedOtp.attempts += 1;
      console.log(`[AUTH ERROR] OTP VERIFICATION FAILED: Wrong OTP for (${lowerEmail}). Attempts left: ${5 - storedOtp.attempts}`);
      return NextResponse.json(
        { success: false, message: `Invalid OTP code. Attempts remaining: ${5 - storedOtp.attempts}` },
        { status: 400 }
      );
    }

    // DELETE OTP FROM STORE IMMEDIATELY TO PREVENT REUSE
    otpStore.delete(lowerEmail);

    console.log(`[SECURITY] OTP VERIFIED for email: (${lowerEmail}).`);
    console.log(`[AUTH SUCCESS] LOGIN SUCCESS for email: (${lowerEmail}).`);

    let user = userStore.get(lowerEmail);
    if (!user) {
      user = {
        id: Date.now().toString(),
        name: lowerEmail.split('@')[0],
        email: lowerEmail,
        passwordHash: '',
        role: lowerEmail.includes('admin') || lowerEmail.includes('suraj') ? 'ADMIN' : 'USER',
        isVerified: true,
        createdAt: new Date(),
      };
    } else {
      user.isVerified = true;
    }

    const response = NextResponse.json({
      success: true,
      message: 'OTP verification successful. Welcome to PDFMaster Pro!',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

    // Set HttpOnly Secure Cookies
    const isProd = process.env.NODE_ENV === 'production';

    response.cookies.set('pdfmaster_session', lowerEmail, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    response.cookies.set('accessToken', `token_access_${Date.now()}`, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'strict',
      maxAge: 15 * 60, // 15 mins
      path: '/',
    });

    response.cookies.set('refreshToken', `token_refresh_${Date.now()}`, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    return response;
  } catch (err: any) {
    console.error('[AUTH ERROR] Exception in verify-otp route:', err.message);
    return NextResponse.json(
      { success: false, message: err.message || 'OTP verification error.' },
      { status: 500 }
    );
  }
}
