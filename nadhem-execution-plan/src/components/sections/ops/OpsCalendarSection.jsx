import SectionHeader from '../../common/SectionHeader';
import { opsCalendar } from '../../../data/operations';

function SubHeader({ icon, title, color }) {
  return (
    <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-dark)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
      <i className={`fa-thin fa-${icon}`} style={{ color }} aria-hidden="true" />
      {title}
    </h3>
  );
}

export default function OpsCalendarSection() {
  return (
    <section id="ops-calendar" className="section">
      <SectionHeader icon="calendar-check" title="الجدول التشغيلي" />

      <div className="grid g2" style={{ marginBottom: 24 }}>
        {/* Daily */}
        <div className="card" data-aos="fade-up">
          <SubHeader icon="sun" title="يومي" color="var(--danger)" />
          <div style={{ display: 'grid', gap: 8 }}>
            {opsCalendar.daily.map((item, i) => (
              <div key={i} data-aos="fade-up" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: 'var(--bg-light)', borderRadius: 10, fontSize: '0.88rem' }}>
                <span className="badge badge-d" style={{ fontSize: '0.75rem', minWidth: 'fit-content' }}>{item.time}</span>
                <span style={{ flex: 1, color: 'var(--text-dark)' }}>{item.task}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{item.duration}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly */}
        <div className="card" data-aos="fade-up">
          <SubHeader icon="calendar-week" title="أسبوعي" color="var(--accent-orange)" />
          <div style={{ display: 'grid', gap: 8 }}>
            {opsCalendar.weekly.map((item, i) => (
              <div key={i} data-aos="fade-up" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: 'var(--bg-light)', borderRadius: 10, fontSize: '0.88rem' }}>
                <span className="badge badge-w" style={{ fontSize: '0.75rem', minWidth: 'fit-content' }}>{item.day}</span>
                <span style={{ flex: 1, color: 'var(--text-dark)' }}>{item.task}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{item.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid g2">
        {/* Monthly */}
        <div className="card" data-aos="fade-up">
          <SubHeader icon="calendar-days" title="شهري" color="var(--primary)" />
          <div style={{ display: 'grid', gap: 8 }}>
            {opsCalendar.monthly.map((item, i) => (
              <div key={i} data-aos="fade-up" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: 'var(--bg-light)', borderRadius: 10, fontSize: '0.88rem' }}>
                <span className="badge badge-s" style={{ fontSize: '0.75rem', minWidth: 'fit-content' }}>{item.week}</span>
                <span style={{ flex: 1, color: 'var(--text-dark)' }}>{item.task}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quarterly */}
        <div className="card" data-aos="fade-up">
          <SubHeader icon="calendar-lines" title="ربع سنوي" color="var(--secondary)" />
          <div style={{ display: 'grid', gap: 8 }}>
            {opsCalendar.quarterly.map((item, i) => (
              <div key={i} data-aos="fade-up" style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: 'var(--bg-light)', borderRadius: 10, fontSize: '0.88rem' }}>
                <span className="badge badge-q" style={{ fontSize: '0.75rem' }}>{i + 1}</span>
                <span style={{ flex: 1, color: 'var(--text-dark)' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
