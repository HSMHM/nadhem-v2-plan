// classification.js
// مصدر الحقيقة لتصنيف الـ26 تطويراً (4 عاجلة + 22 مخططة) — متطابق مع docs/03-developments-classification.md

export const CLASSIFICATION = {
  101: { type: 'change', section: 'mod', interfaces: ['admin','user','api'] },
  102: { type: 'change', section: 'mod', interfaces: ['admin','public','api'] },
  103: { type: 'change', section: 'mod', interfaces: ['admin','api'] },
  104: { type: 'change', section: 'mod', interfaces: ['admin','api'] },
  1:   { type: 'new',    section: 'add', interfaces: ['admin','user','public','api'] },
  2:   { type: 'change', section: 'mod', interfaces: ['admin','api'] },
  3:   { type: 'change', section: 'mod', interfaces: ['admin','user','api'] },
  4:   { type: 'new',    section: 'add', interfaces: ['admin','user','api'] },
  5:   { type: 'new',    section: 'add', interfaces: ['admin','user','public','api'] },
  6:   { type: 'new',    section: 'add', interfaces: ['admin','public','api'] },
  8:   { type: 'new',    section: 'add', interfaces: ['admin','api'] },
  9:   { type: 'new',    section: 'add', interfaces: ['api'] },
  10:  { type: 'change', section: 'mod', interfaces: ['admin','api'] },
  11:  { type: 'change', section: 'mod', interfaces: ['admin','api'] },
  12:  { type: 'change', section: 'mod', interfaces: ['admin','user','public','api'] },
  14:  { type: 'new',    section: 'add', interfaces: ['admin','api'] },
  15:  { type: 'new',    section: 'add', interfaces: ['admin','user','public'] },
  16:  { type: 'new',    section: 'add', interfaces: ['admin','user','public','api'] },
  17:  { type: 'new',    section: 'add', interfaces: ['admin','user','api'] },
  18:  { type: 'new',    section: 'add', interfaces: ['admin','user','public','api'] },
  19:  { type: 'new',    section: 'add', interfaces: ['admin','api'] },
  20:  { type: 'new',    section: 'add', interfaces: ['admin','public','api'] },
  21:  { type: 'new',    section: 'add', interfaces: ['admin','user','api'] },
  22:  { type: 'new',    section: 'add', interfaces: ['admin','user','api'] },
  23:  { type: 'change', section: 'mod', interfaces: ['admin','api'] },
  24:  { type: 'new',    section: 'add', interfaces: ['admin','user','api'] },
};

// شرح "الوضع الحالي" (As-Is) لكل تعديل — مأخوذ من 03-developments-classification.md
// السكربت يستخدمه عند ملء change_as_is في FAD
export const AS_IS_DESCRIPTIONS = {
  101: 'النظام الحالي يحوي مسارات تسجيل منفصلة لكل دور (attendee, speaker, consultant, paper-author, program-presenter, session-director) عبر /register/{type}، مع نماذج مختلفة لكل نوع. حسابات اللجنة العلمية متفرّقة (ScientificUserController) ولا تدعم مستخدماً واحداً بأدوار متعددة. لا توجد فئات حضور متغيرة بأسعار مختلفة.',
  102: 'واجهات admin الحالية مبنية على Vue 2 SPA (resources/js/Admin/) بتصميم بصري قديم. ملفات ثيمات أساسية موجودة (theme.dark.css, theme.unrounded.css) لكن بدون آلية تبديل ديناميكي للثيمات للواجهة الخارجية، ولا يوجد Theme Engine.',
  103: 'الجلسات وأماكنها موجودة حالياً تحت اللجنة العلمية (scientific-event-places-list permission). جدول الفعالية في موقع منفصل. لجنة الشراكات موجودة كلجنة منفصلة (PartnershipCommitteeRoutes.js) مع CRUD كامل لطلبات الشراكة، منفصلة عن لجنة الرعايات والمعارض.',
  104: 'DashboardController موجود ولديه views للوحة المعلومات، مع تقارير حضور وبطاقات أساسية، لكن بدون رسوم بيانية متقدّمة أو فلترة متطورة. تقارير حضور الورش بدائية.',
  2: 'كل اللجان الثمانية (Exhibition, Finance, Sponsor, Scientific, Logistics, Organization, Informative, Partnership) موجودة في Admin SPA كل واحدة مع routes خاص (مثل ExhibitionCommitteeRoutes.js)، بترتيب أقسام داخلية يحتاج تحسيناً وإعادة تنظيم.',
  3: 'خاصية رسم خطط المعرض موجودة عبر DrawPlanExhibition.js (يستخدم Konva.js) و ExhibitionPlanService.php. الرسم الحالي بسيط بدون تجربة تفاعلية كاملة، ولا يدعم حالات المساحة (متاحة/محجوزة/مباعة) ولا الحجز والدفع المباشر من الخريطة.',
  6: 'بعد تطوير 102 سيتوفّر ثيمان للواجهة الخارجية. لا توجد حالياً مكتبة قوالب لكل أقسام الواجهة الخارجية (المتحدثين، الجلسات، الرعاة، المعرض، الجدول)، ولا محرر بنائي بالسحب والإفلات يتيح للمنظم ترتيب صفحته.',
  10: 'تطوير 104 سيُحسّن التقارير الأساسية (الحضور، البطاقات، الورش)، لكن لا توجد لوحة مؤشرات لحظية لكل لجنة ولا تقرير ختامي شامل قابل للتصدير PDF/Excel.',
  11: 'بعد تطوير 103 ستُلغى لجنة الشراكات وتُنقل خصائصها إلى الإعلامية في بطاقة "منصة التوقيع". بقي ضبط التسميات الرسمية للأدوار والصلاحيات وتوثيق البنية الجديدة على مستوى المنتج.',
  12: 'LogisticInviteesView.vue موجود لإدارة المدعوين مع CRUD في LogisticCommitteeRoutes.js لكن لا يوجد نظام RSVP تفاعلي. ولا يوجد قسم لخصومات الفنادق والطيران أو خدمات إضافية في اللجنة اللوجستية.',
  16: 'يوجد إدخال جزئي للأوراق العلمية ضمن خصائص اللجنة العلمية (PaperController جزئي)، لكن لا توجد بوابة استقبال متكاملة للباحثين، ولا نظام معايير تحكيم قابل للتخصيص، ولا توزيع تلقائي/يدوي على المحكمين، ولا لوحة محكم بسرّية، ولا مسار اعتماد رسمي مع إخطارات للباحثين.',
  17: 'الاستشارات منقولة إلى اللجنة التنظيمية بعد dev 103، لكن لا يوجد نظام Slots متكامل لكل مستشار (مدد قابلة للتخصيص + إجازات + إعادة فتح فترات)، ولا واجهة حجز للمستفيدين عبر تقويم، ولا متابعة حضور وتقييم للجلسات بعد إتمامها.',
  18: 'البرامج المصاحبة موجودة جزئياً في اللجنة العلمية (workshops + presenters)، لكن لا يوجد نظام سعة مع قوائم انتظار تلقائية عند امتلاء الورشة، ولا تتبع حضور موحَّد عبر QR/Kiosk/يدوي، ولا ربط مباشر للحضور بإصدار شهادة إكمال للمشارك.',
  19: 'لا يوجد منصة موحَّدة لإدارة الحملات. حالياً يتم الإرسال عبر خدمات منفصلة (إشعارات أساسية فقط) دون استهداف ديناميكي للجمهور بفلاتر (نوع/فئة/حالة)، ودون جدولة، ودون تقارير وصول/فتح/تفاعل.',
  20: 'لا يوجد بانٍ نماذج عام في النظام. النماذج الموجودة (التسجيل، الاستبيانات) مبرمجة جامدة (hard-coded) ولا تتيح للمنظم إنشاء استبيان مخصص أو نموذج بحقول مرنة بشروط منطقية.',
  21: 'تطوير 14 (تعزيزات AI) سيغطي توليد بطاقات الحضور والشهادات تلقائياً، لكن لا توجد مكتبة قوالب شهادات متعددة الأنواع (حضور/إكمال ورشة/متحدث/تحكيم)، ولا محرر تصميم، ولا توليد جماعي مع رموز تحقق فريدة وصفحة تحقق عامة.',
  22: 'لا توجد استبيانات/تقييمات منظَّمة بعد الفعالية. لا قوالب جاهزة لتقييم الجلسات والمتحدثين والورش، ولا إرسال تلقائي بعد انتهاء الفعالية، ولا لوحة نتائج موحَّدة بمتوسطات واتجاهات.',
  23: 'تطوير 104 و 10 سيوسّعان لوحة المعلومات والتقارير، لكن لا توجد خرائط حرارية للحضور (Heatmaps لقاعات/ساعات)، ولا تحليل سلوك المستخدمين (Funnel + Cohort)، ولا مقارنات بين الفعاليات للمنظم متعدد الفعاليات، ولا توقعات أساسية.',
  24: 'لا يوجد نظام مجتمعات بعد الفعالية لمتابعة المشاركين بمجموعات وإشعارات. التسوية المالية تتم يدوياً ولا توجد تقارير محاسبية شاملة (دفعات + استرجاعات + اتفاقيات الرعاية)، ولا مولّد تلقائي لقصص النجاح من بيانات الفعالية.',
};

// شرح أوصاف الواجهات لكل نوع
export const INTERFACE_DESCRIPTIONS = {
  admin: 'تعديل/إضافة في Admin SPA (resources/js/Admin/) و routes/admin.php — يؤثر على المنظمين وموظفي اللجان',
  user: 'تعديل/إضافة في صفحات المستخدم المحمية (/account, /dashboard, /register, ...) — يؤثر على الحضور والمشاركين',
  public: 'تعديل/إضافة في الواجهة العامة (resources/views/front/ + branding-front/) — يؤثر على الزوار غير المسجلين',
  api: 'تعديل/إضافة في routes/api.php — endpoints جديدة أو معدّلة لخدمة الواجهات',
};

// Mapping أولوية quarter → priority في FAD
export const PRIORITY_MAP = {
  P0: 'P1', // حرجة — مرحلة التطوير العاجل
  P1: 'P2', // عالية
  P2: 'P3', // متوسطة
  P3: 'P3', // متوسطة
  P4: 'P4', // منخفضة
};
