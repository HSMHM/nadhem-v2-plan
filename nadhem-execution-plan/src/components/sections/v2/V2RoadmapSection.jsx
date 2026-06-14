import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { v2DevPhases, v2DevStats } from '../../../data/v2DevPlan';

const summaryStats = [
  { num: v2DevStats.totalPhases, lbl: 'مراحل تطوير' },
];

export default function V2RoadmapSection() {
  const rootRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const stats = gsap.utils.toArray('.v2road-stat');
      const phases = gsap.utils.toArray('.v2road-phase');

      if (reduceMotion) {
        gsap.set([...stats, ...phases], { opacity: 1, y: 0 });
        return;
      }

      gsap.from(stats, {
        opacity: 0,
        y: 28,
        duration: 0.55,
        ease: 'back.out(1.5)',
        stagger: 0.08,
        clearProps: 'transform,opacity',
        scrollTrigger: { trigger: '.v2road-stats', start: 'top 85%', invalidateOnRefresh: true },
      });

      phases.forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 40,
          duration: 0.6,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
          scrollTrigger: { trigger: el, start: 'top 86%', invalidateOnRefresh: true },
        });
      });
    }, rootRef);

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', onResize);

    return () => {
      ctx.revert();
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <section className="v2road-root" ref={rootRef}>
      <div className="v2road-bg" />
      <div className="v2road-inner">
        <header className="v2road-hero" id="v2-roadmap-overview">
          <div className="v2road-badge">
            <i className="fa-thin fa-diagram-project" aria-hidden="true" />
            <span>إعادة بناء نظم V2 بالذكاء الاصطناعي</span>
          </div>
          <h1 className="v2road-title">خطة التطوير</h1>
          <p className="v2road-sub">
            سبع مراحل تطوير منطقية لإعادة بناء المنتج بالكامل — أكثر من {v2DevStats.totalScreens} شاشة عبر لوحة الأدمن والمنصة، منظّمة حسب وحدات النظام لا دورة حياة الفعالية، حتى التسليم في {v2DevStats.deliveryDate}.
          </p>

          <div className="v2road-stats">
            <div className="v2road-stat">
              <div className="v2road-stat-num">{v2DevStats.deliveryDate}</div>
              <div className="v2road-stat-lbl">تاريخ التسليم</div>
            </div>
            {summaryStats.map((s) => (
              <div key={s.lbl} className="v2road-stat">
                <div className="v2road-stat-num">{s.num}</div>
                <div className="v2road-stat-lbl">{s.lbl}</div>
              </div>
            ))}
          </div>
        </header>

        <div className="v2road-timeline">
          {v2DevPhases.map((phase) => (
            <article
              key={phase.id}
              id={phase.id}
              className="v2road-phase"
              style={{ '--phase-c': phase.color }}
            >
              <div className="v2road-phase-node">
                <i className={`fa-thin fa-${phase.icon}`} aria-hidden="true" />
              </div>
              <div className="v2road-card">
                <header className="v2road-card-head">
                  <span className="v2road-card-num">{phase.num}</span>
                  <div className="v2road-card-titles">
                    <h2 className="v2road-card-title">{phase.title}</h2>
                    <span className="v2road-card-range">
                      <i className="fa-thin fa-calendar-range" aria-hidden="true" />
                      {phase.range}
                    </span>
                  </div>
                </header>
                <div className="v2road-card-body">
                  <p className="v2road-goal">
                    <i className="fa-thin fa-bullseye-arrow" aria-hidden="true" />
                    <span>{phase.goal}</span>
                  </p>
                  <ul className="v2road-items">
                    {phase.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                  <p className="v2road-check">
                    <i className="fa-thin fa-presentation-screen" aria-hidden="true" />
                    <span><strong>نقطة العرض:</strong>{phase.checkpoint}</span>
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
