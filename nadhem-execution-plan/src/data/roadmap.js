export const sectorData = {
  title: 'التمركز القطاعي — 2025',
  sectors: [
    { label: 'غير الربحي', value: 80, color: 'var(--primary)' },
    { label: 'الحكومي', value: 20, color: 'var(--accent-orange)' },
    { label: 'القطاع الخاص', value: 0, color: 'var(--text-muted)' },
  ],
  note: 'تركيز على فعاليات ذات أثر مجتمعي',
};

export const committeesAdoption = [
  { name: 'اللجنة التنظيمية', desc: 'إدارة المسجلين والحضور وإصدار البطاقات', pct: 100, status: 'completed' },
  { name: 'اللجنة العلمية', desc: 'إدارة الجلسات والاستشارات والأوراق العلمية', pct: 100, status: 'completed' },
  { name: 'لجنة الرعاة', desc: 'إدارة باقات الرعاية والرعاة والشركاء', pct: 50, status: 'medium' },
  { name: 'اللجنة الإعلامية', desc: 'إدارة الحملات الإعلانية والأخبار وتغطية الحدث', pct: 50, status: 'medium' },
  { name: 'لجنة المعارض', desc: 'إدارة الجهات العارضة والمساحات وخريطة المعرض', pct: 40, status: 'medium' },
  { name: 'اللجنة المالية', desc: 'إدارة الفواتير والمدفوعات وأكواد الخصم', pct: 0, status: 'inactive' },
  { name: 'اللجنة اللوجستية', desc: 'إدارة التنسيقات العامة وخدمات VIP', pct: 0, status: 'inactive' },
  { name: 'لجنة الشراكات', desc: 'لجنة جديدة', pct: 0, status: 'new' },
];

export const readinessData = {
  avgAdoption: 48,
  completedCommittees: 2,
  mediumCommittees: 3,
  inactiveCommittees: 3,
  activationGap: 52,
};

export const userTypes = [
  { name: 'مدير النظام', icon: 'user-shield', isNew: false },
  { name: 'منظم', icon: 'user-tie', isNew: false },
  { name: 'موظف (صلاحية لجنة)', icon: 'user-gear', isNew: false },
  { name: 'مشارك (عادي + VIP)', icon: 'user', isNew: false },
  { name: 'متحدث', icon: 'microphone', isNew: false },
  { name: 'مقدم ورقة علمية', icon: 'file-lines', isNew: true },
  { name: 'مدير جلسة', icon: 'chalkboard-user', isNew: true },
  { name: 'مستشار', icon: 'user-doctor', isNew: false },
  { name: 'مقدم برنامج مصاحب', icon: 'presentation-screen', isNew: false },
  { name: 'إعلامي', icon: 'camera', isNew: true },
  { name: 'صاحب معرض', icon: 'store', isNew: false },
  { name: 'راعي', icon: 'gem', isNew: false },
];

export const topFeatures = [
  'إدارة تسجيل الحضور',
  'توليد البطاقات والتحضير',
  'إرسال الإشعارات الإعلانية',
  'إدارة المتحدثين والجلسات',
  'إدارة البرامج المصاحبة ومقدمين البرامج',
  'إدارة باقات الرعاية والرعاة',
  'إدارة الجلسات الاستشارية والمستشارين',
  'إدارة جدول الفعالية',
  'إدارة محتوى الصفحات الداخلية',
  'إدارة الهوية البصرية',
];

export const satisfactionData = {
  metrics: [
    { label: 'الشمولية', value: 95 },
    { label: 'سهولة الاستخدام', value: 40 },
    { label: 'التحكم في الهوية', value: 40 },
    { label: 'سرعة التصفح', value: 35 },
    { label: 'السعر', value: 30 },
  ],
  factors: [
    'حجم العميل',
    'كثرة خصائص النظام',
    'محدودية التعامل مع خصائص النظام',
    'قلة موارد الخادم',
    'التحكم الشامل في محتوى الواجهة الرئيسية',
  ],
};

export const marketData = {
  large: [
    { name: 'مؤتمر ليب', participants: '201,000' },
    { name: 'ملتقى بيبان', participants: '182,000' },
    { name: 'معرض سيتي سكيب', participants: '172,000' },
    { name: 'مؤتمر ومعرض الحج والعمرة', participants: '150,000' },
    { name: 'ملتقى الصحة العالمي', participants: '100,000' },
  ],
  medium: [
    { name: 'القمة العالمية للذكاء الاصطناعي', participants: '50,000' },
    { name: 'معرض بلاك هات', participants: '40,000' },
    { name: 'المعرض السعودي الدولي للأغذية', participants: '40,000' },
    { name: 'معرض سيملس', participants: '30,000' },
    { name: 'منتدى مستقبل العقار', participants: '30,000' },
  ],
  small: [
    { name: 'مبادرة مستقبل الاستثمار', participants: '7,000' },
    { name: 'منتدى مبادرة السعودية الخضراء', participants: '4,000' },
    { name: 'ملتقى القطاع غير الربحي في التعليم', participants: '4,000' },
    { name: 'مؤتمر الجيل الخامس في طيبة', participants: '2,000' },
    { name: 'منتدى علوم للبحث والابتكار', participants: '2,000' },
  ],
  verySmall: [
    { name: 'ملتقى أسر الأشخاص ذوي الإعاقة', participants: '1,000' },
    { name: 'قمة CISO الشرق الأوسط', participants: '800' },
    { name: 'ملتقى الصناديق العائلية', participants: '800' },
    { name: 'ملتقى تنمية وتمكين أيتام المملكة', participants: '600' },
    { name: 'مؤتمر ابتكارات المختبرات الطبية', participants: '500' },
  ],
};

export const competitorCategories = [
  { category: 'الفعاليات الكبرى', competitors: ['Sela', 'Tahaluf'] },
  { category: 'المتوسطة', competitors: ['WOTN', 'Eventech'] },
  { category: 'الصغرى والصغيرة جداً', competitors: ['صيتك', 'عزام', 'صاري', 'Zoho Backstage'] },
];

export const comparisonFeatures = [
  { feature: 'إدارة تسجيل الحضور', nadhem: true, wotn: true, eventech: true, azzam: true, zoho: true },
  { feature: 'توليد البطاقات والتحضير', nadhem: true, wotn: true, eventech: true, azzam: true, zoho: true },
  { feature: 'إرسال الإشعارات الإعلانية', nadhem: true, wotn: false, eventech: false, azzam: true, zoho: true },
  { feature: 'إدارة المتحدثين والجلسات', nadhem: true, wotn: true, eventech: false, azzam: false, zoho: true },
  { feature: 'إدارة البرامج المصاحبة', nadhem: true, wotn: true, eventech: true, azzam: false, zoho: false },
  { feature: 'إدارة باقات الرعاية', nadhem: true, wotn: true, eventech: true, azzam: false, zoho: false },
  { feature: 'إدارة الجلسات الاستشارية', nadhem: true, wotn: false, eventech: false, azzam: false, zoho: false },
  { feature: 'إدارة جدول الفعالية', nadhem: true, wotn: true, eventech: true, azzam: true, zoho: true },
  { feature: 'إدارة محتوى الصفحات', nadhem: true, wotn: true, eventech: true, azzam: true, zoho: true },
  { feature: 'إدارة الهوية البصرية', nadhem: true, wotn: true, eventech: true, azzam: false, zoho: true },
];

export const challengesData = [
  { title: 'قلة الموارد (مصمم، محلل، مسوق)', icon: 'users-slash' },
  { title: 'ضعف خصائص الخادم', icon: 'server' },
  { title: 'ارتفاع الأسعار للعملاء (الفعاليات الصغيرة والصغرى)', icon: 'money-bill-trend-up' },
  { title: 'قلة التقارير', icon: 'chart-simple' },
  { title: 'طلبات التخصيص على التصميم أو على الوظائف', icon: 'palette' },
  { title: 'صعوبة فهم العميل للتعامل مع بعض الخصائص', icon: 'circle-question' },
  { title: 'متطلب حضور الدعم الفني أثناء الفعالية', icon: 'headset' },
  { title: 'الطلب المتكرر لخاصية تعدد الفعاليات (غير مدعومة حالياً)', icon: 'layer-group' },
  { title: 'عدم رغبة العميل في تجديد الاشتراك', icon: 'rotate-left' },
];

export const roadmapDevelopments = {
  urgent: [
    { title: 'توحيد نماذج الحسابات + الفئات بأسعار + المشاركين العلميين', description: 'مشارك = حضور أو VIP بفئات متغيرة (عنوان + وصف + سعر). وتوحيد المتحدثين/مدراء الجلسات/المستشارين/مقدمي الأوراق/البرامج تحت "المشاركين" متعددي الأدوار', priority: 'urgent', icon: 'user-gear' },
    { title: 'تحسين تجربة المستخدم — التصميم', description: 'إعادة تصميم كل واجهات مدير النظام + بناء ثيمات (قوالب) خارجية للمنصة (Themes) للواجهة الخارجية بنفس هيكلة الوضع الحالي وبتنسيق بديل', priority: 'urgent', icon: 'pen-ruler' },
    { title: 'تطوير الخصائص — إعادة الهيكلة (المرحلة الأولى)', description: 'نقل أماكن الجلسات والاستشارات وجدول الفعالية إلى داخل اللجنة التنظيمية، وإلغاء لجنة الشراكات مع نقل خصائصها إلى اللجنة الإعلامية في بطاقة باسم "منصة التوقيع"', priority: 'urgent', icon: 'arrows-rotate' },
    { title: 'تطوير التقارير ولوحة المعلومات', description: 'رسوم بيانية مفصلة أكثر + تحسين تقارير الحضور والبطاقات وحضور الورش', priority: 'urgent', icon: 'chart-line-up' },
  ],
  structure: [
    { title: 'نظام الوحدات والباقات', description: 'تقسيم النظام إلى 16 وحدة موزعة ضمن 4 باقات سنوية، مع مصفوفة وحدات × باقات كاملة', priority: 'high', icon: 'puzzle-piece' },
    { title: 'إعادة هيكلة اللجان — (المرحلة الثانية)', description: 'استكمال إعادة هيكلة اللجان نتيجة تقسيم النظام إلى وحدات ومعرفة توزيع الخصائص في اللجان', priority: 'high', icon: 'arrows-rotate' },
    { title: 'نظام التصميم الموحد (Design System) — v2', description: 'بناء مكتبة مكونات موحّدة + توحيد الألوان والخطوط + تطبيق تدريجي على كامل واجهات النظام', priority: 'medium', icon: 'palette' },
    { title: 'التكامل مع النفاذ الوطني', description: 'تجهيز البنية التحتية لتسجيل دخول موحّد عبر الهوية الوطنية للمستخدمين السعوديين (الربط الفعلي يتم لكل منظم على حدة)', priority: 'medium', icon: 'fingerprint' },
    { title: 'التوقيع الإلكتروني', description: 'عقود واتفاقيات رقمية للرعاة والعارضين والشركاء', priority: 'medium', icon: 'signature' },
  ],
  features: [
    { title: 'تطوير خريطة المعرض التفاعلية', description: 'قراءة المساحات، تحديد الأسعار، والحجز', priority: 'high', icon: 'map-location-dot' },
    { title: 'قوالب الواجهة v2 + السحب والإفلات', description: 'توسيع الثيمين العاجلين إلى مكتبة قوالب كاملة + محرر بنائي يتيح للمنظم ترتيب صفحته', priority: 'high', icon: 'clone' },
    { title: 'تطويرات داعمة', description: 'الدعوات التفاعلية + الخصومات والخدمات (فنادق/طيران) — توفير فنادق ومرافق إضافية', priority: 'medium', icon: 'puzzle-piece' },
    { title: 'دمج وتوحيد بنية اللجان — v2', description: 'توثيق رسمي للبنية الجديدة بعد إلغاء الشراكات في مرحلة التطوير العاجل', priority: 'medium', icon: 'merge' },
  ],
  technical: [
    { title: 'تقارير الأداء اللحظية والتقرير الختامي — v2', description: 'توسيع مرحلة التطوير العاجل: لوحة مؤشرات لحظية لكل لجنة وتقرير ختامي قابل للتصدير PDF و Excel', priority: 'high', icon: 'chart-line-up' },
    { title: 'التكامل مع أجهزة الخدمات الذاتية (Kiosks)', description: 'تحضير ذاتي وطباعة فورية للبطاقات في موقع الفعالية', priority: 'medium', icon: 'print' },
    { title: 'تطبيق هواتف ذكية', description: 'تحويل منصة العميل إلى تطبيق جوال', priority: 'high', icon: 'mobile-screen' },
    { title: 'ربط الذكاء الاصطناعي', description: 'مساعد ذكي للنظام، اقتراح الجدول، إدخال محتوى الورش والصفحات، تصميم الصفحات والبطاقات والشهادات، وتوليد الأسئلة الشائعة', priority: 'low', icon: 'robot' },
  ],
};

export const roadmapModules = [
  'إدارة تسجيل الحضور والبطاقات',
  'الحملات الإعلانية',
  'إدارة الجهات العارضة',
  'مخطط المساحة (خريطة المعرض)',
  'تعيين نطاق مخصص',
  'إدارة المتحدثين والجلسات',
  'إنشاء صفحات إضافية',
  'إدارة البرامج المصاحبة',
  'إدارة باقات الرعاية والرعاة',
  'إدارة الجلسات الاستشارية والمستشارين',
  'إضافة اسم مرسل مخصص',
  'التحليلات الفورية',
  'تطبيق الهواتف الذكية',
  'إرسال وإدارة الدعوات',
  'إدارة النماذج',
  'زيادة المساحة (50 جيجا)',
];

export const roadmapTimeline = [
  {
    quarter: '19 أبريل – 14 مايو 2026 (عاجلة)',
    urgent: true,
    items: [
      'توحيد نماذج الحسابات + الفئات المتغيرة بأسعار + توحيد المشاركين العلميين',
      'تحسين تجربة المستخدم — التصميم (واجهات الإدمن + ثيمات الواجهة الخارجية)',
      'تطوير الخصائص — إعادة الهيكلة (المرحلة الأولى): نقل الجلسات/الاستشارات/الجدول إلى التنظيمية + بطاقة "منصة التوقيع" في الإعلامية',
      'تطوير التقارير ولوحة المعلومات (حضور، بطاقات، ورش، رسوم بيانية)',
    ],
  },
  {
    quarter: 'مايو – يونيو 2026',
    items: ['نظام الوحدات والباقات', 'إعادة هيكلة اللجان — (المرحلة الثانية)', 'دمج وتوحيد بنية اللجان — v2'],
  },
  {
    quarter: 'يوليو – أغسطس 2026',
    items: ['تطوير خريطة المعرض التفاعلية', 'التوقيع الإلكتروني', 'قوالب الواجهة v2 + السحب والإفلات'],
  },
  {
    quarter: 'سبتمبر – أكتوبر 2026',
    items: ['التكامل مع النفاذ الوطني', 'تقارير الأداء اللحظية والتقرير الختامي — v2', 'التكامل مع أجهزة الخدمات الذاتية (Kiosks)', 'تطبيق الهواتف الذكية', 'ربط الذكاء الاصطناعي', 'تطويرات داعمة'],
  },
  {
    quarter: 'نوفمبر – ديسمبر 2026',
    items: ['نظام التصميم الموحد (Design System) — v2'],
  },
];
