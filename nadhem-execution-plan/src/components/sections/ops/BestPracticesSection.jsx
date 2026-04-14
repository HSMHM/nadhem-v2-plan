import SectionHeader from '../../common/SectionHeader';
import { bestPracticesData } from '../../../data/operations';

const cardColors = ['#2A848A', '#BA5A31', '#452059'];

export default function BestPracticesSection() {
  const { categories, tasks } = bestPracticesData;

  return (
    <section id="ops-practices" className="section">
      <SectionHeader icon="lightbulb" title="أفضل الممارسات والاتجاهات" />

      {/* Category cards */}
      <div
        className="grid g3"
        style={{ marginBottom: 24 }}
      >
        {categories.map((cat, i) => (
          <div key={i} className="card" data-aos="fade-up" style={{ padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div className="ic" style={{ flexShrink: 0 }}>
                <i className={`fa-thin fa-${cat.icon}`} style={{ color: cardColors[i] }} aria-hidden="true" />
              </div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-dark)', margin: 0 }}>
                {cat.title}
              </h4>
            </div>
            <ul style={{ paddingRight: 18, paddingLeft: 0, margin: 0 }}>
              {cat.items.map((item, j) => (
                <li key={j} style={{ fontSize: '0.8rem', color: 'var(--text)', lineHeight: 2.1 }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Tasks */}
      <div data-aos="fade-up">
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 12, color: 'var(--text-dark)' }}>
          <i className="fa-thin fa-list-check" style={{ marginLeft: 8 }} /> المهام الدورية
        </h3>
        <div className="task-list">
          {tasks.map(t => (
            <div key={t.id} className="task-item">
              <span className="task-id">{t.id}</span>
              <span className="task-text">{t.task}</span>
              <span className="task-dur">{t.duration}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
