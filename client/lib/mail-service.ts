import nodemailer from 'nodemailer';

export function getSMTPTransporter() {
  const user = process.env.GMAIL_USER || process.env.SMTP_USER || '';
  const pass = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS || '';

  if (!user || !pass) {
    console.error('[SMTP Config Error] Missing GMAIL_USER or GMAIL_APP_PASSWORD credentials.');
  }

  return nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // TLS
    auth: { user, pass },
  });
}

/**
 * Verify SMTP Transporter Connection
 */
export async function verifySMTP(): Promise<boolean> {
  const transporter = getSMTPTransporter();
  try {
    const verified = await transporter.verify();
    console.log('[SMTP Verification Success] Connection verified with Gmail SMTP:', verified);
    return true;
  } catch (err: any) {
    console.error('[SMTP Verification Error] transporter.verify() failed:', err.message);
    throw new Error(`Gmail SMTP Verification Failed: ${err.message}`);
  }
}

/**
 * Send OTP Verification Email via Gmail SMTP
 * Throws real Error if delivery fails or is rejected by SMTP server.
 */
export async function sendOTPEmail(toEmail: string, otpCode: string): Promise<{ success: boolean; messageId?: string }> {
  const user = process.env.GMAIL_USER || process.env.SMTP_USER || '';
  const pass = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS || '';

  if (!user || !pass) {
    throw new Error('Gmail SMTP credentials (GMAIL_USER / GMAIL_APP_PASSWORD) are not configured on the server.');
  }

  const transporter = getSMTPTransporter();

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #12161a; margin: 0; padding: 20px; color: #f8fafc; }
        .container { max-width: 540px; margin: 0 auto; background: #161b22; border-radius: 24px; padding: 40px; border: 1px solid #2d3748; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
        .header { text-align: center; margin-bottom: 30px; }
        .logo { display: inline-block; padding: 12px 24px; background: #f4c430; border-radius: 16px; color: #12161a; font-weight: 900; font-size: 20px; text-decoration: none; }
        .title { font-size: 22px; font-weight: 800; text-align: center; margin-bottom: 8px; color: #ffffff; }
        .subtitle { font-size: 13px; color: #94a3b8; text-align: center; margin-bottom: 28px; }
        .otp-box { background: rgba(244, 196, 48, 0.1); border-radius: 20px; padding: 24px; text-align: center; margin-bottom: 28px; border: 1px solid #f4c430; }
        .otp-code { font-family: monospace; font-size: 38px; font-weight: 900; letter-spacing: 8px; color: #f4c430; margin: 0; }
        .badge { display: inline-block; margin-top: 10px; padding: 4px 12px; background: rgba(244, 196, 48, 0.2); border-radius: 12px; font-size: 11px; color: #f4c430; font-weight: 700; }
        .warning { font-size: 12px; color: #64748b; text-align: center; line-height: 1.6; margin-bottom: 30px; }
        .footer { border-top: 1px solid #2d3748; padding-top: 20px; text-align: center; font-size: 11px; color: #64748b; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">PDFMaster Pro</div>
        </div>
        <h2 class="title">Your Security Verification Code</h2>
        <p class="subtitle">Hello ${toEmail}, please enter the code below to complete your verification.</p>
        
        <div class="otp-box">
          <h1 class="otp-code">${otpCode}</h1>
          <div class="badge">⏱ Expires in 5 Minutes</div>
        </div>

        <p class="warning">
          Never share this code with anyone. PDFMaster Pro staff will never ask for your verification code.<br>
          If this request wasn't initiated by you, please ignore this email.
        </p>

        <div class="footer">
          © 2026 PDFMaster Pro. All rights reserved.<br>
          Developed by <strong>Suraj Vishwakarma</strong>
        </div>
      </div>
    </body>
    </html>
  `;

  console.log(`[SMTP Sending] Attempting to send OTP email to ${toEmail}...`);

  const info = await transporter.sendMail({
    from: `"PDFMaster Pro Security" <${user}>`,
    to: toEmail,
    subject: `${otpCode} is your PDFMaster Pro Verification Code`,
    html: htmlContent,
  });

  console.log(`[SMTP Response Success] Message accepted by Gmail SMTP. ID: ${info.messageId}, Accepted: ${JSON.stringify(info.accepted)}`);
  
  if (!info.accepted || info.accepted.length === 0) {
    throw new Error(`Gmail SMTP rejected message delivery for email: ${toEmail}`);
  }

  return { success: true, messageId: info.messageId };
}
