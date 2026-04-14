import SectionHeader from '../../common/SectionHeader';
import { subscriptionsData } from '../../../data/operations';

const summaryCards = [
  { label: 'اشتراك نشط', key: 'active', color: '#10B981', icon: 'circle-check' },
  { label: 'اشتراك منتهي', key: 'expired', color: '#EF4444', icon: 'circle-xmark' },
  { label: 'إجمالي الاشتراكات', key: 'total', color: '#452059', icon: 'sigma' },
];

export default function SubscriptionsSection() {
  const { summary, tasks } = subscriptionsData;

  return (
    <section id="ops-subscriptions" className="section">
      <SectionHeader icon="file-contract" title="متابعة الاشتراكات" />

      {/* Summary cards */}
      <div
        className="grid g4"
        style={{ marginBottom: 24 }}
      >
        {summaryCards.map((c, i) => (
          <div key={c.key} className="card" data-aos="fade-up" style={{ textAlign: 'center' }}>
            <div className="ic" style={{ margin: '0 auto 10px' }}>
              <i className={`fa-thin fa-${c.icon}`} style={{ color: c.color }} aria-hidden="true" />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 700, color: c.color, lineHeight: 1.2 }}>
              {summary[c.key]}
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: 4 }}>
              {c.label}
            </div>
          </div>
        ))}

        {/* Renewal rate card with warning */}
        <div className="card" data-aos="fade-up" style={{ textAlign: 'center' }}>
          <div className="ic" style={{ margin: '0 auto 10px' }}>
            <i className="fa-thin fa-arrow-rotate-right" style={{ color: '#EF4444' }} aria-hidden="true" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: '#EF4444', lineHeight: 1.2 }}>
            {summary.renewalRate}%
          </div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: 4 }}>
            معدل التجديد
          </div>
          <div style={{ marginTop: 8 }}>
            <span className="badge" style={{ background: 'rgba(239,68,68,0.1)', color: '#EF4444', fontSize: '0.72rem' }}>
              <i className="fa-thin fa-triangle-exclamation" style={{ marginLeft: 4 }} /> يحتاج تحسين عاجل
            </span>
          </div>
        </div>
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
