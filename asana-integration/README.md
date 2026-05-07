# تكامل أسانا — تطويرات منتج "نظم"

هذا المجلد يحوي كل ما يلزم لرفع **19 تطويراً رئيسياً** (مع ~317 مهمة فرعية تفصيلية) إلى مشروع أسانا، حيث كل مهمة في أسانا تحمل مرفق JSON بصيغة **وثيقة تحليل الميزة (FAD — Feature Analysis Document)**.

---

## الفلسفة باختصار

- **المصدر:** ملف [`nadhem-execution-plan/src/data/developments.js`](../nadhem-execution-plan/src/data/developments.js) — يحوي 19 تطويراً، كل تطوير فيه 4 مراحل (تحليل/تصميم/تنفيذ/تدريب) ومهام تفصيلية.
- **القالب:** [`ANALYSIS_DOCUMENT_TEMPLATE.html`](./ANALYSIS_DOCUMENT_TEMPLATE.html) — نموذج تفاعلي يحوّل تعبئة الحقول إلى ملف JSON.
- **الهدف:** كل تطوير → مهمة في أسانا (تحت قسم `إضافات` أو `التعديلات`) + هرم فرعي لمراحلها التفصيلية، مع مرفق JSON.
- **المرجع التحليلي:** المشروع الحالي [saas-events-frontend](x:/laragon/www/saas-events-frontend) (مشروع نظام إدارة الفعاليات الفعلي) — يُقرأ منه فقط لاستخراج معرفات الخصائص الموجودة، ولا يُعدَّل عليه شيء.

---

## بنية المجلد

```
asana-integration/
├── README.md                            ← (هذا الملف)
├── ANALYSIS_DOCUMENT_TEMPLATE.html      ← قالب FAD التفاعلي (للمراجعة البصرية)
├── docs/
│   ├── 00-asana-setup.md                ← خطوات إنشاء PAT و GIDs و sections
│   ├── 01-saas-events-frontend-features.md  ← كتالوج خصائص المشروع المرجعي
│   ├── 02-fad-template-guide.md         ← دليل تعبئة FAD حقلاً حقلاً
│   ├── 03-developments-classification.md ← تصنيف الـ 19 (إضافة/تعديل)
│   └── 04-asana-task-mapping.md         ← ربط كل تطوير بمهمة أسانا (الاسم/الوصف/المرفق)
├── fad-jsons/
│   ├── main/                            ← 19 ملف FAD رئيسي
│   └── subtasks/                        ← ~317 ملف FAD مختصر للمهام التفصيلية
└── scripts/
    ├── package.json
    ├── .env.example
    ├── generate-fad-jsons.js            ← يبني fad-jsons/ من developments.js
    └── push-to-asana.js                 ← يبني الهرم في أسانا (3 مستويات) + المرفقات
```

---

## خطوات التنفيذ بالترتيب

### 1) إعداد أسانا
اقرأ [`docs/00-asana-setup.md`](./docs/00-asana-setup.md) واتبع الخطوات للحصول على:
- `ASANA_PAT` (Personal Access Token)
- `ASANA_PROJECT_GID`
- `SECTION_ADD_GID` (قسم "إضافات")
- `SECTION_MOD_GID` (قسم "التعديلات")

### 2) تثبيت الاعتماديات
```bash
cd asana-integration/scripts
npm install
cp .env.example .env
# عبئ القيم في .env
```

### 3) توليد ملفات FAD JSON
```bash
node generate-fad-jsons.js
# يُولّد 19 ملف في fad-jsons/main/ و ~317 ملف في fad-jsons/subtasks/
```

### 4) معاينة (Dry-run)
```bash
node push-to-asana.js --dry-run
# يطبع شجرة المهام المتوقع إنشاؤها بدون إرسال
```

### 5) الرفع الفعلي
```bash
node push-to-asana.js
# ينشئ ~412 مهمة (19 رئيسية + 76 حاوية مرحلة + ~317 تفصيلية) مع مرفقات
```

### 6) التحقق
- افتح مشروع أسانا → يجب أن ترى المهام الرئيسية موزّعة بين قسمَي `إضافات` و `التعديلات`.
- اضغط أي مهمة رئيسية → ستجد تحتها 4 مهام بأسماء `تحليل` / `تصميم` / `تنفيذ` / `تدريب`.
- اضغط أي مرحلة → ستجد المهام التفصيلية، وكل واحدة فيها مرفق JSON واحد.

---

## ما لا يتم تعبئته في FAD (متعمد)

طبقاً لمتطلباتك:
- ❌ **قائمة معايير القبول** (`ac_*` / `ch_ac_*`) — تترك للمحلل/QA لاحقاً
- ❌ **التواقيع** (`sig_*`) — لا تُملأ آلياً
- ❌ **قوائم تحقق المراجعة** (PM / QA / Tech checklists) — تركها فارغة

ما يُملأ:
- ✅ القسم 1 الكامل (معلومات الميزة الأساسية)
- ✅ القسم 2 (تفاصيل الطلب) — حسب نوع الطلب (`new` أو `change`)
- ✅ قصص المستخدم (`us_*`) — مولّدة من السياق
- ✅ الواجهات المتأثرة (`iface_*`) — مستخرجة من خصائص saas-events-frontend

---

## قيود git

- ❌ ممنوع `git push` / `git pull` / `git merge` / إنشاء PR في أيٍّ من المشروعَين.
- ✅ مسموح: قراءة كود saas-events-frontend (مرجع) وكتابة الملفات في nadhem-v2-plan.
