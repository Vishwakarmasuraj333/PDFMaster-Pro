import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: 'USER' | 'ADMIN';
  isVerified: boolean;
  createdAt: Date;
}

export interface OTPRecord {
  otpHash: string;
  expiresAt: number;
  attempts: number;
}

// In-Memory database singleton for Vercel production serverless execution
const globalAuthStore = globalThis as unknown as {
  pdfmasterUserStore?: Map<string, UserRecord>;
  pdfmasterOtpStore?: Map<string, OTPRecord>;
};

if (!globalAuthStore.pdfmasterUserStore) {
  globalAuthStore.pdfmasterUserStore = new Map<string, UserRecord>();
}

if (!globalAuthStore.pdfmasterOtpStore) {
  globalAuthStore.pdfmasterOtpStore = new Map<string, OTPRecord>();
}

export const userStore = globalAuthStore.pdfmasterUserStore;
export const otpStore = globalAuthStore.pdfmasterOtpStore;

// Initialize default production accounts (Suraj Vishwakarma Super Admin & Test User)
(async () => {
  if (!userStore.has('suraj@pdfmasterpro.com')) {
    const adminHash = await bcrypt.hash('SurajAdmin2026!', 10);
    userStore.set('suraj@pdfmasterpro.com', {
      id: 'admin_suraj_01',
      name: 'Suraj Vishwakarma',
      email: 'suraj@pdfmasterpro.com',
      passwordHash: adminHash,
      role: 'ADMIN',
      isVerified: true,
      createdAt: new Date(),
    });
  }

  if (!userStore.has('itxsurajofficial@gmail.com')) {
    const userHash = await bcrypt.hash('Password123!', 10);
    userStore.set('itxsurajofficial@gmail.com', {
      id: 'user_suraj_02',
      name: 'Suraj Vishwakarma',
      email: 'itxsurajofficial@gmail.com',
      passwordHash: userHash,
      role: 'ADMIN',
      isVerified: true,
      createdAt: new Date(),
    });
  }

  if (!userStore.has('itsurya9930@gmail.com')) {
    const userHash = await bcrypt.hash('bittu8097944', 10);
    userStore.set('itsurya9930@gmail.com', {
      id: 'user_surya_03',
      name: 'Surya Vishwakarma',
      email: 'itsurya9930@gmail.com',
      passwordHash: userHash,
      role: 'ADMIN',
      isVerified: true,
      createdAt: new Date(),
    });
  }
})();

/**
 * Create Gmail SMTP Transport
 */
function createSMTPTransporter() {
  const gmailUser = process.env.GMAIL_USER || 'itxsurajofficial@gmail.com';
  const gmailPass = process.env.GMAIL_APP_PASSWORD || '';

  if (!gmailPass) {
    console.warn('[SMTP Warning] GMAIL_APP_PASSWORD not configured. Logging OTP code locally.');
  }

  return nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // TLS
    auth: {
      user: gmailUser,
      pass: gmailPass,
    },
  });
}

/**
 * Generate 6-Digit Random OTP
 */
export function generate6DigitOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Send OTP Email via Nodemailer Gmail SMTP
 */
export async function sendOTPEmail(email: string, otpCode: string): Promise<boolean> {
  const transporter = createSMTPTransporter();

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; background-color: #f8f9fa; padding: 30px; border-radius: 16px; max-width: 500px; margin: 0 auto; border: 1px solid #e2e8f0;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #1e293b; margin: 0; font-size: 24px;">PDFMaster Pro</h1>
        <p style="color: #f4c430; font-weight: bold; margin-top: 4px; font-size: 14px;">ENTERPRISE SAAS SECURITY</p>
      </div>
      <div style="background-color: #ffffff; padding: 24px; border-radius: 12px; border: 1px solid #cbd5e1; text-align: center;">
        <h2 style="color: #0f172a; font-size: 18px; margin-top: 0;">Verification Code</h2>
        <p style="color: #475569; font-size: 14px;">Your secure 6-digit OTP for account authentication is:</p>
        <div style="background-color: #fffbebf5; border: 2px dashed #f4c430; font-size: 32px; font-weight: bold; letter-spacing: 6px; color: #b45309; padding: 14px 20px; border-radius: 8px; display: inline-block; margin: 16px 0;">
          ${otpCode}
        </div>
        <p style="color: #64748b; font-size: 12px; margin-bottom: 0;">
          ⏱️ Valid for <strong>5 minutes</strong>. Do not share this code with anyone.
        </p>
      </div>
      <div style="text-align: center; margin-top: 20px; color: #94a3b8; font-size: 11px;">
        © 2026 PDFMaster Pro by Suraj Vishwakarma. All rights reserved.
      </div>
    </div>
  `;

  try {
    const gmailUser = process.env.GMAIL_USER || 'itxsurajofficial@gmail.com';
    if (process.env.GMAIL_APP_PASSWORD) {
      await transporter.sendMail({
        from: `"PDFMaster Pro Security" <${gmailUser}>`,
        to: email,
        subject: `${otpCode} is your PDFMaster Pro Verification Code`,
        html: htmlContent,
      });
      console.log(`[SMTP Success] Sent OTP (${otpCode}) to ${email}`);
    } else {
      console.log(`[Mock SMTP] Verification OTP (${otpCode}) generated for ${email}`);
    }
    return true;
  } catch (err: any) {
    console.error(`[SMTP Error] Failed to send email to ${email}:`, err.message);
    return false;
  }
}
