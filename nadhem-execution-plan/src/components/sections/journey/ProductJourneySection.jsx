import { journeySections, journeyMeta, journeyMonths } from '../../../data/journey';

function PillarTimeline({ startMonth, endMonth }) {
  return (
    <div className="journey-pillar-timeline" aria-label={`من ${journeyMonths[startMonth].label} إلى ${journeyMonths[endMonth].label}`}>
      {journeyMonths.map((m, i) => {
        const active = i >= startMonth && i <= endMonth;
        const isStart = i === startMonth;
        const isEnd = i === endMonth;
        return (
          <div
            key={i}
            className={`journey-pill-seg ${active ? 'active' : ''} ${isStart ? 'is-start' : ''} ${isEnd ? 'is-end' : ''}`}
            title={m.label}
          >
            {active && <span className="journey-pill-seg-num">{m.num}</span>}
          </div>
        );
      })}
    </div>
  );
}

function PillarCard({ pillar, index, accent }) {
  return (
    <div
      className="journey-pillar"
      data-aos="fade-up"
      data-aos-delay={index * 30}
      style={{ '--pillar-accent': accent }}
    >
      <div className="journey-pillar-top">
        <div className="journey-pillar-num">{String(index + 1).padStart(2, '0')}</div>
        <div className="journey-pillar-icon">
          <i className={`fa-thin fa-${pillar.icon}`} aria-hidden="true" />
        </div>
        <div className="journey-pillar-body">
          <h4 className="journey-pillar-title">{pillar.title}</h4>
          <p className="journey-pillar-desc">{pillar.desc}</p>
        </div>
      </div>

      <div className="journey-pillar-reason">
        <i className="fa-thin fa-circle-info" aria-hidden="true" />
        <span>
          <strong>السبب:</strong> {pillar.reason}
        </span>
      </div>

      <div className="journey-pillar-track-label">
        <span>
          <i className="fa-thin fa-calendar-range" aria-hidden="true" /> رحلة التنفيذ
        </span>
        <span className="journey-pillar-track-range">
          {journeyMonths[pillar.startMonth].label} — {journeyMonths[pillar.endMonth].label}
        </span>
      </div>
      <PillarTimeline startMonth={pillar.startMonth} endMonth={pillar.endMonth} />
    </div>
  );
}

function ColumnMonthHeader() {
  return (
    <div className="journey-col-months">
      {journeyMonths.map((m) => (
        <div key={m.num} className="journey-col-month">
          <span className="journey-col-month-num">{m.num}</span>
          <span className="journey-col-month-lbl">{m.label}</span>
        </div>
      ))}
    </div>
  );
}

function JourneyColumn({ section }) {
  return (
    <article
      id={`journey-${section.id}`}
      className="journey-column"
      style={{
        '--col-accent': section.color,
        '--col-accent-soft': section.colorSoft,
        '--col-glow': section.colorGlow,
      }}
    >
      <div className="journey-col-glow" />
      <header className="journey-col-header" data-aos="fade-up">
        <div className="journey-col-icon">
          <i className={`fa-thin fa-${section.icon}`} aria-hidden="true" />
        </div>
        <div>
          <h3 className="journey-col-title">{section.label}</h3>
          <p className="journey-col-tag">{section.tagline}</p>
        </div>
      </header>
      <div className="journey-col-summary" data-aos="fade-up">
        {section.summary}
      </div>
      <div className="journey-col-count" data-aos="fade-up">
        <span className="journey-col-count-num">{section.pillars.length}</span>
        <span className="journey-col-count-label">بند رئيسي مرتّب بالأولوية</span>
      </div>
      <ColumnMonthHeader />
      <div className="journey-col-pillars">
        {section.pillars.map((p, i) => (
          <PillarCard key={i} pillar={p} index={i} accent={section.color} />
        ))}
      </div>
    </article>
  );
}

export default function ProductJourneySection() {
  return (
    <section id="journey-overview" className="journey-root">
      <div className="journey-bg" />
      <div className="journey-overlay" />
      <div className="journey-glow journey-glow-1" />
      <div className="journey-glow journey-glow-2" />
      <div className="journey-glow journey-glow-3" />

      <div className="journey-inner">
        <header className="journey-hero" data-aos="fade-up">
          <div className="journey-badge">
            <i className="fa-thin fa-compass" aria-hidden="true" />
            <span>رحلة المنتج — 2026</span>
          </div>
          <h1 className="journey-hero-title">{journeyMeta.title}</h1>
          <p className="journey-hero-sub">{journeyMeta.subtitle}</p>

          <div className="journey-hero-meta">
            <i className="fa-thin fa-flag" aria-hidden="true" />
            <span>نقطة الانطلاق: <strong>1 مايو 2026</strong> — حتى <strong>31 ديسمبر 2026</strong></span>
          </div>

          <div className="journey-kpis">
            {journeyMeta.kpis.map((k, i) => (
              <div key={i} className="journey-kpi" style={{ '--kpi-accent': k.color }}>
                <div className="journey-kpi-ic">
                  <i className={`fa-thin fa-${k.icon}`} aria-hidden="true" />
                </div>
                <div className="journey-kpi-body">
                  <div className="journey-kpi-num">{k.value}</div>
                  <div className="journey-kpi-lbl">{k.label}</div>
                </div>
              </div>
            ))}
          </div>
        </header>

        <div className="journey-grid">
          {journeySections.map((s) => (
            <JourneyColumn key={s.id} section={s} />
          ))}
        </div>

        <footer className="journey-footer" data-aos="fade-up">
          <i className="fa-thin fa-circle-info" aria-hidden="true" />
          <span>
            ترتيب البنود يعكس الأولوية التنفيذية. المدد التقريبية موضّحة على الشريط الزمني لكل بند — التفاصيل الكاملة في تبويبات خطط التطوير والتشغيل والتسويق.
          </span>
        </footer>
      </div>
    </section>
  );
}
