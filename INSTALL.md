# PDFMaster Pro Installation Guide

PDFMaster Pro is an enterprise-grade Full Stack PDF SaaS platform developed by **Suraj Vishwakarma**.

## Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **MySQL**: 8.0+ (Local or Cloud like Aiven MySQL)
- **Git**

## Quick Start Installation

### 1. Clone the Repository
```bash
git clone https://github.com/Vishwakarmasuraj333/PDFMaster-Pro.git
cd PDFMaster-Pro
```

### 2. Install Client & Server Dependencies
```bash
# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

### 3. Environment Setup
Create a `.env` file in the `server/` directory:
```env
PORT=5000
NODE_ENV=development
APP_NAME="PDFMaster Pro"
APP_URL=http://localhost:3000

# Database
DATABASE_URL="mysql://avnadmin:YOUR_PASSWORD@mysql-37ec536c-itxsurajofficial-3639.i.aivencloud.com:20680/pdfmaster_pro?ssl-mode=REQUIRED"

# JWT Auth
JWT_SECRET=super_secret_jwt_key_pdfmaster_2026
JWT_REFRESH_SECRET=super_secret_refresh_key_pdfmaster_2026
```

### 4. Push Database Schema
```bash
cd server
npm run prisma:push
```

### 5. Launch Application
From the workspace root directory:
```bash
npm run dev
```

The web application will launch at **`http://localhost:3000`** and the Express REST API at **`http://localhost:5000`**.

---
Developed with ❤️ by **Suraj Vishwakarma** | © 2026 PDFMaster Pro
