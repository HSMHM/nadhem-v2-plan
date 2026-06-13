# تقرير تنفيذ مهام الواجهة — إعادة الهيكلة إلى مسارين (نظم V1 / نظم V2)

> المنفّذ: الوكيل المصمم · المرجع: tasks-frontend.md · التاريخ: 2026-06-13

---

## ملخص سريع

أُعيدت هيكلة الصفحة الرئيسية من نموذج «ست خطط في شريط واحد» إلى نموذج هرمي **(مسار ← تبويب)** مع شاشة منقسمة (V1 يمين / V2 يسار) + بطاقة العرض التقديمي (placeholder). فُصلت أسانا وخطة التطوير القديمة من التنقل دون حذف ملفاتهما. وُظِّف GSAP في الزووم والتبويبات وكشف الأقسام عند التمرير.

- نتيجة `npm run build`: **نجح** (1178 وحدة، بدون أخطاء — تنبيه حجم الحزمة فقط وهو سابق للتعديل).
- نتيجة `npm run lint`: **5 أخطاء متبقية، كلها سابقة لتعديلاتي وخارج نطاق المهمة** (ملفات أسانا والمكوّن الإضافي vite-plugin-asana). انخفضت الأخطاء من 13 إلى 5؛ وكل أخطاء الملفات التي عدّلتها أُصلحت.

---

## ما نُفِّذ لكل مهمة

### T1 — الصفحة الرئيسية الجديدة + Zoom بـ GSAP
- **ملف جديد:** `src/components/HomeSplit.jsx` — يستبدل WelcomePage كشاشة دخول. شاشة Dark كاملة، نصفان: نظم V1 (يمين) و نظم V2 (يسار)، كل نصف لوحة قابلة للنقر تحمل أيقونة + عنوان + وصف + شارات التبويبات + مؤشر دخول.
- أسفلهما بطاقة **«العرض التقديمي»** ممتدة، غير قابلة للنقر، بحدود متقطعة وشارة «قريباً».
- **Zoom بـ GSAP عند النقر:** Timeline يكبّر المسار المختار (scale 1.06 ثم 1.4 مع إخفاء)، يُخفي المسار الآخر والرأس وبطاقة العرض، ثم يستدعي `onSelect` لتبديل العرض إلى المسار. حركة دخول بـ stagger للوحات عند التحميل. تأثير توهج الحدود عند التحويم عبر CSS بألوان الهوية لكل مسار.
- نُقلت كل الأنماط إلى CSS (لا أنماط مضمّنة): `src/components/sections/v2/tracks.css`.

### T2 — نموذج الحالة في App.jsx
- استُبدلت حالة `plan` المسطّحة بنموذج هرمي: `track` (`home` | `v1` | `v2`) و `tab`.
  - V1: `ops` | `marketing` | `journey`
  - V2: `product` | `roadmap`
- حُدِّث `IntersectionObserver` ودوال `handleNav` / `handleTrackSelect` / `handleTabChange` / `handleHome` لتعمل وفق (المسار، التبويب).
- `isFullPage` يُحتسب من `fullPageTabs = ['journey','product','roadmap']`.
- فُصل استيراد ومسار أسانا وأقسام dev القديمة من شجرة العرض (الاستيرادات حُذفت من App.jsx فقط؛ الملفات باقية).

### T3 — شريط التبويبات لكل مسار
- `src/components/PlanTabs.jsx` أُعيد كتابته: يعرض تبويبات المسار النشط فقط من `trackTabs[track]`. أيقونات `fa-thin` وألوان الهوية. حركة GSAP stagger لظهور التبويبات عند دخول/تبديل المسار. شريط «الرئيسية» (العودة) أُضيف في App.jsx فوق التبويبات (`track-back-bar`).

### T4 — الشريط الجانبي
- `src/components/Sidebar.jsx` صار يستورد عناصر التنقل من **ملف بيانات جديد** `src/data/navItems.js` ويُحرَّك بـ `tab`. أُضيفت عناصر تنقل خطة تطوير V2 (`roadmapNavItems` — المراحل الست + نظرة عامة). أُبقيت `devNavItems` و`asanaNavItems` معرّفة في ملف البيانات لكن غير مربوطة بأي مسار (`trackNavMap` لا يشملها).

### T5 — مسار V1: الإبقاء والتنظيف
- نُقلت أقسام `ops` (متضمنة `UrgentSprintSection`) و`marketing` و`journey` كما هي تحت مسار V1 دون تعديل محتواها. إزالة أسانا لم تكسر أي رابط داخلي. (لم يُعثر على إشارات نصية تربط التشغيل بخطة التطوير المهدومة تستوجب إعادة صياغة.)

### T6 — مسار V2: وصف المنتج
- `PlatformJourneySection.jsx`: العنوان `pj-hero-title` صار **«وصف المنتج»** مع سطر فرعي «الوحدات الثماني والعشرون عبر مراحل الفعالية الثلاث والباقات الأربع» (صنف `pj-hero-sub` الموجود مسبقاً في platform.css). أُضيف `id="pj-root"` للربط مع الشريط الجانبي. تسمية التبويب وعنصر الشريط الجانبي حُدِّثت إلى «وصف المنتج». المحتوى (28 وحدة / 4 باقات / 3 مراحل / المصفوفة) بقي كما هو.

### T7 — مسار V2: خطة التطوير الجديدة
- **ملف بيانات جديد:** `src/data/v2DevPlan.js` — المراحل الست (`v2-phase-1`..`v2-phase-6`) ببنودها وتواريخها (أرقام لاتينية) + `v2DevStats`.
- **مكوّن جديد:** `src/components/sections/v2/V2RoadmapSection.jsx` — بطاقة مؤشرات علوية (المراحل، تاريخ التسليم 2026-07-15، الوحدات، اللجان، الباقات)، ثم خط زمني عمودي بست بطاقات؛ كل بطاقة: رقم، عنوان، نطاق زمني، الهدف، بنود العمل، ونقطة العرض (Checkpoint).

### T8 — العرض التقديمي (placeholder)
- مُنفَّذ داخل HomeSplit فقط، بلا صفحة ولا تبويب ولا محتوى، غير تفاعلي مع شارة «قريباً».

### T9 — توظيف GSAP
- **Zoom المسارات:** Timeline في `HomeSplit.jsx` عند النقر.
- **ظهور التبويبات:** `gsap.from` بـ stagger في `PlanTabs.jsx`.
- **كشف عند التمرير (ScrollTrigger):**
  - `V2RoadmapSection.jsx`: stagger لبطاقات المؤشرات + كشف كل مرحلة عند التمرير (fade/slide).
  - `PlatformJourneySection.jsx`: stagger لبطاقات الإحصائيات عند التمرير.
- التزم النمط المرجعي: `registerPlugin(ScrollTrigger)`، `gsap.context(...)`، `ctx.revert()` في التنظيف، احترام `prefers-reduced-motion` (إظهار الحالة النهائية مباشرة)، و`invalidateOnRefresh` + `ScrollTrigger.refresh()` على resize. لم يُمسّ مشغّل `CompletedJourneyTrail` ولا AOS الحالي.

---

## الملفات

**جديدة:**
- `src/components/HomeSplit.jsx`
- `src/components/sections/v2/V2RoadmapSection.jsx`
- `src/components/sections/v2/tracks.css`
- `src/data/v2DevPlan.js`
- `src/data/navItems.js`

**معدّلة:**
- `src/App.jsx` (نموذج الحالة الهرمي، فصل أسانا/dev، شريط العودة)
- `src/components/PlanTabs.jsx` (تبويبات المسار النشط + GSAP)
- `src/components/Sidebar.jsx` (تنقل حسب tab من navItems.js)
- `src/components/sections/platform/PlatformJourneySection.jsx` (عنوان «وصف المنتج» + GSAP + id + حذف import غير مستخدم)
- `src/components/WelcomePage.jsx` (حذف import غير مستخدم — صار كوداً غير مرتبط محفوظاً للمرجع)
- `src/components/sections/ops/SubscriptionsSection.jsx` (حذف متغيّر `i` غير مستخدم — صار ضمن مسار V1 الفعّال)

**باقية دون حذف (مفصولة من التنقل فقط):** كل ملفات `sections/asana/**`، `asana.css`، `vite-plugin-asana-api.js`، وأقسام dev القديمة (`DashboardSection`, `DevelopmentsSection`, `ModulesSection`, `SimpleTimelineSection`)، و`WelcomePage.jsx`.

---

## الانحرافات ومبرّراتها

1. **WelcomePage لم يُحذف** بل أُبقي غير مرتبط (دخوله صار عبر HomeSplit). تجنّباً لحذف ملفات؛ أُزيل منه import غير مستخدم لإبقاء lint نظيفاً.
2. **فصل ثوابت التنقل إلى `navItems.js`**: كان `Sidebar.jsx` يُصدّر مكوّناً + ثوابت معاً، ما يولّد 5 أخطاء `react-refresh/only-export-components`. نقل الثوابت إلى ملف بيانات حلّها نهائياً والتزم بقاعدة فصل المسؤوليات.
3. **زر العودة للرئيسية** وُضع في شريط مستقل أعلى التبويبات (داخل App.jsx) بدل دمجه كزر داخل شريط التبويبات، لوضوح أكبر ولعدم خلطه بأزرار التبديل بين التبويبات.

---

## نتيجة build / lint

- **build:** نجح. `vite build` — 1178 وحدة، CSS 83.39kB، JS 1032kB (تنبيه حجم الحزمة موجود قبل التعديل ولا يكسر البناء).
- **lint:** الأخطاء انخفضت من 13 إلى 5. الخمسة المتبقية **سابقة لتعديلاتي وكلها في ملفات خارج النطاق (أسانا/الإضافة):**
  - `sections/asana/AsanaMarketingTasksSection.jsx`، `sections/asana/EditableField.jsx`، `sections/asana/TaskCard.jsx`، `hooks/useFadFile.js` — أخطاء `react-hooks/set-state-in-effect` (سابقة، وإصلاحها يلامس منطق أسانا المحمي).
  - `vite-plugin-asana-api.js` — `'Buffer' is not defined` (خطأ بيئة Node في إضافة أسانا، غير متعلق بالواجهة).
- كل أخطاء lint في الملفات التي عدّلتها (App, Sidebar, PlanTabs, WelcomePage, PlatformJourneySection, SubscriptionsSection) أُصلحت.

---

## ملاحظات تقنية لاحظتها

1. **أخطاء lint سابقة في ملفات أسانا والإضافة** (5 أخطاء) — تستحق مهمة منفصلة لإصلاح `setState` داخل الـ effects وتعريف `Buffer` في `vite-plugin-asana-api.js`. تركتها لأن المهمة تمنع تعديل ملفات أسانا.
2. **أنماط مضمّنة سابقة** في `MatrixView` داخل `PlatformJourneySection.jsx` و`StatCard.jsx` و`SubscriptionsSection.jsx` (style={{…}}) — موجودة قبل المهمة. كل كودي الجديد خالٍ منها؛ لم أعدّل تلك المواضع تفادياً لمخاطر الانحدار، لكنها تخالف القاعدة 2 وتستحق تنظيفاً لاحقاً.
3. **تنبيه حجم الحزمة** (>500kB) سابق؛ يُنصح بـ code-splitting لاحقاً (خارج نطاق هذه المهمة).

---

## الجولة الثانية — ملاحظات المراجعة (R)

> نُفّذت R1 و R2 و R3 بنفس القواعد الصارمة (لا تعليقات، لا أنماط بصرية مضمّنة، .css فقط، أرقام لاتينية، لا إيموجي، GSAP مع `ctx.revert` واحترام `prefers-reduced-motion`).

### R1 — محاذاة تبويبات المسار (تحويل متبقٍّ من GSAP)
- `src/components/PlanTabs.jsx`: أُضيف `clearProps: 'transform,opacity'` إلى حركة `gsap.from` للتبويبات، ما يزيل أي تحويل/شفافية متبقّية ويضمن حالة نهائية متطابقة (التبويبان في V2 على نفس الخط).
- `src/components/HomeSplit.jsx`: أُضيف `clearProps` لحركتي دخول الرأس والبطاقات الدائمة.
- `src/components/sections/v2/V2RoadmapSection.jsx`: أُضيف `clearProps: 'transform,opacity'` لحركتي الإحصائيات والمراحل.

### R2 — زووم البطاقة إلى الأعلى + إزالة الكسر الأبيض
- `src/components/HomeSplit.jsx`: عُدّل timeline النقر — البطاقة المختارة تتكبّر (scale 1.05) ثم تتجه للأعلى (y: -160, scale 1.12) وتتلاشى، بينما تتلاشى البطاقة الأخرى والرأس وبطاقة العرض. **حُذف تلاشي الجذر الكامل إلى opacity:0**؛ تبقى خلفية `.home-split` الداكنة (#0F0720) ظاهرة أثناء التسليم لـ `onSelect` فلا يُكشف أبيض.
- `src/data/navItems.js`: أُضيف `trackMeta` (الأيقونة + الاسم + الوسم + الوصف + اللون) لكل مسار لاشتقاق رأس المسار.
- `src/App.jsx`: أُضيف **رأس مسار داكن `track-hero`** أعلى `PlanTabs` يعرض هوية المسار (أيقونة + اسم + وصف). أُضيفت **حركة دخول GSAP** عبر `gsap.context` على جذر العرض تنزلق برأس المسار والتبويبات وأول قسم للداخل فوق خلفية داكنة، مع `clearProps` واحترام `prefers-reduced-motion` (إظهار فوري). أعلى الصفحة داكن بالكامل (`track-back-bar` + `track-hero` + `plan-tabs-bar`) فلا وميض أبيض.
- `src/components/sections/v2/tracks.css`: أُضيفت أنماط `.track-hero` الداكنة (توهج باللون، خط علوي، أيقونة، عناوين) + قواعد متجاوبة.

### R3 — حذف أربعة أقسام تشغيلية من مسار V1
- `src/App.jsx`: حُذف **استيراد** و**استدعاء** `UrgentSprintSection` و`OpsReportsSection` و`OpsCalendarSection` و`OpsChartsSection` من عرض تبويب ops. الملفات باقية دون حذف (نفس سياسة أسانا).
- `src/data/navItems.js`: حُذفت عناصر التنقّل `ops-urgent-sprint` و`ops-reports` و`ops-calendar` و`ops-charts` من `opsNavItems`.
- مسار V1 → التشغيلية يعرض الآن فقط: المؤشرات، الاشتراكات، تمكين العميل، التقييم، المنافسين، أفضل الممارسات، الحضور الميداني. لا توجد روابط داخلية في `OpsDashboardSection` أو غيرها تشير للمعرّفات المحذوفة (تُحقّق بالبحث)، فلا مراسي مكسورة و`IntersectionObserver` يراقب القائمة المحدّثة فقط.

### نتيجة build / lint (الجولة الثانية)
- **build:** نجح (`vite build` — 1174 وحدة، built in ~6s، تنبيه حجم الحزمة فقط وهو سابق).
- **lint:** نفس 5 الأخطاء السابقة المحمية فقط (asana/TaskCard, asana/EditableField, asana/AsanaMarketingTasksSection, hooks/useFadFile, vite-plugin-asana-api). لا أخطاء جديدة في الملفات المعدّلة.

### الملفات المعدّلة (الجولة الثانية)
- `src/components/PlanTabs.jsx`
- `src/components/HomeSplit.jsx`
- `src/components/sections/v2/V2RoadmapSection.jsx`
- `src/App.jsx`
- `src/data/navItems.js`
- `src/components/sections/v2/tracks.css`

---

## الجولة الثالثة — انتقال متصل بلا «فتح صفحة جديدة» (R4)

> نُفّذت R4 بنفس القواعد الصارمة (لا تعليقات، لا أنماط بصرية مضمّنة، .css فقط، أرقام لاتينية، لا إيموجي، GSAP مع `ctx.revert` واحترام `prefers-reduced-motion`).

### السببان الجذريان وكيف عولِجا

1. **تبديل صلب لشجرة React → نموذج الطبقة العلوية (overlay):**
   - حُذف `if (track === 'home') return <HomeSplit/>` نهائياً. أصبح `App` يُرجع شجرة واحدة `<>…</>`: **TrackView طبقة الأساس** (تُركّب متى `track !== 'home'`)، و**`HomeSplit` طبقة علوية** تُركّب متى `track === 'home' || transitioning`.
   - `HomeSplit` صار overlay كامل عبر صنف `.home-split-overlay-layer` (`position:fixed;inset:0;z-index:9000`) بخلفية داكنة معتمة (`#0F0720`) تغطّي لحظة تركيب TrackView تماماً.
   - أُضيفت حالة `transitioning` (bool). عند النقر: `setTransitioning(true)` + `setTrack(selected)` معاً → يُركّب TrackView **تحت** الـ overlay المعتم. يبقى الـ overlay مرسوماً طوال الانتقال، وفي `onComplete` يُستدعى `handleTransitionDone` → `setTransitioning(false)` فيُزال الـ overlay (وهو وقتها شفاف، فلا قفزة).

2. **FOUC (الوميض) → الإخفاء قبل الرسم عبر `useLayoutEffect`:**
   - نُقلت حركة دخول TrackView من `useEffect` إلى **`useLayoutEffect`** (تعمل قبل رسم المتصفح).
   - في بدايتها `gsap.set([...hero, tabsBar, content], { opacity: 0 })` فيُضبط المحتوى مخفياً **قبل أي رسم** — فلا يُرسم محتوى المسار الفاتح ولو لإطار واحد. ثم تُكشف العناصر بـ `gsap.to/fromTo` بتأخير متدرّج فوق خلفية داكنة.
   - حركة دخول `HomeSplit` نفسها نُقلت أيضاً إلى `useLayoutEffect` لإزالة أي وميض في الـ overlay.

### تسلسل حركة الانتقال (GSAP على الـ overlay)
عند النقر على بطاقة (في `HomeSplit.handleSelect`):
1. `onSelect(trackId)` فوراً → يُركّب TrackView تحت الـ overlay + `transitioning=true`.
2. timeline على الـ overlay:
   - البطاقة المختارة: تكبّر بسيط (`scale 1.05`) ثم تنزلق للأعلى (`y -=180, scale 1.1`) نحو موضع الرأس، تبقى مرئية أثناء الصعود ثم تتلاشى.
   - تلاشي متزامن: البطاقة الأخرى + الرأس + بطاقة العرض.
   - تلاشي **خلفية الـ overlay** (`.home-split-bg` و`.home-split-overlay`) + خلفية جذر الـ overlay (`backgroundColor → rgba(15,7,32,0)`) فينكشف TrackView الداكن من تحته (back-bar + track-hero + tabs داكنة، لا أبيض).
   - تزامناً: محتوى TrackView بالأسفل ينزلق/يظهر بلطف عبر حركة `useLayoutEffect`.
3. `onComplete` → `onTransitionDone()` → إزالة الـ overlay الشفاف.

### احترام prefers-reduced-motion
في `handleSelect`: عند التفعيل يُستدعى `onSelect` ثم `onTransitionDone` فوراً (انتقال متصل بلا حركة وبلا كسر — TrackView يظهر مباشرة بحالته النهائية لأن `useLayoutEffect` يضبط `opacity:1` في فرع reduceMotion، والـ overlay يُزال فوراً).

### ملاحظات سلامة دورة الحياة
- `IntersectionObserver` وحركة الدخول كلاهما مَحْروسان بـ `if (track === 'home') return` فلا يعملان على عناصر غير مركّبة.
- التنظيف عبر `ctx.revert()` في كل من `App` (الدخول) و`HomeSplit` سليم.
- الـ overlay مكوّن واحد يُركّب/يُزال حسب `showOverlay` فلا يتراكم أكثر من overlay.

### الملفات المعدّلة (الجولة الثالثة)
- `src/App.jsx` — شجرة واحدة (TrackView أساس + HomeSplit overlay)، حالة `transitioning`، `handleTransitionDone`، نقل حركة الدخول إلى `useLayoutEffect` مع `gsap.set` للإخفاء قبل الرسم.
- `src/components/HomeSplit.jsx` — صار overlay، استدعاء `onSelect` فوراً ثم timeline يكشف TrackView، `onTransitionDone` في `onComplete`، نقل حركة الدخول إلى `useLayoutEffect`.
- `src/components/sections/v2/tracks.css` — صنف `.home-split-overlay-layer` (fixed/inset/z-index عالٍ).

### نتيجة build / lint (الجولة الثالثة)
- **build:** نجح (`vite build` — 1174 وحدة، built in ~6s، تنبيه حجم الحزمة فقط وهو سابق).
- **lint:** نفس 5 الأخطاء السابقة المحمية فقط (asana/TaskCard, asana/EditableField, asana/AsanaMarketingTasksSection, hooks/useFadFile, vite-plugin-asana-api). لا أخطاء جديدة في الملفات المعدّلة.
