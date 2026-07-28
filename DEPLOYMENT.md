# PDFMaster Pro - Deployment Guide

This guide provides step-by-step instructions to deploy **PDFMaster Pro** to production targets including **Vercel**, **Railway**, **Render**, and custom **VPS servers (Ubuntu/Docker/PM2)**.

---

## 1. Vercel Deployment (Frontend & Serverless API)

1. Push your code to GitHub: `git push -u origin main`
2. Log into [Vercel](https://vercel.com) and click **Add New Project**.
3. Import repository `Vishwakarmasuraj333/PDFMaster-Pro`.
4. Set Framework Preset to **Next.js**.
5. Go to **Environment Variables** → Click **"Paste Environment Variables"** and paste:

```env
NEXT_PUBLIC_APP_URL=https://pdfmasterpro.com
NEXT_PUBLIC_API_URL=https://pdfmasterpro.com/api
NODE_ENV=production
DATABASE_URL=mysql://avnadmin:YOUR_AIVEN_PASSWORD@mysql-37ec536c-itxsurajofficial-3639.i.aivencloud.com:20680/pdfmaster_pro?ssl-mode=REQUIRED
JWT_SECRET=super_secret_jwt_key_pdfmaster_2026
JWT_REFRESH_SECRET=super_secret_refresh_key_pdfmaster_2026
NEXTAUTH_SECRET=super_secret_nextauth_key_pdfmaster_2026
NEXTAUTH_URL=https://pdfmasterpro.com
GMAIL_USER=suraj@pdfmasterpro.com
GMAIL_APP_PASSWORD=your_gmail_16_digit_app_password
GOOGLE_CLIENT_ID=your_google_client_id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
STRIPE_SECRET_KEY=sk_live_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_stripe_webhook_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_publishable_key
```

6. Click **Deploy**.

---

## 2. Railway Deployment (Full Stack / Backend + MySQL + Redis)

1. Sign in to [Railway.app](https://railway.app).
2. Create a new project and add a **MySQL Database** service.
3. Add a **Redis** service.
4. Add a new Web Service pointing to your repository `server/` subfolder.
5. Set Environment Variables:
   - `DATABASE_URL`: `${{MySQL.MYSQL_URL}}`
   - `REDIS_URL`: `${{Redis.REDIS_URL}}`
   - `PORT`: `5000`
   - `JWT_SECRET`: `super_secret_jwt_key_2026`
   - `JWT_REFRESH_SECRET`: `super_secret_refresh_key_2026`
   - `NODE_ENV`: `production`
6. Build Command: `npm run build`
7. Start Command: `npm start`

---

## 3. Render Deployment (Backend `server/`)

1. Go to [Render.com](https://render.com) and create a **Web Service**.
2. Connect your repo and set Root Directory to `server`.
3. Select Node runtime.
4. Build Command: `npm install && npx prisma generate`
5. Start Command: `node server.js`
6. Add Environment Variables:
   - `NODE_ENV`: `production`
   - `DATABASE_URL`: `mysql://...`
   - `CLOUDINARY_URL`: `cloudinary://...`

---

## 4. Ubuntu VPS Setup with PM2 & Nginx

### Step 1: Install Node.js, PM2, MySQL & Nginx
```bash
sudo apt update && sudo apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs mysql-server nginx
sudo npm install -g pm2
```

### Step 2: Configure PM2
```bash
cd /var/www/pdfmaster-pro
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

### Step 3: Nginx Reverse Proxy Configuration (`/etc/nginx/sites-available/pdfmaster`)
```nginx
server {
    server_name pdfmasterpro.com www.pdfmasterpro.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
    }
}
```

Enable site & restart Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/pdfmaster /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

© 2026 PDFMaster Pro | Developed with ❤️ by Suraj Vishwakarma
