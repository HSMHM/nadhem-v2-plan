import SectionHeader from '../../common/SectionHeader';
import { gaps } from '../../../data/marketing';

const priorityMap = {
  highest: { cls: 'badge-d', label: 'أولوية قصوى' },
  high: { cls: 'badge-w', label: 'أولوية عالية' },
  medium: { cls: 'badge-p', label: 'أولوية متوسطة' },
};

export default function GapsSection() {
  return (
    <section id="mkt-gaps" className="section">
      <SectionHeader icon="clipboard-list-check" title="النواقص والتوصيات" />

      <div className="grid g2">
        {gaps.map((g, i) => {
          const p = priorityMap[g.priority] || priorityMap.medium;
          return (
            <div key={i} className="card" data-aos="fade-up" data-aos-delay={Math.min(i * 80, 600)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div className="ic" style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(239,68,68,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className={`fa-thin fa-${g.icon}`} style={{ fontSize: 20, color: 'var(--danger)' }} aria-hidden="true" />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-dark)', margin: 0 }}>{g.gap}</h3>
                </div>
                <span className={`badge ${p.cls}`} style={{ fontSize: '0.72rem' }}>{p.label}</span>
              </div>

              <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--danger)', marginBottom: 4 }}>
                  <i className="fa-thin fa-triangle-exclamation" style={{ marginLeft: 4 }} aria-hidden="true" />
                  المشكلة
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text)', lineHeight: 1.7, margin: 0 }}>{g.desc}</p>
              </div>

              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--success)', marginBottom: 4 }}>
                  <i className="fa-thin fa-lightbulb" style={{ marginLeft: 4 }} aria-hidden="true" />
                  التوصية
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text)', lineHeight: 1.7, margin: 0 }}>{g.recommendation}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
