import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { userStore, otpStore, generate6DigitOTP, sendOTPEmail } from '@/lib/auth-store';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      console.log('[AUTH ERROR] PASSWORD FAILED: Missing email or password.');
      return NextResponse.json(
        { success: false, message: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    if (password.length < 6) {
      console.log(`[AUTH ERROR] PASSWORD FAILED: Short password length for email (${email}).`);
      return NextResponse.json(
        { success: false, message: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    const lowerEmail = email.toLowerCase().trim();
    let user = userStore.get(lowerEmail);

    // If user record does not exist in store, create a record with hashed password for default accounts
    if (!user) {
      if (lowerEmail === 'itsurya9930@gmail.com') {
        const userHash = await bcrypt.hash('bittu8097944', 10);
        user = {
          id: 'usr_surya_9930',
          name: 'Surya Vishwakarma',
          email: lowerEmail,
          passwordHash: userHash,
          role: 'ADMIN',
          isVerified: true,
          createdAt: new Date(),
        };
        userStore.set(lowerEmail, user);
      } else if (lowerEmail === 'suraj@pdfmasterpro.com' || lowerEmail === 'itxsurajofficial@gmail.com') {
        const defaultHash = await bcrypt.hash('Password123!', 10);
        user = {
          id: Date.now().toString(),
          name: lowerEmail.split('@')[0],
          email: lowerEmail,
          passwordHash: defaultHash,
          role: 'ADMIN',
          isVerified: true,
          createdAt: new Date(),
        };
        userStore.set(lowerEmail, user);
      } else {
        // Unknown user email -> Strictly REJECT with 401 Unauthorized
        console.log(`[AUTH ERROR] PASSWORD FAILED: User account (${lowerEmail}) does not exist in database.`);
        return NextResponse.json(
          { success: false, message: 'Invalid email or password.' },
          { status: 401 }
        );
      }
    }

    // STRICT BCRYPT PASSWORD VERIFICATION
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      // Wrong password -> Print server log and strictly REJECT with 401 Unauthorized
      console.log(`[AUTH ERROR] PASSWORD FAILED: Password mismatch for user (${lowerEmail}).`);
      return NextResponse.json(
        { success: false, message: 'Invalid email or password.' },
        { status: 401 }
      );
    }

    // ----------------------------------------------------
    // PASSWORD VERIFIED SUCCESSFULLY
    // ----------------------------------------------------
    console.log(`[AUTH SUCCESS] PASSWORD VERIFIED for email: (${lowerEmail}).`);

    // Generate random 6-digit OTP code ONLY AFTER SUCCESSFUL PASSWORD MATCH
    const otpCode = generate6DigitOTP();
    const otpHash = await bcrypt.hash(otpCode, 10);

    console.log(`[SECURITY] OTP GENERATED for email (${lowerEmail}): ${otpCode}`);

    // Invalidate previous OTP and store new hashed OTP (5 min expiry)
    otpStore.set(lowerEmail, {
      otpHash,
      expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
      attempts: 0,
    });

    // Send OTP using Gmail SMTP
    const smtpSuccess = await sendOTPEmail(lowerEmail, otpCode);
    if (smtpSuccess) {
      console.log(`[SMTP SUCCESS] OTP SENT to email (${lowerEmail}).`);
    } else {
      console.error(`[SMTP ERROR] Could not deliver email to (${lowerEmail}).`);
    }

    return NextResponse.json({
      success: true,
      requiresOtp: true,
      message: 'PASSWORD VERIFIED. 6-digit OTP code sent to your registered email.',
      email: lowerEmail,
    });
  } catch (err: any) {
    console.error('[AUTH ERROR] Exception in login route:', err.message);
    return NextResponse.json(
      { success: false, message: err.message || 'Authentication error.' },
      { status: 500 }
    );
  }
}
