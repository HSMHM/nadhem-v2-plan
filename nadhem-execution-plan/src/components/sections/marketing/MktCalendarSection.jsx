import SectionHeader from '../../common/SectionHeader';
import { mktTimeline } from '../../../data/marketing';

export default function MktCalendarSection() {
  return (
    <section id="mkt-calendar" className="section">
      <SectionHeader icon="calendar-check" title="الجدول الزمني" />

      <div className="tl">
        {mktTimeline.map((q, qi) => (
          <div key={qi} className="tl-q" data-aos="fade-up">
            <div className="tl-q-label" style={q.urgent ? { color: '#EF4444' } : undefined}>
              {q.urgent && (
                <span style={{ marginLeft: 8, fontSize: '0.75rem', fontWeight: 700, background: '#EF4444', color: '#fff', padding: '2px 10px', borderRadius: 6 }}>
                  <i className="fa-thin fa-bolt" style={{ marginLeft: 4 }} /> عاجل
                </span>
              )}
              {q.period}
            </div>
            {q.tasks.map((item, ii) => (
              <div key={ii} className="tl-item">
                <i className="fa-thin fa-circle-dot" style={{ color: q.urgent ? '#EF4444' : 'var(--primary)', fontSize: 10 }} aria-hidden="true" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
