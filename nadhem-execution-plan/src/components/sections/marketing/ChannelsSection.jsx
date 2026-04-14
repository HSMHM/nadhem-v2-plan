import SectionHeader from '../../common/SectionHeader';
import { channels } from '../../../data/marketing';

export default function ChannelsSection() {
  return (
    <section id="mkt-channels" className="section">
      <SectionHeader icon="diagram-project" title="قنوات الوصول للمنظمين" />

      {channels.map((group, gi) => (
        <div
          key={gi}
          data-aos="fade-up"
          data-aos-delay={Math.min(gi * 80, 600)}
          style={{ marginBottom: 28 }}
        >
          <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 14, color: 'var(--text-dark)' }}>
            <i className="fa-thin fa-layer-group" style={{ marginLeft: 8, color: '#452059' }} /> {group.category}
          </h3>

          <div className="grid g2">
            {group.items.map((ch, ci) => (
              <div key={ci} className="card" data-aos="fade-up" data-aos-delay={Math.min(ci * 80, 600)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                  <div className="ic">
                    <i className={`fa-thin fa-${ch.icon}`} style={{ color: '#2A848A' }} aria-hidden="true" />
                  </div>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-dark)', margin: 0 }}>{ch.name}</h4>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: 1.7, margin: '0 0 10px' }}>{ch.desc}</p>
                <div style={{
                  background: 'rgba(16,185,129,0.07)',
                  borderRadius: 8,
                  padding: '8px 12px',
                  borderRight: '3px solid #10B981',
                }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#10B981' }}>
                    <i className="fa-thin fa-bolt" style={{ marginLeft: 6 }} /> الإجراء:
                  </span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginRight: 6 }}>{ch.actionable}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
