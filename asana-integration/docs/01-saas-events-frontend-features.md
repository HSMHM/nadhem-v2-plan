# 01 — كتالوج خصائص المشروع المرجعي (saas-events-frontend)

> **ملاحظة للوكيل:** عند الحاجة لتفاصيل أعمق، ارجع للمشروع الحالي مباشرة في `x:/laragon/www/saas-events-frontend/` — هذا الملف ملخّص شامل، وليس بديلاً عن قراءة الكود.

هذا الملف هو **المرجع التحليلي** الذي يستخدمه:
1. سكربت `generate-fad-jsons.js` لملء حقل `feature_id` و `iface_*` و `change_as_is` في FAD.
2. ملف `03-developments-classification.md` لتحديد إن كانت كل تطوير "إضافة" (لا توجد الخاصية) أم "تعديل" (الخاصية موجودة).

---

## 1) التقنية والبنية

| الجانب | التفاصيل |
|--------|----------|
| **الإطار الخلفي** | Laravel 10 (PHP) |
| **الإطار الأمامي** | Vue 2 SPA (Admin & Super-Admin) + Blade Views (Front) |
| **التنسيق** | TailwindCSS 2.0 + Bootstrap 4.6 + SASS |
| **حزم البناء** | Laravel Mix (Webpack) |
| **التدويل (i18n)** | Vue-i18n 8 + Laravel Localization (`ar`, `en`) — RTL كامل |
| **API & Auth** | Laravel Sanctum (Token-based) + Axios |
| **الوقت الفعلي** | Pusher + Laravel Echo |
| **الدفع** | ClickPay, HyperPay, Rajhi, TAP (PaymentGatewayEnum) |
| **التتبع** | Sentry |
| **الواجهات الإدارية** | Vue SPAs: `Admin/`, `SuperAdmin/` (Vuex stores) |

---

## 2) المسارات (Routes) — الواجهة العامة

من [`routes/web.php`](x:/laragon/www/saas-events-frontend/routes/web.php):

| المسار | الغرض |
|--------|-------|
| `/` | الصفحة الرئيسية |
| `/search` | البحث الشامل |
| `/pages/{slug}` | صفحات CMS الديناميكية (about, terms, privacy) |
| `/certificates/verify` | التحقق من شهادة عبر QR |
| `/faq` | الأسئلة الشائعة |
| `/news` | الأخبار والمقالات |
| `/media` | معرض الوسائط |
| `/speakers` | المتحدثون |
| `/sponsors` | الرعاة |
| `/exhibitions` | المعارض والعارضون |
| `/programs` | البرامج المصاحبة |
| `/event-schedule` | جدول الفعالية |
| `/sessions` | تفاصيل الجلسات |
| `/users` | دليل الحضور |
| `/contact-us` | تواصل معنا |
| `/login`, `/forgot-password`, `/reset-password/{token}` | المصادقة |
| `/login/confirm` | تأكيد 2FA |
| `/register/{type}` | تسجيل حسب الدور (8 أنواع) |

### المسارات المحمية (`auth` middleware)

| المسار | الغرض |
|--------|-------|
| `/account` | إعدادات الحساب |
| `/dashboard` | لوحة المستخدم |
| `/invoices` | الفواتير والدفع |
| `/certificates` | شهاداتي |
| `/my-schedule` | جدولي المخصص |
| `/qr-card` | بطاقة QR |
| `/notifications` | مركز الإشعارات |
| `/chats` | الرسائل/المحادثات |
| `/favorites` | المفضّلات |
| `/payment` | معالجة الدفع |
| `/consultations` | طلبات الاستشارات |
| `/consultations-incoming` | استشارات واردة (للمستشار) |
| `/papers` | الأوراق العلمية |
| `/program-requests` | طلبات المشاركة في البرامج |
| `/partnership-requests` | طلبات الشراكات |
| `/exhibition-employees` | موظفو جناح المعرض |
| `/sponsor-employees` | فريق الرعاية |
| `/consultants/create` | تسجيل كمستشار |

### مسارات الإدارة
- `/admin/*` — Admin SPA ([`routes/admin.php`](x:/laragon/www/saas-events-frontend/routes/admin.php))
- `/super-admin/*` — Super-Admin SPA ([`routes/super-admin.php`](x:/laragon/www/saas-events-frontend/routes/super-admin.php))

---

## 3) الوحدات حسب المجال (12 مجالاً) — `feature_id` المقترح

### S01 — إدارة الفعاليات الأساسية
- **F01** — جدول الفعالية (EventScheduleController, EventScheduleService)
- **F02** — الجلسات (EventSessionController, EventSessionService)
- **F03** — أماكن الجلسات (EventPlaceController, EventPlaceService)
- **F04** — أقسام الأجندة وتوقيت الجلسات
- **F05** — حالة البث الحي (LiveStatusEnum)

### S02 — التسجيل والأدوار
- **F01** — نماذج التسجيل الديناميكية (`register/{type}`)
- **F02** — أنواع المستخدمين (UserTypeEnum) — 16 نوعاً
- **F03** — أدوار المشاركين (ParticipantRoleEnum)
- **F04** — خدمة المصادقة (AuthService, SocialLoginController, SocialProviderService)
- **F05** — التحقق بـ 2FA (`/login/confirm`)

### S03 — المعارض (Exhibitions)
- **F01** — قائمة المعارض والعارضون (ExhibitionController, ExhibitionService)
- **F02** — موظفو المعرض (ExhibitionEmployeeService)
- **F03** — خطط المعرض (ExhibitionPlanService)
- **F04** — حقول مخصصة للعارض (ExhibitionOwnerFieldTypeEnum)
- **F05** — لجنة المعارض الإدارية (`ExhibitionCommitteeRoutes.js`)

### S04 — الرعايات (Sponsorships)
- **F01** — الرعاة (SponsorController, SponsorService)
- **F02** — موظفو الراعي (SponsorEmployeeService)
- **F03** — خطط الرعاية (SponsorPlanService)
- **F04** — لجنة الرعايات الإدارية (`SponsorCommitteeRoutes.js`)

### S05 — البرامج والاستشارات
- **F01** — البرامج المصاحبة (ProgramController, ProgramService)
- **F02** — طلبات المشاركة في البرامج (ProgramRequestService)
- **F03** — أنواع حضور البرنامج (ProgramAttendeeTypeEnum)
- **F04** — الاستشارات (ConsultationController, ConsultationService)
- **F05** — المستشارون (ConsultantController, ConsultantService)
- **F06** — الاستشارات الواردة (ConsultationIncomingController)

### S06 — اللجنة العلمية والأوراق
- **F01** — أعضاء اللجنة العلمية (ScientificUserController, ScientificUserService)
- **F02** — الأوراق العلمية (PaperController, PaperService)
- **F03** — مدراء الجلسات (Session Directors)
- **F04** — اللجنة العلمية الإدارية (`ScientificCommitteeRoutes.js`)

### S07 — المحتوى والمعرفة
- **F01** — الأخبار (NewsController, NewsService)
- **F02** — معرض الوسائط (MediaController, MediaService)
- **F03** — الأسئلة الشائعة (FaqController, FaqService)
- **F04** — صفحات CMS (PageController, PageService)
- **F05** — ملفات المكتبة (LibraryFileController, LibraryFileService)
- **F06** — التعليقات والمراجعات (CommentController, ReviewController, ReviewService)

### S08 — الشهادات والاعتماد
- **F01** — توليد الشهادات (CertificateService)
- **F02** — التحقق العام من الشهادة (`/certificates/verify`)
- **F03** — التحقق من الحضور (AttendeeController)
- **F04** — توليد PDF عبر Token

### S09 — الدفع والفواتير
- **F01** — بوابات الدفع (PaymentGatewayEnum: ClickPay, HyperPay, Rajhi, TAP)
- **F02** — معالجة الدفع (PaymentController, PaymentService)
- **F03** — سجل الدفع (PaymentLogTypeEnum)
- **F04** — الفواتير (InvoiceController, InvoiceService, InvoiceStatusEnum)
- **F05** — الكوبونات (CouponService)
- **F06** — اللجنة المالية الإدارية (`FinanceCommitteeRoutes.js`)

### S10 — حساب المستخدم
- **F01** — لوحة الحساب (`/account`, `/dashboard`)
- **F02** — جدولي المخصص (MyScheduleController, MyScheduleService)
- **F03** — المفضّلات (FavoriteController, FavoriteService)
- **F04** — بطاقة QR (QrCardController, QrCardService)
- **F05** — الإشعارات (NotificationController, NotificationService)
- **F06** — المحادثات (ChatController, ChatMessageController, ChatService)

### S11 — الأدوات الإدارية والإعدادات
- **F01** — الفئات (CategoryService)
- **F02** — النماذج الديناميكية (DynamicFormController, DynamicFormService, FieldService)
- **F03** — البريد الوارد (InboxMessagesController, ContactUsService)
- **F04** — قوالب البريد الإلكتروني
- **F05** — إعدادات النظام والمستأجر (`config/tenant.php`)
- **F06** — قائمة التنقل (MenuSectionService, MenuLinkService)

### S12 — التنظيم واللوجستيات
- **F01** — أماكن الفعالية (EventPlaceController)
- **F02** — تتبع الحضور (AttendanceEmployeeService)
- **F03** — خدمات لوجستية (LogisticServiceController, etc.)
- **F04** — المدعوون (Invitees Management)
- **F05** — اللجنة اللوجستية الإدارية (`LogisticCommitteeRoutes.js`)

### S13 — اللجان الإدارية الثمانية
كل لجنة لها مسار/Vuex module مستقل في Admin SPA:
1. **Exhibition Committee** — لجنة المعارض
2. **Finance Committee** — اللجنة المالية
3. **Sponsor Committee** — لجنة الرعايات
4. **Scientific Committee** — اللجنة العلمية
5. **Logistics Committee** — اللجنة اللوجستية
6. **Organization Committee** — اللجنة التنظيمية
7. **Informative Committee** — اللجنة الإعلامية
8. **Partnership Committee** — لجنة الشراكات (مقرر إلغاؤها في تطوير 103)

---

## 4) أنواع المستخدمين (UserTypeEnum) — 16 نوعاً

| النوع | الدور |
|-------|------|
| `user` | مستخدم أساسي |
| `attendee` | حاضر فعالية |
| `speaker` | متحدث |
| `consultant` | مستشار |
| `sponsor` | راعي |
| `exhibition` | عارض/جناح |
| `employee` | موظف إدارة |
| `admin` | مدير نظام |
| `paper-author` | مقدم ورقة علمية |
| `program-presenter` | مقدم برنامج مصاحب |
| `session-director` | مدير جلسة |
| `sponsor-employee` | موظف رعاية |
| `exhibition-employee` | موظف معرض |
| `attendance-employee` | موظف تسجيل/استقبال |
| `partner-organization` | جهة شراكة |
| `participant` | مشارك (عام) |

### أدوار المشاركين (ParticipantRoleEnum)
- `speaker`, `consultant`, `session-director`, `paper-author`, `program-presenter`

> **مرجع للتطوير 101:** هذه القائمة هي ما سيُوحَّد تحت "المشاركين" متعددي الأدوار.

---

## 5) المرفقات والمسارات في نظام الملفات

| المجلد | المحتوى |
|--------|---------|
| `app/Http/Controllers/Front/` | 41 Controller للواجهة العامة |
| `app/Http/Controllers/Admin/` | Controllers لـ Admin SPA |
| `app/Services/` | 51 Service Class |
| `app/Enums/` | 21 Enum (UserTypeEnum, PaymentGatewayEnum, etc.) |
| `app/Models/` | Eloquent models |
| `resources/views/front/` | Blade views (الواجهة الكلاسيكية) |
| `resources/views/branding-front/` | Blade views (هوية جديدة "satac-branding" — جارٍ الترحيل) |
| `resources/views/admin/` | Layout لـ Admin SPA |
| `resources/views/super-admin/` | Layout لـ Super-Admin SPA |
| `resources/js/Admin/` | Vue 2 Admin SPA + Vuex |
| `resources/js/SuperAdmin/` | Vue 2 Super-Admin SPA |
| `resources/js/common/` | مكونات/أدوات مشتركة |
| `resources/lang/{ar,en}/` | ملفات الترجمة |
| `routes/web.php` | الواجهة العامة |
| `routes/admin.php` | لوحة المنظم |
| `routes/super-admin.php` | لوحة مدير النظام |
| `routes/api.php` | API endpoints |
| `routes/channels.php` | Pusher broadcasting |
| `config/{app,tenant,payment,auth,services}.php` | إعدادات |
| `public/satac-branding/css/main.css` | CSS الهوية الجديدة |

---

## 6) الأنظمة الخاصة

### نظام الهوية الجديد (Branding Migration — جارٍ)
- مفصّل في [`BRANDING_MIGRATION_PLAN.md`](x:/laragon/www/saas-events-frontend/BRANDING_MIGRATION_PLAN.md) في جذر المشروع
- مسار جديد: `resources/views/branding-front/`
- تصميم Glassmorphism + الوضع الداكن + لون cyan `#11c5d4`
- مكتمل: Home, Login, Register, Forgot/Reset, Contact, Error
- معلّق: 30+ صفحة (FAQ, News, Media, Dashboard, Certificates, ...)

### تعدّد المستأجرين (Multi-Tenancy)
- ملف الإعداد: `config/tenant.php` (هيكل أساسي حالياً)
- المفهوم: كل منظم فعالية له سياق منفصل

### التدويل (i18n)
- Laravel Localization (server-side): `resources/lang/{ar,en}/`
- Vue-i18n (client-side): `i18n-js` npm package
- خط Arabic: "Noto Kufi Arabic"
- RTL أساسي

### تكامل API الخارجي
- **Product API** (Guzzle-based) — قابل للإعداد عبر env
- **API Versioning** — `config/app.php` → `api_ver` (default `api/v1/`)

---

## 7) كيفية استخدام هذا الكتالوج

### للوكيل عند توليد FAD JSON:
1. **`feature_id`** — استخدم النمط `S{XX}-DEV-P{Q}-F{NN}` حيث:
   - `S{XX}` = رقم المجال (S01-S13 من فوق)
   - `P{Q}` = الأولوية (P0-P4 من حقل `quarter`)
   - `F{NN}` = رقم الميزة المتسلسل
   - مثال: `S02-DEV-P0-F101` = ميزة 101 في مجال "التسجيل والأدوار" بأولوية P0

2. **`iface_admin`** — حدد "نعم" إذا كانت التطوير يمس routes/admin.php أو Vue Admin SPA.

3. **`iface_user`** — حدد "نعم" إذا كانت التطوير يمس routes/web.php (المسارات المحمية).

4. **`iface_public`** — حدد "نعم" إذا كانت التطوير يمس الواجهة العامة (المسارات العامة).

5. **`iface_api`** — حدد "نعم" إذا كانت التطوير يحتاج تعديلاً في routes/api.php أو يضيف endpoints.

6. **`change_as_is`** للتعديلات — صف الوضع الحالي بناءً على ما هو موجود في الجداول السابقة.

7. **`change_to_be`** — استخدم `description` من developments.js مباشرة.
