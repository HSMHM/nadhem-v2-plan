import { trackNavMap, opsNavItems } from '../data/navItems';

export default function Sidebar({ active, onNav, isOpen, onClose, tab }) {
  const items = trackNavMap[tab] || opsNavItems;

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'open' : ''}`} onClick={onClose} />
      <nav className={`sidebar ${isOpen ? 'open' : ''}`}>
        <button className="sidebar-close" onClick={onClose}>
          <i className="fa-thin fa-xmark" aria-hidden="true" />
        </button>
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
