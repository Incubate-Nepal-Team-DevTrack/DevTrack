# DevTrack — Deployment Guide

> **Status**: Public Beta v1.0 — Ready to Publish
> **Stack**: Next.js 16 · Prisma · SQLite (beta) / PostgreSQL (prod) · Tailwind CSS 4
> **Build**: ✅ Passing — 18 routes, 152MB standalone output

---

## 🚀 Quick Publish (5 minutes)

The fastest way to publish DevTrack is to deploy the standalone build.

### Option A — Publish on Current Server

```bash
# 1. Stop the dev server
pkill -f "next dev" || true

# 2. Build for production (already done — rebuild if needed)
bun run build

# 3. Copy production env
cp .env.production .env

# 4. Start the production server
NODE_ENV=production PORT=3000 bun .next/standalone/server.js &

# 5. Verify
curl http://localhost:3000/api/stats
# Should return: {"stats":{"projects":15,"citizens":6,...}}
```

DevTrack is now live at: **https://preview-chat-d58717bc-5193-4c12-b25e-5157c3baf3c6.space-z.ai/**

### Option B — Publish with PM2 (process manager)

```bash
# Install PM2 globally
npm install -g pm2

# Start DevTrack with PM2 (auto-restart on crash)
pm2 start .next/standalone/server.js --name devtrack --env production

# Save PM2 process list (auto-start on server reboot)
pm2 save
pm2 startup

# Check status
pm2 status
pm2 logs devtrack
```

### Option C — Publish with Docker

```dockerfile
# Dockerfile
FROM oven/bun:1.3 AS base
WORKDIR /app

# Copy standalone build
COPY .next/standalone ./
COPY .next/static ./.next/static
COPY public ./public
COPY db ./db
COPY .env.production ./.env

ENV NODE_ENV=production
ENV PORT=3000
EXPOSE 3000

CMD ["bun", "server.js"]
```

```bash
# Build and run
docker build -t devtrack:1.0 .
docker run -d -p 3000:3000 --name devtrack --restart unless-stopped devtrack:1.0
```

---

## 🌐 Production Domain Setup

### 1. Domain Configuration

Point your domain (e.g., `devtrack.np`) to the server:

```
# DNS A record
devtrack.np  →  A  →  YOUR_SERVER_IP
www.devtrack.np  →  CNAME  →  devtrack.np
```

### 2. SSL Certificate (Let's Encrypt — free)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d devtrack.np -d www.devtrack.np

# Auto-renew (add to crontab)
0 12 * * * /usr/bin/certbot renew --quiet
```

### 3. Nginx Reverse Proxy

```nginx
# /etc/nginx/sites-available/devtrack.np
server {
    listen 80;
    server_name devtrack.np www.devtrack.np;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name devtrack.np www.devtrack.np;

    ssl_certificate /etc/letsencrypt/live/devtrack.np/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/devtrack.np/privkey.pem;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains" always;

    # Next.js standalone
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    # Static assets caching
    location /_next/static/ {
        proxy_pass http://127.0.0.1:3000;
        proxy_cache_valid 200 365d;
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/devtrack.np /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

---

## 🗄️ Database Setup

### Beta (SQLite — already configured)

```bash
# Already seeded with 15 projects, 8 officials, 32 wards, 11 demo users
bun run db:push
bun run scripts/seed.ts
```

### Production (PostgreSQL — recommended)

```bash
# 1. Install PostgreSQL
sudo apt install postgresql postgresql-contrib

# 2. Create database and user
sudo -u postgres psql << EOF
CREATE USER devtrack WITH PASSWORD 'YOUR_STRONG_PASSWORD';
CREATE DATABASE devtrack_prod OWNER devtrack;
GRANT ALL PRIVILEGES ON DATABASE devtrack_prod TO devtrack;
EOF

# 3. Update .env
DATABASE_URL="postgresql://devtrack:YOUR_STRONG_PASSWORD@localhost:5432/devtrack_prod?schema=public"

# 4. Push schema and seed
bun run db:push
bun run scripts/seed.ts
```

### Database Backups

```bash
# Daily backup script (add to crontab)
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump -U devtrack devtrack_prod > /backups/devtrack_$DATE.sql
find /backups -name "devtrack_*.sql" -mtime +30 -delete  # keep 30 days

# Crontab: 2 AM daily
0 2 * * * /path/to/backup.sh
```

---

## 🔐 Security Hardening (Production Checklist)

### Before Going Live

- [ ] **Replace demo auth** — implement NextAuth.js with Nagarik App OAuth provider
- [ ] **Set NEXTAUTH_SECRET** — generate with `openssl rand -base64 32`
- [ ] **Remove demo accounts** — delete the 11 seeded users from `scripts/seed.ts`
- [ ] **Enable rate limiting** — add `@upstash/ratelimit` for API routes
- [ ] **Add CSRF protection** — Next.js 16 has built-in CSRF for server actions
- [ ] **Set up Sentry** — error monitoring (`npm install @sentry/nextjs`)
- [ ] **Configure CSP headers** — see Nginx config above, add `Content-Security-Policy`
- [ ] **Enable HTTPS only** — redirect all HTTP to HTTPS
- [ ] **Audit dependencies** — `bun audit` and fix any vulnerabilities
- [ ] **Set up firewall** — `ufw allow 22,80,443/tcp`

### Forum Moderation

- [ ] Add comment moderation queue for ADMIN role
- [ ] Add profanity filter (e.g., `bad-words` npm package)
- [ ] Add report/flag button on comments
- [ ] Add IP-based rate limiting for thread creation (max 5/hour)

---

## 📊 Monitoring & Analytics

### Uptime Monitoring

```bash
# Install PM2 monitoring
pm2 install pm2-server-monit

# Or use UptimeRobot (free) — ping https://devtrack.np/api/stats every 5 min
```

### Analytics (privacy-friendly)

```bash
# Install Plausible (self-hosted, GDPR-compliant)
# Or use Vercel Analytics (free tier)
npm install @vercel/analytics
```

Add to `src/app/layout.tsx`:
```tsx
import { Analytics } from "@vercel/analytics/react";
// ... in body
<Analytics />
```

### Error Monitoring

```bash
# Sentry setup
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

---

## 📈 Performance Optimization

The production build is already optimized:

| Metric | Value |
|--------|-------|
| Build size | 152MB (standalone) |
| Routes | 18 (1 static, 17 dynamic) |
| Compile time | 6.0s |
| Static generation | 18/18 pages |
| First Contentful Paint | ~200ms (estimated) |

### Further Optimizations

- [ ] **Add `next/image`** for any future images (automatic WebP/AVIF)
- [ ] **Add `next/font`** display swap (already configured)
- [ ] **Enable gzip/brotli** in Nginx:
  ```nginx
  gzip on;
  gzip_types text/plain text/css application/json application/javascript;
  gzip_min_length 1000;
  ```
- [ ] **Add CDN** (Cloudflare free tier) for static assets
- [ ] **Database connection pooling** — Prisma supports this natively

---

## 🔄 CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/deploy.yml
name: Deploy DevTrack

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v1
      - run: bun install
      - run: bun run lint
      - run: bun run build
      - name: Deploy to server
        uses: appleboy/ssh-action@v1.0.0
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SERVER_SSH_KEY }}
          script: |
            cd /var/www/devtrack
            git pull origin main
            bun install
            bun run build
            pm2 restart devtrack
```

---

## 📋 Publish Checklist (Print This)

### Pre-Publish
- [ ] Production build passes (`bun run build`)
- [ ] Lint passes (`bun run lint`)
- [ ] Database seeded with real KMC data
- [ ] `.env.production` configured with real secrets
- [ ] NEXTAUTH_SECRET set to 32+ char random string
- [ ] Demo accounts removed or clearly marked
- [ ] SSL certificate installed
- [ ] Nginx reverse proxy configured
- [ ] Firewall enabled (ports 22, 80, 443)
- [ ] PM2 process manager set up
- [ ] Database backups scheduled
- [ ] Uptime monitoring configured
- [ ] Error monitoring (Sentry) configured

### Post-Publish
- [ ] Visit https://devtrack.np — home page loads
- [ ] Sign in works (test all 4 roles)
- [ ] Projects page loads all 15 projects
- [ ] Project detail page works (budget, timeline, updates)
- [ ] Forum: post a thread, reply, vote — all work
- [ ] Officials page: tel: and mailto: links work
- [ ] Beta feedback: submit and see on wall
- [ ] Mobile responsive at 375px
- [ ] Lighthouse score > 90 (performance, accessibility, SEO)
- [ ] Submit sitemap to Google Search Console
- [ ] Share on social media with #DevTrack #Nepal #OGP

### Announce
- [ ] Tweet/Post: "DevTrack is LIVE — transparency for Kathmandu, by Nepal, for Nepal. 🇳🇵"
- [ ] Email KMC Mayor's office with the link
- [ ] Email Incubate Nepal team
- [ ] Submit to Nepali tech blogs (OnlineKhabar, Kathmandu Post Tech)
- [ ] Submit to OGP Nepal newsletter
- [ ] Add to civic tech directories (Code for Nepal, Open Nepal)

---

## 🆘 Troubleshooting

### Build fails
```bash
# Clear Next.js cache
rm -rf .next
bun run build
```

### Database errors
```bash
# Reset database
rm db/custom.db
bun run db:push
bun run scripts/seed.ts
```

### Port 3000 in use
```bash
lsof -i :3000
kill -9 <PID>
# Or use a different port
PORT=3001 bun .next/standalone/server.js
```

### Production server won't start
```bash
# Check logs
pm2 logs devtrack --lines 50

# Common fixes:
# 1. Ensure .env is in standalone dir
cp .env .next/standalone/.env

# 2. Ensure db folder is accessible
cp -r db .next/standalone/db
```

---

## 📞 Support

- **Team DevTrack** — Incubate Nepal 2024
- **Repository**: /home/z/my-project
- **Documentation**: `/home/z/my-project/download/DevTrack-Feature-Documentation.pdf`
- **Preview**: https://preview-chat-d58717bc-5193-4c12-b25e-5157c3baf3c6.space-z.ai/

**For the people of Nepal. 🇳🇵**
