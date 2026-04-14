# مهمة: إضافة قسم "الاجتماع الأخير — خارطة الطريق" في آخر الصفحة

## المشروع
المستودع: https://github.com/HSMHM/nadhem-v2-plan
المجلد: `nadhem-execution-plan/`
التقنيات: React + Vite + Framer Motion + Font Awesome Jelly (fa-thin)

## المطلوب
إضافة قسم أخير في نهاية الصفحة (بعد قسم الرسوم البيانية) باسم **"الاجتماع الأخير — خارطة الطريق"**. هذا القسم يعرض كامل محتوى خارطة طريق المنتج التي تم عرضها سابقاً في اجتماع. القسم يحتوي على 12 جزء فرعي.

## الملفات المطلوب إنشاؤها/تعديلها

### 1. إنشاء ملف بيانات: `src/data/roadmap.js`

```js
// بيانات خارطة الطريق — مستخرجة من عرض خارطة الطريق (PDF)

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
    quarter: 'الربع الأول 2026',
    items: ['إعادة هيكلة الخصائص لكل لجنة', 'تنفيذ خطة الوحدات (Modules)', 'تطبيق التصميم الموحد'],
  },
  {
    quarter: 'الربع الثاني 2026',
    items: ['تطوير خارطة المعرض', 'تطوير الدعوات التفاعلية', 'قوالب جاهزة للأقسام', 'دمج لجنة الشراكات مع الإعلامية'],
  },
  {
    quarter: 'الربع الثالث 2026',
    items: ['بناء الأقسام بالسحب والإفلات', 'التكامل مع النفاذ الوطني', 'التوقيع الإلكتروني', 'تقارير مؤشرات الأداء'],
  },
  {
    quarter: 'الربع الرابع 2026',
    items: ['التكامل مع أجهزة الخدمات الذاتية', 'تطبيق الهواتف الذكية', 'خصومات الفنادق والطيران', 'ربط الذكاء الاصطناعي'],
  },
];
```

---

### 2. إنشاء المكوّن: `src/components/sections/RoadmapSection.jsx`

```jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../common/SectionHeader';
import {
  sectorData,
  committeesAdoption,
  readinessData,
  userTypes,
  topFeatures,
  satisfactionData,
  marketData,
  competitorCategories,
  comparisonFeatures,
  challengesData,
  roadmapDevelopments,
  roadmapModules,
  roadmapTimeline,
} from '../../data/roadmap';

const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { visible: { transition: { staggerChildren: 0.06 } } };

function SubHeader({ icon, title, color }) {
  return (
    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: 16, marginTop: 36, display: 'flex', alignItems: 'center', gap: 10 }}>
      <i className={`fa-thin fa-${icon}`} style={{ color: color || 'var(--primary)' }} aria-hidden="true" />
      {title}
    </h3>
  );
}

function ProgressBar({ value, color }) {
  return (
    <div className="prog" style={{ height: 8 }}>
      <div className="prog-fill" style={{ width: `${value}%`, background: color || 'var(--primary)' }} />
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    completed: { cls: 'badge-s', label: 'مكتملة' },
    medium: { cls: 'badge-w', label: 'متوسطة' },
    inactive: { cls: 'badge-d', label: 'غير مفعلة' },
    new: { cls: 'badge-q', label: 'جديدة' },
  };
  const s = map[status] || map.inactive;
  return <span className={`badge ${s.cls}`}>{s.label}</span>;
}

function PriorityBadge({ priority }) {
  const map = {
    high: { cls: 'badge-d', label: 'أولوية عالية' },
    medium: { cls: 'badge-w', label: 'أولوية متوسطة' },
    low: { cls: 'badge-p', label: 'أولوية منخفضة' },
  };
  const p = map[priority] || map.medium;
  return <span className={`badge ${p.cls}`}>{p.label}</span>;
}

function DevTabs() {
  const [tab, setTab] = useState('structure');
  const tabs = [
    { id: 'structure', label: 'البنية والنظام' },
    { id: 'features', label: 'الخصائص والمزايا' },
    { id: 'technical', label: 'تقنية ومستقبلية' },
  ];
  const items = roadmapDevelopments[tab] || [];
  return (
    <>
      <div className="phase-tabs" style={{ marginBottom: 16 }}>
        {tabs.map(t => (
          <button key={t.id} className={`phase-tab ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>
      <motion.div className="grid g2" initial="hidden" animate="visible" key={tab} variants={stagger}>
        {items.map((d, i) => (
          <motion.div key={i} className="card" variants={fadeIn} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <div className="ic" style={{ marginTop: 2 }}>
              <i className={`fa-thin fa-${d.icon}`} aria-hidden="true" />
            </div>
            <div style={{ flex: 1 }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-dark)', marginBottom: 4 }}>{d.title}</h4>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '0 0 8px', lineHeight: 1.7 }}>{d.description}</p>
              <PriorityBadge priority={d.priority} />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}

export default function RoadmapSection() {
  return (
    <section id="roadmap" className="section">
      <SectionHeader icon="map" title="الاجتماع الأخير — خارطة الطريق" subtitle="ملخص شامل لمحتوى خارطة طريق المنتج التي تم عرضها سابقاً — الوضع الحالي والمستهدفات" />

      {/* ─── التمركز القطاعي ─── */}
      <SubHeader icon="chart-pie" title="التمركز القطاعي — 2025" />
      <motion.div className="grid g3" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
        {sectorData.sectors.map((s, i) => (
          <motion.div key={i} className="card" variants={fadeIn} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.2rem', fontWeight: 700, color: s.color }}>{s.value}%</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-dark)', marginTop: 4 }}>{s.label}</div>
          </motion.div>
        ))}
      </motion.div>
      <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 10, textAlign: 'center' }}>{sectorData.note}</p>

      {/* ─── اللجان ونسبة الاعتماد ─── */}
      <SubHeader icon="people-group" title="اللجان ونسبة الاعتماد لكل لجنة" />
      <motion.div className="grid g2" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
        {committeesAdoption.map((c, i) => (
          <motion.div key={i} className="card" variants={fadeIn}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-dark)' }}>{c.name}</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <StatusBadge status={c.status} />
                <span style={{ fontWeight: 700, fontSize: '0.95rem', color: c.pct >= 90 ? 'var(--success)' : c.pct >= 40 ? 'var(--warning)' : 'var(--danger)' }}>{c.pct}%</span>
              </div>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 10 }}>{c.desc}</p>
            <ProgressBar value={c.pct} color={c.pct >= 90 ? 'var(--success)' : c.pct >= 40 ? 'var(--warning)' : 'var(--danger)'} />
          </motion.div>
        ))}
      </motion.div>

      {/* ─── مؤشر الجاهزية التشغيلية ─── */}
      <SubHeader icon="gauge-high" title="مؤشر الجاهزية التشغيلية" />
      <motion.div className="grid g3" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ marginBottom: 8 }}>
        <motion.div className="card" variants={fadeIn} style={{ textAlign: 'center', borderTop: '3px solid var(--warning)' }}>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--warning)' }}>{readinessData.avgAdoption}%</div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>متوسط الاعتماد العام</div>
        </motion.div>
        <motion.div className="card" variants={fadeIn} style={{ textAlign: 'center', borderTop: '3px solid var(--success)' }}>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--success)' }}>{readinessData.completedCommittees}</div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>لجان مكتملة (90%+)</div>
        </motion.div>
        <motion.div className="card" variants={fadeIn} style={{ textAlign: 'center', borderTop: '3px solid var(--danger)' }}>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--danger)' }}>{readinessData.activationGap}%</div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>فجوة التفعيل</div>
        </motion.div>
      </motion.div>

      {/* ─── المستخدمون ─── */}
      <SubHeader icon="users" title="المستخدمون وأنواعهم" />
      <motion.div className="grid g4" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
        {userTypes.map((u, i) => (
          <motion.div key={i} className="card" variants={fadeIn} style={{ textAlign: 'center', padding: '18px 14px', position: 'relative' }}>
            {u.isNew && <span className="badge badge-d" style={{ position: 'absolute', top: 8, left: 8, fontSize: '0.6rem' }}>جديد</span>}
            <div className="ic" style={{ margin: '0 auto 10px' }}>
              <i className={`fa-thin fa-${u.icon}`} aria-hidden="true" />
            </div>
            <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-dark)' }}>{u.name}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* ─── الخصائص الأكثر استخداماً ─── */}
      <SubHeader icon="star" title="الخصائص الأكثر استخداماً" />
      <motion.div className="grid g2" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
        {topFeatures.map((f, i) => (
          <motion.div key={i} className="card" variants={fadeIn} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px' }}>
            <span style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.85rem', minWidth: 26 }}>{i + 1}.</span>
            <span style={{ fontSize: '0.88rem', color: 'var(--text-dark)' }}>{f}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* ─── صوت العميل / رضا العملاء ─── */}
      <SubHeader icon="face-smile" title="صوت العميل — نسبة الرضا" />
      <div className="grid g2" style={{ marginBottom: 16 }}>
        <div className="card">
          <h4 style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-dark)', marginBottom: 16 }}>نسبة الرضا</h4>
          {satisfactionData.metrics.map((m, i) => (
            <div key={i} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-dark)' }}>{m.label}</span>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: m.value >= 80 ? 'var(--success)' : m.value >= 50 ? 'var(--warning)' : 'var(--danger)' }}>{m.value}%</span>
              </div>
              <ProgressBar value={m.value} color={m.value >= 80 ? 'var(--success)' : m.value >= 50 ? 'var(--warning)' : 'var(--danger)'} />
            </div>
          ))}
        </div>
        <div className="card">
          <h4 style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-dark)', marginBottom: 16 }}>عوامل نسبة الرضا</h4>
          {satisfactionData.factors.map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: i < satisfactionData.factors.length - 1 ? '1px solid var(--border-light)' : 'none' }}>
              <i className="fa-thin fa-circle-small" style={{ color: 'var(--warning)', fontSize: 10 }} aria-hidden="true" />
              <span style={{ fontSize: '0.85rem', color: 'var(--text)' }}>{f}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ─── سوق الفعاليات ─── */}
      <SubHeader icon="chart-bar" title="سوق الفعاليات — 2025" />
      <div className="grid g2" style={{ marginBottom: 16 }}>
        {[
          { title: 'فعاليات كبرى', data: marketData.large, color: 'var(--secondary)' },
          { title: 'فعاليات متوسطة', data: marketData.medium, color: 'var(--primary)' },
          { title: 'فعاليات صغرى', data: marketData.small, color: 'var(--accent-orange)' },
          { title: 'فعاليات صغيرة جداً', data: marketData.verySmall, color: 'var(--accent-pink)' },
        ].map((cat, ci) => (
          <div key={ci} className="card">
            <h4 style={{ fontSize: '0.92rem', fontWeight: 600, color: cat.color, marginBottom: 12 }}>{cat.title}</h4>
            {cat.data.map((e, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < cat.data.length - 1 ? '1px solid var(--border-light)' : 'none' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-dark)' }}>{e.name}</span>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: cat.color }}>{e.participants} مشارك</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* ─── المنافسون ─── */}
      <SubHeader icon="shield-halved" title="أبرز المنافسين" />
      <motion.div className="grid g3" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ marginBottom: 24 }}>
        {competitorCategories.map((c, i) => (
          <motion.div key={i} className="card" variants={fadeIn} style={{ textAlign: 'center' }}>
            <h4 style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-dark)', marginBottom: 10 }}>{c.category}</h4>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
              {c.competitors.map((name, j) => (
                <span key={j} className="badge badge-q">{name}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* ─── مقارنة الأنظمة ─── */}
      <SubHeader icon="table-columns" title="مقارنة بين الأنظمة" />
      <div className="card" style={{ overflowX: 'auto', marginBottom: 16 }}>
        <table className="tbl">
          <thead>
            <tr>
              <th style={{ textAlign: 'right' }}>الخاصية</th>
              <th style={{ color: 'var(--primary)' }}>نظم</th>
              <th>WOTN</th>
              <th>Eventech</th>
              <th>عزام</th>
              <th>Zoho</th>
            </tr>
          </thead>
          <tbody>
            {comparisonFeatures.map((r, i) => (
              <tr key={i}>
                <td style={{ textAlign: 'right', fontWeight: 500, color: 'var(--text-dark)' }}>{r.feature}</td>
                <td><i className={`fa-thin fa-${r.nadhem ? 'circle-check' : 'circle-xmark'}`} style={{ color: r.nadhem ? 'var(--success)' : 'var(--danger)', fontSize: 16 }} /></td>
                <td><i className={`fa-thin fa-${r.wotn ? 'circle-check' : 'circle-xmark'}`} style={{ color: r.wotn ? 'var(--success)' : 'var(--danger)', fontSize: 16 }} /></td>
                <td><i className={`fa-thin fa-${r.eventech ? 'circle-check' : 'circle-xmark'}`} style={{ color: r.eventech ? 'var(--success)' : 'var(--danger)', fontSize: 16 }} /></td>
                <td><i className={`fa-thin fa-${r.azzam ? 'circle-check' : 'circle-xmark'}`} style={{ color: r.azzam ? 'var(--success)' : 'var(--danger)', fontSize: 16 }} /></td>
                <td><i className={`fa-thin fa-${r.zoho ? 'circle-check' : 'circle-xmark'}`} style={{ color: r.zoho ? 'var(--success)' : 'var(--danger)', fontSize: 16 }} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ─── التحديات ─── */}
      <SubHeader icon="triangle-exclamation" title="التحديات الحالية" color="var(--danger)" />
      <motion.div className="grid g3" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
        {challengesData.map((c, i) => (
          <motion.div key={i} className="card" variants={fadeIn} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 18px' }}>
            <div className="ic" style={{ background: 'rgba(239,68,68,0.08)' }}>
              <i className={`fa-thin fa-${c.icon}`} style={{ color: 'var(--danger)' }} aria-hidden="true" />
            </div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-dark)', lineHeight: 1.7 }}>{c.title}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* ─── التطويرات المطلوبة (ملخص الخارطة) ─── */}
      <SubHeader icon="rocket-launch" title="التطويرات المطلوبة (15 تطوير)" />
      <DevTabs />

      {/* ─── الوحدات ─── */}
      <SubHeader icon="puzzle-piece" title="الوحدات (16 Module)" />
      <motion.div className="grid g4" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
        {roadmapModules.map((m, i) => (
          <motion.div key={i} className="card" variants={fadeIn} style={{ textAlign: 'center', padding: '16px 12px' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28, borderRadius: 8, background: 'var(--primary-light)', color: 'var(--primary)', fontWeight: 700, fontSize: '0.78rem', marginBottom: 8 }}>{i + 1}</span>
            <div style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-dark)', lineHeight: 1.6 }}>{m}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* ─── الجدول الزمني ─── */}
      <SubHeader icon="calendar-days" title="الجدول الزمني" />
      <div className="tl">
        {roadmapTimeline.map((q, qi) => (
          <div key={qi} className="tl-q">
            <div className="tl-q-label">{q.quarter}</div>
            {q.items.map((item, ii) => (
              <div key={ii} className="tl-item">
                <i className="fa-thin fa-circle-dot" style={{ color: 'var(--primary)', fontSize: 10 }} aria-hidden="true" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

    </section>
  );
}
```

---

### 3. تعديل `src/components/Sidebar.jsx`

أضف هذا العنصر في مصفوفة `navItems` — **بعد** عنصر `charts` وقبل إغلاق المصفوفة `]`:

```js
  { id: 'roadmap', label: 'الاجتماع الأخير — خارطة الطريق', icon: 'map' },
```

النتيجة النهائية للمصفوفة:
```js
const navItems = [
  { id: 'dashboard', label: 'لوحة الإحصائيات', icon: 'chart-mixed' },
  { id: 'developments', label: 'التطويرات المطلوبة', icon: 'rocket-launch' },
  { id: 'modules', label: 'الوحدات (Modules)', icon: 'cubes' },
  { id: 'packages', label: 'هيكلة الباقات', icon: 'box-taped' },
  { id: 'integrations', label: 'التكاملات', icon: 'plug' },
  { id: 'timeline-simple', label: 'الجدول الزمني المبسط', icon: 'calendar-lines' },
  { id: 'timeline-detailed', label: 'الجدول الزمني المفصل', icon: 'list-timeline' },
  { id: 'design-system', label: 'التصميم الموحد', icon: 'palette' },
  { id: 'charts', label: 'الرسوم البيانية', icon: 'chart-pie' },
  { id: 'roadmap', label: 'الاجتماع الأخير — خارطة الطريق', icon: 'map' },
];
```

---

### 4. تعديل `src/App.jsx`

**أ)** أضف هذا الاستيراد مع باقي الاستيرادات:
```js
import RoadmapSection from './components/sections/RoadmapSection';
```

**ب)** أضف المكوّن بعد `<ChartsSection />` وقبل إغلاق `</main>`:
```jsx
<main className="main">
  <DashboardSection />
  <DevelopmentsSection />
  <ModulesSection />
  <PackagesSection />
  <IntegrationsSection />
  <SimpleTimelineSection />
  <DetailedTimelineSection />
  <DesignSystemSection />
  <ChartsSection />
  <RoadmapSection />
</main>
```

---

## قواعد مهمة

- **الأيقونات:** فقط Font Awesome Jelly — نمط `fa-thin` — لا تستخدم Emoji أو Lucide أو react-icons أو SVG
- **الاتجاه:** RTL بالكامل
- **CSS:** استخدم الكلاسات الموجودة في `src/index.css` (مثل: `section`, `card`, `grid`, `g2`, `g3`, `g4`, `ic`, `badge`, `badge-s`, `badge-w`, `badge-d`, `badge-p`, `badge-q`, `tbl`, `prog`, `prog-fill`, `tl`, `tl-q`, `tl-q-label`, `tl-item`, `phase-tabs`, `phase-tab`)
- **لا CSS جديد مطلوب** — كل الكلاسات المستخدمة موجودة فعلاً
- **المكوّن المشترك:** `SectionHeader` موجود في `src/components/common/SectionHeader.jsx` — يقبل `icon`, `title`, `subtitle`
- **Framer Motion:** استخدم نفس أنماط الحركة الموجودة في باقي الأقسام (`fadeIn`, `stagger`, `whileInView`)
