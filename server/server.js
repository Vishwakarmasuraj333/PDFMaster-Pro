const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { securityHeaders, apiLimiter } = require('./middlewares/security');
const errorHandler = require('./middlewares/errorHandler');
const { verifySMTP } = require('./services/mailService');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middlewares
app.use(securityHeaders);
app.use(cors({
  origin: process.env.APP_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Apply rate limiting
app.use('/api', apiLimiter);

// Health Check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    app: 'PDFMaster Pro API Server',
    developer: 'Suraj Vishwakarma',
    timestamp: new Date(),
  });
});

// REST API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/pdf', require('./routes/pdfRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));

// Global Error Handler
app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`===================================================`);
  console.log(`  🚀 PDFMaster Pro API Server running on port ${PORT}`);
  console.log(`  👨‍💻 Developed by Suraj Vishwakarma`);
  console.log(`  © 2026 PDFMaster Pro. All rights reserved.`);
  console.log(`===================================================`);

  try {
    await verifySMTP();
  } catch (err) {
    console.error('[SMTP STARTUP ERROR]', err.message);
  }
});
