const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_jwt_key_pdfmaster_2026';

// Verify JWT Access Token
const verifyToken = (req, res, next) => {
  const token = req.cookies?.accessToken || (req.headers.authorization && req.headers.authorization.split(' ')[1]);
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access Denied: Authentication token required.',
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token. Please log in again.',
    });
  }
};

// Role-Based Access Control Middleware
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Forbidden: You do not have permission to access this resource.',
      });
    }
    next();
  };
};

module.exports = {
  verifyToken,
  authorizeRoles,
};
