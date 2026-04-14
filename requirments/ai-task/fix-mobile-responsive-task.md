# مهمة: إصلاح عرض الجوال — القائمة الجانبية والتبويبات العلوية

## المشاكل الحالية (من الصورة)

1. **تبويبات الخطط مقطوعة** — النص "خطة التطوير" غير مكتمل، والتبويبات متزاحمة
2. **زر القائمة (hamburger) يتداخل مع التبويبات** — الزر في `top:16px; right:16px` فوق التبويبات
3. **التبويبات تأخذ عرض كامل** لكن المساحة لا تكفي للنصوص العربية الطويلة على الجوال

---

## الحل

### المنهج: على الجوال — التبويبات تعرض أيقونات فقط + الاسم المختصر، وزر القائمة يتحرك

### 1. تعديل CSS في `src/index.css`

**أ) إصلاح تبويبات الخطط على الجوال:**

استبدل media query الحالي للتبويبات:

```css
/* القديم: */
@media(max-width:767px){
  .plan-tabs-bar{padding:0 8px}
  .plan-tab{font-size:0.78rem;padding:12px 8px;gap:6px}
}

/* الجديد: */
@media(max-width:767px){
  .plan-tabs-bar{padding:0 4px}
  .plan-tab{font-size:0.72rem;padding:10px 6px;gap:4px;flex-direction:column}
  .plan-tab i{font-size:18px}
}
```

**ب) إصلاح زر القائمة — يجب أن يكون تحت التبويبات وليس فوقها:**

```css
/* القديم: */
.mobile-btn{display:none;position:fixed;top:16px;right:16px;z-index:101;width:44px;height:44px;border-radius:12px;background:var(--sidebar-bg);color:#fff;border:none;cursor:pointer;font-size:18px;align-items:center;justify-content:center}

/* الجديد: */
.mobile-btn{display:none;position:fixed;top:60px;right:12px;z-index:95;width:40px;height:40px;border-radius:10px;background:var(--sidebar-bg);color:#fff;border:none;cursor:pointer;font-size:16px;align-items:center;justify-content:center;box-shadow:var(--shadow-md)}
```

- `top: 60px` — تحت شريط التبويبات (التبويبات ~50px ارتفاع)
- `z-index: 95` — تحت التبويبات (90) لكن فوق المحتوى

**ج) التبويبات يجب أن تكون z-index أعلى من الزر:**

```css
.plan-tabs-bar{position:sticky;top:0;z-index:96;...}
```

**د) إضافة safe-area للمحتوى على الجوال — حتى لا يختفي خلف الزر:**

في media query `max-width:1023px` أضف:
```css
@media(max-width:1023px){
  .sidebar{transform:translateX(100%);transition:transform .3s}
  .sidebar.open{transform:translateX(0)}
  .sidebar-overlay.open{display:block}
  .mobile-btn{display:flex}
  .main{margin-right:0}
  .g3,.g4{grid-template-columns:repeat(2,1fr)}
  html{scroll-padding-top:110px}  /* مساحة للتبويبات + الزر */
}
```

**هـ) الـ hero section يحتاج padding-top إضافي على الجوال حتى لا يختبئ المحتوى:**

```css
@media(max-width:767px){
  .section,.hero{padding:28px 16px}
  .hero{padding-top:32px}
  .g2,.g3,.g4{grid-template-columns:1fr}
  .tbl{display:block;overflow-x:auto}
  .plan-tabs-bar{padding:0 4px}
  .plan-tab{font-size:0.72rem;padding:10px 6px;gap:4px;flex-direction:column}
  .plan-tab i{font-size:18px}
}
```

### 2. تعديل `src/components/PlanTabs.jsx` — أسماء مختصرة للجوال

```jsx
const plans = [
  { id: 'dev', label: 'خطة التطوير', shortLabel: 'التطوير', icon: 'code', color: '#2A848A' },
  { id: 'ops', label: 'خطة التشغيل', shortLabel: 'التشغيل', icon: 'gears', color: '#BA5A31' },
  { id: 'marketing', label: 'خطة التسويق', shortLabel: 'التسويق', icon: 'bullhorn', color: '#A61C61' },
];

export default function PlanTabs({ active, onChange }) {
  return (
    <div className="plan-tabs-bar">
      {plans.map((p) => (
        <button
          key={p.id}
          className={`plan-tab ${active === p.id ? 'active' : ''}`}
          data-plan={p.id}
          onClick={() => onChange(p.id)}
        >
          <i className={`fa-thin fa-${p.icon}`} aria-hidden="true" />
          <span className="tab-label-full">{p.label}</span>
          <span className="tab-label-short">{p.shortLabel}</span>
        </button>
      ))}
    </div>
  );
}
```

وأضف في CSS:
```css
.tab-label-short{display:none}
@media(max-width:767px){
  .tab-label-full{display:none}
  .tab-label-short{display:inline}
}
```

### 3. تعديل Sidebar على الجوال — إضافة زر إغلاق واضح

في `Sidebar.jsx`، أضف زر إغلاق (X) أعلى القائمة الجانبية عند فتحها:

```jsx
<nav className={`sidebar ${isOpen ? 'open' : ''}`}>
  {/* زر الإغلاق — يظهر فقط على الجوال */}
  <button className="sidebar-close" onClick={onClose}>
    <i className="fa-thin fa-xmark" aria-hidden="true" />
  </button>

  <img src="/logos/white-logo.png" alt="نظم" className="sidebar-logo" />
  {/* ... باقي المحتوى */}
</nav>
```

CSS:
```css
.sidebar-close{display:none;position:absolute;top:12px;left:12px;width:36px;height:36px;border-radius:10px;background:rgba(255,255,255,0.08);color:rgba(255,255,255,0.6);border:none;cursor:pointer;font-size:16px;align-items:center;justify-content:center;transition:all .2s}
.sidebar-close:hover{background:rgba(255,255,255,0.15);color:#fff}

@media(max-width:1023px){
  .sidebar-close{display:flex}
}
```

---

## ملخص CSS النهائي للـ Responsive (استبدل الـ media queries الموجودة)

```css
/* Responsive */
.tab-label-short{display:none}

@media(max-width:1279px){
  .sidebar{width:220px}
  .main{margin-right:220px}
}

@media(max-width:1023px){
  .sidebar{transform:translateX(100%);transition:transform .3s}
  .sidebar.open{transform:translateX(0)}
  .sidebar-overlay.open{display:block}
  .sidebar-close{display:flex}
  .mobile-btn{display:flex}
  .main{margin-right:0}
  .g3,.g4{grid-template-columns:repeat(2,1fr)}
  html{scroll-padding-top:110px}
}

@media(max-width:767px){
  .section,.hero{padding:28px 16px}
  .hero{padding-top:32px}
  .g2,.g3,.g4{grid-template-columns:1fr}
  .tbl{display:block;overflow-x:auto}
  .plan-tabs-bar{padding:0 4px}
  .plan-tab{font-size:0.75rem;padding:10px 6px;gap:4px;flex-direction:column}
  .plan-tab i{font-size:18px}
  .tab-label-full{display:none}
  .tab-label-short{display:inline}
  .mobile-btn{top:58px;right:10px;width:38px;height:38px;font-size:15px}
  .dev-header{padding:16px}
  .dev-body{padding:0 16px 16px}
  .phase-tabs{flex-wrap:wrap}
  .phase-tab{font-size:0.72rem;padding:6px 8px}
}
```

---

## الملفات المتأثرة

| الملف | التعديل |
|-------|--------|
| `src/index.css` | استبدال كل الـ media queries + إضافة classes جديدة |
| `src/components/PlanTabs.jsx` | إضافة `shortLabel` + عنصرين `span` |
| `src/components/Sidebar.jsx` | إضافة زر إغلاق (X) |
