export const developmentTabs = [
  { id: 'structure', label: 'تطويرات البنية والنظام' },
  { id: 'features', label: 'تطويرات الخصائص والمزايا' },
  { id: 'technical', label: 'تطويرات تقنية ومستقبلية' },
];

export const developmentsData = {
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
