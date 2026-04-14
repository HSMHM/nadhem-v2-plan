export const packages = [
  { id: 1, name: 'أساسية (Starter)', price: '12,000', target: 'فعاليات صغيرة جداً (أقل من 500 مشارك)', moduleCount: 6, icon: 'seedling' },
  { id: 2, name: 'متقدمة (Professional)', price: '25,000', target: 'فعاليات صغرى (500–2,000 مشارك)', moduleCount: 10, icon: 'gem' },
  { id: 3, name: 'شاملة (Enterprise)', price: '45,000', target: 'فعاليات متوسطة (2,000–10,000 مشارك)', moduleCount: 14, icon: 'building' },
  { id: 4, name: 'مخصصة (Custom)', price: 'حسب الطلب', target: 'فعاليات كبرى أو متطلبات خاصة', moduleCount: 16, icon: 'crown', isCustom: true },
];

export const packageMatrix = [
  //                             أساسية  متقدمة  شاملة  مخصصة
  { module: 'تسجيل الحضور والبطاقات',  s: true,  p: true,  e: true,  c: true },
  { module: 'الحملات الإعلانية',         s: true,  p: true,  e: true,  c: true },
  { module: 'إدارة الجهات العارضة',      s: false, p: true,  e: true,  c: true },
  { module: 'مخطط المساحة',             s: false, p: false, e: true,  c: true },
  { module: 'نطاق مخصص',               s: false, p: true,  e: true,  c: true },
  { module: 'المتحدثين والجلسات',        s: true,  p: true,  e: true,  c: true },
  { module: 'صفحات إضافية',             s: true,  p: true,  e: true,  c: true },
  { module: 'البرامج المصاحبة',          s: false, p: true,  e: true,  c: true },
  { module: 'باقات الرعاية والرعاة',     s: false, p: true,  e: true,  c: true },
  { module: 'الجلسات الاستشارية',        s: false, p: false, e: true,  c: true },
  { module: 'اسم مرسل مخصص',           s: false, p: false, e: true,  c: true },
  { module: 'التحليلات الفورية',         s: true,  p: true,  e: true,  c: true },
  { module: 'تطبيق الهواتف',            s: false, p: false, e: true,  c: true },
  { module: 'إرسال الدعوات',            s: false, p: true,  e: true,  c: true },
  { module: 'إدارة النماذج',            s: true,  p: true,  e: true,  c: true },
  { module: 'زيادة المساحة',            s: false, p: false, e: true,  c: true },
];
