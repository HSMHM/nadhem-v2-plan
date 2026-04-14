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
];

export default function Sidebar({ active, onNav, isOpen, onClose }) {
  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />
      <nav className={`sidebar ${isOpen ? 'open' : ''}`}>
        <img src="/logos/white-logo.png" alt="نظم" className="sidebar-logo" />
        <div className="sidebar-title">خطة التنفيذ 2026</div>

        {navItems.map((item) => (
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

export { navItems };
