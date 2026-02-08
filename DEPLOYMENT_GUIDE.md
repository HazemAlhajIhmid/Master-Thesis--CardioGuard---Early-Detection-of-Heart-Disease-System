# دليل النشر - تطبيق CardioGuard Web
# Deployment Guide - CardioGuard Web Application

---

## 🚀 نظرة عامة | Overview

<div dir="rtl">

هذا الدليل يشرح كيفية نشر تطبيق CardioGuard Web على منصات استضافة مختلفة. التطبيق مبني بتقنية SvelteKit ويستخدم Static Adapter للحصول على موقع ثابت (Static Site) يمكن نشره على أي خادم ويب.

</div>

This guide explains how to deploy CardioGuard Web application on different hosting platforms. The application is built with SvelteKit and uses Static Adapter to generate a static site that can be deployed on any web server.

---

## 📋 المتطلبات الأساسية | Prerequisites

### العربية

قبل البدء بالنشر، تأكد من:
- ✅ تثبيت Node.js 18 أو أحدث
- ✅ تثبيت npm/pnpm/yarn
- ✅ بناء المشروع بنجاح محلياً
- ✅ تفعيل Backend API والتأكد من عمله
- ✅ تحديث `VITE_API_BASE_URL` في ملف `.env`

### English

Before deployment, ensure:
- ✅ Node.js 18+ installed
- ✅ npm/pnpm/yarn installed
- ✅ Project builds successfully locally
- ✅ Backend API is active and working
- ✅ Update `VITE_API_BASE_URL` in `.env` file

---

## 🔧 إعداد المشروع للنشر | Prepare Project for Deployment

### 1. إعداد متغيرات البيئة | Environment Variables Setup

<div dir="rtl">

أنشئ ملف `.env` في جذر المشروع:

</div>

Create `.env` file in project root:

```bash
# For Production
VITE_API_BASE_URL=https://your-backend-api.com

# For Development
# VITE_API_BASE_URL=http://localhost:5000
```

### 2. التحقق من Adapter | Verify Adapter

<div dir="rtl">

تأكد من أن `svelte.config.js` يستخدم Static Adapter:

</div>

Ensure `svelte.config.js` uses Static Adapter:

```javascript
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: null,
      precompress: false,
      strict: true
    })
  }
};

export default config;
```

### 3. بناء المشروع | Build Project

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Preview build (optional)
npm run preview
```

<div dir="rtl">

بعد البناء، سيتم إنشاء مجلد `build/` يحتوي على الملفات الثابتة.

</div>

After building, a `build/` folder will be created containing static files.

---

## 🌐 طرق النشر | Deployment Methods

---

## 1️⃣ Vercel (الموصى به | Recommended)

<div dir="rtl">

### لماذا Vercel؟
- ✅ نشر سريع وسهل
- ✅ SSL مجاني
- ✅ CDN عالمي
- ✅ تكامل مباشر مع GitHub
- ✅ تحديثات تلقائية عند Push

</div>

### Why Vercel?
- ✅ Fast and easy deployment
- ✅ Free SSL
- ✅ Global CDN
- ✅ Direct GitHub integration
- ✅ Automatic updates on Push

### طريقة النشر | Deployment Steps:

#### أ) من خلال Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

#### ب) من خلال GitHub

1. **رفع الكود إلى GitHub**:
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **ربط المستودع بـ Vercel**:
   - اذهب إلى [vercel.com](https://vercel.com)
   - اضغط "New Project"
   - اختر مستودع GitHub
   - اختر الإعدادات التالية:

```
Framework Preset: SvelteKit
Build Command: npm run build
Output Directory: build
Install Command: npm install
```

3. **إضافة متغيرات البيئة**:
   - في إعدادات المشروع → Environment Variables
   - أضف: `VITE_API_BASE_URL` = `https://your-api.com`

4. **Deploy**: اضغط "Deploy"

### إعدادات vercel.json (اختياري)

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "build",
  "framework": "sveltekit",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

---

## 2️⃣ Netlify

<div dir="rtl">

### لماذا Netlify؟
- ✅ مجاني للمشاريع الصغيرة
- ✅ SSL تلقائي
- ✅ تكامل Git
- ✅ Continuous Deployment

</div>

### Why Netlify?
- ✅ Free for small projects
- ✅ Automatic SSL
- ✅ Git integration
- ✅ Continuous Deployment

### طريقة النشر | Deployment Steps:

#### أ) من خلال Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Build
npm run build

# Deploy
netlify deploy

# Deploy to production
netlify deploy --prod
```

#### ب) من خلال Netlify UI

1. **بناء المشروع محلياً**:
```bash
npm run build
```

2. **رفع إلى Netlify**:
   - اذهب إلى [netlify.com](https://app.netlify.com)
   - اسحب مجلد `build/` إلى Netlify Drop Zone

#### ج) من خلال GitHub

1. **ربط المستودع**:
   - في Netlify Dashboard → "New site from Git"
   - اختر GitHub واختر المستودع
   
2. **إعدادات البناء**:
```
Build command: npm run build
Publish directory: build
```

3. **متغيرات البيئة**:
   - Site settings → Environment Variables
   - أضف: `VITE_API_BASE_URL`

### ملف netlify.toml

```toml
[build]
  command = "npm run build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/build/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

---

## 3️⃣ GitHub Pages

<div dir="rtl">

### لماذا GitHub Pages؟
- ✅ مجاني تماماً
- ✅ مرتبط مباشرة بـ GitHub
- ✅ سهل الإعداد

⚠️ **ملاحظة**: GitHub Pages لا يدعم SPA routing بشكل كامل

</div>

### Why GitHub Pages?
- ✅ Completely free
- ✅ Directly linked to GitHub
- ✅ Easy to setup

⚠️ **Note**: GitHub Pages doesn't fully support SPA routing

### طريقة النشر | Deployment Steps:

#### 1. تحديث svelte.config.js

```javascript
import adapter from '@sveltejs/adapter-static';

const config = {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: 'index.html'  // مهم لـ SPA routing
    }),
    paths: {
      base: process.env.NODE_ENV === 'production' ? '/your-repo-name' : ''
    }
  }
};
```

#### 2. إنشاء سكريبت النشر

<div dir="rtl">

في `package.json`، أضف:

</div>

In `package.json`, add:

```json
{
  "scripts": {
    "deploy": "npm run build && npx gh-pages -d build -t true"
  }
}
```

#### 3. تثبيت gh-pages

```bash
npm install -D gh-pages
```

#### 4. النشر

```bash
npm run deploy
```

#### 5. تفعيل GitHub Pages

- اذهب إلى Settings → Pages
- Source: `gh-pages` branch
- اضغط Save

**الرابط**: `https://your-username.github.io/your-repo-name/`

---

## 4️⃣ Cloudflare Pages

<div dir="rtl">

### لماذا Cloudflare Pages؟
- ✅ سريع جداً (CDN عالمي)
- ✅ مجاني
- ✅ DDoS protection
- ✅ تكامل Git

</div>

### Why Cloudflare Pages?
- ✅ Very fast (Global CDN)
- ✅ Free
- ✅ DDoS protection
- ✅ Git integration

### طريقة النشر | Deployment Steps:

1. **اذهب إلى Cloudflare Dashboard**
2. **Pages → Create a project**
3. **ربط GitHub Repository**
4. **إعدادات البناء**:

```
Framework preset: SvelteKit
Build command: npm run build
Build output directory: build
```

5. **Environment Variables**:
   - أضف `VITE_API_BASE_URL`

6. **Deploy**

---

## 5️⃣ خادم ثابت (Static Server)

<div dir="rtl">

### Apache

</div>

#### 1. بناء المشروع

```bash
npm run build
```

#### 2. نسخ الملفات

```bash
# نسخ محتويات build إلى /var/www/html
sudo cp -r build/* /var/www/html/
```

#### 3. إعداد .htaccess

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Security Headers
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "DENY"
  Header set X-XSS-Protection "1; mode=block"
</IfModule>
```

---

### Nginx

#### 1. إعداد Nginx

```nginx
server {
    listen 80;
    server_name your-domain.com;

    root /var/www/cardioguard;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Security Headers
    add_header X-Frame-Options "DENY";
    add_header X-Content-Type-Options "nosniff";
    add_header X-XSS-Protection "1; mode=block";

    # Gzip Compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
}
```

#### 2. نسخ الملفات

```bash
sudo cp -r build/* /var/www/cardioguard/
```

#### 3. إعادة تشغيل Nginx

```bash
sudo systemctl restart nginx
```

---

## 🔒 إعداد HTTPS (SSL)

### استخدام Let's Encrypt (مجاني)

```bash
# تثبيت Certbot
sudo apt install certbot python3-certbot-nginx

# الحصول على شهادة SSL
sudo certbot --nginx -d your-domain.com

# تجديد تلقائي
sudo certbot renew --dry-run
```

---

## 🔗 ربط Domain مخصص | Custom Domain Setup

### Vercel

1. **Project Settings → Domains**
2. **أضف Domain الخاص بك**
3. **أضف DNS Records**:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Netlify

1. **Domain Settings → Add custom domain**
2. **أضف DNS Records**:

```
Type: A
Name: @
Value: 75.2.60.5

Type: CNAME  
Name: www
Value: your-site.netlify.app
```

---

## ⚙️ إعدادات متقدمة | Advanced Configuration

### تحسين الأداء | Performance Optimization

#### 1. تفعيل Gzip Compression

```javascript
// vite.config.ts
import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import compression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    sveltekit(),
    compression({
      algorithm: 'gzip',
      ext: '.gz'
    })
  ]
});
```

#### 2. Code Splitting

<div dir="rtl">

SvelteKit يقوم تلقائياً بـ Code Splitting. للتحسين الإضافي:

</div>

SvelteKit automatically does Code Splitting. For additional optimization:

```javascript
// +page.js
export const load = async () => {
  // Dynamic imports
  const { default: Chart } = await import('chart.js');
  return { Chart };
};
```

---

### تحسين SEO | SEO Optimization

#### app.html

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  
  <!-- SEO -->
  <title>CardioGuard - الكشف المبكر عن أمراض القلب</title>
  <meta name="description" content="نظام ذكي للكشف المبكر عن أمراض القلب باستخدام تقنيات التعلم الآلي">
  <meta name="keywords" content="أمراض القلب, تعلم آلي, ذكاء اصطناعي, صحة">
  <meta name="author" content="حازم خضر الحاج احميد">
  
  <!-- Open Graph -->
  <meta property="og:title" content="CardioGuard - الكشف المبكر عن أمراض القلب">
  <meta property="og:description" content="نظام ذكي للكشف المبكر عن أمراض القلب">
  <meta property="og:type" content="website">
  
  <!-- Favicon -->
  <link rel="icon" href="%sveltekit.assets%/favicon.png" />
  
  %sveltekit.head%
</head>
<body>
  <div style="display: contents">%sveltekit.body%</div>
</body>
</html>
```

---

## 📊 مراقبة الأداء | Performance Monitoring

### Google Analytics

```html
<!-- app.html -->
<head>
  <!-- Google Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  </script>
</head>
```

---

## 🐛 استكشاف أخطاء النشر | Deployment Troubleshooting

### المشكلة: Build يفشل | Problem: Build Fails

<div dir="rtl">

**الحلول**:

</div>

**Solutions**:

```bash
# مسح cache
rm -rf .svelte-kit node_modules package-lock.json

# إعادة تثبيت
npm install

# البناء
npm run build
```

---

### المشكلة: API لا يعمل | Problem: API Doesn't Work

<div dir="rtl">

**الحلول**:

</div>

**Solutions**:

1. ✔️ تحقق من `VITE_API_BASE_URL`
2. ✔️ تأكد من CORS مفعل في Backend
3. ✔️ تحقق من Backend يعمل
4. ✔️ افحص Network Tab في Developer Tools

---

### المشكلة: Static Files لا تحمل | Problem: Static Files Don't Load

<div dir="rtl">

**الحلول**:

</div>

**Solutions**:

```javascript
// svelte.config.js
const config = {
  kit: {
    paths: {
      assets: process.env.NODE_ENV === 'production' ? 'https://cdn.example.com' : ''
    }
  }
};
```

---

## 📝 قائمة التحقق قبل النشر | Pre-Deployment Checklist

- [ ] ✅ تم البناء محلياً بنجاح | Built successfully locally
- [ ] ✅ تم اختبار جميع الميزات | All features tested
- [ ] ✅ تم تحديث `VITE_API_BASE_URL` | Updated `VITE_API_BASE_URL`
- [ ] ✅ Backend API يعمل | Backend API is working
- [ ] ✅ تم تفعيل CORS | CORS enabled
- [ ] ✅ تم اختبار على متصفحات مختلفة | Tested on different browsers
- [ ] ✅ تم اختبار التجاوبية | Tested responsiveness
- [ ] ✅ تم إعداد SSL | SSL configured
- [ ] ✅ تم إعداد Domain (إن وجد) | Domain configured (if any)
- [ ] ✅ تم إضافة Analytics (اختياري) | Analytics added (optional)

---

## 🆘 الدعم والمساعدة | Support & Help

<div dir="rtl">

للمساعدة في النشر:

</div>

For deployment help:

- **GitHub Issues**: [افتح Issue](https://github.com/HazemAlhajIhmid/Master-Thesis--CardioGuard---Early-Detection-of-Heart-Disease-System/issues)
- **Email**: Hazem_82763@svuonline.org
- **SvelteKit Docs**: [kit.svelte.dev](https://kit.svelte.dev/docs)
- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Netlify Docs**: [docs.netlify.com](https://docs.netlify.com)

---

## 🎓 معلومات البحث | Research Information

**الباحث | Researcher**: حازم خضر الحاج احميد | Hazem Khader Al-Haj Ahmid  
**الجامعة | University**: الجامعة الافتراضية السورية | Syrian Virtual University  
**المشرفون | Supervisors**: د.م. جورج أنور كراز، د. ماجدة البكور

---

**تاريخ آخر تحديث | Last Updated**: 8 فبراير 2026 | February 8, 2026  
**الإصدار | Version**: 1.0.0
