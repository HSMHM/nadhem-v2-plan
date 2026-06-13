export const opsNavItems = [
  { id: 'ops-dashboard', label: 'لوحة المؤشرات التشغيلية', icon: 'gauge-high' },
  { id: 'ops-subscriptions', label: 'متابعة الاشتراكات', icon: 'file-contract' },
  { id: 'ops-customer-success', label: 'تمكين العميل من النظام', icon: 'user-graduate' },
  { id: 'ops-feedback', label: 'تقييم العملاء والأثر', icon: 'star-half-stroke' },
  { id: 'ops-competitors', label: 'دراسة المنافسين', icon: 'binoculars' },
  { id: 'ops-practices', label: 'أفضل الممارسات', icon: 'lightbulb' },
  { id: 'ops-field', label: 'الحضور الميداني', icon: 'person-walking' },
];

export const marketingNavItems = [
  { id: 'mkt-dashboard', label: 'لوحة مؤشرات التسويق', icon: 'gauge-high' },
  { id: 'mkt-challenge', label: 'التحدي وحجم السوق', icon: 'triangle-exclamation' },
  { id: 'mkt-personas', label: 'شرائح العملاء المستهدفة', icon: 'users-viewfinder' },
  { id: 'mkt-channels', label: 'قنوات الوصول للمنظمين', icon: 'diagram-project' },
  { id: 'mkt-digital', label: 'التسويق الرقمي', icon: 'globe' },
  { id: 'mkt-partnerships', label: 'الشراكات والقنوات', icon: 'handshake' },
  { id: 'mkt-gaps', label: 'النواقص والتوصيات', icon: 'clipboard-list-check' },
  { id: 'mkt-tasks', label: 'المهام التفصيلية', icon: 'list-check' },
  { id: 'mkt-calendar', label: 'الجدول الزمني', icon: 'calendar-check' },
];

export const journeyNavItems = [
  { id: 'journey-overview', label: 'نظرة عامة', icon: 'compass' },
  { id: 'journey-growth', label: 'نمو المنتج', icon: 'seedling' },
  { id: 'journey-development', label: 'تطوير المنتج', icon: 'rocket-launch' },
  { id: 'journey-operations', label: 'تشغيل المنتج', icon: 'gears' },
];

export const productNavItems = [
  { id: 'pj-root', label: 'وصف المنتج', icon: 'route' },
];

export const roadmapNavItems = [
  { id: 'v2-roadmap-overview', label: 'نظرة عامة', icon: 'gauge-high' },
  { id: 'v2-phase-1', label: 'الأساس والبنية التحتية', icon: 'compass-drafting' },
  { id: 'v2-phase-2', label: 'النواة والمصادقة', icon: 'layer-group' },
  { id: 'v2-phase-3', label: 'وحدات قبل الفعالية', icon: 'calendar-circle-plus' },
  { id: 'v2-phase-4', label: 'وحدات أثناء وبعد', icon: 'circle-play' },
  { id: 'v2-phase-5', label: 'التكاملات والذكاء', icon: 'plug-circle-bolt' },
  { id: 'v2-phase-6', label: 'التدقيق والتسليم', icon: 'circle-check' },
];

export const devNavItems = [
  { id: 'dashboard', label: 'لوحة الإحصائيات', icon: 'chart-mixed' },
  { id: 'developments', label: 'التطويرات المطلوبة', icon: 'rocket-launch' },
  { id: 'modules', label: 'الوحدات (Modules)', icon: 'cubes' },
  { id: 'timeline-simple', label: 'الجدول الزمني المبسط', icon: 'calendar-lines' },
];

export const asanaNavItems = [
  { id: 'asana-overview', label: 'نظرة عامة', icon: 'gauge-high' },
  { id: 'asana-task-tabs', label: 'المهام (تطوير/تسويق/تشغيل)', icon: 'list-tree' },
  { id: 'asana-template', label: 'قالب FAD', icon: 'file-lines' },
  { id: 'asana-pipeline', label: 'خط الرفع', icon: 'cloud-arrow-up' },
];

export const trackMeta = {
  v1: {
    name: 'نظم V1',
    tag: 'المنتج القائم',
    color: '#BA5A31',
    icon: 'gears',
    desc: 'النظام التشغيلي العامل اليوم — متابعة العمليات والتسويق ورحلة المنتج.',
  },
  v2: {
    name: 'نظم V2',
    tag: 'المنتج المعاد بناؤه',
    color: '#2A848A',
    icon: 'wand-magic-sparkles',
    desc: 'النظام المعاد بناؤه بالكامل بالذكاء الاصطناعي — وصف المنتج وخطة تطويره.',
  },
};

export const trackTabs = {
  v1: [
    { id: 'ops', label: 'الخطة التشغيلية', shortLabel: 'التشغيلية', icon: 'gears', color: '#BA5A31' },
    { id: 'marketing', label: 'خطة التسويق', shortLabel: 'التسويق', icon: 'bullhorn', color: '#A61C61' },
    { id: 'journey', label: 'رحلة المنتج', shortLabel: 'الرحلة', icon: 'compass', color: '#452059' },
  ],
  v2: [
    { id: 'product', label: 'وصف المنتج', shortLabel: 'الوصف', icon: 'route', color: '#2A848A' },
    { id: 'roadmap', label: 'خطة التطوير', shortLabel: 'التطوير', icon: 'diagram-project', color: '#8B5CF6' },
  ],
};

export const trackNavMap = {
  ops: opsNavItems,
  marketing: marketingNavItems,
  journey: journeyNavItems,
  product: productNavItems,
  roadmap: roadmapNavItems,
};
