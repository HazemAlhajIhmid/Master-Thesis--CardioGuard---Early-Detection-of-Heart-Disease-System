# CardioGuard Web - دليل الاختبار والتوثيق الشامل
# CardioGuard Web - Comprehensive Testing & Documentation Guide

---

## 🌐 نظرة عامة على التطبيق | Application Overview

### العربية
**CardioGuard Web** هو تطبيق ويب للكشف المبكر عن أمراض القلب باستخدام تقنيات التعلم الآلي. يستخدم التطبيق ثلاثة نماذج للذكاء الاصطناعي:
- **نموذج KNN**: دقة 82% - الأفضل للكشف المبكر (Recall 94%)
- **نموذج Naive Bayes**: دقة 82% - أداء متوازن وسريع
- **نموذج Decision Tree**: دقة 70% - سهل التفسير

**التقنيات المستخدمة**: SvelteKit 2.x، TypeScript، Tailwind CSS 4.x، Chart.js، Vite 7.x

### English
**CardioGuard Web** is a web application for early detection of heart disease using machine learning techniques. The application uses three AI models:
- **KNN Model**: 82% accuracy - Best for early detection (94% Recall)
- **Naive Bayes Model**: 82% accuracy - Balanced and fast performance
- **Decision Tree Model**: 70% accuracy - Easy to interpret

**Tech Stack**: SvelteKit 2.x, TypeScript, Tailwind CSS 4.x, Chart.js, Vite 7.x

---

## 🌐 دعم اللغات | Language Support

### نظام اللغات | Language System
التطبيق يدعم لغتين كاملتين مع دعم RTL/LTR:
- **العربية (ar)**: اللغة الافتراضية - دعم RTL كامل
- **الإنجليزية (en)**: اللغة الثانوية - دعم LTR

#### آلية عمل نظام اللغات | Language System Mechanism

**1. ملفات الموارد | Resource Files**
```
src/lib/stores/language.ts          (مخزن اللغة والترجمات)
```

**2. اختيار اللغة | Language Selection**
- اللغة الافتراضية: العربية
- التبديل من Header Component
- يتم حفظ اللغة في Svelte Store
- التبديل الفوري بدون إعادة تحميل

**3. أمثلة الترجمة | Translation Examples**

| المفتاح | العربية | English |
|---------|---------|---------|
| `heroTitle` | الكشف المبكر عن أمراض القلب | Early Detection of Heart Disease |
| `calculatorTitle` | حاسبة مخاطر أمراض القلب | Heart Disease Risk Calculator |
| `lowRisk` | منخفض | Low |
| `moderateRisk` | متوسط | Moderate |
| `highRisk` | مرتفع | High |
| `knnModel` | نموذج KNN | KNN Model |
| `accuracy` | الدقة | Accuracy |
| `precision` | الدقة (Precision) | Precision |
| `recall` | الاستدعاء (Recall) | Recall |

**4. استخدام الترجمات في المكونات | Using Translations**
```svelte
<script lang="ts">
  import { language, translations } from '$lib/stores/language';

  let currentLang: 'ar' | 'en' = 'ar';
  language.subscribe(value => {
    currentLang = value;
  });
  $: t = translations[currentLang];
</script>

<h1>{t.heroTitle}</h1>
<p>{t.calculatorSubtitle}</p>
```

---

## 🎯 كيفية عمل التطبيق | How the Application Works

### 1️⃣ بنية المكونات | Component Architecture

```
+page.svelte (الصفحة الرئيسية)
│
├── Header (الهيدر)
│   ├── Navigation (التنقل)
│   └── Language Switcher (تبديل اللغة)
│
├── Hero (قسم البطل)
│   ├── Title & Subtitle
│   ├── CTA Buttons
│   └── Research Info Card
│
├── RiskCalculator (حاسبة المخاطر)
│   ├── Form (13 حقل طبي)
│   ├── Info Tooltips (توضيحات)
│   ├── Results Display (عرض النتائج)
│   └── Charts (رسوم بيانية)
│
├── About (حول المشروع)
│   ├── Research Team (فريق البحث)
│   └── Methodology (المنهجية)
│
├── ModelComparison (مقارنة النماذج)
│   └── Models Performance (أداء النماذج)
│
└── Footer (التذييل)
    └── Copyright & Links
```

### 2️⃣ إدخال البيانات الطبية | Medical Data Input

#### الحقول المطلوبة (13 حقل) | Required Fields (13 Fields):

| الحقل (عربي) | Field (English) | النطاق | Range | نوع البيانات | Data Type |
|-------------|----------------|--------|-------|-------------|-----------|
| العمر | Age | 1-120 | 1-120 | رقم | Number |
| الجنس | Sex | ذكر/أنثى | Male/Female | اختيار | Select |
| نوع ألم الصدر | Chest Pain Type | 0-3 | 0-3 | اختيار | Select |
| ضغط الدم | Resting BP | 90-200 | 90-200 | رقم | Number |
| الكوليسترول | Cholesterol | 100-600 | 100-600 | رقم | Number |
| سكر الدم الصيامي | Fasting Blood Sugar | نعم/لا | Yes/No | اختيار | Select |
| تخطيط القلب | Resting ECG | 0-2 | 0-2 | اختيار | Select |
| معدل القلب الأقصى | Max Heart Rate | 60-220 | 60-220 | رقم | Number |
| الذبحة الصدرية | Exercise Angina | نعم/لا | Yes/No | اختيار | Select |
| انخفاض ST | Oldpeak | 0.0-6.2 | 0.0-6.2 | رقم عشري | Decimal |
| ميل ST | Slope | 0-2 | 0-2 | اختيار | Select |
| عدد الأوعية | CA | 0-3 | 0-3 | اختيار | Select |
| الثاليوم | Thal | 0-3 | 0-3 | اختيار | Select |

#### خصائص النموذج | Form Features:
- ✅ التحقق التلقائي من المدخلات
- ✅ رسائل خطأ واضحة
- ✅ قيم افتراضية منطقية
- ✅ أيقونات معلومات (ℹ️) لكل حقل
- ✅ توضيحات منبثقة (Tooltips)
- ✅ تنسيق متجاوب (Responsive)

### 3️⃣ معالجة البيانات | Data Processing

**المسار الكامل | Complete Flow:**

```
المستخدم يدخل البيانات الطبية (13 حقل)
User enters medical data (13 fields)
    ↓
التحقق من صحة المدخلات (Client-side)
Input validation (Client-side)
    ↓
تحويل البيانات لـ JSON
Convert data to JSON format
    ↓
إرسال POST request إلى Backend API
Send POST request to Backend API
    ↓
معالجة النماذج الثلاثة (KNN, NB, DT)
Process three models (KNN, NB, DT)
    ↓
حساب Ensemble Result (المتوسط المرجح)
Calculate Ensemble Result (Weighted Average)
    ↓
استلام JSON Response
Receive JSON Response
    ↓
تحديد مستوى المخاطر واللون
Determine risk level and color
    ↓
عرض النتائج بشكل مرئي
Display results visually
    ↓
رسم المخططات البيانية
Draw charts
```

### 4️⃣ عرض النتائج | Results Display

#### مكونات قسم النتائج | Results Section Components:

**أ) بطاقة مستوى المخاطر | Risk Level Card**
```
┌─────────────────────────────────────┐
│       مستوى المخاطر                │
│       Risk Level                    │
├─────────────────────────────────────┤
│                                     │
│          45.23%                     │
│        [  متوسط  ] 🟠              │
│        [ Moderate ]                 │
│                                     │
│   احتمالية الإصابة بمرض القلب       │
│   Probability of heart disease      │
└─────────────────────────────────────┘
```

**الألوان الديناميكية | Dynamic Colors:**
- 🟢 **أخضر (Green)**: 0% - 30% - منخفض (Low)
- 🟠 **برتقالي (Orange)**: 30% - 60% - متوسط (Moderate)
- 🔴 **أحمر (Red)**: 60% - 100% - مرتفع (High)

**ب) مقارنة النماذج | Models Comparison**
```
┌─────────────────────────────────────┐
│  نموذج KNN | KNN Model              │
│  ─────────────────────────          │
│  نسبة الثقة: 66.84%                │
│  Confidence: 66.84%                 │
│  الدقة: 82%                         │
│  Accuracy: 82%                      │
├─────────────────────────────────────┤
│  نموذج Naive Bayes                  │
│  Naive Bayes Model                  │
│  ─────────────────────────          │
│  نسبة الثقة: 48.23%                │
│  Confidence: 48.23%                 │
│  الدقة: 82%                         │
│  Accuracy: 82%                      │
├─────────────────────────────────────┤
│  نموذج Decision Tree                │
│  Decision Tree Model                │
│  ─────────────────────────          │
│  نسبة الثقة: 32.56%                │
│  Confidence: 32.56%                 │
│  الدقة: 70%                         │
│  Accuracy: 70%                      │
└─────────────────────────────────────┘
```

**ج) الرسوم البيانية | Charts**
- **مخطط شريطي (Bar Chart)**: نسب الثقة للنماذج الثلاثة
- **ألوان مميزة**: أزرق (KNN)، أخضر (Naive Bayes)، أرجواني (Decision Tree)

---

## 🧪 حالات الاختبار التفصيلية | Detailed Test Cases

### اختبار 1: مخاطر منخفضة 🟢 | Test 1: Low Risk 🟢

#### بيانات المدخلات | Input Data:
```typescript
{
  age: 30,
  sex: 0,        // Female
  cp: 0,         // Asymptomatic
  trestbps: 110,
  chol: 180,
  fbs: 0,        // No
  restecg: 0,    // Normal
  thalach: 170,
  exang: 0,      // No
  oldpeak: 0.0,
  slope: 0,      // Upsloping
  ca: 0,
  thal: 1        // Normal
}
```

#### النتائج المتوقعة | Expected Results:
```
✅ مستوى المخاطر: منخفض 🟢
✅ Risk Level: Low 🟢
✅ النسبة: 10% - 25%
✅ Percentage: 10% - 25%
✅ اللون: أخضر (#10B981)
✅ Color: Green (#10B981)
✅ النص: "منخفض" (عربي) / "Low" (English)
✅ Background Color: bg-green-100
✅ Text Color: text-green-600
```

#### لقطة شاشة متوقعة | Expected Screenshot:
```
┌──────────────────────────────────┐
│     مستوى المخاطر               │
│     Risk Level                   │
├──────────────────────────────────┤
│        15.23% 🟢                 │
│      [  منخفض  ]                │
│      [   Low    ]                │
│                                  │
│  احتمالية منخفضة للإصابة        │
│  Low probability of disease      │
└──────────────────────────────────┘
```

---

### اختبار 2: مخاطر متوسطة 🟠 | Test 2: Moderate Risk 🟠

#### بيانات المدخلات | Input Data:
```typescript
{
  age: 50,
  sex: 1,        // Male
  cp: 1,         // Typical Angina
  trestbps: 130,
  chol: 240,
  fbs: 0,        // No
  restecg: 0,    // Normal
  thalach: 150,
  exang: 0,      // No
  oldpeak: 1.0,
  slope: 1,      // Flat
  ca: 1,
  thal: 2        // Fixed Defect
}
```

#### النتائج المتوقعة | Expected Results:
```
✅ مستوى المخاطر: متوسط 🟠
✅ Risk Level: Moderate 🟠
✅ النسبة: 35% - 55%
✅ Percentage: 35% - 55%
✅ اللون: برتقالي (#F59E0B)
✅ Color: Orange (#F59E0B)
✅ النص: "متوسط" (عربي) / "Moderate" (English)
✅ Background Color: bg-orange-100
✅ Text Color: text-orange-600
```

#### لقطة شاشة متوقعة | Expected Screenshot:
```
┌──────────────────────────────────┐
│     مستوى المخاطر               │
│     Risk Level                   │
├──────────────────────────────────┤
│        45.67% 🟠                 │
│      [  متوسط  ]                │
│      [ Moderate ]                │
│                                  │
│  احتمالية متوسطة للإصابة        │
│  Moderate probability            │
└──────────────────────────────────┘
```

---

### اختبار 3: مخاطر مرتفعة 🔴 | Test 3: High Risk 🔴

#### بيانات المدخلات | Input Data:
```typescript
{
  age: 65,
  sex: 1,        // Male
  cp: 1,         // Typical Angina
  trestbps: 160,
  chol: 300,
  fbs: 1,        // Yes
  restecg: 2,    // LV Hypertrophy
  thalach: 120,
  exang: 1,      // Yes
  oldpeak: 3.5,
  slope: 2,      // Downsloping
  ca: 3,
  thal: 3        // Reversible Defect
}
```

#### النتائج المتوقعة | Expected Results:
```
✅ مستوى المخاطر: مرتفع 🔴
✅ Risk Level: High 🔴
✅ النسبة: 70% - 95%
✅ Percentage: 70% - 95%
✅ اللون: أحمر (#EF4444)
✅ Color: Red (#EF4444)
✅ النص: "مرتفع" (عربي) / "High" (English)
✅ Background Color: bg-red-100
✅ Text Color: text-red-600
```

#### لقطة شاشة متوقعة | Expected Screenshot:
```
┌──────────────────────────────────┐
│     مستوى المخاطر               │
│     Risk Level                   │
├──────────────────────────────────┤
│        82.34% 🔴                 │
│      [  مرتفع  ]                │
│      [   High   ]                │
│                                  │
│  احتمالية عالية للإصابة         │
│  High probability of disease     │
└──────────────────────────────────┘
```

---

## 📊 أمثلة استجابات API | API Response Examples

### مثال 1: حالة منخفضة الخطورة | Example 1: Low Risk Case

**Request:**
```json
{
  "Age": 30,
  "Sex": 0,
  "CP": 0,
  "TrestBPS": 110,
  "Chol": 180,
  "FBS": 0,
  "RestECG": 0,
  "Thalach": 170,
  "Exang": 0,
  "Oldpeak": 0.0,
  "Slope": 0,
  "CA": 0,
  "Thal": 1
}
```

**Response:**
```json
{
  "ensemble": {
    "riskScore": 0.1237,
    "riskLevel": "low",
    "prediction": false
  },
  "knn": {
    "confidence": 23.45,
    "prediction": false,
    "accuracy": 82,
    "precision": 80,
    "recall": 94,
    "f1Score": 86
  },
  "naiveBayes": {
    "confidence": 18.90,
    "prediction": false,
    "accuracy": 82,
    "precision": 78,
    "recall": 89,
    "f1Score": 83
  },
  "decisionTree": {
    "confidence": 5.67,
    "prediction": false,
    "accuracy": 70,
    "precision": 65,
    "recall": 72,
    "f1Score": 68
  }
}
```

**Display:**
- مستوى المخاطر: **12.37%** 🟢 **منخفض**
- Risk Level: **12.37%** 🟢 **Low**

---

### مثال 2: حالة متوسطة الخطورة | Example 2: Moderate Risk Case

**Response:**
```json
{
  "ensemble": {
    "riskScore": 0.4523,
    "riskLevel": "moderate",
    "prediction": false
  },
  "knn": {
    "confidence": 55.84,
    "prediction": true,
    "accuracy": 82
  },
  "naiveBayes": {
    "confidence": 48.23,
    "prediction": false,
    "accuracy": 82
  },
  "decisionTree": {
    "confidence": 32.56,
    "prediction": false,
    "accuracy": 70
  }
}
```

**Display:**
- مستوى المخاطر: **45.23%** 🟠 **متوسط**
- Risk Level: **45.23%** 🟠 **Moderate**

---

### مثال 3: حالة عالية الخطورة | Example 3: High Risk Case

**Response:**
```json
{
  "ensemble": {
    "riskScore": 0.8567,
    "riskLevel": "high",
    "prediction": true
  },
  "knn": {
    "confidence": 89.12,
    "prediction": true,
    "accuracy": 82
  },
  "naiveBayes": {
    "confidence": 85.45,
    "prediction": true,
    "accuracy": 82
  },
  "decisionTree": {
    "confidence": 78.90,
    "prediction": true,
    "accuracy": 70
  }
}
```

**Display:**
- مستوى المخاطر: **85.67%** 🔴 **مرتفع**
- Risk Level: **85.67%** 🔴 **High**

---

## 🔍 التحقق من صحة العمل | Verification Checklist

### قائمة التحقق الشاملة | Complete Checklist:

#### ✅ الوظائف الأساسية | Basic Functions
- [ ] إدخال البيانات يعمل بشكل صحيح
- [ ] Data input works correctly
- [ ] التحقق من صحة المدخلات يعمل
- [ ] Input validation works
- [ ] الاتصال بالـ API يعمل
- [ ] API connection works
- [ ] استلام النتائج يعمل
- [ ] Results reception works
- [ ] إعادة تعيين النموذج يعمل
- [ ] Form reset works

#### ✅ عرض النتائج | Results Display
- [ ] نسبة المخاطر تُعرض بشكل صحيح (0-100%)
- [ ] Risk percentage displays correctly (0-100%)
- [ ] اللون يتغير حسب مستوى الخطر
- [ ] Color changes based on risk level
  - [ ] 🟢 أخضر للمنخفض (0-30%) | Green for low (0-30%)
  - [ ] 🟠 برتقالي للمتوسط (30-60%) | Orange for moderate (30-60%)
  - [ ] 🔴 أحمر للمرتفع (60-100%) | Red for high (60-100%)
- [ ] النص يُعرض بلغة النظام
- [ ] Text displays in system language
- [ ] مقارنة النماذج تُعرض بشكل صحيح
- [ ] Models comparison displays correctly
- [ ] الرسوم البيانية تعمل
- [ ] Charts work properly

#### ✅ دعم اللغات | Language Support
- [ ] النصوص العربية تظهر بشكل صحيح
- [ ] Arabic text displays correctly
- [ ] النصوص الإنجليزية تظهر بشكل صحيح
- [ ] English text displays correctly
- [ ] اتجاه النص RTL للعربية
- [ ] RTL text direction for Arabic
- [ ] اتجاه النص LTR للإنجليزية
- [ ] LTR text direction for English
- [ ] التبديل بين اللغات يعمل
- [ ] Language switching works
- [ ] أسماء النماذج مترجمة
- [ ] Model names are translated
- [ ] تسميات الرسوم البيانية مترجمة
- [ ] Chart labels are translated

#### ✅ واجهة المستخدم | User Interface
- [ ] التصميم المتجاوب يعمل (Desktop/Tablet/Mobile)
- [ ] Responsive design works (Desktop/Tablet/Mobile)
- [ ] الألوان والأنماط صحيحة
- [ ] Colors and styles are correct
- [ ] الرسوم المتحركة تعمل
- [ ] Animations work
- [ ] الأزرار قابلة للنقر
- [ ] Buttons are clickable
- [ ] التنقل السلس يعمل
- [ ] Smooth scrolling works

#### ✅ الأداء | Performance
- [ ] التطبيق يحمل بسرعة
- [ ] Application loads quickly
- [ ] لا توجد تأخيرات ملحوظة
- [ ] No noticeable delays
- [ ] الرسوم البيانية تظهر فوراً
- [ ] Charts appear instantly

---

## 🛠️ معلومات تقنية | Technical Information

### البنية المعمارية | Architecture

```
┌─────────────────────────────────────────┐
│       Browser (Frontend)                │
│   (SvelteKit + TypeScript + Tailwind)   │
└─────────────────────┬───────────────────┘
                      │
                      ↓
┌─────────────────────────────────────────┐
│          HTTP/HTTPS Request             │
│      (fetch API with JSON payload)      │
└─────────────────────┬───────────────────┘
                      │
                      ↓
┌─────────────────────────────────────────┐
│       Backend API (Flask/Python)        │
│     (Machine Learning Models)           │
└─────────────────────┬───────────────────┘
                      │
                      ↓
┌─────────────────────────────────────────┐
│         ML Models Processing            │
│  (KNN, Naive Bayes, Decision Tree)      │
│      + Ensemble (Weighted Average)      │
└─────────────────────────────────────────┘
```

### ملفات المشروع الرئيسية | Main Project Files

```
frontend/
├── src/
│   ├── routes/
│   │   ├── +layout.svelte              # Layout الرئيسي
│   │   └── +page.svelte                # الصفحة الرئيسية + التكامل
│   ├── lib/
│   │   ├── components/
│   │   │   ├── Header.svelte           # الهيدر + تبديل اللغة
│   │   │   ├── Hero.svelte             # قسم البطل + معلومات البحث
│   │   │   ├── RiskCalculator.svelte   # النموذج + API + النتائج
│   │   │   ├── About.svelte            # معلومات الفريق + المنهجية
│   │   │   ├── ModelComparison.svelte  # مقارنة النماذج
│   │   │   └── Footer.svelte           # التذييل
│   │   ├── stores/
│   │   │   └── language.ts             # مخزن اللغة + الترجمات
│   │   └── index.ts                    # Barrel Export
│   ├── app.html                        # HTML Template
│   └── app.css                         # Global Styles + Tailwind
├── static/
│   ├── robots.txt                      # SEO
│   └── data/
│       └── heart.csv                   # بيانات التدريب (مرجع)
├── svelte.config.js                    # Svelte Configuration
├── vite.config.ts                      # Vite Build Configuration
├── tailwind.config.js                  # Tailwind CSS Configuration
├── tsconfig.json                       # TypeScript Configuration
└── package.json                        # Dependencies
```

---

## 🎨 نظام الألوان والتصميم | Color System & Design

### ألوان المخاطر | Risk Colors

```css
/* منخفض | Low */
--color-low-bg: #DCFCE7;      /* bg-green-100 */
--color-low-text: #16A34A;    /* text-green-600 */
--color-low-border: #22C55E;  /* border-green-500 */

/* متوسط | Moderate */
--color-moderate-bg: #FEF3C7;    /* bg-orange-100 */
--color-moderate-text: #D97706;  /* text-orange-600 */
--color-moderate-border: #F59E0B; /* border-orange-500 */

/* مرتفع | High */
--color-high-bg: #FEE2E2;     /* bg-red-100 */
--color-high-text: #DC2626;   /* text-red-600 */
--color-high-border: #EF4444; /* border-red-500 */
```

### ألوان العلامة التجارية | Brand Colors

```css
/* Primary (أزرق طبي) */
--color-primary: #3B82F6;
--color-primary-dark: #2563EB;
--color-primary-light: #DBEAFE;

/* Secondary (أخضر صحي) */
--color-secondary: #10B981;
--color-secondary-dark: #059669;
--color-secondary-light: #D1FAE5;

/* Accent (برتقالي تحذيري) */
--color-accent: #F59E0B;
```

---

## 📝 ملاحظات مهمة | Important Notes

### العربية

1. **دقة النتائج**: هذا النظام للأغراض البحثية الأكاديمية فقط ولا يحل محل الاستشارة الطبية المتخصصة.

2. **متطلبات الاتصال**: يحتاج التطبيق إلى اتصال بالإنترنت والوصول إلى Backend API.

3. **خصوصية البيانات**: 
   - لا يتم حفظ البيانات الطبية في المتصفح
   - لا يتم استخدام Cookies أو Local Storage
   - البيانات تُرسل مباشرة إلى API ثم تُحذف
   - لا يتم مشاركة البيانات مع أطراف ثالثة

4. **توافق المتصفحات**: 
   - Chrome/Edge: ✅ كامل
   - Firefox: ✅ كامل
   - Safari: ✅ كامل
   - Opera: ✅ كامل
   - IE11: ❌ غير مدعوم

5. **متطلبات الأداء**:
   - اتصال إنترنت سريع مفضل
   - لا يوجد حد أدنى لمواصفات الجهاز
   - يعمل على الهواتف والأجهزة اللوحية

### English

1. **Result Accuracy**: This system is for academic research purposes only and does not replace professional medical consultation.

2. **Connection Requirements**: The application needs internet connection and access to Backend API.

3. **Data Privacy**: 
   - Medical data is not stored in browser
   - No Cookies or Local Storage used
   - Data sent directly to API then deleted
   - No data sharing with third parties

4. **Browser Compatibility**: 
   - Chrome/Edge: ✅ Full
   - Firefox: ✅ Full
   - Safari: ✅ Full
   - Opera: ✅ Full
   - IE11: ❌ Not supported

5. **Performance Requirements**:
   - Fast internet connection preferred
   - No minimum device specifications
   - Works on mobile and tablets

---

## 🎓 معلومات البحث | Research Information

### العربية
**الباحث**: حازم خضر الحاج احميد  
**المشرفون**: 
- د.م. جورج أنور كراز (المشرف الأساسي)
- د. ماجدة البكور (المشرف المشارك)

**الجامعة**: الجامعة الافتراضية السورية  
**الوزارة**: وزارة التعليم العالي - الجمهورية العربية السورية  

**عنوان البحث**: تطوير خوارزميات التنقيب عن البيانات في تحسين عملية تشخيص أمراض القلب

**البريد الإلكتروني**:
- الباحث: Hazem_82763@svuonline.org
- المشرف الأول: T_gkarraz@svuonline.org
- المشرف الثاني: T_mbakour@svuonline.org

### English
**Researcher**: Hazem Khader Al-Haj Ahmid  
**Supervisors**: 
- Dr. George Anwar Karraz (Main Supervisor)
- Dr. Majeda Al-Bakour (Co-Supervisor)

**University**: Syrian Virtual University  
**Ministry**: Ministry of Higher Education - Syrian Arab Republic  

**Research Title**: Develop Data Mining Algorithms to Improve the Diagnosis of Heart Disease

**Email**:
- Researcher: Hazem_82763@svuonline.org
- First Supervisor: T_gkarraz@svuonline.org
- Second Supervisor: T_mbakour@svuonline.org

---

## 📞 الدعم الفني | Technical Support

### للاستفسارات التقنية | For Technical Inquiries:
- **GitHub Issues**: [افتح Issue جديد](https://github.com/HazemAlhajIhmid/Master-Thesis--CardioGuard---Early-Detection-of-Heart-Disease-System/issues)
- **البريد الإلكتروني | Email**: Hazem_82763@svuonline.org

### للإبلاغ عن مشكلة | To Report an Issue:
يرجى إرسال رسالة تحتوي على:
Please send a message containing:
1. وصف المشكلة | Problem description
2. لقطة شاشة | Screenshot
3. نوع المتصفح | Browser type
4. رسالة الخطأ (إن وجدت) | Error message (if any)

---

## 📅 سجل الإصدارات | Version History

### الإصدار 1.0.0 (2026-02-08)
- ✅ إطلاق النسخة الأولى | First release
- ✅ دعم اللغتين العربية والإنجليزية | Arabic and English support
- ✅ ثلاثة نماذج للتعلم الآلي | Three ML models
- ✅ واجهة مستخدم حديثة بـ SvelteKit | Modern UI with SvelteKit
- ✅ نظام ألوان ديناميكي | Dynamic color system
- ✅ رسوم بيانية تفاعلية | Interactive charts
- ✅ تصميم متجاوب كامل | Fully responsive
- ✅ أداء محسّن وتحميل سريع | Optimized performance

---

## 📜 الترخيص | License

© 2026 CardioGuard - جميع الحقوق محفوظة | All Rights Reserved

هذا المشروع للأغراض البحثية الأكاديمية فقط.  
This project is for academic research purposes only.

---

**تاريخ آخر تحديث | Last Updated**: 8 فبراير 2026 | February 8, 2026  
**الإصدار | Version**: 1.0.0  
**الحالة | Status**: ✅ مستقر ومكتمل | Stable & Complete
