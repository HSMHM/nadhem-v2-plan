import SectionHeader from '../../common/SectionHeader';
import { customerSuccessData } from '../../../data/operations';

export default function CustomerSuccessSection() {
  const { intro, stages, tasks } = customerSuccessData;

  return (
    <section id="ops-customer-success" className="section">
      <SectionHeader
        icon="user-graduate"
        title="تمكين العميل من النظام"
        subtitle="رحلة تمكين رسمية من أربع محطات — حتى لا يكتفي العميل بالاشتراك، بل يستثمر كامل قدرات المنصة"
      />

      {/* Intro card */}
      <div className="card" data-aos="fade-up" style={{ marginBottom: 24, borderRight: '3px solid var(--accent-orange)' }}>
        <p style={{ fontSize: '0.88rem', color: 'var(--text)', lineHeight: 2, margin: 0 }}>
          {intro}
        </p>
      </div>

      {/* 4 Stages */}
      <div className="grid g4" style={{ marginBottom: 28 }}>
        {stages.map((s, i) => (
          <div
            key={s.id}
            className="card"
            data-aos="fade-up"
            data-aos-delay={i * 60}
            style={{ position: 'relative', borderTop: `3px solid ${s.color}` }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div
                className="ic"
                style={{
                  background: `${s.color}1A`,
                  flexShrink: 0,
                }}
              >
                <i className={`fa-thin fa-${s.icon}`} style={{ color: s.color }} aria-hidden="true" />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.7rem', color: s.color, fontWeight: 700, letterSpacing: '0.5px' }}>
                  المحطة {i + 1}
                </div>
                <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-dark)', lineHeight: 1.6, margin: '2px 0 0' }}>
                  {s.title}
                </h4>
              </div>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.9, margin: 0 }}>
              {s.desc}
            </p>
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
