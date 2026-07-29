const nodemailer = require('nodemailer');

function createTransporter() {
  const user = process.env.GMAIL_USER || process.env.SMTP_USER || '';
  const pass = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS || '';

  return nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // TLS
    auth: { user, pass },
  });
}

/**
 * Startup SMTP Connection Verification
 */
async function verifySMTP() {
  const transporter = createTransporter();
  try {
    const verified = await transporter.verify();
    console.log('[SMTP STARTUP VERIFICATION] Connection verified with Gmail SMTP server:', verified);
    return true;
  } catch (err) {
    console.error('[SMTP STARTUP VERIFICATION ERROR] Failed to connect to Gmail SMTP:', err.message);
    throw new Error(`Gmail SMTP Startup Verification Failed: ${err.message}`);
  }
}

/**
 * Generate Purple Gradient HTML Email Template for OTP
 */
function getOTPEmailHTML(otpCode, userEmail) {
  return `
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
      <p class="subtitle">Hello ${userEmail}, please enter the code below to complete your verification.</p>
      
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
}

/**
 * Send Login Verification OTP Mail via Gmail SMTP
 * Throws real Error if delivery fails
 */
async function sendOTPEmail(toEmail, otpCode) {
  const user = process.env.GMAIL_USER || process.env.SMTP_USER || '';
  const pass = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS || '';

  if (!user || !pass) {
    throw new Error('Gmail SMTP credentials are not configured on the server.');
  }

  const transporter = createTransporter();
  const mailOptions = {
    from: `"PDFMaster Pro Security" <${user}>`,
    to: toEmail,
    subject: `${otpCode} is your PDFMaster Pro Verification Code`,
    html: getOTPEmailHTML(otpCode, toEmail),
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(`[SMTP Mailer Success] Verification OTP sent to ${toEmail}. Message ID: ${info.messageId}`);
  
  if (!info.accepted || info.accepted.length === 0) {
    throw new Error(`Gmail SMTP rejected message delivery for email: ${toEmail}`);
  }

  return true;
}

module.exports = {
  verifySMTP,
  sendOTPEmail,
  getOTPEmailHTML,
};
