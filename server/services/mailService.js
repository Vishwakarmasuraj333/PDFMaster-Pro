const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_PORT === '465',
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
});

/**
 * Generate Responsive Purple Gradient HTML Email Template
 */
function getOTPEmailHTML(otpCode, userEmail) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #0f172a; margin: 0; padding: 20px; color: #f8fafc; }
      .container { max-width: 540px; margin: 0 auto; background: #1e293b; border-radius: 24px; padding: 40px; border: 1px solid #334155; box-shadow: 0 20px 40px rgba(0,0,0,0.4); }
      .header { text-align: center; margin-bottom: 30px; }
      .logo { display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%); border-radius: 16px; color: #ffffff; font-weight: 900; font-size: 20px; text-decoration: none; }
      .title { font-size: 22px; font-weight: 800; text-align: center; margin-bottom: 8px; color: #ffffff; }
      .subtitle { font-size: 13px; color: #94a3b8; text-align: center; margin-bottom: 28px; }
      .otp-box { background: linear-gradient(135deg, rgba(124, 58, 237, 0.15), rgba(168, 85, 247, 0.15)); border: 2px border-purple-500; border-radius: 20px; padding: 24px; text-align: center; margin-bottom: 28px; border: 1px solid #7c3aed; }
      .otp-code { font-family: monospace; font-size: 38px; font-weight: 900; letter-spacing: 8px; color: #c084fc; margin: 0; }
      .badge { display: inline-block; margin-top: 10px; padding: 4px 12px; background: rgba(124, 58, 237, 0.2); border-radius: 12px; font-size: 11px; color: #a855f7; font-weight: 700; }
      .warning { font-size: 12px; color: #64748b; text-align: center; line-height: 1.6; margin-bottom: 30px; }
      .footer { border-top: 1px solid #334155; padding-top: 20px; text-align: center; font-size: 11px; color: #64748b; }
    </style>
  </head>
  <body>
    <div className="container">
      <div className="header">
        <div className="logo">PDFMaster Pro</div>
      </div>
      <h2 className="title">Your Login Verification Code</h2>
      <p className="subtitle">Hello ${userEmail}, please enter the code below to complete your authentication.</p>
      
      <div className="otp-box">
        <h1 className="otp-code">${otpCode}</h1>
        <div className="badge">⏱ Expires in 5 Minutes</div>
      </div>

      <p className="warning">
        Never share this code with anyone. PDFMaster Pro staff will never ask for your verification code.<br>
        If this request wasn't initiated by you, please ignore this email.
      </p>

      <div className="footer">
        © 2026 PDFMaster Pro. All rights reserved.<br>
        Developed with ❤️ by <strong>Suraj Vishwakarma</strong>
      </div>
    </div>
  </body>
  </html>
  `;
}

/**
 * Send Login Verification OTP Mail
 */
async function sendOTPEmail(toEmail, otpCode) {
  const mailOptions = {
    from: process.env.SMTP_FROM || '"PDFMaster Pro" <noreply@pdfmasterpro.com>',
    to: toEmail,
    subject: 'Your Login Verification Code - PDFMaster Pro',
    html: getOTPEmailHTML(otpCode, toEmail),
  };

  try {
    if (process.env.SMTP_USER) {
      await transporter.sendMail(mailOptions);
    }
    console.log(`[SMTP Mailer] Verification OTP (${otpCode}) sent to ${toEmail}`);
    return true;
  } catch (err) {
    console.error('[SMTP Mailer Error]', err);
    return false;
  }
}

module.exports = {
  sendOTPEmail,
  getOTPEmailHTML,
};
