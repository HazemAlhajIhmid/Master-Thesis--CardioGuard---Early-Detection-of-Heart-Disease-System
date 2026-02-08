# بنية المشروع - CardioGuard Web Application
# Project Structure - CardioGuard Web Application

---

## 📁 نظرة عامة على البنية | Structure Overview

<div dir="rtl">

هذا المستند يشرح بالتفصيل بنية مشروع CardioGuard Web Application، بما في ذلك الملفات، المجلدات، والمكونات.

</div>

This document explains in detail the CardioGuard Web Application project structure, including files, folders, and components.

---

## 🌳 شجرة المشروع الكاملة | Complete Project Tree

```
frontend/
│
├── 📁 src/                              # مجلد المصدر الرئيسي
│   │
│   ├── 📄 app.html                      # قالب HTML الأساسي
│   ├── 📄 app.css                       # أنماط CSS العامة + Tailwind
│   ├── 📄 app.d.ts                      # Type definitions
│   │
│   ├── 📁 routes/                       # صفحات التطبيق (SvelteKit Routing)
│   │   ├── 📄 +layout.svelte           # Layout الرئيسي لجميع الصفحات
│   │   └── 📄 +page.svelte             # الصفحة الرئيسية (Home)
│   │
│   └── 📁 lib/                          # مكتبة المكونات والوظائف
│       │
│       ├── 📄 index.ts                  # Barrel export
│       │
│       ├── 📁 components/               # مكونات Svelte
│       │   ├── 📄 Header.svelte        # الهيدر + القائمة + تبديل اللغة
│       │   ├── 📄 Hero.svelte          # قسم البطل + معلومات المشروع
│       │   ├── 📄 RiskCalculator.svelte # حاسبة المخاطر + النموذج + النتائج
│       │   ├── 📄 About.svelte         # قسم حول المشروع + الفريق
│       │   ├── 📄 ModelComparison.svelte # مقارنة النماذج الثلاثة
│       │   └── 📄 Footer.svelte        # التذييل + الحقوق
│       │
│       ├── 📁 stores/                   # Svelte Stores (إدارة الحالة)
│       │   └── 📄 language.ts          # مخزن اللغة + الترجمات
│       │
│       └── 📁 assets/                   # الصور والملفات الثابتة (اختياري)
│
├── 📁 static/                           # ملفات ثابتة (يتم نسخها مباشرة)
│   ├── 📄 robots.txt                   # SEO crawler rules
│   └── 📁 data/
│       └── 📄 heart.csv                # بيانات التدريب (مرجع)
│
├── 📁 build/                            # مجلد البناء النهائي (يُنشأ تلقائياً)
│   ├── 📄 index.html                   # الصفحة الرئيسية المبنية
│   ├── 📄 robots.txt                   # نسخة من static
│   └── 📁 _app/                        # JavaScript/CSS المحزوم
│       ├── 📄 env.js                   # متغيرات البيئة
│       ├── 📄 version.json             # معلومات الإصدار
│       └── 📁 immutable/               # ملفات مع cache طويل المدى
│           ├── 📁 assets/              # CSS
│           ├── 📁 chunks/              # JavaScript chunks
│           ├── 📁 entry/               # Entry points
│           └── 📁 nodes/               # Route nodes
│
├── 📄 package.json                      # التبعيات + Scripts
├── 📄 package-lock.json                 # Lock file
├── 📄 svelte.config.js                  # إعدادات SvelteKit
├── 📄 vite.config.ts                    # إعدادات Vite
├── 📄 tailwind.config.js                # إعدادات Tailwind CSS
├── 📄 postcss.config.js                 # إعدادات PostCSS
├── 📄 tsconfig.json                     # إعدادات TypeScript
├── 📄 .gitignore                        # ملفات Git المستبعدة
├── 📄 .env                              # متغيرات البيئة (لا ترفع لـ Git)
│
├── 📄 README.md                         # التوثيق الرئيسي
├── 📄 TESTING_DOCUMENTATION.md          # توثيق الاختبار الشامل
├── 📄 QUICK_TEST_GUIDE_AR.md           # دليل الاختبار السريع
├── 📄 DEPLOYMENT_GUIDE.md              # دليل النشر
└── 📄 PROJECT_STRUCTURE.md             # هذا الملف
```

---

## 📂 شرح المجلدات الرئيسية | Main Folders Explanation

### 1️⃣ src/ - مجلد المصدر

<div dir="rtl">

يحتوي على كل كود المصدر للتطبيق.

</div>

Contains all application source code.

#### app.html
```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>CardioGuard - الكشف المبكر عن أمراض القلب</title>
  %sveltekit.head%
</head>
<body>
  <div style="display: contents">%sveltekit.body%</div>
</body>
</html>
```

<div dir="rtl">

- **الغرض**: قالب HTML الأساسي للتطبيق
- **المميزات**:
  - دعم RTL للعربية
  - SEO meta tags
  - SvelteKit placeholders

</div>

**Purpose**: Base HTML template  
**Features**:
  - RTL support for Arabic
  - SEO meta tags
  - SvelteKit placeholders

---

#### app.css
```css
/* Tailwind Directives */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Global Styles */
@layer base {
  body {
    @apply font-sans antialiased;
  }
}

/* Custom Components */
@layer components {
  .btn {
    @apply px-6 py-3 rounded-lg font-semibold transition-all;
  }
  
  .btn-primary {
    @apply bg-primary-600 text-white hover:bg-primary-700;
  }
  
  .card {
    @apply bg-white rounded-xl shadow-lg p-6;
  }
}
```

<div dir="rtl">

- **الغرض**: أنماط CSS العامة
- **يتضمن**:
  - Tailwind CSS directives
  - أنماط مخصصة
  - متغيرات CSS

</div>

**Purpose**: Global CSS styles  
**Includes**:
  - Tailwind CSS directives
  - Custom styles
  - CSS variables

---

### 2️⃣ src/routes/ - التوجيه

<div dir="rtl">

SvelteKit يستخدم file-based routing. كل ملف أو مجلد يمثل route.

</div>

SvelteKit uses file-based routing. Each file or folder represents a route.

#### +layout.svelte
```svelte
<script lang="ts">
  // Layout مشترك لجميع الصفحات
  // Shared layout for all pages
</script>

<div class="app">
  <slot />
</div>

<style>
  .app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
</style>
```

<div dir="rtl">

- **الغرض**: Layout مشترك لكل الصفحات
- **يحتوي على**: هيكل أساسي، أنماط عامة

</div>

**Purpose**: Shared layout for all pages  
**Contains**: Basic structure, global styles

---

#### +page.svelte
```svelte
<script lang="ts">
  import Header from '$lib/components/Header.svelte';
  import Hero from '$lib/components/Hero.svelte';
  import RiskCalculator from '$lib/components/RiskCalculator.svelte';
  import About from '$lib/components/About.svelte';
  import ModelComparison from '$lib/components/ModelComparison.svelte';
  import Footer from '$lib/components/Footer.svelte';
</script>

<div class="min-h-screen flex flex-col">
  <Header />
  <main class="flex-grow">
    <Hero />
    <RiskCalculator />
    <About />
    <ModelComparison />
  </main>
  <Footer />
</div>
```

<div dir="rtl">

- **الغرض**: الصفحة الرئيسية
- **يحتوي على**: تجميع كل المكونات
- **المسار**: `/` (الصفحة الرئيسية)

</div>

**Purpose**: Home page  
**Contains**: All components composition  
**Route**: `/` (root)

---

### 3️⃣ src/lib/ - المكتبة

<div dir="rtl">

يحتوي على المكونات القابلة لإعادة الاستخدام والوظائف المساعدة.

</div>

Contains reusable components and helper functions.

---

## 🧩 المكونات التفصيلية | Detailed Components

### 📄 Header.svelte

<div dir="rtl">

**الوظيفة**: رأس الصفحة مع القائمة وتبديل اللغة

</div>

**Function**: Page header with navigation and language switcher

```svelte
<script lang="ts">
  import { language } from '$lib/stores/language';
  
  let mobileMenuOpen = false;
  
  function toggleLanguage() {
    $language = $language === 'ar' ? 'en' : 'ar';
  }
  
  function scrollToSection(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    mobileMenuOpen = false;
  }
</script>
```

**المميزات | Features**:
- ✅ تبديل اللغة (عربي/إنجليزي)
- ✅ قائمة متجاوبة للموبايل
- ✅ تنقل سلس بين الأقسام
- ✅ Logo + القائمة

**Props**: لا يوجد | None  
**Stores Used**: `language`

---

### 📄 Hero.svelte

<div dir="rtl">

**الوظيفة**: قسم البطل (Hero Section) مع معلومات المشروع

</div>

**Function**: Hero section with project information

```svelte
<script lang="ts">
  import { language, translations } from '$lib/stores/language';
  
  $: t = translations[$language];
  
  function scrollToCalculator() {
    document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' });
  }
</script>
```

**المميزات | Features**:
- ✅ عنوان جذاب
- ✅ معلومات الجامعة
- ✅ أزرار CTA
- ✅ رسوم متحركة
- ✅ إحصائيات (82% دقة، 303 سجل)

**Props**: لا يوجد | None  
**Stores Used**: `language`, `translations`

---

### 📄 RiskCalculator.svelte

<div dir="rtl">

**الوظيفة**: المكون الأساسي - نموذج حساب المخاطر وعرض النتائج

</div>

**Function**: Main component - risk calculation form and results display

```svelte
<script lang="ts">
  import { language, translations } from '$lib/stores/language';
  
  // Form Data (13 fields)
  let formData = {
    age: 50,
    sex: 1,
    cp: 0,
    trestbps: 120,
    chol: 200,
    fbs: 0,
    restecg: 0,
    thalach: 150,
    exang: 0,
    oldpeak: 0.0,
    slope: 0,
    ca: 0,
    thal: 0
  };
  
  let predictionResult: any = null;
  let isCalculating = false;
  
  const API_BASE = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000';
  
  async function calculateRisk() {
    isCalculating = true;
    try {
      const response = await fetch(`${API_BASE}/api/prediction/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Age: formData.age,
          Sex: formData.sex,
          CP: formData.cp,
          // ... باقي الحقول
        })
      });
      const data = await response.json();
      predictionResult = data;
    } catch (err) {
      console.error(err);
    } finally {
      isCalculating = false;
    }
  }
  
  function getRiskLevelColor(level: string) {
    switch (level) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'moderate': return 'text-orange-600 bg-orange-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  }
</script>
```

**المميزات | Features**:
- ✅ نموذج 13 حقل طبي
- ✅ توضيحات (ℹ️) لكل حقل
- ✅ التحقق من المدخلات
- ✅ API Integration
- ✅ عرض النتائج مع الألوان الديناميكية
- ✅ مقارنة 3 نماذج ML
- ✅ رسوم بيانية (Chart.js)
- ✅ زر إعادة التعيين

**State**:
- `formData`: بيانات النموذج
- `predictionResult`: نتائج التنبؤ
- `isCalculating`: حالة التحميل
- `activeInfoField`: الحقل المفتوح للمعلومات

**Functions**:
- `calculateRisk()`: إرسال الطلب إلى API
- `resetForm()`: إعادة تعيين النموذج
- `toggleInfo()`: فتح/إغلاق التوضيحات
- `getRiskLevelColor()`: تحديد اللون حسب المخاطر

---

### 📄 About.svelte

<div dir="rtl">

**الوظيفة**: قسم حول المشروع ومعلومات الفريق

</div>

**Function**: About section with project and team information

```svelte
<script lang="ts">
  import { language, translations } from '$lib/stores/language';
  
  const methodology = [
    { icon: '📊', key: 'dataCollection', description: 'dataCollectionDesc' },
    { icon: '⚙️', key: 'preprocessing', description: 'preprocessingDesc' },
    { icon: '🤖', key: 'modelTraining', description: 'modelTrainingDesc' },
    { icon: '📈', key: 'evaluation', description: 'evaluationDesc' }
  ];
</script>
```

**المميزات | Features**:
- ✅ معلومات الباحث
- ✅ معلومات المشرفين
- ✅ معلومات الجامعة
- ✅ منهجية البحث (4 خطوات)
- ✅ بطاقات مصممة بشكل جميل

**Props**: لا يوجد | None  
**Stores Used**: `language`, `translations`

---

### 📄 ModelComparison.svelte

<div dir="rtl">

**الوظيفة**: مقارنة بين النماذج الثلاثة

</div>

**Function**: Comparison between three models

```svelte
<script lang="ts">
  import { language, translations } from '$lib/stores/language';
  
  const models = [
    {
      name: 'KNN',
      accuracy: 82,
      precision: 80,
      recall: 94,
      f1Score: 86,
      color: 'blue'
    },
    {
      name: 'Naive Bayes',
      accuracy: 82,
      precision: 78,
      recall: 89,
      f1Score: 83,
      color: 'green'
    },
    {
      name: 'Decision Tree',
      accuracy: 70,
      precision: 65,
      recall: 72,
      f1Score: 68,
      color: 'purple'
    }
  ];
</script>
```

**المميزات | Features**:
- ✅ عرض الدقة لكل نموذج
- ✅ Precision, Recall, F1-Score
- ✅ ألوان مميزة لكل نموذج
- ✅ تصميم بطاقات أنيق

**Props**: لا يوجد | None  
**Data**: `models` array

---

### 📄 Footer.svelte

<div dir="rtl">

**الوظيفة**: تذييل الصفحة

</div>

**Function**: Page footer

```svelte
<script lang="ts">
  import { language, translations } from '$lib/stores/language';
</script>

<footer class="bg-gray-900 text-white py-8">
  <div class="container mx-auto text-center">
    <p>© 2026 CardioGuard - {$t.rightsReserved}</p>
    <p class="text-sm text-gray-400 mt-2">{$t.university}</p>
  </div>
</footer>
```

**المميزات | Features**:
- ✅ معلومات الحقوق
- ✅ اسم الجامعة
- ✅ روابط (اختياري)

**Props**: لا يوجد | None

---

## 🗄️ إدارة الحالة | State Management

### language.ts - مخزن اللغة

```typescript
import { writable } from 'svelte/store';

export type Language = 'ar' | 'en';

export const language = writable<Language>('ar');

export const translations = {
  ar: {
    // جميع الترجمات العربية
    heroTitle: 'الكشف المبكر عن أمراض القلب',
    calculatorTitle: 'حاسبة مخاطر أمراض القلب',
    // ... باقي الترجمات
  },
  en: {
    // All English translations
    heroTitle: 'Early Detection of Heart Disease',
    calculatorTitle: 'Heart Disease Risk Calculator',
    // ... rest of translations
  }
};
```

<div dir="rtl">

**الوظيفة**: إدارة اللغة والترجمات

</div>

**Function**: Language and translations management

**Structure**:
- `language`: Writable store للغة الحالية
- `translations`: كائن يحتوي على جميع الترجمات

**Usage**:
```svelte
<script>
  import { language, translations } from '$lib/stores/language';
  
  $: t = translations[$language];
  
  // استخدام الترجمة
  <h1>{t.heroTitle}</h1>
  
  // تبديل اللغة
  $language = 'en';
</script>
```

---

## ⚙️ ملفات الإعداد | Configuration Files

### package.json

<div dir="rtl">

يحتوي على التبعيات وأوامر البناء.

</div>

Contains dependencies and build commands.

```json
{
  "name": "frontend",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "@sveltejs/adapter-static": "^3.0.10",
    "@sveltejs/kit": "^2.49.1",
    "svelte": "^5.45.6",
    "tailwindcss": "^4.1.18",
    "typescript": "^5.9.3",
    "vite": "^7.2.6"
  },
  "dependencies": {
    "chart.js": "^4.5.1"
  }
}
```

**Scripts**:
- `dev`: تشغيل سيرفر التطوير
- `build`: بناء للإنتاج
- `preview`: معاينة البناء

---

### svelte.config.js

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

<div dir="rtl">

**الغرض**: إعدادات SvelteKit

</div>

**Purpose**: SvelteKit configuration

**Settings**:
- `adapter`: Static adapter للنشر
- `pages`: مجلد الخروج
- `preprocess`: معالجة ما قبل البناء

---

### vite.config.ts

```typescript
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    port: 5173,
    host: true
  }
});
```

<div dir="rtl">

**الغرض**: إعدادات Vite (أداة البناء)

</div>

**Purpose**: Vite configuration (build tool)

---

### tailwind.config.js

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EFF6FF',
          600: '#2563EB',
          700: '#1D4ED8'
        },
        secondary: {
          50: '#ECFDF5',
          600: '#059669',
          700: '#047857'
        }
      }
    }
  },
  plugins: []
};
```

<div dir="rtl">

**الغرض**: إعدادات Tailwind CSS

</div>

**Purpose**: Tailwind CSS configuration

**Includes**:
- ألوان مخصصة
- Responsive breakpoints
- Plugins

---

### tsconfig.json

```json
{
  "extends": "./.svelte-kit/tsconfig.json",
  "compilerOptions": {
    "allowJs": true,
    "checkJs": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "sourceMap": true,
    "strict": true,
    "moduleResolution": "bundler"
  }
}
```

<div dir="rtl">

**الغرض**: إعدادات TypeScript

</div>

**Purpose**: TypeScript configuration

---

## 🔄 تدفق البيانات | Data Flow

```
┌─────────────────────────────────────────────┐
│           User Input (RiskCalculator)       │
│          المستخدم يدخل البيانات             │
└────────────────────┬────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────┐
│       Form Data Collection (13 fields)      │
│          جمع البيانات (13 حقل)             │
└────────────────────┬────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────┐
│          Client-side Validation             │
│          التحقق من المدخلات                 │
└────────────────────┬────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────┐
│     API Call (POST /api/prediction/predict) │
│          استدعاء API                        │
└────────────────────┬────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────┐
│         Backend Processing (Flask)          │
│          معالجة Backend                     │
└────────────────────┬────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────┐
│       ML Models (KNN, NB, DT) Processing    │
│          معالجة نماذج التعلم الآلي          │
└────────────────────┬────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────┐
│           Ensemble Result                   │
│          النتيجة النهائية                   │
└────────────────────┬────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────┐
│       Response (JSON with predictions)      │
│          الاستجابة (JSON)                   │
└────────────────────┬────────────────────────┘
                     │
                     ↓
┌─────────────────────────────────────────────┐
│          Results Display                    │
│          عرض النتائج                        │
│    ├─ Risk Level Card (with color)         │
│    ├─ Models Comparison                    │
│    └─ Charts (Bar Chart)                   │
└─────────────────────────────────────────────┘
```

---

## 🎨 نظام التصميم | Design System

### الألوان | Colors

```css
/* Primary (Medical Blue) */
--primary-50: #EFF6FF;
--primary-600: #2563EB;
--primary-700: #1D4ED8;

/* Secondary (Health Green) */
--secondary-50: #ECFDF5;
--secondary-600: #059669;
--secondary-700: #047857;

/* Risk Colors */
--green-100: #DCFCE7;   /* Low Risk Background */
--green-600: #16A34A;   /* Low Risk Text */
--orange-100: #FEF3C7;  /* Moderate Risk Background */
--orange-600: #D97706;  /* Moderate Risk Text */
--red-100: #FEE2E2;     /* High Risk Background */
--red-600: #DC2626;     /* High Risk Text */
```

### المسافات | Spacing

```css
/* Tailwind Default Spacing Scale */
spacing: {
  1: '0.25rem',   /* 4px */
  2: '0.5rem',    /* 8px */
  4: '1rem',      /* 16px */
  6: '1.5rem',    /* 24px */
  8: '2rem',      /* 32px */
  12: '3rem',     /* 48px */
  16: '4rem',     /* 64px */
  20: '5rem'      /* 80px */
}
```

### الخطوط | Typography

```css
font-family: {
  sans: ['system-ui', 'sans-serif'],
  arabic: ['Cairo', 'Tajawal', 'sans-serif']
}

font-size: {
  sm: '0.875rem',    /* 14px */
  base: '1rem',      /* 16px */
  lg: '1.125rem',    /* 18px */
  xl: '1.25rem',     /* 20px */
  2xl: '1.5rem',     /* 24px */
  4xl: '2.25rem'     /* 36px */
}
```

---

## 🔧 البيئة التطويرية | Development Environment

### متطلبات التطوير | Development Requirements

- **Node.js**: v18.0+
- **npm**: v8.0+
- **Editor**: VS Code (موصى به)
- **Extensions**:
  - Svelte for VS Code
  - Tailwind CSS IntelliSense
  - ESLint
  - Prettier

### أوامر مفيدة | Useful Commands

```bash
# تثبيت التبعيات
npm install

# تشغيل سيرفر التطوير
npm run dev

# فتح المتصفح تلقائياً
npm run dev -- --open

# بناء للإنتاج
npm run build

# معاينة البناء
npm run preview

# فحص TypeScript
npm run check

# فحص بوضع المراقبة
npm run check:watch
```

---

## 📝 ملاحظات مهمة | Important Notes

### العربية

1. **File Naming**: جميع الملفات بأسماء إنجليزية لضمان التوافق
2. **RTL Support**: دعم كامل لـ RTL في CSS
3. **Type Safety**: استخدام TypeScript لضمان أمان الأنواع
4. **Component Isolation**: كل مكون مستقل ويمكن إعادة استخدامه
5. **No Server-side Code**: التطبيق static بالكامل

### English

1. **File Naming**: All files in English for compatibility
2. **RTL Support**: Full RTL support in CSS
3. **Type Safety**: Using TypeScript for type safety
4. **Component Isolation**: Each component is independent and reusable
5. **No Server-side Code**: Application is fully static

---

## 🎓 معلومات البحث | Research Information

**الباحث | Researcher**: حازم خضر الحاج احميد | Hazem Khader Al-Haj Ahmid  
**البريد الإلكتروني | Email**: Hazem_82763@svuonline.org  
**الجامعة | University**: الجامعة الافتراضية السورية | Syrian Virtual University  

**المشرفون | Supervisors**:
- د.م. جورج أنور كراز | Dr. George Anwar Karraz
- د. ماجدة البكور | Dr. Majeda Al-Bakour

---

**تاريخ آخر تحديث | Last Updated**: 8 فبراير 2026 | February 8, 2026  
**الإصدار | Version**: 1.0.0
