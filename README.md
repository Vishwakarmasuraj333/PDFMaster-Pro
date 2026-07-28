# PDFMaster Pro - Production-Ready Full Stack PDF SaaS Platform

![PDFMaster Pro](https://img.shields.io/badge/PDFMaster%20Pro-SaaS%20Platform-7C3AED?style=for-the-badge)
![Next.js 16](https://img.shields.io/badge/Next.js-16%20App%20Router-black?style=for-the-badge&logo=next.js)
![React 19](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38BDF8?style=for-the-badge&logo=tailwind-css)
![Express.js](https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express)
![Prisma ORM](https://img.shields.io/badge/Prisma-MySQL-2D3748?style=for-the-badge&logo=prisma)

**PDFMaster Pro** is an enterprise-grade, full-stack PDF SaaS application featuring 30+ PDF processing tools, AI PDF utilities, interactive user & admin dashboards, JWT role-based access control, subscription billing, and glassmorphic UI aesthetics.

Developed with ❤️ by **Suraj Vishwakarma**.

---

## 🌟 Key Features

### 📄 PDF Tools (30+ Tools)
- **Organize & Edit**: Merge, Split, Compress, Rotate, Extract Pages, Delete Pages, Organize PDF, Page Numbers, Watermark, Crop PDF.
- **Security & Privacy**: Protect PDF (Password Encryption), Unlock PDF, Redact PDF, Digital Signature.
- **Conversion Suite**: PDF to Word, Word to PDF, PDF to Excel, Excel to PDF, PDF to PPT, PPT to PDF, JPG to PDF, PDF to JPG, HTML to PDF, Markdown to PDF, PDF to Markdown.
- **Advanced & AI Tools**: OCR PDF, Repair PDF, Compare PDF, Scan PDF, AI PDF Summary, AI Translate, AI Chat with PDF.

### 👤 User Dashboard (`/dashboard`)
- Real-time Analytics & Storage Meter.
- Drag & Drop Multi-file Queue with Cloud Storage support.
- Processing History, Favorites, Trash Management.
- Subscription Management & Invoice Downloader.
- API Key Generation for Developer API access.

### 🛡️ Admin Dashboard (`/admin`)
- User Management (Role-based access: `Admin`, `Staff`, `User`).
- Plan & Subscription Management with custom pricing.
- Revenue Analytics & System Health Monitor.
- Error Logs & Audit Log Viewer.
- Blog CMS & SEO Control Panel.

### 🔒 Enterprise Security
- JWT & Refresh Token Authentication.
- OTP Email Verification & Reset Password flow.
- Rate Limiting, Helmet Security Headers, CORS Policy.
- Input Sanitization & SQL Injection Protection.
- Audit Trail logging for compliance.

---

## 🎨 Theme & Branding

- **Primary Color**: `#7C3AED` (Violet Accent)
- **Secondary Color**: `#A855F7` (Purple Accent)
- **Accent Color**: `#C084FC` (Light Purple Glow)
- **Background Dark**: `#0F172A` (Slate 900)
- **Background Light**: `#FFFFFF` / `#F8FAFC`
- **UI Elements**: Glassmorphism, Rounded Borders, Micro-interactions, Framer Motion animations.

---

## 📁 Project Structure

```
pdfmaster-pro/
├── client/                 # Next.js 16 Frontend App Router
│   ├── app/                # App pages (Landing, Tools, Auth, Dashboard, Admin)
│   ├── components/         # UI & Layout components
│   ├── context/            # Theme & State contexts
│   ├── lib/                # PDF-lib utilities & API client
│   └── public/             # Static assets
├── server/                 # Express.js Backend API
│   ├── config/             # DB & Cloud Service configurations
│   ├── controllers/        # Auth, PDF, User, Admin, Payment controllers
│   ├── middlewares/        # Auth, Security, Error Handler
│   ├── prisma/             # Prisma Schema & Raw SQL file
│   └── routes/             # REST API Routes
├── docker-compose.yml      # Docker Multi-container setup
├── ecosystem.config.js     # PM2 Process Manager setup
├── postman_collection.json # API Documentation & Testing collection
└── README.md
```

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js v18+ 
- npm or yarn
- MySQL Server (or Docker)
- Redis (optional, for caching)

### 1. Clone & Install Dependencies
```bash
# Install Server Dependencies
cd server
npm install

# Install Client Dependencies
cd ../client
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` in both `client/` and `server/` directories:
```bash
# In server/.env
PORT=5000
DATABASE_URL="mysql://root:password@localhost:3306/pdfmaster_pro"
JWT_SECRET="your_jwt_secret_key"
JWT_REFRESH_SECRET="your_jwt_refresh_secret"
STRIPE_SECRET_KEY="sk_test_..."
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
```

### 3. Database Migration & Seed
```bash
cd server
npx prisma db push
# Or import prisma/schema.sql into MySQL database
```

### 4. Run Development Servers
```bash
# Start Express Server (Port 5000)
cd server
npm run dev

# Start Next.js App Router (Port 3000)
cd client
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## 🐳 Docker Setup

Run full-stack stack with single command:
```bash
docker-compose up -d --build
```

---

## ⚙️ PM2 Production Deployment

```bash
pm2 start ecosystem.config.js
```

---

## 📜 License & Owner Info

Developed by **Suraj Vishwakarma**  
© 2026 PDFMaster Pro. All rights reserved.  
Developed with ❤️ by Suraj Vishwakarma.
