export const devNavItems = [
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

export const opsNavItems = [
  { id: 'ops-dashboard', label: 'لوحة المؤشرات التشغيلية', icon: 'gauge-high' },
  { id: 'ops-subscriptions', label: 'متابعة الاشتراكات', icon: 'file-contract' },
  { id: 'ops-feedback', label: 'تقييم العملاء والأثر', icon: 'star-half-stroke' },
  { id: 'ops-competitors', label: 'دراسة المنافسين', icon: 'binoculars' },
  { id: 'ops-practices', label: 'أفضل الممارسات', icon: 'lightbulb' },
  { id: 'ops-field', label: 'الحضور الميداني', icon: 'person-walking' },
  { id: 'ops-reports', label: 'التقارير الدورية', icon: 'file-chart-column' },
  { id: 'ops-calendar', label: 'الجدول التشغيلي', icon: 'calendar-check' },
  { id: 'ops-charts', label: 'الرسوم البيانية', icon: 'chart-pie' },
];

export const marketingNavItems = [
  { id: 'marketing-placeholder', label: 'خطة التسويق (قريباً)', icon: 'bullhorn' },
];

const navMap = { dev: devNavItems, ops: opsNavItems, marketing: marketingNavItems };

export default function Sidebar({ active, onNav, isOpen, onClose, plan = 'dev' }) {
  const items = navMap[plan] || devNavItems;

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />
      <nav className={`sidebar ${isOpen ? 'open' : ''}`}>
        <img src="/logos/white-logo.png" alt="نظم" className="sidebar-logo" />
        <div className="sidebar-title">خطة التنفيذ 2026</div>

        {items.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`nav-item ${active === item.id ? 'active' : ''}`}
            onClick={(e) => { e.preventDefault(); onNav(item.id); onClose(); }}
          >
            <i className={`fa-thin fa-${item.icon}`} aria-hidden="true" />
            {item.label}
          </a>
        ))}

        <div className="sidebar-footer">نظم — خطة التنفيذ 2026</div>
      </nav>
    </>
  );
}
