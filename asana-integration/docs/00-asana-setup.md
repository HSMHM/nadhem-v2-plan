# 00 — إعداد أسانا (Asana)

دليل خطوة بخطوة للحصول على المعرّفات الأربعة المطلوبة في `scripts/.env`:

| المتغير | الوصف |
|---------|-------|
| `ASANA_PAT` | Personal Access Token (يبدأ بـ `1/...` أو `2/...`) |
| `ASANA_PROJECT_GID` | معرّف المشروع الذي ستُنشأ فيه المهام |
| `SECTION_ADD_GID` | معرّف قسم "إضافات" داخل المشروع |
| `SECTION_MOD_GID` | معرّف قسم "التعديلات" داخل المشروع |

---

## 1) إنشاء Personal Access Token

1. ادخل [https://app.asana.com/0/my-apps](https://app.asana.com/0/my-apps) (سجّل الدخول إن لم تكن مسجلاً).
2. تحت قسم **Personal access tokens**، اضغط **+ Create new token**.
3. اسم التوكن: `nadhem-fad-integration` (أو ما تريد).
4. **انسخ القيمة فوراً** — لن تُعرض مرة أخرى. ستبدأ بـ `1/` أو `2/`.
5. ضعها في `scripts/.env`:
   ```
   ASANA_PAT=1/1234567890123456:abcdef0123456789abcdef0123456789
   ```

> ⚠️ التوكن سري — لا ترفعه في git. ملف `.env` مدرج في `.gitignore`.

---

## 2) جلب Workspace GID

افتح الرابط التالي في المتصفح (وأنت مسجّل دخول):
```
https://app.asana.com/api/1.0/workspaces
```
ستحصل على JSON يحوي قائمة Workspaces. خذ قيمة `gid` للـ workspace الخاص بك.

> هذا اختياري — السكربت يستخدم Project GID مباشرة، لكن قد تحتاج Workspace GID لاحقاً.

---

## 3) جلب Project GID

### الطريقة الأسهل — من رابط المشروع
1. افتح المشروع الذي ستُنشأ فيه المهام في أسانا.
2. انظر إلى رابط المتصفح، سيكون بالشكل:
   ```
   https://app.asana.com/0/<PROJECT_GID>/list
   ```
   أو
   ```
   https://app.asana.com/0/<WORKSPACE_GID>/<PROJECT_GID>/list
   ```
3. الرقم الطويل بعد `/0/` (أو الثاني في الصيغة الثانية) هو `ASANA_PROJECT_GID`.

ضعه في `.env`:
```
ASANA_PROJECT_GID=1207890123456789
```

---

## 4) إنشاء القسمَين والحصول على Section GIDs

### إنشاء الأقسام يدوياً في أسانا
1. افتح المشروع → عرض **Board** أو **List**.
2. اضغط **+ Add section** أو الزر `+` في أعلى اللوحة.
3. أنشئ قسماً اسمه: **`إضافات`**
4. أنشئ قسماً ثانياً اسمه: **`التعديلات`**

> إذا كانت الأقسام موجودة بالفعل لديك بأسماء مختلفة، ستحدد أسماءها في `.env` بدل إنشائها.

### جلب GIDs الأقسام عبر API
افتح الرابط (استبدل `<PROJECT_GID>`):
```
https://app.asana.com/api/1.0/projects/<PROJECT_GID>/sections
```
سترى استجابة بالشكل:
```json
{
  "data": [
    { "gid": "1208111111111111", "name": "إضافات" },
    { "gid": "1208222222222222", "name": "التعديلات" },
    { "gid": "1208000000000000", "name": "Untitled section" }
  ]
}
```

ضعهما في `.env`:
```
SECTION_ADD_GID=1208111111111111
SECTION_MOD_GID=1208222222222222
```

### الطريقة البديلة — استخدام السكربت المساعد
بعد إعداد `ASANA_PAT` و `ASANA_PROJECT_GID`، شغّل:
```bash
cd asana-integration/scripts
node -e "require('dotenv').config(); const Asana = require('asana'); const c = Asana.ApiClient.instance; c.authentications['token'].accessToken = process.env.ASANA_PAT; new Asana.SectionsApi().getSectionsForProject(process.env.ASANA_PROJECT_GID).then(r => console.log(r.data.map(s => ({gid:s.gid, name:s.name}))));"
```
ستحصل على قائمة الأقسام مع GIDs.

---

## 5) ملف `.env` النهائي

نسخة كاملة في `scripts/.env.example`. بعد التعبئة:
```env
ASANA_PAT=1/1234567890123456:abcdef0123456789abcdef0123456789
ASANA_PROJECT_GID=1207890123456789
SECTION_ADD_GID=1208111111111111
SECTION_MOD_GID=1208222222222222

# اختياري — للسكربت
ASANA_RATE_LIMIT_MS=400          # تأخير بين الطلبات (default 400ms = 150 req/min)
DEFAULT_PM_NAME=أحمد محمد         # يظهر في FAD field pm_name
DEFAULT_ANALYST_NAME=سارة علي    # يظهر في FAD field analyst
```

---

## 6) التحقق من صحة الإعداد

```bash
cd asana-integration/scripts
node -e "require('dotenv').config(); const Asana = require('asana'); const c = Asana.ApiClient.instance; c.authentications['token'].accessToken = process.env.ASANA_PAT; new Asana.UsersApi().getUser('me').then(r => console.log('✓ PAT صحيح. أنت:', r.data.name)).catch(e => console.error('✗ خطأ:', e.message));"
```

إذا ظهر اسمك → الإعداد ناجح.

---

## 7) حدود معدّل أسانا (Rate Limits)

- الحد القياسي: **150 طلب/دقيقة** لكل توكن.
- مع 412 مهمة + ~336 مرفق = ~750 طلب → تحتاج ~5 دقائق على الأقل.
- السكربت `push-to-asana.js` يحترم ذلك تلقائياً عبر `ASANA_RATE_LIMIT_MS=400`.

إذا حصلت على خطأ `429 Too Many Requests`:
- ارفع `ASANA_RATE_LIMIT_MS` إلى `600` أو أعلى.
- شغّل السكربت مرة أخرى — لديه فحص لتجنّب إعادة إنشاء المهام التي تم إنشاؤها (يستخدم اسم المهمة).

---

## 8) إعادة التشغيل بعد الفشل

السكربت يحفظ تقدّمه في `scripts/.asana-state.json`:
- المهام التي تم إنشاؤها مسجّلة بـ `gid`.
- إذا توقّف السكربت في منتصف العملية، أعد تشغيله — سيكمل من النقطة التي توقف عندها.
- لإعادة البدء من الصفر، احذف هذا الملف يدوياً (ملاحظة: المهام السابقة تبقى في أسانا).
