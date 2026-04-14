# مهام بناء صفحة خطة منتج نظم 2026 — النسخة المحدّثة

## تعليمات لـ AI Agent (Claude Code — VS Code)

---

## عن المشروع

مشروع React.js يعرض **خطة تطوير منتج "نظم" (Nadhem)** لعام 2026 في صفحة ويب احترافية. "نظم" هو نظام إدارة فعاليات قائم فعلياً ويخدم عملاء حاليين. الخطة تتحدث عن تطوير المنتج الحالي وليس بناء منتج جديد.

**التقنيات الحالية للمنتج:** Laravel (Backend) + Blade & Vue (Frontend)
**الباقات:** 4 باقات سنوية — كل باقة تحتوي على Modules — الباقة الرابعة مخصصة بالكامل
**العملاء الحاليون:** غالبيتهم قطاع غير ربحي (80%) وحكومي (20%)

---

## قواعد حرجة — اقرأها أولاً

1. **لا مصطلحات تقنية بحتة** — الخطة ستُعرض في اجتماع. اكتب بلغة يفهمها أي شخص
2. **كل البيانات من ملفات current-product و خارطة الطريق** — لا تخترع بيانات
3. **لا Emoji نهائياً** — فقط Font Awesome Jelly (`fa-thin`)
4. **لا Lucide React** — احذفها واستخدم Font Awesome Kit Script فقط
5. **الصفحة الأولى فقط Dark Mode** — الباقي Light Mode
6. **Font Awesome Kit:** `<script src="https://kit.fontawesome.com/d64cd9d612.js" crossorigin="anonymous"></script>`
7. **الشعار الأبيض** في Sidebar والصفحة الداكنة — **الملون** في الباقي
8. **كل النصوص بالعربية — RTL**
9. **كل البيانات Hardcoded — لا قواعد بيانات ولا API**

---

## ملفات مرجعية — اقرأها كلها قبل أي كود

```
requirements/
├── ai-task/
│   └── (هذا الملف)
├── current-product/
│   ├── current01.pdf    ← وثيقة توصيف المنتج PDD (الخصائص والفوائد والباقات)
│   ├── current01.txt    ← نسخة نصية
│   ├── current02.pdf    ← عرض تسويقي لمنصة نظم (اللجان والمزايا والتكاملات)
│   ├── current02.txt
│   ├── current03.pdf    ← عرض تسويقي ثاني (مزايا إضافية)
│   └── current03.txt
├── Logos/
│   ├── colored-logo.png
│   └── white-logo.png
└── roadmap-file/
    └── خارطة الطريق - منتج نظم.pdf  ← ⭐ أهم ملف: الوضع الحالي + المستهدفات + المنافسين + التحديات
```

**ترتيب القراءة:**
1. خارطة الطريق (أهم ملف — فيه الأرقام الحقيقية)
2. current01 (وصف المنتج والخصائص)
3. current02 + current03 (المزايا والتكاملات)

---

## نظام الهوية البصرية — تفصيلي

### الألوان الكاملة

```css
:root {
  /* ── ألوان الهوية (من الشعار) ── */
  --color-primary: #2A848A;
  --color-primary-light: rgba(42, 132, 138, 0.1);
  --color-primary-dark: #1E6269;
  --color-secondary: #452059;
  --color-secondary-light: rgba(69, 32, 89, 0.1);
  --color-accent-orange: #BA5A31;
  --color-accent-pink: #A61C61;

  /* ── خلفيات ── */
  --color-bg-main: #F4F6F8;
  --color-bg-card: #FFFFFF;
  --color-bg-card-hover: #FAFBFC;
  --color-sidebar: #1A0B22;

  /* ── نصوص ── */
  --color-text-heading: #1A1120;
  --color-text-body: #4A5568;
  --color-text-muted: #A0AEC0;
  --color-text-on-dark: #FFFFFF;
  --color-text-on-dark-muted: rgba(255, 255, 255, 0.5);

  /* ── حالات ── */
  --color-success: #38A169;
  --color-danger: #E53E3E;
  --color-warning: #D69E2E;
  --color-info: #319795;

  /* ── حدود ── */
  --color-border: #E2E8F0;
  --color-border-light: #EDF2F7;

  /* ── ظلال ── */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 1px 3px rgba(0, 0, 0, 0.08), 0 4px 6px rgba(0, 0, 0, 0.04);
  --shadow-lg: 0 4px 6px rgba(0, 0, 0, 0.07), 0 10px 15px rgba(0, 0, 0, 0.05);

  /* ── زوايا ── */
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;

  /* ── أبعاد ── */
  --sidebar-width: 260px;
  --header-height: 64px;

  /* ── خطوط ── */
  --font-family: 'IBM Plex Sans Arabic', 'Tajawal', sans-serif;
}
```

### الخطوط

```
الخط الرئيسي: IBM Plex Sans Arabic
التثبيت: npm install @fontsource/ibm-plex-sans-arabic
الأوزان: 400 (عادي) | 500 (متوسط) | 600 (عريض) | 700 (أعرض)

أحجام الخطوط:
- العناوين الكبرى:   1.875rem (30px)
- عناوين الأقسام:    1.5rem (24px)
- عناوين فرعية:      1.25rem (20px)
- النص العادي:       1rem (16px)
- النص الصغير:       0.875rem (14px)
- النص الأصغر:       0.75rem (12px)
```

### الفراغات (نظام 4px)

```
4px | 8px | 12px | 16px | 20px | 24px | 32px | 40px | 48px | 64px

padding البطاقات: 24px
الفراغ بين البطاقات: 24px
الفراغ بين الأقسام: 48px
```

---

## الشعارات — قواعد الاستخدام

### الملفات

```
requirements/Logos/white-logo.png      ← شعار أبيض (نظم nadhem + الزهرة)
requirements/Logos/colored-logo.png    ← شعار ملون (نظم بنفسجي + الزهرة ملونة)
```

### أين يُستخدم كل شعار

| المكان | الشعار | السبب |
|--------|--------|-------|
| القائمة الجانبية (Sidebar) | **الأبيض** | الخلفية داكنة `#1A0B22` |
| صفحة الإحصائيات (Dark Hero) | **الأبيض** | الخلفية داكنة |
| Header (إن وجد) | **الملون** | الخلفية فاتحة |
| صفحة الطباعة | **الملون** | خلفية بيضاء |

### حجم الشعار

```css
.sidebar-logo {
  width: 120px;     /* عرض الشعار في القائمة الجانبية */
  height: auto;
  margin-bottom: 16px;
}

.hero-logo {
  width: 160px;     /* عرض الشعار في صفحة الإحصائيات */
  height: auto;
}
```

### طريقة الاستخدام في React

```jsx
// في القائمة الجانبية
<img src="/requirements/Logos/white-logo.png" alt="نظم" className="sidebar-logo" />

// في صفحة الإحصائيات
<img src="/requirements/Logos/white-logo.png" alt="نظم" className="hero-logo" />

// ملاحظة: انسخ الشعارات إلى public/ عند إعداد المشروع
// cp requirements/Logos/*.png public/logos/
```

---

## الأيقونات — Font Awesome Jelly فقط

### القواعد

```
ممنوع منعاً باتاً:
❌ Emoji (🚀 📊 ✨ أي رمز تعبيري)
❌ Lucide React
❌ react-icons
❌ heroicons
❌ أي SVG مخصص أو مولّد
❌ أي مكتبة أيقونات غير Font Awesome

المسموح الوحيد:
✅ Font Awesome عبر Kit Script — نمط fa-thin (Jelly)
```

### التثبيت

**في `index.html` فقط — لا npm install:**

```html
<head>
  <script src="https://kit.fontawesome.com/d64cd9d612.js" crossorigin="anonymous"></script>
</head>
```

### مكون Icon.jsx — أنشئه أولاً

```jsx
// src/components/shared/Icon.jsx
export default function Icon({ name, className = '', size = '', style = {} }) {
  const sizeClass = size ? `fa-${size}` : '';
  return (
    <i
      className={`fa-thin fa-${name} ${sizeClass} ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
}

// الاستخدام:
// <Icon name="calendar-days" />
// <Icon name="chart-pie" size="lg" />
// <Icon name="rocket-launch" size="xl" style={{ color: 'var(--color-primary)' }} />
```

### جدول الأيقونات الكامل — كل أيقونة في المشروع

**القائمة الجانبية:**

| العنصر | أيقونة Font Awesome | الكلاس |
|--------|-------------------|--------|
| الوضع الحالي | gauge-high | `fa-thin fa-gauge-high` |
| اللجان ونسبة الاعتماد | people-group | `fa-thin fa-people-group` |
| المستخدمون وأنواعهم | users | `fa-thin fa-users` |
| الخصائص الأكثر استخداماً | star | `fa-thin fa-star` |
| رضا العملاء | face-smile | `fa-thin fa-face-smile` |
| السوق والمنافسون | chart-bar | `fa-thin fa-chart-bar` |
| التحديات الحالية | triangle-exclamation | `fa-thin fa-triangle-exclamation` |
| التطويرات المطلوبة | rocket-launch | `fa-thin fa-rocket-launch` |
| الوحدات (Modules) | puzzle-piece | `fa-thin fa-puzzle-piece` |
| هيكلة الباقات | credit-card | `fa-thin fa-credit-card` |
| التكاملات | link | `fa-thin fa-link` |
| الجدول الزمني | calendar-days | `fa-thin fa-calendar-days` |
| مقارنة الأنظمة | table-cells | `fa-thin fa-table-cells` |
| معلومات التواصل | phone | `fa-thin fa-phone` |

**اللجان الثمانية:**

| اللجنة | الأيقونة | الكلاس |
|--------|---------|--------|
| التنظيمية | clipboard-list | `fa-thin fa-clipboard-list` |
| العلمية | flask-vial | `fa-thin fa-flask-vial` |
| الرعايات | handshake | `fa-thin fa-handshake` |
| الإعلامية | bullhorn | `fa-thin fa-bullhorn` |
| المعارض | map | `fa-thin fa-map` |
| المالية | file-invoice-dollar | `fa-thin fa-file-invoice-dollar` |
| اللوجستية | truck-fast | `fa-thin fa-truck-fast` |
| الشراكات | link | `fa-thin fa-link` |

**أنواع المستخدمين (12):**

| النوع | الأيقونة | الكلاس |
|-------|---------|--------|
| مدير النظام | user-shield | `fa-thin fa-user-shield` |
| منظم | user-tie | `fa-thin fa-user-tie` |
| موظف (صلاحية لجنة) | user-gear | `fa-thin fa-user-gear` |
| مشارك (عادي + VIP) | user | `fa-thin fa-user` |
| متحدث | microphone | `fa-thin fa-microphone` |
| مقدم ورقة علمية | file-lines | `fa-thin fa-file-lines` |
| مدير جلسة | chalkboard-user | `fa-thin fa-chalkboard-user` |
| مستشار | user-doctor | `fa-thin fa-user-doctor` |
| مقدم برنامج مصاحب | presentation-screen | `fa-thin fa-presentation-screen` |
| إعلامي | camera | `fa-thin fa-camera` |
| صاحب معرض | store | `fa-thin fa-store` |
| راعي | gem | `fa-thin fa-gem` |

**الوحدات (16 Module):**

| الوحدة | الأيقونة | الكلاس |
|--------|---------|--------|
| إدارة تسجيل الحضور والبطاقات | id-card | `fa-thin fa-id-card` |
| الحملات الإعلانية | bullhorn | `fa-thin fa-bullhorn` |
| إدارة الجهات العارضة | store | `fa-thin fa-store` |
| مخطط المساحة | map | `fa-thin fa-map` |
| تعيين نطاق مخصص | globe | `fa-thin fa-globe` |
| إدارة المتحدثين والجلسات | microphone | `fa-thin fa-microphone` |
| إنشاء صفحات إضافية | file-circle-plus | `fa-thin fa-file-circle-plus` |
| إدارة البرامج المصاحبة | calendar-days | `fa-thin fa-calendar-days` |
| إدارة باقات الرعاية والرعاة | handshake | `fa-thin fa-handshake` |
| إدارة الجلسات الاستشارية | user-doctor | `fa-thin fa-user-doctor` |
| إضافة اسم مرسل مخصص | at | `fa-thin fa-at` |
| التحليلات الفورية | chart-mixed | `fa-thin fa-chart-mixed` |
| تطبيق الهواتف الذكية | mobile-screen | `fa-thin fa-mobile-screen` |
| إرسال وإدارة الدعوات | envelope-open-text | `fa-thin fa-envelope-open-text` |
| إدارة النماذج | table-list | `fa-thin fa-table-list` |
| زيادة المساحة | hard-drive | `fa-thin fa-hard-drive` |

**التطويرات (15):**

| التطوير | الأيقونة | الكلاس |
|---------|---------|--------|
| تنفيذ خطة الوحدات | puzzle-piece | `fa-thin fa-puzzle-piece` |
| إعادة هيكلة الخصائص | arrows-rotate | `fa-thin fa-arrows-rotate` |
| تطبيق Design System | palette | `fa-thin fa-palette` |
| التكامل مع النفاذ الوطني | fingerprint | `fa-thin fa-fingerprint` |
| التوقيع الإلكتروني | signature | `fa-thin fa-signature` |
| تطوير خارطة المعرض | map-location-dot | `fa-thin fa-map-location-dot` |
| قوالب جاهزة للأقسام | clone | `fa-thin fa-clone` |
| بناء بالسحب والإفلات | grip-dots-vertical | `fa-thin fa-grip-dots-vertical` |
| الدعوات التفاعلية | envelope-open-text | `fa-thin fa-envelope-open-text` |
| خصومات الفنادق والطيران | hotel | `fa-thin fa-hotel` |
| دمج لجنة الشراكات | merge | `fa-thin fa-merge` |
| تقارير مؤشرات الأداء | chart-line-up | `fa-thin fa-chart-line-up` |
| أجهزة الخدمات الذاتية | print | `fa-thin fa-print` |
| تطبيق هواتف ذكية | mobile-screen | `fa-thin fa-mobile-screen` |
| ربط الذكاء الاصطناعي | robot | `fa-thin fa-robot` |

**التحديات (9):**

| التحدي | الأيقونة | الكلاس |
|--------|---------|--------|
| قلة الموارد | users-slash | `fa-thin fa-users-slash` |
| ضعف الخادم | server | `fa-thin fa-server` |
| ارتفاع الأسعار | money-bill-trend-up | `fa-thin fa-money-bill-trend-up` |
| قلة التقارير | chart-simple | `fa-thin fa-chart-simple` |
| طلبات التخصيص | palette | `fa-thin fa-palette` |
| صعوبة فهم الخصائص | circle-question | `fa-thin fa-circle-question` |
| حضور الدعم الفني | headset | `fa-thin fa-headset` |
| تعدد الفعاليات | layer-group | `fa-thin fa-layer-group` |
| عدم التجديد | rotate-left | `fa-thin fa-rotate-left` |

**التكاملات (4):**

| التكامل | الأيقونة | الكلاس |
|---------|---------|--------|
| البث المباشر (Zoom) | video | `fa-thin fa-video` |
| الرسائل النصية | message | `fa-thin fa-message` |
| الرسائل البريدية | envelope | `fa-thin fa-envelope` |
| الدفع الإلكتروني | credit-card | `fa-thin fa-credit-card` |

**الباقات (4):**

| الباقة | الأيقونة | الكلاس |
|--------|---------|--------|
| أساسية | seedling | `fa-thin fa-seedling` |
| احترافية | gem | `fa-thin fa-gem` |
| أعمال | building | `fa-thin fa-building` |
| مخصصة | crown | `fa-thin fa-crown` |

**حالات عامة:**

| الحالة | الأيقونة | الكلاس |
|--------|---------|--------|
| مكتملة (100%) | circle-check | `fa-thin fa-circle-check` لون `--color-success` |
| متوسطة (40-75%) | circle-half-stroke | `fa-thin fa-circle-half-stroke` لون `--color-warning` |
| غير مفعلة (0%) | circle-xmark | `fa-thin fa-circle-xmark` لون `--color-danger` |
| جديد | sparkles | `fa-thin fa-sparkles` لون `--color-success` |
| أولوية عالية | arrow-up | `fa-thin fa-arrow-up` لون `--color-danger` |
| أولوية متوسطة | minus | `fa-thin fa-minus` لون `--color-warning` |
| أولوية منخفضة | arrow-down | `fa-thin fa-arrow-down` لون `--color-info` |

### CSS للأيقونات

```css
/* ── ألوان الأيقونات حسب السياق ── */
.icon-primary   { color: var(--color-primary); }
.icon-secondary { color: var(--color-secondary); }
.icon-muted     { color: var(--color-text-muted); }
.icon-success   { color: var(--color-success); }
.icon-danger    { color: var(--color-danger); }
.icon-warning   { color: var(--color-warning); }
.icon-info      { color: var(--color-info); }

/* ── أيقونة داخل دائرة ملونة ── */
.icon-circle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: var(--color-primary-light);
}
.icon-circle i { color: var(--color-primary); font-size: 20px; }

/* ── أيقونات القائمة الجانبية ── */
.sidebar .nav-item i {
  color: rgba(255, 255, 255, 0.4);
  width: 24px;
  text-align: center;
  font-size: 16px;
  transition: color 0.2s ease;
}
.sidebar .nav-item.active i { color: var(--color-primary); }
.sidebar .nav-item:hover i { color: rgba(255, 255, 255, 0.7); }

/* ── أيقونات الوضع الداكن (Hero) ── */
.hero-dashboard i.fa-thin { color: rgba(255, 255, 255, 0.6); }
.hero-dashboard .glass-card i.fa-thin { color: var(--color-primary); }
.hero-dashboard .icon-circle { background: rgba(42, 132, 138, 0.15); }

/* ── أحجام الأيقونات ── */
/* fa-xs = 0.75rem  ← داخل Badges */
/* fa-sm = 0.875rem ← داخل الأزرار */
/* (بدون) = 1rem    ← افتراضي */
/* fa-lg = 1.25rem  ← القائمة الجانبية */
/* fa-xl = 1.5rem   ← عناوين الأقسام */
/* fa-2xl = 2rem    ← بطاقات الإحصائيات */

/* ── المسافة بين الأيقونة والنص (RTL) ── */
button i, .nav-item i { margin-left: 8px; }
```

---

## الوضع الداكن (Dark Mode) — القسم الأول فقط

### CSS الصفحة الداكنة

```css
.hero-dashboard {
  background: linear-gradient(135deg, #1A0B22 0%, #0D0514 100%);
  position: relative;
  overflow: hidden;
  padding: 48px 32px;
}

/* Noise خفيف */
.hero-dashboard::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 0;
}

/* تدرج سلس للانتقال من Dark إلى Light */
.hero-dashboard::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 120px;
  background: linear-gradient(to bottom, transparent, var(--color-bg-main));
  pointer-events: none;
  z-index: 1;
}

/* بطاقات زجاجية (Glassmorphism) */
.glass-card {
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 24px;
  position: relative;
  z-index: 2;
  transition: all 0.3s ease;
}

.glass-card:hover {
  background: rgba(255, 255, 255, 0.10);
  border-color: rgba(42, 132, 138, 0.3);
  box-shadow: 0 0 30px rgba(42, 132, 138, 0.08);
}

/* ألوان النصوص في الوضع الداكن */
.hero-dashboard .text-primary { color: #FFFFFF; }
.hero-dashboard .text-secondary { color: rgba(255, 255, 255, 0.7); }
.hero-dashboard .text-muted { color: rgba(255, 255, 255, 0.4); }

/* Glow خفيف */
.glow-teal {
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(42, 132, 138, 0.08) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}
```

### ألوان الرسوم البيانية في الوضع الداكن

```css
/* Recharts في Dark Mode */
.hero-dashboard .recharts-cartesian-grid line { stroke: rgba(255, 255, 255, 0.06); }
.hero-dashboard .recharts-xAxis .recharts-text { fill: rgba(255, 255, 255, 0.4); }
.hero-dashboard .recharts-yAxis .recharts-text { fill: rgba(255, 255, 255, 0.4); }
.hero-dashboard .recharts-tooltip-wrapper { /* Tooltip داكن */ }
```

---

## هيكل الأقسام — القائمة الجانبية

```
┌──────────────────────────────────┐
│  [شعار نظم أبيض]                 │
│  خطة المنتج 2026                 │
├──────────────────────────────────┤
│                                  │
│  الوضع الحالي                    │
│  ── اللجان ─────────────────     │
│  اللجان ونسبة الاعتماد           │
│  المستخدمون وأنواعهم             │
│  الخصائص الأكثر استخداماً         │
│  رضا العملاء                     │
│  السوق والمنافسون                │
│  التحديات الحالية                │
│                                  │
│  ── خطة التطوير ────────────     │
│  التطويرات المطلوبة              │
│  الوحدات (Modules)              │
│  هيكلة الباقات                   │
│  الجدول الزمني                   │
│                                  │
│  ── الملاحق ─────────────────    │
│  مقارنة الأنظمة                  │
│  معلومات التواصل                 │
│                                  │
├──────────────────────────────────┤
│  نظم — 2026                      │
└──────────────────────────────────┘
```

---

## القسم 1: لوحة الإحصائيات — ⭐ أهم قسم في الصفحة

> **هذا القسم هو الوحيد بالوضع الداكن (Dark Mode) في كامل الصفحة.**
> **كل الأقسام بعده تكون بالوضع الفاتح (Light Mode).**
> **هذه أول شاشة يراها المستخدم — يجب أن تكون مبهرة بصرياً.**

### التصميم العام

```
┌─────────────────────────────────────────────────────────────────────────┐
│ ■■■ DARK MODE — خلفية تدرج #1A0B22 → #0D0514 ■■■■■■■■■■■■■■■■■■■■■  │
│                                                                         │
│  ┌─ الشعار الأبيض + العنوان ──────────────────────────────────────────┐ │
│  │  [white-logo.png]                                                  │ │
│  │  خطة تطوير منتج نظم — 2026                                        │ │
│  │  نحو فعاليات ذات أثر استراتيجي                                    │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│  ┌─ 6 بطاقات زجاجية (Glassmorphism) ─────────────────────────────────┐ │
│  │ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐│ │
│  │ │  48%   │ │   8    │ │  12    │ │  16    │ │  95%   │ │  15    ││ │
│  │ │متوسط  │ │ لجان   │ │ نوع   │ │ وحدة  │ │ رضا   │ │تطوير  ││ │
│  │ │الاعتماد│ │تخصصية  │ │مستخدم │ │Module │ │الشمولية│ │مطلوب  ││ │
│  │ └────────┘ └────────┘ └────────┘ └────────┘ └────────┘ └────────┘│ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│  ┌─ مخطط اعتماد اللجان (Bar Chart) ──────────────────────────────────┐ │
│  │  التنظيمية    ████████████████████████████████████████████  100%   │ │
│  │  العلمية      ████████████████████████████████████████████  100%   │ │
│  │  الرعاة       ████████████████████████░░░░░░░░░░░░░░░░░░░   50%   │ │
│  │  الإعلامية    ████████████████████████░░░░░░░░░░░░░░░░░░░   50%   │ │
│  │  المعارض      ██████████████████░░░░░░░░░░░░░░░░░░░░░░░░░   40%   │ │
│  │  المالية      ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░    0%   │ │
│  │  اللوجستية    ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░    0%   │ │
│  │  الشراكات     ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░    0%   │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│  ┌─ صف مخططين ────────────────────────────────────────────────────────┐ │
│  │ ┌── رضا العملاء (Bar) ───────┐  ┌── التمركز القطاعي (Donut) ────┐ │ │
│  │ │ الشمولية         95%       │  │                               │ │ │
│  │ │ سهولة الاستخدام  40%       │  │    80% غير ربحي              │ │ │
│  │ │ التحكم في الهوية 40%       │  │    20% حكومي                 │ │ │
│  │ │ سرعة التصفح      35%       │  │     0% قطاع خاص              │ │ │
│  │ │ السعر            30%       │  │                               │ │ │
│  │ └────────────────────────────┘  └───────────────────────────────┘ │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│  ┌─ مؤشر الجاهزية التشغيلية ─────────────────────────────────────────┐ │
│  │ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ │ │
│  │ │   48%    │ │  2       │ │  3       │ │  3       │ │  52%     │ │ │
│  │ │ متوسط   │ │ لجان    │ │ لجان    │ │ لجان    │ │ فجوة    │ │ │
│  │ │ الاعتماد │ │ مكتملة  │ │ متوسطة  │ │غير مفعلة│ │ التفعيل │ │ │
│  │ └──────────┘ └──────────┘ └──────────┘ └──────────┘ └──────────┘ │ │
│  └────────────────────────────────────────────────────────────────────┘ │
│                                                                         │
│ ▓▓▓ تدرج سلس من الداكن إلى الفاتح (gradient fade) ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │
│                                                                         │
│ ■■■ END DARK MODE ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■  │
└─────────────────────────────────────────────────────────────────────────┘
│
│  ← هنا يبدأ الوضع الفاتح (Light Mode) — خلفية #F4F6F8
│
▼ القسم 2: اللجان ونسبة الاعتماد (Light Mode)
```

### مواصفات تنفيذية

**الخلفية:**
- تدرج: `linear-gradient(135deg, #1A0B22, #0D0514)`
- Noise Texture خفيف (opacity 0.03) — CSS موجود في قسم الهوية أعلاه
- Glow خفيف بلون `#2A848A` في الزوايا

**البطاقات الزجاجية (6 بطاقات الأرقام + 5 بطاقات الجاهزية):**
- خلفية: `rgba(255, 255, 255, 0.06)`
- `backdrop-filter: blur(12px)`
- حدود: `1px solid rgba(255, 255, 255, 0.08)`
- زوايا: `16px`
- عند Hover: خلفية أفتح + توهج `#2A848A`

**الأرقام في البطاقات:**
- الرقم: أبيض، خط `2.5rem`، عريض (700)
- الوصف: `rgba(255, 255, 255, 0.5)`، خط `0.875rem`
- الأيقونة: `fa-thin fa-2xl` بلون `#2A848A` داخل `icon-circle` بخلفية `rgba(42,132,138,0.15)`
- **Count-up Animation:** الأرقام تبدأ من 0 وتصعد للقيمة النهائية عند ظهور البطاقة

**الشعار:**
- `white-logo.png` بعرض `160px`
- فوق العنوان مباشرة

**الرسوم البيانية:**
- خطوط الشبكة: `rgba(255, 255, 255, 0.06)`
- أرقام المحاور: `rgba(255, 255, 255, 0.4)`
- الأشرطة: ألوان المراحل من `--color-primary` إلى `--color-danger`
- خلفية الرسم: شفافة (transparent) لتندمج مع الداكن

**الانتقال من Dark إلى Light:**
- في آخر القسم الداكن: `linear-gradient(to bottom, transparent, #F4F6F8)` بارتفاع `120px`
- لا يوجد خط فاصل حاد — التدرج يجعل الانتقال سلس

**بيانات البطاقات الست:**

| الأيقونة (fa-thin) | الرقم | الوصف | مصدر البيانات |
|-------------------|-------|-------|--------------|
| gauge-high | 48% | متوسط الاعتماد العام | خارطة الطريق ص5 |
| people-group | 8 | لجان تخصصية | خارطة الطريق ص4 |
| users | 12 | نوع مستخدم | خارطة الطريق ص6 |
| puzzle-piece | 16 | وحدة (Module) | خارطة الطريق ص21 |
| face-smile | 95% | رضا الشمولية | خارطة الطريق ص9 |
| rocket-launch | 15 | تطوير مطلوب | خارطة الطريق ص18 |

**بيانات مؤشر الجاهزية (5 بطاقات):**

| الرقم | الوصف | اللون |
|-------|-------|-------|
| 48% | متوسط الاعتماد العام | `--color-warning` |
| 2 | لجان مكتملة (90%+) | `--color-success` |
| 3 | لجان متوسطة (50-75%) | `--color-warning` |
| 3 | لجان غير مفعلة (0%) | `--color-danger` |
| 52% | فجوة التفعيل | `--color-danger` |

---

## القسم 2: اللجان ونسبة الاعتماد (Light Mode)

**بطاقة لكل لجنة (8 بطاقات) — كل بطاقة تحتوي:**

```
┌──────────────────────────────────────┐
│  [أيقونة fa-thin]   اللجنة التنظيمية │
│                                      │
│  إدارة المسجلين والحضور وإصدار       │
│  البطاقات                             │
│                                      │
│  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  100%         │
│  نسبة الاعتماد                       │
│                                      │
│  الحالة: ● مكتملة                     │
└──────────────────────────────────────┘
```

**اللجان الثمانية:**

| اللجنة | الوصف | النسبة | الحالة | الأيقونة |
|--------|-------|--------|--------|---------|
| التنظيمية | إدارة المسجلين والحضور وإصدار البطاقات | 100% | مكتملة | clipboard-list |
| العلمية | إدارة الجلسات والاستشارات والأوراق العلمية | 100% | مكتملة | flask-vial |
| الرعايات | إدارة باقات الرعاية والرعاة والشركاء | 50% | متوسطة | handshake |
| الإعلامية | إدارة الحملات الإعلانية والأخبار وتغطية الحدث | 50% | متوسطة | bullhorn |
| المعارض | إدارة الجهات العارضة والمساحات وخريطة المعرض | 40% | متوسطة | map |
| المالية | إدارة الفواتير والمدفوعات وأكواد الخصم | 0% | غير مفعلة | file-invoice-dollar |
| اللوجستية | إدارة التنسيقات العامة وخدمات VIP | 0% | غير مفعلة | truck-fast |
| الشراكات | لجنة جديدة — ستُدمج مع الإعلامية | 0% | جديدة | link |

---

## القسم 3: المستخدمون وأنواعهم

**12 نوع مستخدم — بطاقات صغيرة في Grid:**

| النوع | الحالة | الأيقونة |
|-------|--------|---------|
| مدير النظام | موجود | user-shield |
| منظم | موجود | user-tie |
| موظف (صلاحية لجنة) | موجود | user-gear |
| مشارك (عادي + VIP) | موجود | user |
| متحدث | موجود | microphone |
| مقدم ورقة علمية | **جديد** | file-lines |
| مدير جلسة | **جديد** | chalkboard-user |
| مستشار | موجود | user-doctor |
| مقدم برنامج مصاحب | موجود | presentation-screen |
| إعلامي | **جديد** | camera |
| صاحب معرض | موجود | store |
| راعي | موجود | gem |

**الأنواع الجديدة تظهر بـ Badge "جديد" بلون `--color-success`**

---

## القسم 4: الخصائص الأكثر استخداماً

**قائمة من 10 خصائص — كل خاصية بطاقة صغيرة:**

1. إدارة تسجيل الحضور
2. توليد البطاقات والتحضير
3. إرسال الإشعارات الإعلانية
4. إدارة المتحدثين والجلسات
5. إدارة البرامج المصاحبة ومقدمين البرامج
6. إدارة باقات الرعاية والرعاة
7. إدارة الجلسات الاستشارية والمستشارين
8. إدارة جدول الفعالية
9. إدارة محتوى الصفحات الداخلية
10. إدارة الهوية البصرية

---

## القسم 5: رضا العملاء

### مخططان جنباً لجنب:

**يسار — Radar Chart (Nivo):** نسب الرضا الخمسة

**يمين — قائمة عوامل الرضا:**
- حجم العميل
- كثرة خصائص النظام
- محدودية التعامل مع خصائص النظام
- قلة موارد الخادم
- التحكم الشامل في محتوى الواجهة الرئيسية

---

## القسم 6: السوق والمنافسون

### مقارنة الأنظمة — جدول تفاعلي كبير

**الأعمدة:** نظم | WOTN | Eventech | عزام | Zoho Backstage
**الصفوف (10 خصائص):**

| الخاصية | نظم | WOTN | Eventech | عزام | Zoho |
|---------|-----|------|----------|------|------|
| إدارة تسجيل الحضور | ✓ | ✓ | ✓ | ✓ | ✓ |
| توليد البطاقات والتحضير | ✓ | ✓ | ✓ | ✓ | ✓ |
| إرسال الإشعارات الإعلانية | ✓ | ✗ | ✗ | ✓ | ✓ |
| إدارة المتحدثين والجلسات | ✓ | ✓ | ✗ | ✗ | ✓ |
| إدارة البرامج المصاحبة | ✓ | ✓ | ✓ | ✗ | ✗ |
| إدارة باقات الرعاية | ✓ | ✓ | ✓ | ✗ | ✗ |
| إدارة الجلسات الاستشارية | ✓ | ✗ | ✗ | ✗ | ✗ |
| إدارة جدول الفعالية | ✓ | ✓ | ✓ | ✓ | ✓ |
| إدارة محتوى الصفحات | ✓ | ✓ | ✓ | ✓ | ✓ |
| إدارة الهوية البصرية | ✓ | ✓ | ✓ | ✗ | ✓ |

**الرموز:** ✓ = `fa-solid fa-circle-check` أخضر | ✗ = `fa-solid fa-circle-xmark` أحمر | - = `fa-thin fa-minus` رمادي (صيتك لم تُقارن لعدم توفر بيانات)

### تصنيف المنافسين حسب حجم الفعالية

3 بطاقات:
- **الفعاليات الكبرى:** Sela، Tahaluf
- **المتوسطة:** WOTN، Eventech
- **الصغيرة:** صيتك، عزام، صاري، Zoho Backstage

### بيانات سوق الفعاليات 2025

جدول بأهم الفعاليات حسب الحجم (من خارطة الطريق ص12-13)

---

## القسم 7: التحديات الحالية

**بطاقات التحديات — كل تحدي في بطاقة منفصلة بأيقونة:**

| التحدي | الأيقونة |
|--------|---------|
| قلة الموارد (مصمم، محلل، مسوق) | users-slash |
| ضعف خصائص الخادم | server |
| ارتفاع الأسعار للعملاء (الفعاليات الصغيرة والصغرى) | money-bill-trend-up |
| قلة التقارير | chart-simple |
| طلبات التخصيص على التصميم أو على الوظائف | palette |
| صعوبة فهم العميل للتعامل مع بعض الخصائص | circle-question |
| متطلب حضور الدعم الفني أثناء الفعالية | headset |
| الطلب المتكرر لخاصية تعدد الفعاليات (غير مدعومة حالياً) | layer-group |
| عدم رغبة العميل في تجديد الاشتراك | rotate-left |

---

## القسم 8: التطويرات المطلوبة — ⭐ القسم الأهم

> هذا القسم يعرض كل التطويرات المخططة من خارطة الطريق. كل تطوير يُعرض كبطاقة مع وصف واضح وبسيط.

### تصنيف التطويرات

**3 تبويبات (Tabs):**

#### التبويب 1: تطويرات البنية والنظام (5 عناصر)

| # | التطوير | الوصف البسيط | الأولوية |
|---|---------|-------------|---------|
| 1 | تنفيذ خطة الوحدات (Modules) | تحويل خصائص النظام إلى وحدات منفصلة يمكن تفعيلها أو تعطيلها حسب الباقة | عالية |
| 2 | إعادة هيكلة الخصائص لكل لجنة | تنظيم الخصائص بحيث كل لجنة تجد أدواتها في مكانها الصحيح | عالية |
| 3 | تطبيق التصميم الموحد (Design System) | توحيد شكل ومظهر كل صفحات النظام | متوسطة |
| 4 | التكامل مع النفاذ الوطني | تسجيل دخول آمن عبر النفاذ الوطني السعودي | متوسطة |
| 5 | تمكين التوقيع الإلكتروني | إمكانية توقيع المستندات والعقود إلكترونياً | متوسطة |

#### التبويب 2: تطويرات الخصائص والمزايا (6 عناصر)

| # | التطوير | الوصف البسيط | الأولوية |
|---|---------|-------------|---------|
| 6 | تطوير خارطة المعرض | تحسين الخريطة التفاعلية لحجز المساحات | عالية |
| 7 | قوالب جاهزة للأقسام | قوالب مصممة مسبقاً (مثل قسم المتحدثين) بدلاً من البناء من الصفر | متوسطة |
| 8 | بناء الأقسام بالسحب والإفلات | تمكين العميل من ترتيب صفحته بنفسه بدون مساعدة تقنية | عالية |
| 9 | تطوير إرسال الدعوات التفاعلية | الدعوة تصل ويقدر المدعو يوافق أو يرفض مباشرة | متوسطة |
| 10 | إضافة خصومات الفنادق والطيران | قسم في اللجنة اللوجستية يعرض عروض الفنادق والطيران وأكواد الخصم | منخفضة |
| 11 | دمج لجنة الشراكات مع الإعلامية | توحيد اللجنتين في لجنة واحدة "الشراكات والإعلام" | متوسطة |

#### التبويب 3: تطويرات تقنية ومستقبلية (4 عناصر)

| # | التطوير | الوصف البسيط | الأولوية |
|---|---------|-------------|---------|
| 12 | تقارير مؤشرات الأداء | تقارير لحظية وتقرير ختامي لكل فعالية | عالية |
| 13 | التكامل مع أجهزة الخدمات الذاتية | ربط النظام بأجهزة طباعة بطاقات الحضور | متوسطة |
| 14 | تطبيق هواتف ذكية | تحويل منصة العميل إلى تطبيق جوال | عالية |
| 15 | ربط الذكاء الاصطناعي | AI يقترح جدول الفعالية + قاعدة معرفة لمساعدة المستخدم | منخفضة |

### تصميم بطاقة التطوير

```
┌──────────────────────────────────────────────────┐
│  [أيقونة]  تطوير خارطة المعرض            عالية  │
│  ──────────────────────────────────────────       │
│                                                  │
│  تحسين الخريطة التفاعلية لحجز المساحات           │
│  في المعرض المصاحب، مع إمكانية استعراض           │
│  المساحات المتاحة وإتمام الحجز والدفع مباشرة     │
│                                                  │
│  اللجنة المرتبطة: لجنة المعارض                    │
│  الحالة الحالية: موجودة (40% اعتماد)              │
│  المطلوب: تطوير وتحسين                           │
└──────────────────────────────────────────────────┘
```

---

## القسم 9: الوحدات (Modules)

### عرض الوحدات الـ 16 كبطاقات Grid

| # | الوحدة | الأيقونة | ملاحظة |
|---|--------|---------|--------|
| 1 | إدارة تسجيل الحضور والبطاقات | id-card | أساسية |
| 2 | الحملات الإعلانية | bullhorn | — |
| 3 | إدارة الجهات العارضة | store | — |
| 4 | مخطط المساحة (خريطة المعرض) | map | — |
| 5 | تعيين نطاق مخصص | globe | — |
| 6 | إدارة المتحدثين والجلسات | microphone | — |
| 7 | إنشاء صفحات إضافية | file-plus | — |
| 8 | إدارة البرامج المصاحبة | calendar-days | — |
| 9 | إدارة باقات الرعاية والرعاة | handshake | — |
| 10 | إدارة الجلسات الاستشارية والمستشارين | user-doctor | — |
| 11 | إضافة اسم مرسل مخصص | at | — |
| 12 | التحليلات الفورية | chart-mixed | — |
| 13 | تطبيق الهواتف الذكية | mobile-screen | مستقبلي |
| 14 | إرسال وإدارة الدعوات | envelope-open-text | — |
| 15 | إدارة النماذج | table-list | — |
| 16 | زيادة المساحة (تخزين) | hard-drive | — |

### ملاحظة مهمة تُعرض أسفل الوحدات

> الوحدات ليست من اختيار العميل — بل تأتي ضمن باقات جاهزة. كل باقة تحتوي على مجموعة وحدات. إذا أراد العميل كل الوحدات فهذه باقة مخصصة.
>
> الوحدات تُفعّل في المكان المناسب داخل كل لجنة. مثال: وحدة "إرسال الدعوات" تظهر في قسم اللجنة التنظيمية. بعض الوحدات لا ترتبط بلجنة محددة.

---

## القسم 10: هيكلة الباقات

### 4 بطاقات باقات متصاعدة

```
┌─────────┐   ┌─────────┐   ┌─────────┐   ┌──────────────┐
│ الباقة 1 │   │ الباقة 2 │   │ الباقة 3 │   │  الباقة 4    │
│  أساسية  │   │ احترافية │   │  أعمال   │   │  مخصصة ★     │
│          │   │          │   │          │   │              │
│ وحدات    │   │ وحدات    │   │ وحدات    │   │ جميع         │
│ أساسية   │   │ أكثر     │   │ متقدمة   │   │ الوحدات +     │
│          │   │          │   │          │   │ تخصيص إضافي  │
│          │   │          │   │          │   │              │
│ سنوي     │   │ سنوي     │   │ سنوي     │   │ سنوي (مخصص)  │
└─────────┘   └─────────┘   └─────────┘   └──────────────┘
```

**الباقة 4 تظهر بتصميم مميز** — حدود ذهبية/بنفسجية + شارة "مخصصة" + نص "تتطلب تواصل مباشر"

### مصفوفة الوحدات × الباقات

جدول يوضح أي وحدة في أي باقة (الرموز: ● مضمّنة | ○ غير مضمّنة | ★ مخصص)

---

## القسم 11: التكاملات الحالية

**4 بطاقات تكامل:**

| التكامل | الوصف | الأيقونة |
|---------|-------|---------|
| البث المباشر (Zoom) | بث الفعاليات الافتراضية | video |
| الرسائل النصية (SMS) | إرسال إشعارات وتنبيهات | message |
| الرسائل البريدية (Email) | حملات بريدية وإشعارات | envelope |
| الدفع الإلكتروني (Visa/mada/Apple Pay) | تحصيل المدفوعات | credit-card |

---

## القسم 12: الجدول الزمني (مبسط)

**Timeline عمودي بسيط — ليس Gantt معقد:**

```
الربع الأول 2026
├─ إعادة هيكلة الخصائص لكل لجنة
├─ تنفيذ خطة الوحدات (Modules)
└─ تطبيق التصميم الموحد

الربع الثاني 2026
├─ تطوير خارطة المعرض
├─ تطوير الدعوات التفاعلية
├─ قوالب جاهزة للأقسام
└─ دمج لجنة الشراكات مع الإعلامية

الربع الثالث 2026
├─ بناء الأقسام بالسحب والإفلات
├─ التكامل مع النفاذ الوطني
├─ التوقيع الإلكتروني
└─ تقارير مؤشرات الأداء

الربع الرابع 2026
├─ التكامل مع أجهزة الخدمات الذاتية
├─ تطبيق الهواتف الذكية
├─ خصومات الفنادق والطيران
└─ ربط الذكاء الاصطناعي
```

---

## القسم 13: معلومات التواصل

```
الاتصال المباشر: 0112000292 تحويلة 205
البريد الإلكتروني: care@tts.sa
تذاكر الدعم الفني: من داخل المنتج
واتساب الأعمال: +966112000292
```

---

## الرسوم البيانية المطلوبة

| الرسم | المكتبة | الموقع |
|-------|---------|--------|
| نسبة اعتماد اللجان (Horizontal Bar) | Recharts | قسم 1 + قسم 2 |
| رضا العملاء (Bar Chart) | Recharts | قسم 1 + قسم 5 |
| التمركز القطاعي (Donut) | Nivo | قسم 1 |
| رادار رضا العملاء | Nivo | قسم 5 |
| مقارنة الأنظمة (جدول تفاعلي) | مخصص | قسم 6 |
| الجدول الزمني (Timeline عمودي) | مخصص CSS | قسم 12 |

---

## ملاحظات تنفيذية

### تثبيت المشروع

```bash
npm create vite@latest nadhem-v2-plan -- --template react
cd nadhem-v2-plan
npm install

# المكتبات المطلوبة
npm install recharts                          # رسوم بيانية أساسية
npm install @nivo/core @nivo/pie @nivo/radar @nivo/bar  # رسوم احترافية
npm install framer-motion                     # حركات وانتقالات
npm install @fontsource/ibm-plex-sans-arabic  # الخط العربي

# لا تثبّت lucide-react أو أي مكتبة أيقونات — Font Awesome عبر Kit Script فقط
```

### هيكل المجلدات

```
src/
├── main.jsx
├── App.jsx
├── index.css                          # كل CSS Variables + Global Styles
│
├── data/                              # كل البيانات الثابتة (Hardcoded)
│   ├── committeesData.js              # اللجان ونسب الاعتماد
│   ├── usersData.js                   # أنواع المستخدمين
│   ├── featuresData.js                # الخصائص الأكثر استخداماً
│   ├── satisfactionData.js            # رضا العملاء
│   ├── competitorsData.js             # المنافسون والمقارنة
│   ├── challengesData.js              # التحديات
│   ├── developmentsData.js            # التطويرات المطلوبة (15)
│   ├── modulesData.js                 # الوحدات (16 Module)
│   ├── packagesData.js                # الباقات الأربع
│   ├── integrationsData.js            # التكاملات
│   ├── timelineData.js                # الجدول الزمني
│   ├── statsData.js                   # أرقام الصفحة الأولى
│   └── navigationData.js              # عناصر القائمة الجانبية
│
├── components/
│   ├── layout/
│   │   ├── Sidebar.jsx                # القائمة الجانبية
│   │   ├── MainLayout.jsx             # التخطيط الرئيسي (Sidebar + Content)
│   │   └── ScrollToTop.jsx            # زر العودة لأعلى
│   │
│   ├── shared/
│   │   ├── Icon.jsx                   # مكون Font Awesome (fa-thin)
│   │   ├── SectionHeader.jsx          # عنوان كل قسم
│   │   ├── Card.jsx                   # بطاقة عامة
│   │   ├── StatCard.jsx               # بطاقة رقم إحصائي
│   │   ├── GlassCard.jsx              # بطاقة زجاجية (Dark Mode)
│   │   ├── Badge.jsx                  # شارة حالة (مكتملة/متوسطة/جديد)
│   │   ├── ProgressBar.jsx            # شريط تقدم
│   │   └── Tabs.jsx                   # تبويبات
│   │
│   ├── charts/
│   │   ├── chartTheme.js              # ألوان الرسوم البيانية
│   │   ├── CommitteeBar.jsx           # مخطط اعتماد اللجان
│   │   ├── SatisfactionBar.jsx        # مخطط رضا العملاء
│   │   ├── SectorDonut.jsx            # مخطط التمركز القطاعي
│   │   └── SatisfactionRadar.jsx      # رادار الرضا
│   │
│   └── sections/
│       ├── S01_HeroDashboard.jsx      # ⭐ الإحصائيات (Dark Mode)
│       ├── S02_Committees.jsx         # اللجان ونسبة الاعتماد
│       ├── S03_UserTypes.jsx          # المستخدمون وأنواعهم
│       ├── S04_TopFeatures.jsx        # الخصائص الأكثر استخداماً
│       ├── S05_Satisfaction.jsx       # رضا العملاء
│       ├── S06_Market.jsx             # السوق والمنافسون
│       ├── S07_Challenges.jsx         # التحديات الحالية
│       ├── S08_Developments.jsx       # التطويرات المطلوبة
│       ├── S09_Modules.jsx            # الوحدات (Modules)
│       ├── S10_Packages.jsx           # هيكلة الباقات
│       ├── S11_Integrations.jsx       # التكاملات
│       ├── S12_Timeline.jsx           # الجدول الزمني
│       └── S13_Contact.jsx            # معلومات التواصل
│
└── assets/
    └── logos/                         # انسخ الشعارات من requirements/Logos/
        ├── white-logo.png
        └── colored-logo.png
```

### ألوان الرسوم البيانية (chartTheme.js)

```javascript
export const chartColors = {
  palette: ['#2A848A', '#452059', '#BA5A31', '#A61C61', '#319795', '#38A169', '#D69E2E', '#E53E3E'],
  committees: {
    'التنظيمية': '#2A848A',
    'العلمية': '#452059',
    'الرعايات': '#BA5A31',
    'الإعلامية': '#A61C61',
    'المعارض': '#319795',
    'المالية': '#E53E3E',
    'اللوجستية': '#D69E2E',
    'الشراكات': '#38A169',
  },
  satisfaction: {
    high: '#38A169',    // 80%+
    medium: '#D69E2E',  // 40-79%
    low: '#E53E3E',     // <40%
  },
  sectors: {
    'غير ربحي': '#2A848A',
    'حكومي': '#452059',
    'قطاع خاص': '#A0AEC0',
  },
  background: 'transparent',
  gridColor: '#EDF2F7',
  darkGridColor: 'rgba(255,255,255,0.06)',
};
```

### سلوك القائمة الجانبية (Sidebar)

```
العرض: 260px (Desktop) | مخفية كـ Drawer (أقل من 1024px)
الخلفية: #1A0B22
ثابتة (position: fixed) — لا تتحرك مع التمرير
ارتفاع: 100vh مع overflow-y: auto وscrollbar رفيع

السلوك:
- النقر على عنصر → تمرير سلس (smooth scroll) للقسم
- العنصر النشط → شريط جانبي أيسر بلون #2A848A + خلفية rgba(42,132,138,0.08)
- تتبع القسم المرئي (IntersectionObserver) → تحديث العنصر النشط
- على الجوال: زر hamburger يفتح القائمة كـ Drawer مع overlay
```

### التصميم المتجاوب (Responsive)

```
Desktop:  ≥ 1280px  — Sidebar 260px + محتوى كامل
Laptop:   1024-1279 — Sidebar 220px
Tablet:   768-1023  — Sidebar مخفية (Drawer) + Grid عمودين
Mobile:   < 768     — عمود واحد + جداول تمرير أفقي
```

### الحركات (Framer Motion)

```jsx
// دخول البطاقات
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
};

// تتابع العناصر
const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
};

// Count-up للأرقام في البطاقات (Dark Hero)
// الرقم يبدأ من 0 ويصعد للقيمة النهائية خلال 1.5 ثانية
// يبدأ فقط عندما يكون العنصر مرئياً (whileInView)
```

### زر العودة لأعلى (ScrollToTop)

```
يظهر عند التمرير أكثر من 500px
دائرة بلون #2A848A
أيقونة: fa-thin fa-circle-arrow-up
في الزاوية السفلية اليسارية (RTL)
```

### أساسيات CSS العامة (index.css)

```css
@import '@fontsource/ibm-plex-sans-arabic/400.css';
@import '@fontsource/ibm-plex-sans-arabic/500.css';
@import '@fontsource/ibm-plex-sans-arabic/600.css';
@import '@fontsource/ibm-plex-sans-arabic/700.css';

/* CSS Variables — الموجودة في قسم الهوية أعلاه */

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html {
  direction: rtl;
  scroll-behavior: smooth;
  scroll-padding-top: 80px;
}

body {
  font-family: var(--font-family);
  color: var(--color-text-body);
  background: var(--color-bg-main);
  line-height: 1.7;
}

/* Scrollbar */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--color-text-muted); border-radius: 9999px; }

/* Selection */
::selection { background: var(--color-primary); color: white; }

/* Print */
@media print {
  .sidebar, .scroll-to-top { display: none !important; }
  .main-content { margin: 0 !important; padding: 20px !important; }
  .card { box-shadow: none !important; border: 1px solid #ddd !important; break-inside: avoid; }
}
```

### تأكيدات نهائية

1. **المشروع:** React + Vite
2. **صفحة واحدة طويلة** مع Scroll Navigation — لا React Router
3. **الحجم:** ~13 قسم
4. **كل البيانات من الملفات المرفقة** — لا تخترع شيء
5. **اختبر بعد كل 3-4 ملفات** — `npm run dev`
6. **كل ملف أقل من 300 سطر**
7. **لا تكرر الكود** — استخدم مكونات مشتركة

---

## ابدأ الآن

1. اقرأ ملفات current-product و خارطة الطريق
2. ابنِ الأساسيات (Vite + Layout + Sidebar)
3. ابنِ صفحة الإحصائيات الداكنة
4. ابنِ باقي الأقسام واحداً تلو الآخر
5. اختبر بعد كل قسم
