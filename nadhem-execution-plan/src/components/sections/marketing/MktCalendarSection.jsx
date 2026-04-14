import SectionHeader from '../../common/SectionHeader';
import { mktTimeline } from '../../../data/marketing';

export default function MktCalendarSection() {
  return (
    <section id="mkt-calendar" className="section">
      <SectionHeader icon="calendar-check" title="الجدول الزمني" />

      <div className="tl">
        {mktTimeline.map((q, qi) => (
          <div key={qi} className="tl-q" data-aos="fade-up" data-aos-delay={Math.min(qi * 80, 600)}>
            <div className="tl-q-label">{q.period}</div>
            {q.tasks.map((item, ii) => (
              <div key={ii} className="tl-item">
                <i className="fa-thin fa-circle-dot" style={{ color: 'var(--primary)', fontSize: 10 }} aria-hidden="true" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
