import SectionHeader from '../../common/SectionHeader';
import { urgentSprint } from '../../../data/operations';

export default function UrgentSprintSection() {
  return (
    <section id="ops-urgent-sprint" className="section">
      <SectionHeader
        icon="bolt"
        title={urgentSprint.title}
        subtitle={`${urgentSprint.period} — 4 تطويرات عاجلة + 7 مهام تشغيلية دورية`}
      />

      <div className="card" style={{ borderColor: '#EF4444', background: 'rgba(239,68,68,0.04)', marginBottom: 20 }} data-aos="fade-up">
        <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
          <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(239,68,68,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <i className="fa-thin fa-bolt" style={{ color: '#EF4444', fontSize: 20 }} aria-hidden="true" />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: '0.88rem', color: 'var(--text)', lineHeight: 1.9, margin: 0 }}>{urgentSprint.summary}</p>
          </div>
        </div>
      </div>

      <div className="grid g2" style={{ marginBottom: 24 }}>
        <div className="card" data-aos="fade-up">
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-dark)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
            <i className="fa-thin fa-flag-checkered" style={{ color: '#EF4444' }} aria-hidden="true" />
            نقاط التسليم الرئيسية
          </h3>
          <div style={{ display: 'grid', gap: 10 }}>
            {urgentSprint.milestones.map((m, i) => (
              <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '10px 12px', background: 'var(--bg-light)', borderRadius: 8, borderRight: '3px solid #EF4444' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#EF4444', minWidth: 90 }}>{m.deadline}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-dark)', fontWeight: 500 }}>{m.label}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 2 }}>
                    <i className="fa-thin fa-user" style={{ marginLeft: 4 }} /> {m.owner}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card" data-aos="fade-up">
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-dark)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
            <i className="fa-thin fa-list-check" style={{ color: '#EF4444' }} aria-hidden="true" />
            مهام تشغيلية خلال الحزمة
          </h3>
          <div style={{ display: 'grid', gap: 8 }}>
            {urgentSprint.tasks.map((t) => (
              <div key={t.id} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', padding: '10px 12px', background: 'var(--bg-light)', borderRadius: 8, fontSize: '0.84rem' }}>
                <span style={{ color: '#EF4444', fontWeight: 700, fontSize: '0.75rem', minWidth: 32 }}>{t.id}</span>
                <span style={{ flex: 1, color: 'var(--text-dark)' }}>{t.task}</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{t.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
