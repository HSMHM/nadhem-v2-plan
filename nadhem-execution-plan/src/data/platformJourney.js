// رحلة منصة العميل — معزَّزة بالذكاء الاصطناعي
// تنظيم الوحدات حسب دورة حياة الفعالية + توزيعها على الباقات
// مستنبطة من event-lifecycle-deep-study.md

// ============ المراحل ============
export const lifecyclePhases = [
  {
    id: 'pre',
    label: 'قبل الفعالية',
    icon: 'calendar-circle-plus',
    color: '#2A848A',
    desc: 'الإعداد، التسجيل، تجهيز المحتوى، بناء الواجهة، الدعوات، والتحضير',
  },
  {
    id: 'live',
    label: 'أثناء الفعالية',
    icon: 'circle-play',
    color: '#EF4444',
    desc: 'التحضير الميداني، التطبيق، اللوحات اللحظية، التغطية والدعم',
  },
  {
    id: 'post',
    label: 'بعد الفعالية',
    icon: 'chart-line-up',
    color: '#A61C61',
    desc: 'التقارير، الشهادات، التقييمات، التحليلات، الأرشفة',
  },
];

// ============ الباقات (4) ============
export const packages = [
  {
    id: 'basic',
    name: 'الأساسية',
    nameEn: 'Basic',
    icon: 'seedling',
    color: '#10B981',
    target: 'فعاليات صغيرة (تحت 500 حاضر) — حضوري بسيط، فعالية واحدة',
    annualPrice: '5,000 ريال',
    moduleCount: 11,
  },
  {
    id: 'pro',
    name: 'الاحترافية',
    nameEn: 'Professional',
    icon: 'briefcase',
    color: '#2A848A',
    target: 'فعاليات متوسطة (500-2,000 حاضر) — علمية مبسّطة، رعاية، ورش',
    annualPrice: '15,000 ريال',
    moduleCount: 21,
  },
  {
    id: 'ent',
    name: 'الشاملة',
    nameEn: 'Enterprise',
    icon: 'building',
    color: '#8B5CF6',
    target: 'فعاليات كبيرة (2,000-10,000 حاضر) — علمية كاملة، معارض، AI مكمّل لكل الوحدات',
    annualPrice: '25,000 ريال',
    moduleCount: 29,
    aiIncluded: true,
  },
  {
    id: 'custom',
    name: 'المخصصة',
    nameEn: 'Custom',
    icon: 'crown',
    color: '#F59E0B',
    target: 'مخصصة للفعاليات الكبرى — تشمل تخصيصات وتكاملات موائمة لمتطلبات الفعالية',
    annualPrice: 'عرض سعر',
    moduleCount: 29,
    isCustom: true,
    aiIncluded: true,
  },
];

// ============ الوحدات (28) ============
// كل وحدة لها: id, name, icon, phase, desc, packages (مصفوفة الباقات التي تشملها)
// مفاتيح الباقات: ['basic', 'pro', 'ent', 'custom']

export const platformModules = [
  // ============ قبل الفعالية (18 وحدة) ============
  {
    id: 'pre.event-setup',
    name: 'إعداد الفعالية',
    icon: 'calendar-plus',
    phase: 'pre',
    desc: 'إنشاء الفعالية: الاسم، التواريخ، الموقع، الشعار، الألوان، اللغة، المنطقة الزمنية',
    packages: ['basic', 'pro', 'ent', 'custom'],
  },
  {
    id: 'pre.public-site',
    name: 'إعداد الواجهات الخارجية',
    icon: 'browser',
    phase: 'pre',
    desc: 'بناء الصفحة العامة + قوالب أقسام + قوائم علوية وسفلية + صفحات إضافية + Drag & Drop',
    packages: ['basic', 'pro', 'ent', 'custom'],
    notes: { basic: 'قالب 1 فقط، بدون Drag & Drop' },
    aiEnhancements: [
      'توليد نصوص الواجهة الخارجية (Hero, About, Speakers descriptions)',
      'توليد محتوى الصفحات الإضافية',
      'توليد الأسئلة الشائعة (FAQ) تلقائياً',
      'ترجمة المحتوى تلقائياً (عربي ↔ إنجليزي)',
    ],
  },
  {
    id: 'pre.registration',
    name: 'التسجيل والدفع',
    icon: 'clipboard-check',
    phase: 'pre',
    desc: 'نموذج تسجيل موحَّد + فئات بأسعار + بوابات الدفع + إيصالات تلقائية',
    packages: ['basic', 'pro', 'ent', 'custom'],
  },
  {
    id: 'pre.scientific-participants',
    name: 'المشاركون العلميون',
    icon: 'users-rays',
    phase: 'pre',
    desc: 'متحدثون + مدراء جلسات (multi-role) — دعوات + سيرة + رفع العروض',
    packages: ['pro', 'ent', 'custom'],
  },
  {
    id: 'pre.papers',
    name: 'الأوراق العلمية',
    icon: 'file-lines',
    phase: 'pre',
    desc: 'بوابة استقبال أوراق + معايير تقييم مخصصة + محكّمون + قبول/رفض/تعديل',
    packages: ['pro', 'ent', 'custom'],
    notes: { pro: 'مبسّط (بدون محكّمين متعددين)' },
    aiEnhancements: [
      'تصنيف الأوراق العلمية تلقائياً حسب التخصص',
      'اقتراح أنسب المحكّمين لكل ورقة بناءً على خبرتهم وأوراقهم السابقة',
    ],
  },
  {
    id: 'pre.consultations',
    name: 'الجلسات الاستشارية',
    icon: 'user-doctor',
    phase: 'pre',
    desc: 'مستشارون + جدولة Slots + حجز من الواجهة + تأكيدات + ملاحظات',
    packages: ['ent', 'custom'],
  },
  {
    id: 'pre.workshops',
    name: 'البرامج المصاحبة (الورش)',
    icon: 'chalkboard-user',
    phase: 'pre',
    desc: 'إنشاء ورش + تسجيل خاص + سعة + شهادات منفصلة',
    packages: ['pro', 'ent', 'custom'],
  },
  {
    id: 'pre.sessions-schedule',
    name: 'الجلسات والجدول والقاعات',
    icon: 'calendar-days',
    phase: 'pre',
    desc: 'إنشاء جلسات + ربطها بقاعات + جدول كامل بـTracks + تنبيه التعارض',
    packages: ['basic', 'pro', 'ent', 'custom'],
    notes: { basic: 'جلسات بسيطة بدون Tracks متعددة' },
    aiEnhancements: [
      'اقتراح جدول كامل تلقائياً بناءً على عدد المتحدثين والجلسات والقاعات',
      'تجنّب التعارضات الزمنية بشكل ذكي',
    ],
  },
  {
    id: 'pre.sponsorships',
    name: 'الرعايات',
    icon: 'handshake',
    phase: 'pre',
    desc: 'باقات رعاية + بوابة طلب + اتفاقيات + شعارات + ممثلون + موظفون',
    packages: ['pro', 'ent', 'custom'],
  },
  {
    id: 'pre.exhibitions-map',
    name: 'المعارض + خريطة المعرض التفاعلية',
    icon: 'map-location-dot',
    phase: 'pre',
    desc: 'رسم مساحات + اختيار العارض + تسجيل + موافقة + دفع + توقيع عقد إلكترونياً',
    packages: ['ent', 'custom'],
  },
  {
    id: 'pre.invitations',
    name: 'الدعوات التفاعلية + VIP',
    icon: 'envelope-open-text',
    phase: 'pre',
    desc: 'دعوات بكل الأنواع (حضور/تحدّث/شراكة/رعاية) + قبول/اعتذار من داخل الدعوة + VIP بإدارة المنظم',
    packages: ['basic', 'pro', 'ent', 'custom'],
    notes: { basic: 'دعوات أساسية بدون تفاعلية كاملة' },
    aiEnhancements: [
      'توليد رسائل دعوة شخصية لكل مدعو',
    ],
  },
  {
    id: 'pre.prep-qr',
    name: 'التحضير وبطاقات QR',
    icon: 'qrcode',
    phase: 'pre',
    desc: 'تجهيز قائمة الحضور + توليد QR + إرسال بطاقات رقمية مسبقاً',
    packages: ['basic', 'pro', 'ent', 'custom'],
  },
  {
    id: 'pre.campaigns-content',
    name: 'الحملات والمحتوى الإعلامي',
    icon: 'bullhorn',
    phase: 'pre',
    desc: 'حملات SMS/بريد/واتساب + استهداف فئات + جدولة + أخبار + Gallery + ربط سوشيال',
    packages: ['pro', 'ent', 'custom'],
    aiEnhancements: [
      'توليد نصوص الحملات والعناوين',
      'اقتراح الجمهور المستهدف لكل حملة',
      'توليد منشورات السوشيال ميديا',
    ],
  },
  {
    id: 'pre.signing-platform',
    name: 'منصة التوقيع (حجز موعد توقيع)',
    icon: 'calendar-check',
    phase: 'pre',
    desc: 'حجز موعد توقيع داخل الفعالية لأي جهة (مشاركة أو غير مشاركة) — تحدّد الجهة الأخرى وبياناتها عند إنشاء الحجز + جدولة الموعد + إشعارات',
    packages: ['ent', 'custom'],
  },
  {
    id: 'pre.esignature',
    name: 'التوقيع الإلكتروني (خدمة رقمية)',
    icon: 'signature',
    phase: 'pre',
    desc: 'تكامل مع مزوّدي خدمات التوقيع الرقمي (مثل توقيع الرسمي) — يمكن استخدامه لتوقيع عقود الرعاة والجهات العارضة إلكترونياً عن بُعد',
    packages: ['ent', 'custom'],
  },
  {
    id: 'pre.forms',
    name: 'النماذج والاستبيانات المخصصة',
    icon: 'list-check',
    phase: 'pre',
    desc: 'بناء نماذج بكل أنواع الحقول + منطق شرطي + استبيانات قبل/بعد + تحليل النتائج',
    packages: ['pro', 'ent', 'custom'],
  },
  {
    id: 'pre.templates',
    name: 'مكتبة القوالب الموحَّدة',
    icon: 'clone',
    phase: 'pre',
    desc: 'قوالب البطاقات + الشهادات + الرسائل + الواجهة الخارجية — قابلة للتخصيص',
    packages: ['basic', 'pro', 'ent', 'custom'],
    notes: { basic: 'مكتبة محدودة (3 قوالب لكل نوع)' },
    aiEnhancements: [
      'توليد قوالب البطاقات بصرياً بالـAI',
      'توليد قوالب الشهادات بصرياً بالـAI',
      'توليد قوالب الرسائل لكل سيناريو',
    ],
  },
  {
    id: 'pre.integrations',
    name: 'التكاملات الأساسية',
    icon: 'plug',
    phase: 'pre',
    desc: 'Zoom + SMS + بريد + بوابات الدفع + النفاذ الوطني (Enterprise+) + Kiosks',
    packages: ['basic', 'pro', 'ent', 'custom'],
    notes: { basic: 'دفع + بريد فقط', pro: '+ Zoom + SMS', ent: '+ النفاذ الوطني + Kiosks' },
  },

  // ============ أثناء الفعالية (5 وحدات) ============
  {
    id: 'live.checkin-kiosks',
    name: 'التحضير الميداني وKiosks',
    icon: 'door-open',
    phase: 'live',
    desc: 'تحضير بـQR + Walk-in + Kiosks ذاتية + طباعة فورية للبطاقات',
    packages: ['basic', 'pro', 'ent', 'custom'],
    notes: { basic: 'تحضير يدوي فقط', pro: 'تحضير بـQR', ent: '+ Kiosks ذاتية' },
  },
  {
    id: 'live.mobile-app',
    name: 'تطبيق الهواتف الذكية',
    icon: 'mobile-screen',
    phase: 'live',
    desc: 'iOS + Android لكل فعالية: الجدول، الخريطة، البطاقة، الإشعارات، المجتمعات',
    packages: ['ent', 'custom'],
  },
  {
    id: 'live.attendance-tracking',
    name: 'تتبع حضور الجلسات والورش',
    icon: 'list-check',
    phase: 'live',
    desc: 'مسح QR لكل جلسة + إحصاءات لحظية + إغلاق تلقائي عند السعة + ربط بالشهادات',
    packages: ['pro', 'ent', 'custom'],
  },
  {
    id: 'live.dashboards',
    name: 'لوحات المؤشرات اللحظية',
    icon: 'gauge-high',
    phase: 'live',
    desc: 'لوحة لكل لجنة (8 لوحات) — حضور، إيرادات، تواجد الرعاة، نشاط المعرض، إلخ',
    packages: ['pro', 'ent', 'custom'],
    notes: { pro: 'لوحة موحَّدة فقط', ent: 'لوحة لكل لجنة' },
  },
  {
    id: 'live.coverage-support',
    name: 'التغطية اللحظية والدعم',
    icon: 'video',
    phase: 'live',
    desc: 'تغطية صور/فيديو لحظية + بث مباشر + دعم في الموقع + إدارة الطوارئ + توقيع عقود في الموقع',
    packages: ['ent', 'custom'],
  },

  // ============ بعد الفعالية (5 وحدات) ============
  {
    id: 'post.final-reports',
    name: 'التقارير الختامية',
    icon: 'file-chart-column',
    phase: 'post',
    desc: 'تقرير ختامي شامل PDF/Excel + تقارير لكل لجنة',
    packages: ['basic', 'pro', 'ent', 'custom'],
    notes: { basic: 'تقرير أساسي فقط' },
    aiEnhancements: [
      'توليد التقرير الختامي بنصوص ذكية تلقائياً (وليس مجرد جداول)',
    ],
  },
  {
    id: 'post.certificates',
    name: 'توليد الشهادات',
    icon: 'award',
    phase: 'post',
    desc: 'شهادات للمشاركين (حضور/VIP/متحدث/مستشار/...) + شهادات للمنظمين والطاقم — توليد آلي + إرسال بريدي',
    packages: ['basic', 'pro', 'ent', 'custom'],
    notes: { basic: 'أنواع محدودة', pro: 'أنواع موسَّعة', ent: 'كل الأنواع' },
    aiEnhancements: [
      'توليد الشهادات المخصصة بصرياً ومحتوى مخصص لكل مشارك',
    ],
  },
  {
    id: 'post.surveys',
    name: 'الاستبيانات والتقييمات',
    icon: 'star-half-stroke',
    phase: 'post',
    desc: 'تقييم الجلسات والمتحدثين والورش واللوجستيات والرعاة والعارضين',
    packages: ['basic', 'pro', 'ent', 'custom'],
    notes: { basic: 'استبيان رضا أساسي فقط' },
    aiEnhancements: [
      'تحليل مشاعر التقييمات تلقائياً (Sentiment Analysis)',
      'استخراج الرؤى من الإجابات المفتوحة',
    ],
  },
  {
    id: 'post.analytics',
    name: 'التحليلات المتقدمة',
    icon: 'chart-mixed',
    phase: 'post',
    desc: 'تحليل سلوك الحاضرين + Heatmap للمعرض + مصادر التسجيل + الديموغرافيا + مقارنة مع فعاليات سابقة',
    packages: ['ent', 'custom'],
    aiEnhancements: [
      'توقّع نسبة العائدين للفعالية القادمة',
      'تحليل اتجاهات الحضور والتفاعل',
      'مقارنة ذكية مع فعاليات سابقة + اقتراح تحسينات',
    ],
  },
  {
    id: 'post.networking-financial',
    name: 'المجتمعات + المالية الختامية + قصص النجاح',
    icon: 'circle-nodes',
    phase: 'post',
    desc: 'مجتمعات لما بعد الفعالية + تسوية مالية مع الرعاة والعارضين + فاتورة ختامية + قصص نجاح للتسويق',
    packages: ['ent', 'custom'],
    aiEnhancements: [
      'اقتراح روابط المجتمعات للحاضرين بعد الفعالية (مطابقة بناءً على الاهتمامات)',
      'توليد قصص نجاح من بيانات الفعالية لاستخدامها تسويقياً',
    ],
  },
];

// ============ القدرات الشاملة (تأتي مع كل الباقات افتراضياً) ============
export const crossCuttingCapabilities = [
  {
    id: 'cross.users',
    name: 'إدارة المستخدمين والصلاحيات',
    icon: 'users-gear',
    desc: 'مستخدمو إدارة + أدوار + صلاحيات دقيقة لكل وحدة',
  },
  {
    id: 'cross.security',
    name: 'الأمان والخصوصية',
    icon: 'shield-check',
    desc: 'HTTPS + 2FA + GDPR + تشفير + نسخ احتياطية يومية',
  },
  {
    id: 'cross.branding',
    name: 'التخصيص البصري',
    icon: 'palette',
    desc: 'شعار + ألوان + خط مخصص + نطاق مخصص + DKIM/SPF',
  },
  {
    id: 'cross.localization',
    name: 'اللغة والترجمة',
    icon: 'language',
    desc: 'عربي + إنجليزي + ثنائي + RTL/LTR تلقائي',
  },
  {
    id: 'cross.audit',
    name: 'سجل النشاط',
    icon: 'clock-rotate-left',
    desc: 'كل تعديل + من قام به + متى + سجل دخول + استرجاع نسخ',
  },
  {
    id: 'cross.ai-assistant',
    name: 'المساعد الذكي للمنصة (Platform AI)',
    icon: 'robot',
    desc: 'مساعد محادثة (Chatbot) متاح في كل صفحة — يفهم السياق، يجيب أسئلة المنظم، يساعده في كل المراحل (متاح في باقات Enterprise + Custom)',
    isAI: true,
  },
];

// ============ مساعدات ============
export function modulesByPhase(phaseId) {
  return platformModules.filter((m) => m.phase === phaseId);
}

export function modulesByPackage(packageId) {
  return platformModules.filter((m) => m.packages.includes(packageId));
}

export function getModulesPerPhasePerPackage(phaseId, packageId) {
  return platformModules.filter((m) => m.phase === phaseId && m.packages.includes(packageId));
}

export function getStats() {
  return {
    totalModules: platformModules.length,
    totalCrossCutting: crossCuttingCapabilities.length,
    totalPackages: packages.length,
    perPhase: lifecyclePhases.map((p) => ({
      ...p,
      count: modulesByPhase(p.id).length,
    })),
    perPackage: packages.map((p) => ({
      ...p,
      count: modulesByPackage(p.id).length,
    })),
  };
}
