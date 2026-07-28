# PDFMaster Pro REST API Documentation

Official REST API Reference for PDFMaster Pro by **Suraj Vishwakarma**.

## Base URL
```
http://localhost:5000/api
```

---

## 1. Authentication Endpoints

### `POST /auth/send-otp`
Sends a 6-digit verification code to the requested email.
- **Request Body**:
  ```json
  {
    "email": "user@gmail.com"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "Secure 6-digit OTP code sent to your email.",
    "expiresInSeconds": 300
  }
  ```

### `POST /auth/verify-otp`
Verifies the 6-digit OTP code and issues JWT HttpOnly session cookies.
- **Request Body**:
  ```json
  {
    "email": "user@gmail.com",
    "otp": "458213"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "accessToken": "eyJhbGci...",
    "refreshToken": "eyJhbGci..."
  }
  ```

### `POST /auth/google` & `POST /auth/github`
Handles Google and GitHub OAuth session tokens.

### `POST /auth/logout-all`
Revokes all refresh tokens and terminates active sessions across all devices.

---

## 2. PDF Processing Microservices

### `POST /pdf/merge`
Combines multiple PDF files.

### `POST /pdf/compress`
Reduces PDF byte streams while retaining high visual resolution.

---
Developed with ❤️ by **Suraj Vishwakarma** | © 2026 PDFMaster Pro
