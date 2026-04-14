import SectionHeader from '../../common/SectionHeader';
import { winbackPlan } from '../../../data/marketing';

const phaseColors = ['#452059', '#2A848A', '#BA5A31'];

export default function WinbackSection() {
  return (
    <section id="mkt-winback" className="section">
      <SectionHeader icon="user-plus" title="استعادة العملاء السابقين" />

      {/* Timeline phases */}
      <div className="tl" style={{ marginBottom: 28 }}>
        <div>
          {winbackPlan.phases.map((phase, i) => (
            <div key={i} className="tl-item" data-aos="fade-up">
              <div className="card" style={{ borderRight: `3px solid ${phaseColors[i]}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <div className="ic" style={{ background: `${phaseColors[i]}15` }}>
                    <i className="fa-thin fa-flag" style={{ color: phaseColors[i] }} aria-hidden="true" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-dark)', margin: 0 }}>{phase.name}</h4>
                  </div>
                  <span className="badge badge-s">{phase.period}</span>
                </div>

                <div className="task-list">
                  {phase.tasks.map((task, j) => (
                    <div key={j} className="task-item">
                      <span className="task-id">{i + 1}.{j + 1}</span>
                      <span className="task-text">{task}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dual target cards */}
      <div className="grid g2">
        <div className="card" data-aos="fade-up" style={{ textAlign: 'center', background: 'linear-gradient(135deg, rgba(42,132,138,0.06), rgba(42,132,138,0.02))', borderColor: 'rgba(42,132,138,0.15)' }}>
          <div className="ic" style={{ width: 56, height: 56, borderRadius: 14, margin: '0 auto 12px', background: 'rgba(42,132,138,0.1)' }}>
            <i className="fa-thin fa-user-plus" style={{ fontSize: 24, color: 'var(--primary)' }} aria-hidden="true" />
          </div>
          <div style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: 6 }}>هدف الاكتساب</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--primary)', marginBottom: 4 }}>10 – 15 عميل جديد</div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', margin: 0 }}>من جميع القطاعات (غير ربحي + حكومي + خاص)</p>
        </div>

        <div className="card" data-aos="fade-up" style={{ textAlign: 'center', background: 'linear-gradient(135deg, rgba(186,90,49,0.06), rgba(186,90,49,0.02))', borderColor: 'rgba(186,90,49,0.15)' }}>
          <div className="ic" style={{ width: 56, height: 56, borderRadius: 14, margin: '0 auto 12px', background: 'rgba(186,90,49,0.1)' }}>
            <i className="fa-thin fa-user-clock" style={{ fontSize: 24, color: 'var(--accent-orange)' }} aria-hidden="true" />
          </div>
          <div style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: 6 }}>هدف الاستعادة</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--accent-orange)', marginBottom: 4 }}>8 – 10 عميل مُستعاد</div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', margin: 0 }}>من الـ 71 عميل سابق</p>
        </div>
      </div>
    </section>
  );
}
