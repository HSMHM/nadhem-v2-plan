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
  structure: [
    { title: 'تنفيذ خطة الوحدات (Modules)', description: 'تحويل خصائص النظام إلى وحدات منفصلة يمكن تفعيلها أو تعطيلها حسب الباقة', priority: 'high', icon: 'puzzle-piece' },
    { title: 'إعادة هيكلة الخصائص لكل لجنة', description: 'تنظيم الخصائص بحيث كل لجنة تجد أدواتها في مكانها الصحيح', priority: 'high', icon: 'arrows-rotate' },
    { title: 'تطبيق التصميم الموحد (Design System)', description: 'توحيد شكل ومظهر كل صفحات النظام', priority: 'medium', icon: 'palette' },
    { title: 'التكامل مع النفاذ الوطني', description: 'تسجيل دخول آمن عبر النفاذ الوطني السعودي', priority: 'medium', icon: 'fingerprint' },
    { title: 'تمكين التوقيع الإلكتروني', description: 'إمكانية توقيع المستندات والعقود إلكترونياً', priority: 'medium', icon: 'signature' },
  ],
  features: [
    { title: 'تطوير خارطة المعرض', description: 'تحسين الخريطة التفاعلية لحجز المساحات في المعرض المصاحب', priority: 'high', icon: 'map-location-dot' },
    { title: 'قوالب جاهزة للأقسام', description: 'قوالب مصممة مسبقاً (مثل قسم المتحدثين) بدلاً من البناء من الصفر', priority: 'medium', icon: 'clone' },
    { title: 'بناء الأقسام بالسحب والإفلات', description: 'تمكين العميل من ترتيب صفحته بنفسه بدون مساعدة تقنية', priority: 'high', icon: 'grip-dots-vertical' },
    { title: 'تطوير إرسال الدعوات التفاعلية', description: 'الدعوة تصل ويقدر المدعو يوافق أو يرفض مباشرة', priority: 'medium', icon: 'envelope-open-text' },
    { title: 'إضافة خصومات الفنادق والطيران', description: 'قسم في اللجنة اللوجستية يعرض عروض الفنادق والطيران وأكواد الخصم', priority: 'low', icon: 'hotel' },
    { title: 'دمج لجنة الشراكات مع الإعلامية', description: 'توحيد اللجنتين في لجنة واحدة "الشراكات والإعلام"', priority: 'medium', icon: 'merge' },
  ],
  technical: [
    { title: 'تقارير مؤشرات الأداء', description: 'تقارير لحظية وتقرير ختامي لكل فعالية', priority: 'high', icon: 'chart-line-up' },
    { title: 'التكامل مع أجهزة الخدمات الذاتية', description: 'ربط النظام بأجهزة طباعة بطاقات الحضور', priority: 'medium', icon: 'print' },
    { title: 'تطبيق هواتف ذكية', description: 'تحويل منصة العميل إلى تطبيق جوال', priority: 'high', icon: 'mobile-screen' },
    { title: 'ربط الذكاء الاصطناعي', description: 'AI يقترح جدول الفعالية + قاعدة معرفة لمساعدة المستخدم', priority: 'low', icon: 'robot' },
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
  'زيادة المساحة (تخزين)',
];

export const roadmapTimeline = [
  {
    quarter: 'مايو – يونيو 2026',
    items: ['خطة الوحدات (Modules)', 'إعادة هيكلة الخصائص لكل لجنة', 'دمج لجنة الشراكات مع الإعلامية'],
  },
  {
    quarter: 'يوليو – أغسطس 2026',
    items: ['تطوير خارطة المعرض', 'تمكين التوقيع الإلكتروني', 'قوالب جاهزة للأقسام', 'خصومات الفنادق والطيران'],
  },
  {
    quarter: 'سبتمبر – أكتوبر 2026',
    items: ['التكامل مع النفاذ الوطني', 'بناء الأقسام بالسحب والإفلات', 'تقارير مؤشرات الأداء', 'تطوير الدعوات التفاعلية'],
  },
  {
    quarter: 'نوفمبر – ديسمبر 2026',
    items: ['التكامل مع أجهزة الخدمات الذاتية', 'تطبيق الهواتف الذكية', 'ربط الذكاء الاصطناعي', 'تطبيق التصميم الموحد'],
  },
];
