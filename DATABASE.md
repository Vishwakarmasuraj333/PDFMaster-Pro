# PDFMaster Pro Database Schema & Architecture

PDFMaster Pro uses **Prisma ORM** with **MySQL 8.0+** (Aiven MySQL Cloud ready).

## Isolated Database Scope
All PDFMaster Pro models are stored inside a dedicated isolated database named **`pdfmaster_pro`** to avoid any interference with existing MySQL schemas.

## Data Models Summary

| Model | Table Name | Purpose |
|---|---|---|
| `User` | `users` | User accounts, credentials, RBAC roles (`ADMIN`, `STAFF`, `USER`) |
| `LoginOTP` | `login_otps` | Hashed 6-digit OTP codes, 5 min expiry & attempt counters |
| `RefreshToken` | `refresh_tokens` | Device-tracked 7-day refresh tokens |
| `Session` | `sessions` | Active user sessions, JWT tokens, IP & browser metadata |
| `Plan` | `plans` | Pricing tiers: Free, Pro, Enterprise |
| `Subscription` | `subscriptions` | Active user billing subscriptions |
| `File` | `files` | PDF document metadata & URLs |
| `Folder` | `folders` | User document folder collections |
| `ProcessingHistory` | `processing_history` | Audit log of PDF tool executions |

---
Developed with ❤️ by **Suraj Vishwakarma** | © 2026 PDFMaster Pro
