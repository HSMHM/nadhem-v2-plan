# مهمة: تقسيم الخطة إلى 3 تبويبات رئيسية (تطوير، تشغيل، تسويق)

## السياق
المشروع: `nadhem-execution-plan/` في مستودع https://github.com/HSMHM/nadhem-v2-plan
الصفحة الحالية تعرض خطة التطوير فقط. المطلوب إعادة هيكلة الصفحة بالكامل لتحتوي على 3 تبويبات رئيسية، كل تبويبة تغير المحتوى كاملاً بما فيها عناصر القائمة الجانبية (Sidebar).

## الهيكل الجديد

### التبويبات الثلاثة (أعلى الصفحة — فوق كل شيء بما فيها الإحصائيات)

| # | التبويبة | الأيقونة | اللون |
|---|---------|----------|-------|
| 1 | خطة التطوير | `fa-thin fa-code` | `#2A848A` |
| 2 | خطة التشغيل | `fa-thin fa-gears` | `#BA5A31` |
| 3 | خطة التسويق | `fa-thin fa-bullhorn` | `#A61C61` |

### سلوك التبويبات
- التبويبات تظهر كشريط ثابت (sticky) أعلى المحتوى الرئيسي (main)، مباشرة بعد بداية الـ main وقبل أي section
- عند الضغط على تبويبة يتغير: محتوى الـ main كاملاً + عناصر الـ sidebar كاملاً
- التبويبة النشطة لها خط سفلي ملون + لون مختلف
- عند التبديل يتم scroll للأعلى تلقائياً
- التبويبة الافتراضية: خطة التطوير

---

## التغييرات المعمارية المطلوبة

### 1. إنشاء مكوّن التبويبات: `src/components/PlanTabs.jsx`

تبويبات أفقية ثابتة أعلى الـ main. تصميمها:
- خلفية بيضاء مع ظل خفيف من الأسفل
- 3 تبويبات متساوية العرض
- التبويبة النشطة: لون النص يتغير + خط سفلي ملون 3px
- التبويبة غير النشطة: لون رمادي
- أيقونة fa-thin بجانب النص
- sticky مع `top: 0` و `z-index: 90`
- responsive: على الموبايل النصوص أصغر

### 2. تعديل `src/components/Sidebar.jsx`
- الـ Sidebar يستقبل prop اسمه `plan` (قيمته: `dev` أو `ops` أو `marketing`)
- عناصر التنقل (navItems) تتغير بالكامل حسب الـ plan النشط
- تصدير 3 مصفوفات: `devNavItems`, `opsNavItems`, `marketingNavItems`

### 3. تعديل `src/App.jsx`
- إضافة state للتبويبة النشطة: `const [plan, setPlan] = useState('dev')`
- عرض `PlanTabs` فوق المحتوى
- عرض المحتوى المناسب حسب الـ plan
- الـ IntersectionObserver يقرأ navItems المناسبة حسب الـ plan
- عند تغيير الـ plan يتم `window.scrollTo({ top: 0 })`

### 4. إنشاء مكوّنات خطة التشغيل (ملفات جديدة)
كل الملفات في `src/components/sections/ops/`:
- `OpsDashboardSection.jsx`
- `SubscriptionsSection.jsx`
- `CustomerFeedbackSection.jsx`
- `CompetitorIntelSection.jsx`
- `BestPracticesSection.jsx`
- `FieldResearchSection.jsx`
- `CustomerSuccessSection.jsx`
- `OpsReportsSection.jsx`
- `OpsCalendarSection.jsx`
- `OpsChartsSection.jsx`

ملف البيانات: `src/data/operations.js`

### 5. خطة التسويق (placeholder)
مكوّن واحد مؤقت: `src/components/sections/marketing/MarketingPlaceholder.jsx`
يعرض رسالة "قريباً — خطة التسويق قيد الإعداد" مع أيقونة.

---

## CSS الجديد المطلوب (يُضاف في نهاية `src/index.css`)

```css
/* Plan Tabs */
.plan-tabs-bar{position:sticky;top:0;z-index:90;background:var(--card);border-bottom:1px solid var(--border);display:flex;padding:0 32px}
.plan-tab{flex:1;display:flex;align-items:center;justify-content:center;gap:8px;padding:14px 16px;border:none;background:transparent;cursor:pointer;font-family:var(--font);font-size:0.88rem;font-weight:500;color:var(--text-muted);border-bottom:3px solid transparent;transition:all .2s}
.plan-tab:hover{color:var(--text-dark);background:var(--card-hover)}
.plan-tab.active{font-weight:600;border-bottom-color:var(--primary);color:var(--primary)}
.plan-tab.active[data-plan="ops"]{border-bottom-color:var(--accent-orange);color:var(--accent-orange)}
.plan-tab.active[data-plan="marketing"]{border-bottom-color:var(--accent-pink);color:var(--accent-pink)}
.plan-tab i{font-size:16px}

@media(max-width:767px){
  .plan-tabs-bar{padding:0 8px}
  .plan-tab{font-size:0.78rem;padding:12px 8px;gap:6px}
}
```

---

## تبويبة "خطة التطوير" (dev)

### عناصر الـ Sidebar (لا تتغير — نفس الموجود)
```js
export const devNavItems = [
  { id: 'dashboard', label: 'لوحة الإحصائيات', icon: 'chart-mixed' },
  { id: 'developments', label: 'التطويرات المطلوبة', icon: 'rocket-launch' },
  { id: 'modules', label: 'الوحدات (Modules)', icon: 'cubes' },
  { id: 'packages', label: 'هيكلة الباقات', icon: 'box-taped' },
  { id: 'integrations', label: 'التكاملات', icon: 'plug' },
  { id: 'timeline-simple', label: 'الجدول الزمني المبسط', icon: 'calendar-lines' },
  { id: 'timeline-detailed', label: 'الجدول الزمني المفصل', icon: 'list-timeline' },
  { id: 'design-system', label: 'التصميم الموحد', icon: 'palette' },
  { id: 'charts', label: 'الرسوم البيانية', icon: 'chart-pie' },
  { id: 'roadmap', label: 'الاجتماع الأخير — خارطة الطريق', icon: 'map' },
];
```

### المحتوى (لا يتغير — نفس المكوّنات الموجودة)

---

## تبويبة "خطة التشغيل" (ops)

### عناصر الـ Sidebar
```js
export const opsNavItems = [
  { id: 'ops-dashboard', label: 'لوحة المؤشرات التشغيلية', icon: 'gauge-high' },
  { id: 'ops-subscriptions', label: 'متابعة الاشتراكات', icon: 'file-contract' },
  { id: 'ops-feedback', label: 'تقييم العملاء والأثر', icon: 'star-half-stroke' },
  { id: 'ops-competitors', label: 'دراسة المنافسين', icon: 'binoculars' },
  { id: 'ops-practices', label: 'أفضل الممارسات', icon: 'lightbulb' },
  { id: 'ops-field', label: 'الحضور الميداني', icon: 'person-walking' },
  { id: 'ops-success', label: 'متابعة نجاح العملاء', icon: 'heart-pulse' },
  { id: 'ops-reports', label: 'التقارير الدورية', icon: 'file-chart-column' },
  { id: 'ops-calendar', label: 'الجدول التشغيلي', icon: 'calendar-check' },
  { id: 'ops-charts', label: 'الرسوم البيانية', icon: 'chart-pie' },
];
```

---

### ملف البيانات: `src/data/operations.js`

```js
// ═══════════════════════════════════════════════
// بيانات خطة التشغيل — منتج نظم 2026
// ═══════════════════════════════════════════════

// ─── لوحة المؤشرات التشغيلية ───
export const opsStats = [
  { icon: 'file-contract', value: 18, label: 'اشتراك نشط', color: '#2A848A' },
  { icon: 'server', value: 24, label: 'منصة مولَّدة (Tenant)', color: '#452059' },
  { icon: 'calendar-star', value: 43, label: 'فعالية مُدارة (2025)', color: '#BA5A31' },
  { icon: 'arrow-rotate-right', value: 67, label: 'معدل التجديد %', color: '#10B981', suffix: '%' },
  { icon: 'arrow-trend-down', value: 33, label: 'معدل الفقد (Churn) %', color: '#EF4444', suffix: '%' },
  { icon: 'star', value: 3.4, label: 'تقييم العملاء (من 5)', color: '#F59E0B', suffix: '/5' },
  { icon: 'ticket', value: 12, label: 'تذكرة دعم مفتوحة', color: '#A61C61' },
  { icon: 'list-check', value: 87, label: 'مهمة تشغيلية دورية', color: '#2A848A' },
  { icon: 'clock', value: 4.2, label: 'متوسط وقت الاستجابة (ساعة)', color: '#BA5A31', suffix: 'س' },
];

// ─── متابعة الاشتراكات ───
export const subscriptionsData = {
  summary: {
    active: 18,
    expiringSoon: 4,
    expired: 6,
    total: 24,
  },
  byPackage: [
    { package: 'أساسية (Starter)', count: 8, color: 'var(--text-muted)' },
    { package: 'متقدمة (Professional)', count: 6, color: 'var(--primary)' },
    { package: 'شاملة (Enterprise)', count: 3, color: 'var(--secondary)' },
    { package: 'مخصصة (Custom)', count: 1, color: 'var(--accent-orange)' },
  ],
  bySector: [
    { sector: 'غير ربحي', count: 14, pct: 78 },
    { sector: 'حكومي', count: 4, pct: 22 },
  ],
  tasks: [
    { id: '1.1', task: 'مراجعة حالة جميع الاشتراكات', frequency: 'أسبوعي', day: 'كل أحد', duration: '30 دقيقة' },
    { id: '1.2', task: 'التواصل مع العملاء قبل انتهاء الاشتراك بـ 60 يوماً', frequency: 'عند الحاجة', day: '—', duration: '15 دقيقة/عميل' },
    { id: '1.3', task: 'التواصل مع العملاء قبل انتهاء الاشتراك بـ 30 يوماً (تذكير ثانٍ)', frequency: 'عند الحاجة', day: '—', duration: '15 دقيقة/عميل' },
    { id: '1.4', task: 'تحليل أسباب عدم التجديد لكل عميل متراجع — توثيق السبب', frequency: 'عند التراجع', day: '—', duration: '20 دقيقة/عميل' },
    { id: '1.5', task: 'إعداد تقرير الاشتراكات الشهري (نشط/منتهي/جديد/متراجع)', frequency: 'شهري', day: 'أول أحد من الشهر', duration: '1 ساعة' },
    { id: '1.6', task: 'مراجعة وتحديث بيانات العملاء والتواصل معهم', frequency: 'ربع سنوي', day: 'أول أسبوع من الربع', duration: '3 ساعات' },
    { id: '1.7', task: 'تقييم توزيع العملاء على الباقات واقتراح ترقيات', frequency: 'ربع سنوي', day: '—', duration: '2 ساعة' },
    { id: '1.8', task: 'مراجعة أسعار الباقات ومقارنتها بالقيمة المقدمة والسوق', frequency: 'نصف سنوي', day: '—', duration: '3 ساعات' },
  ],
};

// ─── تقييم العملاء والأثر ───
export const feedbackData = {
  nps: {
    score: 32,
    promoters: 40,
    passives: 35,
    detractors: 25,
  },
  csat: 3.4,
  requestTypes: [
    { type: 'طلب خاصية جديدة', count: 23, color: 'var(--primary)' },
    { type: 'تحسين خاصية موجودة', count: 18, color: 'var(--accent-orange)' },
    { type: 'بلاغ خلل تقني', count: 14, color: 'var(--danger)' },
    { type: 'استفسار عن الاستخدام', count: 31, color: 'var(--text-muted)' },
  ],
  topRequests: [
    'تعدد الفعاليات في حساب واحد',
    'تحسين سرعة التصفح والأداء',
    'مرونة أكبر في تخصيص الواجهة',
    'تقارير تفصيلية ومتقدمة',
    'تطبيق هواتف ذكية',
    'خاصية التوقيع الإلكتروني',
    'ربط مع النفاذ الوطني',
    'قوالب جاهزة للأقسام',
  ],
  tasks: [
    { id: '2.1', task: 'إرسال استبيان رضا بعد انتهاء كل فعالية (خلال 48 ساعة)', frequency: 'بعد كل فعالية', day: '—', duration: '10 دقائق' },
    { id: '2.2', task: 'جمع وتصنيف ملاحظات العملاء من جميع القنوات (بريد، تذاكر، واتساب)', frequency: 'أسبوعي', day: 'كل ثلاثاء', duration: '45 دقيقة' },
    { id: '2.3', task: 'حساب وتحديث مؤشر NPS من الاستبيانات', frequency: 'شهري', day: 'آخر أسبوع', duration: '30 دقيقة' },
    { id: '2.4', task: 'تحليل طلبات الخصائص الجديدة وتحديد الأولويات مع فريق التطوير', frequency: 'شهري', day: 'ثاني أسبوع', duration: '2 ساعة' },
    { id: '2.5', task: 'إعداد تقرير أثر الفعاليات — عدد المشاركين وجودة التنظيم', frequency: 'ربع سنوي', day: '—', duration: '3 ساعات' },
    { id: '2.6', task: 'عقد لقاءات مباشرة (مكالمة أو حضوري) مع أكبر 5 عملاء', frequency: 'ربع سنوي', day: '—', duration: '30 دقيقة/عميل' },
    { id: '2.7', task: 'تحليل أسباب التقييمات المنخفضة ووضع خطة تحسين', frequency: 'شهري', day: '—', duration: '1 ساعة' },
  ],
};

// ─── دراسة المنافسين ───
export const competitorIntelData = {
  competitors: [
    { name: 'WOTN', type: 'محلي', segment: 'متوسطة', strengths: 'سرعة التنفيذ، دعم فني سريع', weaknesses: 'لا يدعم الجلسات الاستشارية، محدودية التخصيص', url: 'wotn.sa', lastReview: 'يناير 2026' },
    { name: 'Eventech', type: 'محلي', segment: 'متوسطة', strengths: 'واجهة حديثة، تكامل مع أنظمة حكومية', weaknesses: 'لا يدعم الإشعارات الإعلانية، سعر مرتفع', url: 'eventech.sa', lastReview: 'يناير 2026' },
    { name: 'صيتك', type: 'محلي', segment: 'صغيرة', strengths: 'سعر منخفض، سهولة الاستخدام', weaknesses: 'محدودية الخصائص، لا يدعم لجان متعددة', url: 'seetk.sa', lastReview: 'ديسمبر 2025' },
    { name: 'عزام', type: 'محلي', segment: 'صغيرة', strengths: 'دعم عربي كامل، باقات مرنة', weaknesses: 'لا يدعم الرعايات، لا يدعم الهوية البصرية المخصصة', url: 'azzam.sa', lastReview: 'ديسمبر 2025' },
    { name: 'Zoho Backstage', type: 'عالمي', segment: 'صغيرة/متوسطة', strengths: 'تكامل مع نظام Zoho البيئي، سعر تنافسي', weaknesses: 'ضعف الدعم العربي، لا يدعم الاستشارات ولا الرعايات', url: 'zoho.com/backstage', lastReview: 'نوفمبر 2025' },
    { name: 'Cvent', type: 'عالمي', segment: 'كبيرة', strengths: 'شامل جداً، قاعدة عملاء ضخمة', weaknesses: 'سعر مرتفع جداً، لا يناسب السوق السعودي الصغير', url: 'cvent.com', lastReview: 'نوفمبر 2025' },
  ],
  tasks: [
    { id: '3.1', task: 'مراقبة مواقع المنافسين الـ 6 — رصد أي تغييرات أو إطلاقات جديدة', frequency: 'أسبوعي', day: 'كل اثنين', duration: '45 دقيقة' },
    { id: '3.2', task: 'تحديث جدول المقارنة الشامل بين نظم والمنافسين (10 خصائص)', frequency: 'ربع سنوي', day: 'أول أسبوع', duration: '4 ساعات' },
    { id: '3.3', task: 'تحليل أسعار المنافسين ومقارنتها بأسعار باقات نظم', frequency: 'ربع سنوي', day: '—', duration: '2 ساعة' },
    { id: '3.4', task: 'تجربة منصة منافس واحد (حساب تجريبي) وتوثيق التجربة بالتفصيل', frequency: 'شهري', day: '—', duration: '3 ساعات' },
    { id: '3.5', task: 'متابعة حسابات المنافسين على وسائل التواصل ورصد محتواهم', frequency: 'أسبوعي', day: 'كل أربعاء', duration: '20 دقيقة' },
    { id: '3.6', task: 'إعداد تقرير المنافسة الشامل — نقاط القوة/الضعف/الفرص/التهديدات', frequency: 'ربع سنوي', day: '—', duration: '5 ساعات' },
  ],
};

// ─── أفضل الممارسات والاتجاهات ───
export const bestPracticesData = {
  categories: [
    {
      title: 'اتجاهات صناعة الفعاليات',
      icon: 'compass',
      items: [
        'الفعاليات الهجينة (حضوري + افتراضي) أصبحت المعيار وليست استثناءً',
        'تخصيص تجربة الحاضر باستخدام الذكاء الاصطناعي (توصيات جلسات، شبكات علاقات)',
        'تطبيقات الهواتف أصبحت ضرورة وليست رفاهية — 78% من الحضور يفضلون التطبيق',
        'التسجيل بدون كلمة مرور (Passwordless) عبر رابط سحري أو رمز OTP',
        'التحضير الذاتي عبر أجهزة Kiosk يقلل وقت الانتظار بنسبة 60%',
        'تقارير ما بعد الفعالية أصبحت مطلباً من الرعاة لقياس العائد على الاستثمار',
      ],
    },
    {
      title: 'تقنيات ناشئة في إدارة الفعاليات',
      icon: 'microchip',
      items: [
        'الذكاء الاصطناعي لتوليد المحتوى (ملخصات الجلسات، ترجمة فورية)',
        'تقنية التعرف على الوجه للتحضير بدلاً من QR Code',
        'الواقع المعزز (AR) لخرائط المعارض التفاعلية',
        'Networking بالذكاء الاصطناعي — مطابقة الحضور بناءً على الاهتمامات',
        'بث مباشر متعدد القنوات مع تفاعل لحظي (أسئلة، استطلاعات)',
        'تحليل المشاعر (Sentiment Analysis) من تقييمات الحضور',
      ],
    },
    {
      title: 'منصات عالمية يجب دراستها',
      icon: 'globe',
      items: [
        'Cvent — الأشمل عالمياً في إدارة الفعاليات المؤسسية',
        'Bizzabo — تجربة مستخدم ممتازة وتحليلات متقدمة',
        'Hopin — رائد الفعاليات الافتراضية والهجينة',
        'Eventbrite — الأبسط للفعاليات الصغيرة والمتوسطة',
        'Whova — تطبيق فعاليات مع networking ذكي',
        'Swoogo — مرونة عالية في التخصيص وبناء الصفحات',
      ],
    },
  ],
  tasks: [
    { id: '4.1', task: 'قراءة 3-5 مقالات أسبوعياً عن صناعة الفعاليات من مصادر موثوقة (Event Manager Blog, BizBash, PCMA)', frequency: 'أسبوعي', day: 'كل أحد وأربعاء', duration: '30 دقيقة' },
    { id: '4.2', task: 'حضور ويبينار واحد على الأقل عن صناعة الفعاليات أو إدارة المنتجات', frequency: 'كل أسبوعين', day: '—', duration: '1 ساعة' },
    { id: '4.3', task: 'دراسة تحديثات منصة عالمية واحدة وتوثيق الأفكار القابلة للتطبيق', frequency: 'شهري', day: '—', duration: '2 ساعة' },
    { id: '4.4', task: 'إعداد تقرير اتجاهات الصناعة — ما الجديد وما المناسب لنظم', frequency: 'ربع سنوي', day: '—', duration: '4 ساعات' },
    { id: '4.5', task: 'مشاركة 3 أفكار مع فريق التطوير من دراسة الممارسات', frequency: 'شهري', day: '—', duration: '30 دقيقة' },
  ],
};

// ─── الحضور الميداني ───
export const fieldResearchData = {
  plan2026: [
    { month: 'يناير', event: 'ملتقى القطاع غير الربحي', provider: 'صيتك', type: 'حضوري', goal: 'تقييم تجربة التسجيل والتحضير والبطاقات' },
    { month: 'فبراير', event: 'مؤتمر التقنية المالية', provider: 'WOTN', type: 'حضوري', goal: 'تقييم خريطة المعرض وتجربة الرعاة' },
    { month: 'مارس', event: 'ملتقى الصحة الرقمية', provider: 'Eventech', type: 'حضوري', goal: 'تقييم الجلسات العلمية والاستشارات' },
    { month: 'أبريل', event: 'قمة ريادة الأعمال', provider: 'عزام', type: 'حضوري', goal: 'تقييم البرامج المصاحبة والتفاعل' },
    { month: 'مايو', event: 'معرض البناء والتشييد', provider: 'WOTN', type: 'حضوري', goal: 'تقييم تجربة العارضين وحجز المساحات' },
    { month: 'يونيو', event: 'مؤتمر افتراضي — التعليم', provider: 'Zoho Backstage', type: 'افتراضي', goal: 'تقييم تجربة البث والتفاعل الافتراضي' },
    { month: 'يوليو', event: 'ملتقى الموارد البشرية', provider: 'صيتك', type: 'حضوري', goal: 'تقييم التقارير والإحصائيات المتاحة' },
    { month: 'أغسطس', event: 'مؤتمر التقنيات الناشئة', provider: 'Eventech', type: 'حضوري', goal: 'تقييم تطبيق الهواتف والإشعارات' },
    { month: 'سبتمبر', event: 'ملتقى التطوع', provider: 'عزام', type: 'حضوري', goal: 'تقييم سهولة الاستخدام للمنظمين الصغار' },
    { month: 'أكتوبر', event: 'معرض الأغذية', provider: 'WOTN', type: 'حضوري', goal: 'مقارنة شاملة مع نظم' },
    { month: 'نوفمبر', event: 'مؤتمر الابتكار', provider: 'Eventech', type: 'هجين', goal: 'تقييم التجربة الهجينة' },
    { month: 'ديسمبر', event: 'ملتقى نهاية العام', provider: 'متعدد', type: 'حضوري', goal: 'مراجعة سنوية شاملة للتجارب' },
  ],
  evaluationCriteria: [
    'سهولة التسجيل (عدد الخطوات، وضوح النموذج)',
    'جودة البطاقات وسرعة التحضير',
    'تجربة التنقل في الموقع (اللافتات، التوجيه)',
    'جودة تطبيق الهواتف (إن وُجد)',
    'تفاعلية الجلسات (أسئلة، استطلاعات)',
    'وضوح خريطة المعرض وسهولة الحجز',
    'جودة التواصل مع المنظم (إشعارات، تحديثات)',
    'تجربة ما بعد الفعالية (شهادات، تقارير، استبيانات)',
  ],
  tasks: [
    { id: '5.1', task: 'حضور فعالية واحدة على الأقل عبر مزود خدمة آخر', frequency: 'شهري', day: 'حسب جدول الفعاليات', duration: '4-8 ساعات' },
    { id: '5.2', task: 'ملء نموذج تقييم التجربة الميدانية (8 معايير) بعد كل حضور', frequency: 'بعد كل حضور', day: 'خلال 24 ساعة', duration: '30 دقيقة' },
    { id: '5.3', task: 'توثيق الملاحظات بالصور ولقطات الشاشة', frequency: 'أثناء الحضور', day: '—', duration: 'مستمر' },
    { id: '5.4', task: 'مشاركة أبرز 3 ملاحظات مع فريق التطوير بعد كل حضور', frequency: 'بعد كل حضور', day: 'خلال 48 ساعة', duration: '15 دقيقة' },
    { id: '5.5', task: 'إعداد تقرير الحضور الميداني الربع سنوي (أبرز الملاحظات والفرص)', frequency: 'ربع سنوي', day: '—', duration: '3 ساعات' },
  ],
};

// ─── متابعة نجاح العملاء ───
export const customerSuccessData = {
  healthScores: [
    { client: 'جمعية البر الخيرية', score: 92, status: 'healthy', package: 'شاملة', lastEvent: 'ديسمبر 2025', eventsCount: 5 },
    { client: 'هيئة تطوير المدينة', score: 85, status: 'healthy', package: 'مخصصة', lastEvent: 'نوفمبر 2025', eventsCount: 3 },
    { client: 'جمعية إنسان', score: 78, status: 'healthy', package: 'متقدمة', lastEvent: 'أكتوبر 2025', eventsCount: 4 },
    { client: 'الجمعية السعودية للتوحد', score: 65, status: 'attention', package: 'متقدمة', lastEvent: 'سبتمبر 2025', eventsCount: 2 },
    { client: 'مركز الملك سلمان', score: 60, status: 'attention', package: 'أساسية', lastEvent: 'أغسطس 2025', eventsCount: 1 },
    { client: 'جمعية تكاتف', score: 45, status: 'risk', package: 'أساسية', lastEvent: 'يوليو 2025', eventsCount: 1 },
  ],
  healthMetrics: [
    'تكرار استخدام المنصة (عدد الدخول الشهرية)',
    'عدد الفعاليات المُقامة',
    'نسبة استخدام الخصائص المتاحة في الباقة',
    'عدد تذاكر الدعم (أقل = أفضل بعد فترة التعلم)',
    'تقييم الرضا في آخر استبيان',
    'التفاعل مع التحديثات والأخبار',
  ],
  tasks: [
    { id: '6.1', task: 'حساب وتحديث Health Score لكل عميل (6 معايير)', frequency: 'شهري', day: 'أول اثنين', duration: '2 ساعة' },
    { id: '6.2', task: 'اجتماع مع فريق نجاح العملاء لمراجعة العملاء المعرضين للخطر', frequency: 'أسبوعي', day: 'كل أربعاء', duration: '30 دقيقة' },
    { id: '6.3', task: 'التواصل الاستباقي مع العملاء ذوي الـ Health Score المنخفض (أقل من 50)', frequency: 'عند الحاجة', day: '—', duration: '20 دقيقة/عميل' },
    { id: '6.4', task: 'إعداد خطة احتفاظ مخصصة لكل عميل معرض للتراجع', frequency: 'عند الحاجة', day: '—', duration: '1 ساعة/عميل' },
    { id: '6.5', task: 'متابعة تطبيق خطة الاحتفاظ مع الفريق', frequency: 'أسبوعي', day: '—', duration: '15 دقيقة' },
    { id: '6.6', task: 'تقديم تدريب مجاني للعملاء الذين يعانون من صعوبة الاستخدام', frequency: 'عند الحاجة', day: '—', duration: '1 ساعة/عميل' },
  ],
};

// ─── التقارير الدورية ───
export const reportsData = [
  {
    title: 'التقرير الأسبوعي',
    icon: 'calendar-week',
    frequency: 'كل أحد',
    color: 'var(--primary)',
    contents: [
      'ملخص الاشتراكات (جديد/منتهي/قيد التجديد)',
      'تذاكر الدعم المفتوحة والمغلقة',
      'الفعاليات القادمة هذا الأسبوع',
      'أبرز ملاحظات العملاء',
      'مهام الأسبوع القادم',
    ],
  },
  {
    title: 'التقرير الشهري',
    icon: 'calendar-days',
    frequency: 'أول أحد من كل شهر',
    color: 'var(--accent-orange)',
    contents: [
      'مؤشرات الأداء الرئيسية (KPIs) — الاشتراكات، التجديد، الفقد',
      'تحليل رضا العملاء (NPS + CSAT)',
      'ملخص تقييمات العملاء وأبرز الطلبات',
      'تحديث المنافسة — أي تغييرات عند المنافسين',
      'ملخص الحضور الميداني (إن وُجد)',
      'Health Score لأهم العملاء',
      'التوصيات والإجراءات المقترحة',
    ],
  },
  {
    title: 'التقرير الربع سنوي',
    icon: 'calendar-lines',
    frequency: 'أول أسبوع من كل ربع',
    color: 'var(--secondary)',
    contents: [
      'مراجعة شاملة لمؤشرات الأداء مع مقارنة بالربع السابق',
      'تقرير المنافسة الشامل (SWOT)',
      'تقرير اتجاهات الصناعة',
      'تقرير الحضور الميداني (3 فعاليات على الأقل)',
      'مراجعة أسعار الباقات',
      'تقييم أداء فريق نجاح العملاء',
      'خطة الربع القادم',
    ],
  },
  {
    title: 'التقرير السنوي',
    icon: 'calendar-star',
    frequency: 'يناير من كل سنة',
    color: 'var(--accent-pink)',
    contents: [
      'ملخص العام — الإنجازات والتحديات',
      'نمو الاشتراكات والإيرادات',
      'تطور رضا العملاء على مدار العام',
      'ملخص التطويرات المُنفذة',
      'دراسة السوق والمنافسة السنوية',
      'خطة العام القادم — أهداف ومبادرات',
    ],
  },
];

// ─── الجدول التشغيلي ───
export const opsCalendar = {
  daily: [
    { task: 'مراجعة تذاكر الدعم الفني الجديدة والرد العاجل', time: '8:30 صباحاً', duration: '30 دقيقة' },
    { task: 'مراجعة حالة الفعاليات النشطة (إن وُجدت) والتأكد من سلامة المنصات', time: '9:00 صباحاً', duration: '15 دقيقة' },
    { task: 'متابعة رسائل العملاء عبر البريد والواتساب', time: 'متكرر', duration: '15 دقيقة' },
  ],
  weekly: [
    { task: 'مراجعة حالة الاشتراكات', day: 'الأحد', duration: '30 دقيقة' },
    { task: 'مراقبة مواقع المنافسين', day: 'الاثنين', duration: '45 دقيقة' },
    { task: 'جمع وتصنيف ملاحظات العملاء', day: 'الثلاثاء', duration: '45 دقيقة' },
    { task: 'اجتماع نجاح العملاء', day: 'الأربعاء', duration: '30 دقيقة' },
    { task: 'قراءة مقالات الصناعة ومتابعة المنافسين على التواصل', day: 'الأحد + الأربعاء', duration: '30 دقيقة' },
    { task: 'إعداد التقرير الأسبوعي', day: 'الخميس', duration: '1 ساعة' },
  ],
  monthly: [
    { task: 'إعداد التقرير الشهري', week: 'الأسبوع الأول' },
    { task: 'حساب NPS وتحديث مؤشرات الرضا', week: 'الأسبوع الأخير' },
    { task: 'تحليل طلبات الخصائص مع فريق التطوير', week: 'الأسبوع الثاني' },
    { task: 'تجربة منصة منافس واحد', week: 'الأسبوع الثالث' },
    { task: 'حضور فعالية ميدانية', week: 'حسب الجدول' },
    { task: 'تحديث Health Score للعملاء', week: 'الأسبوع الأول' },
    { task: 'حضور ويبينار صناعي', week: 'كل أسبوعين' },
  ],
  quarterly: [
    'إعداد التقرير الربع سنوي الشامل',
    'تحديث جدول مقارنة المنافسين',
    'تحليل أسعار السوق ومراجعة الباقات',
    'تقرير اتجاهات الصناعة',
    'لقاءات مباشرة مع أكبر 5 عملاء',
    'تقرير الحضور الميداني',
    'مراجعة وتحديث بيانات العملاء',
  ],
};

// ─── إحصائيات الفعاليات ───
export const eventsStats = {
  bySize: [
    { size: 'صغيرة جداً (أقل من 500)', count: 18, pct: 42 },
    { size: 'صغيرة (500 – 2,000)', count: 14, pct: 33 },
    { size: 'متوسطة (2,000 – 5,000)', count: 8, pct: 19 },
    { size: 'كبيرة (أكثر من 5,000)', count: 3, pct: 7 },
  ],
  byType: [
    { type: 'مؤتمر', count: 15, icon: 'podium' },
    { type: 'ملتقى', count: 12, icon: 'users' },
    { type: 'منتدى', count: 8, icon: 'messages' },
    { type: 'معرض', count: 5, icon: 'store' },
    { type: 'ورشة تدريبية', count: 3, icon: 'chalkboard' },
  ],
  totalParticipants: 47500,
  avgPerEvent: 1105,
  largestEvent: 4200,
};

// ─── ملخص المهام التشغيلية ───
export const opsTasksSummary = {
  total: 87,
  byFrequency: [
    { frequency: 'يومي', count: 3, color: 'var(--danger)' },
    { frequency: 'أسبوعي', count: 12, color: 'var(--accent-orange)' },
    { frequency: 'شهري', count: 14, color: 'var(--primary)' },
    { frequency: 'ربع سنوي', count: 11, color: 'var(--secondary)' },
    { frequency: 'حسب الحاجة', count: 9, color: 'var(--text-muted)' },
  ],
  byCategory: [
    { category: 'الاشتراكات', count: 8, icon: 'file-contract' },
    { category: 'تقييم العملاء', count: 7, icon: 'star-half-stroke' },
    { category: 'المنافسين', count: 6, icon: 'binoculars' },
    { category: 'أفضل الممارسات', count: 5, icon: 'lightbulb' },
    { category: 'الحضور الميداني', count: 5, icon: 'person-walking' },
    { category: 'نجاح العملاء', count: 6, icon: 'heart-pulse' },
    { category: 'التقارير', count: 4, icon: 'file-chart-column' },
    { category: 'مهام يومية/روتينية', count: 3, icon: 'clock' },
  ],
  weeklyHours: 18,
  monthlyHours: 32,
};
```

---

### مكوّنات خطة التشغيل

كل مكوّن يتبع نفس أنماط التصميم الموجودة في خطة التطوير (نفس الكلاسات: `section`, `card`, `grid`, `g2`, `g3`, `g4`, `ic`, `badge`, `tbl`, `prog`, `hero`, `glass`).

**ملاحظة مهمة:** المكوّنات يُستورد فيها `SectionHeader` من `../common/SectionHeader` (بدون /ops/) و `StatCard` من `../common/StatCard`.

#### `src/components/sections/ops/OpsDashboardSection.jsx`
- نفس تصميم `DashboardSection.jsx` الحالي (Dark Mode + Glassmorphism)
- العنوان: "خطة التشغيل — منتج نظم 2026"
- العنوان الفرعي: "دور مدير المنتج في التشغيل والمتابعة والتحسين المستمر"
- يستخدم `opsStats` من ملف البيانات
- يعرض 9 بطاقات إحصائية
- 3 رسوم بيانية:
  1. Donut: توزيع المهام حسب التكرار (يومي/أسبوعي/شهري/ربع سنوي/حسب الحاجة) — من `opsTasksSummary.byFrequency`
  2. Bar: توزيع المهام حسب الفئة (8 فئات) — من `opsTasksSummary.byCategory`
  3. Donut: توزيع الفعاليات حسب الحجم — من `eventsStats.bySize`

#### `src/components/sections/ops/SubscriptionsSection.jsx`
- `id="ops-subscriptions"`
- يعرض 4 بطاقات ملخص (نشط/ينتهي قريباً/منتهي/إجمالي) من `subscriptionsData.summary`
- رسم بياني: توزيع العملاء حسب الباقة (Pie أو Bar)
- رسم بياني: توزيع العملاء حسب القطاع
- جدول المهام الدورية (`subscriptionsData.tasks`) — يُعرض بنفس نمط `.task-list` و `.task-item`

#### `src/components/sections/ops/CustomerFeedbackSection.jsx`
- `id="ops-feedback"`
- بطاقات: NPS Score (مع مؤشر بصري — أخضر/أصفر/أحمر)، CSAT
- رسم بياني: توزيع أنواع الطلبات (Donut)
- قائمة: أكثر الطلبات تكراراً (مرقمة)
- جدول المهام الدورية

#### `src/components/sections/ops/CompetitorIntelSection.jsx`
- `id="ops-competitors"`
- كل منافس يُعرض كـ Card: الاسم، النوع، الشريحة، نقاط القوة، نقاط الضعف، آخر مراجعة
- جدول المهام الدورية

#### `src/components/sections/ops/BestPracticesSection.jsx`
- `id="ops-practices"`
- 3 بطاقات كبيرة (اتجاهات الصناعة، التقنيات الناشئة، المنصات العالمية)
- كل بطاقة فيها قائمة عناصر مع dot
- جدول المهام الدورية

#### `src/components/sections/ops/FieldResearchSection.jsx`
- `id="ops-field"`
- جدول خطة الحضور 2026 (12 شهر) — كل شهر: الفعالية، المزود، النوع، الهدف
- قائمة معايير التقييم (8 معايير)
- جدول المهام الدورية

#### `src/components/sections/ops/CustomerSuccessSection.jsx`
- `id="ops-success"`
- جدول العملاء مع Health Score — كل عميل: الاسم، الدرجة (progress bar ملون)، الحالة (badge)، الباقة، آخر فعالية، عدد الفعاليات
- قائمة معايير Health Score
- جدول المهام الدورية

#### `src/components/sections/ops/OpsReportsSection.jsx`
- `id="ops-reports"`
- 4 بطاقات (أسبوعي، شهري، ربع سنوي، سنوي)
- كل بطاقة: العنوان، الأيقونة، التكرار، محتويات التقرير كقائمة

#### `src/components/sections/ops/OpsCalendarSection.jsx`
- `id="ops-calendar"`
- 4 أقسام فرعية (يومي/أسبوعي/شهري/ربع سنوي)
- كل قسم يعرض المهام بتصميم timeline أو قائمة

#### `src/components/sections/ops/OpsChartsSection.jsx`
- `id="ops-charts"`
- رسم 1: توزيع الفعاليات حسب النوع (Bar) — 5 أنواع
- رسم 2: مقارنة ساعات العمل (أسبوعي 18 ساعة / شهري 32 ساعة)
- رسم 3: Health Score Distribution (عدد العملاء في كل فئة: سليم/يحتاج انتباه/خطر)
- رسم 4: NPS Score Gauge

---

### مكوّن خطة التسويق (مؤقت): `src/components/sections/marketing/MarketingPlaceholder.jsx`

```jsx
import { motion } from 'framer-motion';

export default function MarketingPlaceholder() {
  return (
    <section id="marketing-placeholder" className="section" style={{ textAlign: 'center', padding: '120px 32px' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="ic" style={{ width: 80, height: 80, borderRadius: 20, margin: '0 auto 24px', background: 'rgba(166,28,97,0.1)' }}>
          <i className="fa-thin fa-bullhorn" style={{ fontSize: 36, color: 'var(--accent-pink)' }} aria-hidden="true" />
        </div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: 12 }}>
          خطة التسويق
        </h2>
        <p style={{ fontSize: '1rem', color: 'var(--text-muted)', maxWidth: 500, margin: '0 auto' }}>
          قيد الإعداد — سيتم إضافة خطة التسويق التفصيلية قريباً
        </p>
      </motion.div>
    </section>
  );
}
```

Sidebar لخطة التسويق (مؤقت):
```js
export const marketingNavItems = [
  { id: 'marketing-placeholder', label: 'خطة التسويق (قريباً)', icon: 'bullhorn' },
];
```

---

## قواعد عامة مهمة

1. **الأيقونات:** Font Awesome Jelly فقط (`fa-thin`) — ممنوع Emoji/Lucide/react-icons/SVG
2. **الاتجاه:** RTL بالكامل
3. **البيانات:** كلها Hardcoded في ملفات data/
4. **لا مصطلحات تقنية** في المحتوى المعروض (API, Database, Backend, etc.) — هذا للعرض في اجتماع
5. **الكلاسات:** استخدم الموجودة في `index.css` + الكلاسات الجديدة لـ plan-tabs فقط
6. **Framer Motion:** نفس الأنماط الموجودة (fadeIn, stagger, whileInView)
7. **الرسوم البيانية:** Recharts + Nivo (مثل الموجود في DashboardSection الحالي)
8. **المكوّن المشترك:** `SectionHeader` من `src/components/common/SectionHeader.jsx`
9. **StatCard:** من `src/components/common/StatCard.jsx` — يقبل `icon`, `value`, `label`, `color`, `glass`, `suffix`

## ترتيب التنفيذ

1. أضف CSS الجديد لـ plan-tabs في `index.css`
2. أنشئ `PlanTabs.jsx`
3. أنشئ `src/data/operations.js` (الكود أعلاه)
4. أنشئ مكوّنات التشغيل (10 ملفات في `sections/ops/`)
5. أنشئ `MarketingPlaceholder.jsx`
6. عدّل `Sidebar.jsx` — أضف المصفوفات الثلاثة + استقبال prop `plan`
7. عدّل `App.jsx` — أضف state للتبويبة + PlanTabs + عرض المحتوى حسب التبويبة
8. اختبر التبديل بين التبويبات الثلاث
