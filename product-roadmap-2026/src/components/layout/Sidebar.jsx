import { navigationData } from '../../data/navigationData';
import Icon from '../shared/Icon';

export default function Sidebar({ activeSection, onNavigate, isOpen, onClose }) {
  return (
    <>
      <div
        className={`sidebar-overlay ${isOpen ? 'open' : ''}`}
        onClick={onClose}
      />
      <nav className={`sidebar ${isOpen ? 'open' : ''}`}>
        <img src="/logos/white-logo.png" alt="نظم" className="sidebar-logo" />
        <div className="sidebar-title">خطة المنتج 2026</div>

        {navigationData.map((item, idx) => {
          if (item.group) {
            return (
              <div key={idx} className="sidebar-group-label">
                {item.group}
              </div>
            );
          }
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(item.id);
                onClose();
              }}
            >
              <Icon name={item.icon} />
              {item.label}
            </a>
          );
        })}

        <div className="sidebar-footer">نظم — 2026</div>
      </nav>
    </>
  );
}
