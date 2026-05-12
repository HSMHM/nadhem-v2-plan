# 02 — دليل تعبئة قالب FAD (وثيقة تحليل الميزة)

هذا الدليل يشرح بالتفصيل أي حقول من [`ANALYSIS_DOCUMENT_TEMPLATE.html`](../ANALYSIS_DOCUMENT_TEMPLATE.html) **تُملأ آلياً** عند توليد JSON، وأي حقول **تُترك فارغة** متعمداً.

> **القاعدة:** السكربت `generate-fad-jsons.js` يملأ فقط ما في **القسمَين 1 و 2**. كل الأقسام الأخرى (3-15) تُترك للمحلل/QA/رئيس التطوير لاحقاً.

---

## القسم 1 — معلومات الميزة الأساسية ✅ (يُملأ كاملاً)

| الحقل (data-field) | المصدر | مثال |
|--------------------|--------|------|
| `feature_id` | يُولَّد من تصنيف الـ26 — صيغة `NDM-DEV-P{Q}-F{ID}` | `NDM-DEV-P0-F101` |
| `feature_name` | `title` من developments.js | `توحيد نماذج إنشاء الحسابات + فئات متغيرة بأسعار` |
| `product` | ثابت | `نظم (Nadhem)` |
| `pm_name` | `.env` → `DEFAULT_PM_NAME` | `أحمد محمد` |
| `analyst` | `.env` → `DEFAULT_ANALYST_NAME` | `سارة علي` |
| `analysis_date` | تاريخ توليد الملف | `2026-05-07` |
| `version` | ثابت | `1.0` |
| `priority` | يُحوَّل من `quarter` | `P0` → `P1` (حرجة) / `P1`-`P4` كما هي |
| `request_type` | من `03-developments-classification.md` | `new` أو `change` |
| `shared_feature` | ثابت | `لا` (نظم منتج وحده) |

> **ملاحظة على الأولوية:** القالب يستخدم P1-P4 (حرجة → منخفضة)، لكن `quarter` في developments.js يستخدم P0-P4. التحويل:
> - `quarter: 'P0'` → `priority: 'P1'` (حرجة — حزمة عاجلة)
> - `quarter: 'P1'` → `priority: 'P2'` (عالية)
> - `quarter: 'P2'` → `priority: 'P3'` (متوسطة)
> - `quarter: 'P3'` → `priority: 'P3'` (متوسطة)
> - `quarter: 'P4'` → `priority: 'P4'` (منخفضة)

---

## القسم 2 — تفاصيل الطلب (ديناميكي حسب `request_type`)

### حالة A — `request_type = "new"` (إضافة)

| الحقل | المصدر |
|-------|--------|
| `new_description` ✅ | `description` من developments.js (مع إضافة `location`) |
| `us_id_1`, `us_as_1`, `us_want_1`, `us_so_1` ✅ | يُولَّد من `description` بصيغة `كـ {role}، أريد {feature}، حتى {benefit}` |
| `iface_admin`, `iface_admin_desc` ✅ | "نعم" إذا `location` يحوي "إعدادات" / "لوحة" / "مدير النظام" / "لجنة" |
| `iface_user`, `iface_user_desc` ✅ | "نعم" إذا `location` يخص حساب المستخدم |
| `iface_public`, `iface_public_desc` ✅ | "نعم" إذا `location` يحوي "الواجهة الخارجية" / "الصفحة الرئيسية" |
| `iface_api`, `iface_api_desc` ✅ | "نعم" دائماً للتطويرات الكبيرة (تحتاج API جديدة) |
| **`ac_id_1`, `ac_criteria_1`, `ac_testable_1`** ❌ | **يُترك فارغاً متعمداً** — معايير القبول مهمة المحلل/QA |

### حالة B — `request_type = "change"` (تعديل)

| الحقل | المصدر |
|-------|--------|
| `change_as_is` ✅ | يُولَّد من `01-saas-events-frontend-features.md` — وصف الوضع الحالي للخصائص المتأثرة |
| `change_to_be` ✅ | `description` من developments.js (الوضع المستهدف) |
| `ch_us_id_1`, `ch_us_as_1`, ... ✅ (اختياري) | قصة مستخدم واحدة على الأقل من السياق |
| `iface_*` ✅ | كما في `new` (أعلاه) |
| **`ch_ac_id_1`, `ch_ac_criteria_1`, `ch_ac_testable_1`** ❌ | **يُترك فارغاً متعمداً** |

### حالة C — `request_type = "integration"` (لا يُستخدم في الـ26 الحالية)
لم يُصنَّف أي تطوير حالي كـ "تكامل خارجي" (مع أن النفاذ الوطني والتوقيع الإلكتروني والذكاء الاصطناعي تتضمن تكاملات، فهي مصنّفة كـ `new` لأن البنية التحتية الجديدة جوهرية).

---

## الحقول التي تُترك فارغة متعمداً ❌

طبقاً لطلبك في `analysis.md` ("بعض الحقول في النموذج لا يتطلب إلى تعبئة مثل التواقيع و معايير القبول"):

### من القسم 2
- ❌ كل حقول معايير القبول: `ac_*`, `ch_ac_*`

### من الأقسام 3-14 (اختيارية أصلاً)
- ❌ القسم 3: تحليل التأثير على النظام (`am_*`, `tm_*`, `rr_*`, `impact_*`)
- ❌ القسم 4: المدخلات والمخرجات (`inp_*`, `out_*`)
- ❌ القسم 5: المعادلات (`eq_*`, `pre_*`, `post_*`)
- ❌ القسم 6: جدول القرار (`dt_*`)
- ❌ القسم 7: حالات الحدود (`ec_*`)
- ❌ القسم 8: سيناريوهات BDD (`bdd_*`)
- ❌ القسم 10: تأثير DB (`db_*`, `migration_*`)
- ❌ القسم 11: متطلبات غير وظيفية (`nfr_*`, `perf_*`)
- ❌ القسم 12: المخاطر (`risk_*`, `dep_*`)
- ❌ القسم 13: الرسائل والإشعارات (`msg_*`, `notif_*`)
- ❌ القسم 14: ملخص للفريق (`contract_*`, `prop_*`, `phpstan_*`, ...)

### من القسم 15
- ❌ كل قوائم تحقق المراجعة: `check_pm_*`, `check_qa_*`, `check_tech_*`
- ❌ كل التواقيع: `sig_pm_*`, `sig_analyst_*`, `sig_qa_*`, `sig_tech_*`, `sig_prod_*`
- ✅ صف واحد فقط في سجل التعديلات: `log_date_1`, `log_ver_1`, `log_author_1`, `log_change_1` (يحوي تاريخ التوليد + الإصدار 1.0 + "توليد آلي من developments.js")

---

## حقل `request_type` الديناميكي

عند فتح ملف JSON في `ANALYSIS_DOCUMENT_TEMPLATE.html`:
- إذا كان `_requestType: "new"` → القالب يعرض القسم 2A (وصف الخاصية الجديدة + قصص + معايير + الواجهات).
- إذا كان `_requestType: "change"` → القالب يعرض القسم 2B (As-Is + To-Be + قصص اختيارية + الواجهات).
- الحقل الخفي `_requestType` يجب أن يطابق `request_type` (الحقل المرئي).

---

## مثال كامل — JSON رئيسي لتطوير 101 (تعديل)

```json
{
  "_document": "Feature Analysis Document (FAD)",
  "_company": "شركة التحول التقني (TTS)",
  "_savedAt": "2026-05-07T10:00:00.000Z",
  "_savedBy": "آلي — generate-fad-jsons.js",
  "_role": "analyst",
  "_requestType": "change",
  "_attachments": { "general": [], "int_api_doc": [] },
  "version": "1.0",
  "feature_id": "NDM-DEV-P0-F101",
  "feature_name": "توحيد نماذج إنشاء الحسابات + فئات متغيرة بأسعار",
  "product": "نظم (Nadhem)",
  "pm_name": "أحمد محمد",
  "analyst": "سارة علي",
  "analysis_date": "2026-05-07",
  "doc_id": "NDM-DEV-P0-F101",
  "doc_date": "2026-05-07",
  "doc_status": "مسودة",
  "priority": "P1",
  "request_type": "change",
  "shared_feature": "لا",
  "change_as_is": "النظام الحالي يحوي مسارات تسجيل منفصلة لكل دور (attendee, speaker, consultant, paper-author, program-presenter, session-director) عبر /register/{type}، مع نماذج مختلفة لكل نوع. حسابات اللجنة العلمية متفرّقة (ScientificUserController) ولا تدعم مستخدماً واحداً بأدوار متعددة.",
  "change_to_be": "مسارين متكاملين: (1) توحيد نموذج إنشاء الحساب للمستخدمين — \"مشارك\" يصبح حضور أو كبار شخصيات، مع إضافة فئات متغيرة من كل نوع... (2) توحيد نماذج اللجنة العلمية تحت اسم موحد \"المشاركين\"...",
  "ch_us_id_1": "US-01",
  "ch_us_as_1": "منظم فعالية",
  "ch_us_want_1": "إدارة فئات الحضور المتغيرة بأسعار مختلفة",
  "ch_us_so_1": "أتمكّن من تقديم تجارب متعددة للحاضرين بأسعار تنافسية",
  "iface_admin": "نعم",
  "iface_admin_desc": "تعديل لوحة الإدارة لدعم إدارة فئات الحضور والمشاركين متعددي الأدوار",
  "iface_user": "نعم",
  "iface_user_desc": "تعديل صفحات /account و /register لإظهار الفئة المختارة وإمكانية التبديل بين الأدوار",
  "iface_public": "لا",
  "iface_public_desc": "",
  "iface_api": "نعم",
  "iface_api_desc": "إضافة endpoints جديدة لإدارة الفئات وتسجيل المشاركين متعددي الأدوار",
  "log_date_1": "2026-05-07",
  "log_ver_1": "1.0",
  "log_author_1": "آلي — generate-fad-jsons.js",
  "log_change_1": "الإصدار الأولي — توليد آلي من developments.js"
}
```

---

## مثال كامل — JSON فرعي (مهمة تفصيلية تحت تطوير 101)

ملف `FAD_DEV-101.1.1_v1.0.json` (أبسط بكثير):

```json
{
  "_document": "Feature Analysis Document (FAD) — Subtask",
  "_parent_id": "DEV-101",
  "_phase": "analysis",
  "_savedAt": "2026-05-07T10:00:00.000Z",
  "_requestType": "change",
  "version": "1.0",
  "feature_id": "NDM-DEV-P0-F101.1.1",
  "feature_name": "مراجعة نماذج التسجيل الحالية (حضور، شخصيات، علمية) وتحديد الحقول المشتركة والمتغيرة",
  "product": "نظم (Nadhem)",
  "pm_name": "أحمد محمد",
  "analyst": "سارة علي",
  "analysis_date": "2026-05-07",
  "priority": "P1",
  "request_type": "change",
  "estimated_duration": "1 يوم",
  "change_as_is": "<موروث من DEV-101>",
  "change_to_be": "مراجعة نماذج التسجيل الحالية (حضور، شخصيات، علمية) وتحديد الحقول المشتركة والمتغيرة"
}
```
