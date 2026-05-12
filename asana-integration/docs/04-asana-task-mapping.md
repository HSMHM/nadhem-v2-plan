# 04 — ربط التطويرات بمهام أسانا

هذا الملف يحدد بالضبط كيف يبني `push-to-asana.js` كل مهمة في أسانا (الاسم، الوصف، الموعد، المرفق، القسم).

---

## المستوى 1 — المهمة الرئيسية لكل تطوير

### القالب
```js
{
  name: `[DEV-${id}] ${title}`,
  notes: <see template below>,
  projects: [ASANA_PROJECT_GID],
  memberships: [{
    project: ASANA_PROJECT_GID,
    section: classification.section === 'add' ? SECTION_ADD_GID : SECTION_MOD_GID
  }],
  due_on: endDate || null  // صيغة YYYY-MM-DD
}
```

### قالب الوصف (notes)
```
{title}

📌 الموقع في النظام: {location}
🏷️ التصنيف: {تعديل|إضافة}
⚡ الأولوية: {quarter} ({label})
📅 الفترة: {startDate} → {endDate}
⏱️ الإجمالي: {totalDays.total} يوم
   • تحليل: {totalDays.analysis} يوم
   • تصميم: {totalDays.design} يوم
   • تنفيذ: {totalDays.implementation} يوم
   • تدريب: {sum من training tasks}

📝 الوصف:
{description}

📎 الملف المرفق: FAD_DEV-{id}_v1.0.json
   (وثيقة تحليل الميزة الكاملة بصيغة JSON — افتحها بـ ANALYSIS_DOCUMENT_TEMPLATE.html)

🌳 المهام الفرعية في أسانا:
   1. تحليل ({analysis.length} مهمة)
   2. تصميم ({design.length} مهمة)
   3. تنفيذ ({implementation.length} مهمة)
   4. تدريب ({training.length} مهمة)

🔗 المرجع: nadhem-execution-plan/src/data/developments.js#dev-{id}
```

### المرفق
- `fad-jsons/main/FAD_DEV-{id}_v1.0.json`

---

## المستوى 2 — حاويات المراحل

تحت كل مهمة رئيسية، 4 مهام فرعية (بدون مرفق):

| الترتيب | الاسم | الوصف |
|---------|-------|-------|
| 1 | `تحليل` | إجمالي: {totalDays.analysis} يوم — {analysis.length} مهمة فرعية |
| 2 | `تصميم` | إجمالي: {totalDays.design} يوم — {design.length} مهمة فرعية |
| 3 | `تنفيذ` | إجمالي: {totalDays.implementation} يوم — {implementation.length} مهمة فرعية |
| 4 | `تدريب` | إجمالي: {sum} يوم — {training.length} مهمة فرعية |

```js
{
  name: 'تحليل', // أو تصميم/تنفيذ/تدريب
  notes: `إجمالي المرحلة: ${total} يوم — ${count} مهمة فرعية\n\nأنشئ هذه المهمة كـ subtask تحت [DEV-${id}].`,
  // لا due_on، لا section (الـ subtask يأخذ من parent)
}
```

---

## المستوى 3 — المهام التفصيلية

تحت كل مرحلة، المهام من المصفوفة المقابلة في developments.js:

```js
{
  name: `[${task.id}] ${task.task}`,
  notes: `Duration: ${task.duration}\n\nParent: [DEV-${devId}] ${devTitle}\nPhase: ${phase}\n\nFAD attached: FAD_DEV-${task.id}_v1.0.json`,
  // مرفق: fad-jsons/subtasks/FAD_DEV-${task.id}_v1.0.json
}
```

### مثال — DEV-101 / تحليل / 101.1.1
```
الاسم: [101.1.1] مراجعة نماذج التسجيل الحالية (حضور، شخصيات، علمية) وتحديد الحقول المشتركة والمتغيرة

الوصف:
Duration: 1 يوم

Parent: [DEV-101] توحيد نماذج إنشاء الحسابات + فئات متغيرة بأسعار
Phase: analysis

FAD attached: FAD_DEV-101.1.1_v1.0.json

المرفق: fad-jsons/subtasks/FAD_DEV-101.1.1_v1.0.json
```

---

## معالجة `due_on` للمهام الرئيسية

| Quarter | المعالجة |
|---------|----------|
| `P0` (101-104) | استخدم `endDate` المعرّف في developments.js (مثل `2026-05-14`) |
| `P1` | لا `due_on` (أو حسابياً: 30 يوم من إطلاق P1 — يُترك بدون لتجنّب ضغط زائف) |
| `P2`-`P4` | لا `due_on` |

---

## ترتيب الإنشاء في أسانا

السكربت ينشئ المهام بالترتيب التالي للحفاظ على ترتيب صحيح في UI أسانا:

1. **حلقة 1:** كل المهام الرئيسية الـ26 (لتظهر مرتّبة حسب id في القسم)
2. **حلقة 2:** لكل مهمة رئيسية، إنشاء 4 حاويات مراحل بالترتيب: تحليل → تصميم → تنفيذ → تدريب
3. **حلقة 3:** لكل حاوية مرحلة، إنشاء المهام التفصيلية بترتيب id (101.1.1, 101.1.2, ...)
4. **حلقة 4:** رفع المرفقات لكل المهام (الرئيسية + التفصيلية)

> **لماذا فصل المرفقات؟** الـ Asana API يفصل بين `tasks.createTask` و `attachments.createAttachmentForObject` — أفضل ربطها كمرحلة منفصلة لتسهيل إعادة المحاولة عند الفشل.

---

## معالجة الفشل وإعادة التشغيل

السكربت يحفظ الحالة في `scripts/.asana-state.json`:
```json
{
  "createdAt": "2026-05-07T10:00:00.000Z",
  "tasks": {
    "DEV-101": { "mainGid": "1234567", "phases": { "analysis": "12345671", "design": "12345672", "implementation": "12345673", "training": "12345674" }, "leaves": { "101.1.1": "12345675", ... }, "attachments": { "main": true, "101.1.1": true, ... } }
  }
}
```

عند إعادة التشغيل:
- يقرأ `.asana-state.json`
- يتخطى المهام التي لها `gid` مسجّل
- يكمل من حيث توقّف

---

## المعدّلات المتوقعة

| البند | العدد |
|-------|------|
| المهام الرئيسية | 26 |
| حاويات المراحل (4 لكل تطوير) | 104 |
| المهام التفصيلية (مجموع كل المصفوفات) | ~416 |
| **إجمالي المهام في أسانا** | **~546** |
| المرفقات الرئيسية | 26 |
| المرفقات التفصيلية | ~416 |
| **إجمالي المرفقات** | **~442** |

> العدد الفعلي للمهام التفصيلية: مجموع `analysis.length + design.length + implementation.length + training.length` لكل من الـ26 — يُحسب في وقت التشغيل.
