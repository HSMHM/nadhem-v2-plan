# مهمة: استبدال Framer Motion بـ AOS + تحسين خلفية الإحصائيات + الفاصل

---

## 1. استبدال Framer Motion بمكتبة AOS في كامل المشروع

### المكتبة الجديدة
- **AOS (Animate On Scroll):** https://michalsnik.github.io/aos/
- التثبيت: `npm install aos`

### الإعداد في `src/main.jsx`
```js
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
  duration: 800,        // مدة الحركة — بطيئة وناعمة
  easing: 'ease-out-cubic',  // حركة سلسة
  once: true,            // الحركة مرة واحدة فقط (عند أول ظهور)
  offset: 80,            // يبدأ التحريك قبل وصول العنصر بـ 80px
  delay: 0,              // بدون تأخير افتراضي
});
```

### خطوات الاستبدال

**أ) احذف Framer Motion بالكامل:**
```bash
npm uninstall framer-motion
```

**ب) في كل ملف يستخدم Framer Motion:**

1. احذف سطر الاستيراد:
```js
// احذف:
import { motion, AnimatePresence } from 'framer-motion';
```

2. استبدل كل `<motion.div>` بـ `<div>` عادي مع خاصية `data-aos`:

| النمط القديم (Framer Motion) | البديل (AOS) |
|------------------------------|-------------|
| `<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>` | `<div data-aos="fade-up">` |
| `<motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}>` | `<div data-aos="fade-left">` |
| `<motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}>` | `<div data-aos="fade-right">` |
| `<motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>` | `<div data-aos="zoom-in">` |
| `variants={stagger}` على الحاوية + `variants={fadeIn}` على الأبناء | `data-aos="fade-up"` على كل ابن + `data-aos-delay` متدرج |

**ج) التأخير المتدرج (Stagger):**

القديم:
```jsx
<motion.div variants={{ visible: { transition: { staggerChildren: 0.08 } } }}>
  {items.map((item, i) => (
    <motion.div key={i} variants={fadeIn}>...</motion.div>
  ))}
</motion.div>
```

الجديد:
```jsx
<div>
  {items.map((item, i) => (
    <div key={i} data-aos="fade-up" data-aos-delay={i * 80}>...</div>
  ))}
</div>
```

- التأخير المتدرج: `data-aos-delay={i * 80}` (كل عنصر يتأخر 80ms عن السابق)
- **حد أقصى للتأخير:** لا يتجاوز 600ms — إذا كانت القائمة طويلة: `data-aos-delay={Math.min(i * 80, 600)}`

**د) زر العودة للأعلى (ScrollToTop):**

القديم كان يستخدم `AnimatePresence`. البديل بـ CSS transition:
```jsx
function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <button
      className={`scroll-top ${visible ? 'visible' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <i className="fa-thin fa-circle-arrow-up" aria-hidden="true" />
    </button>
  );
}
```

أضف في CSS:
```css
.scroll-top{opacity:0;pointer-events:none;transition:opacity .3s,transform .3s}
.scroll-top.visible{opacity:1;pointer-events:auto}
```

واحذف من CSS الحالي أي خاصية `display` أو `visibility` على `.scroll-top` كانت تعتمد على Framer.

**هـ) الملفات المتأثرة — كل ملف يحتوي `motion.` أو `framer-motion`:**

```bash
# شغّل هذا الأمر لإيجاد كل الملفات:
grep -rn "motion\.\|framer-motion\|AnimatePresence\|variants=" src/ --include="*.jsx"
```

عدّل كل ملف يظهر في النتائج.

---

## 2. خلفية صورة لأقسام الإحصائيات (الثلاثة)

### الملف
الصورة موجودة في المشروع: `public/nadhem-background.png`

### المطلوب
كل لوحة إحصائيات (Dashboard) في الخطط الثلاثة تستخدم هذه الصورة كخلفية مع:
- الصورة كطبقة خلفية مع شفافية (opacity)
- فوقها طبقة gradient بنفسجي داكن (الموجود حالياً)
- البطاقات بشفافية (glassmorphism) حتى تظهر الخلفية من خلفها

### تعديل CSS في `src/index.css`

استبدل class الـ `.hero` الحالي:

```css
/* القديم: */
.hero{background:linear-gradient(135deg,#0F0720 0%,#080312 100%);position:relative;overflow:hidden;padding:48px 32px}
.hero::before{content:'';position:absolute;inset:0;background-image:url("data:image/svg+xml,...");pointer-events:none;z-index:0}
.hero::after{content:'';position:absolute;bottom:0;left:0;right:0;height:120px;background:linear-gradient(to bottom,transparent,var(--bg));pointer-events:none;z-index:1}

/* الجديد: */
.hero{position:relative;overflow:hidden;padding:48px 32px;background:#0F0720}
.hero::before{content:'';position:absolute;inset:0;background:url('/nadhem-background.png') center/cover no-repeat;opacity:0.3;z-index:0}
.hero::after{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(15,7,32,0.75) 0%,rgba(8,3,18,0.85) 100%);z-index:1}
.hero-inner{position:relative;z-index:2}
```

**شرح الطبقات:**
1. `background: #0F0720` — لون أساسي داكن
2. `::before` — الصورة بشفافية 30% (`opacity: 0.3`)
3. `::after` — تدرج بنفسجي داكن شفاف فوق الصورة (يحافظ على المزاج الداكن)
4. `.hero-inner` — المحتوى فوق كل الطبقات (`z-index: 2`)

### تأكد أن `.hero-inner` موجود

في كل DashboardSection (الثلاثة)، المحتوى يجب أن يكون داخل `<div className="hero-inner">`:

```jsx
<section id="..." className="hero">
  {/* الـ glow circles إن وُجدت */}
  <div className="hero-inner">
    {/* كل المحتوى هنا */}
  </div>
</section>
```

### تعديل بطاقات الإحصائيات (Glass Cards)

تأكد أن class الـ `.glass` يحقق الشفافية الكافية:

```css
.glass{
  background:rgba(255,255,255,0.04);
  backdrop-filter:blur(24px);
  -webkit-backdrop-filter:blur(24px);
  border:1px solid rgba(255,255,255,0.08);
  border-radius:16px;
  padding:24px;
  transition:all .3s
}
.glass:hover{
  background:rgba(255,255,255,0.07);
  border-color:rgba(42,132,138,0.25);
  box-shadow:0 0 30px rgba(42,132,138,0.06)
}
```

### الملفات المتأثرة:
- `src/index.css` — تعديل `.hero` و `.glass`
- `src/components/sections/DashboardSection.jsx`
- `src/components/sections/ops/OpsDashboardSection.jsx`
- `src/components/sections/marketing/MktDashboardSection.jsx`

---

## 3. استبدال فاصل Gradient بخط ملون

### القديم
أسفل الإحصائيات يوجد gradient يتلاشى للأبيض:
```css
.hero::after{...height:120px;background:linear-gradient(to bottom,transparent,var(--bg))...}
```

### الجديد
احذف الـ `::after` التلاشي (أصبح يُستخدم للتدرج فوق الصورة). بدلاً منه أضف خط فاصل بلون الهوية أسفل الـ hero:

**أضف class جديد:**
```css
.hero-divider{
  height:3px;
  background:linear-gradient(to left,var(--primary),var(--secondary),var(--accent-pink),var(--accent-orange));
  position:relative;
  z-index:3
}
```

**في كل DashboardSection:**
```jsx
<section id="..." className="hero">
  <div className="hero-inner">
    {/* المحتوى */}
  </div>
</section>
<div className="hero-divider" />
```

الخط يظهر كشريط رفيع ملون بتدرج ألوان الهوية الأربعة — يفصل بين قسم الإحصائيات الداكن وبقية الصفحة.

---

## ملخص الملفات

| الملف | التعديل |
|-------|--------|
| `package.json` | `npm install aos` + `npm uninstall framer-motion` |
| `src/main.jsx` | إضافة استيراد وإعداد AOS |
| `src/index.css` | تعديل `.hero` + `.glass` + إضافة `.hero-divider` + `.scroll-top.visible` |
| كل ملف `.jsx` يحتوي `motion.` | استبدال بـ `data-aos` |
| `src/App.jsx` | تعديل `ScrollToTop` + حذف استيراد framer-motion |
| كل DashboardSection | التأكد من `hero-inner` + إضافة `hero-divider` |

## ترتيب التنفيذ

1. `npm install aos`
2. أضف إعداد AOS في `main.jsx`
3. عدّل `index.css` (hero + glass + divider + scroll-top)
4. استبدل Framer Motion بـ AOS في **كل** ملف
5. `npm uninstall framer-motion`
6. اختبر — تأكد أن كل الحركات تعمل بسلاسة وأن الخلفية تظهر بشكل صحيح
