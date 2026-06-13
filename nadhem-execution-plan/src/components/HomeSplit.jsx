import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './sections/v2/tracks.css';

const tracks = [
  {
    id: 'v1',
    name: 'نظم V1',
    tag: 'المنتج القائم',
    color: '#BA5A31',
    icon: 'gears',
    desc: 'النظام التشغيلي العامل اليوم — متابعة العمليات والتسويق ورحلة المنتج عبر مساراته الحالية.',
    chips: [
      { icon: 'gears', label: 'الخطة التشغيلية' },
      { icon: 'bullhorn', label: 'خطة التسويق' },
      { icon: 'compass', label: 'رحلة المنتج' },
    ],
  },
  {
    id: 'v2',
    name: 'نظم V2',
    tag: 'المنتج المعاد بناؤه',
    color: '#2A848A',
    icon: 'wand-magic-sparkles',
    desc: 'النظام المعاد بناؤه بالكامل بالذكاء الاصطناعي — وصف المنتج وخطة تطويره حتى التسليم.',
    chips: [
      { icon: 'route', label: 'وصف المنتج' },
      { icon: 'diagram-project', label: 'خطة التطوير' },
    ],
  },
];

export default function HomeSplit({ onSelect, selectedTrack }) {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('.home-track, .home-present');
      if (reduceMotion) {
        gsap.set(items, { opacity: 1, y: 0, scale: 1 });
        return;
      }
      gsap.from('.home-split-head > *', { opacity: 0, y: -20, duration: 0.6, ease: 'power2.out', stagger: 0.08, clearProps: 'transform,opacity' });
      gsap.from(items, { opacity: 0, y: 40, scale: 0.96, duration: 0.6, ease: 'back.out(1.4)', stagger: 0.12, delay: 0.15, clearProps: 'transform,opacity,scale' });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="home-split home-split-overlay-layer" ref={rootRef}>
      <div className="home-split-bg" />
      <div className="home-split-overlay" />

      <div className="home-split-head">
        <img src="/logos/white-logo.png" alt="نظم" className="home-split-logo" />
        <h1 className="home-split-title">خطة منتج نظم لعام 2026</h1>
        <p className="home-split-sub">مساران رئيسيان للمنتج — اختر المسار للدخول إلى تفاصيله.</p>
      </div>

      <div className="home-split-stage">
        <div className="home-split-tracks">
          {tracks.map((t) => (
            <div
              key={t.id}
              data-flip-id={`banner-${t.id}`}
              className={`home-track ${selectedTrack === t.id ? 'is-selected' : ''}`}
              style={{ '--track-c': t.color }}
              onClick={() => onSelect(t.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(t.id); } }}
            >
              <div className="home-track-glow" />
              <div className="home-track-top">
                <div className="home-track-icon">
                  <i className={`fa-thin fa-${t.icon}`} aria-hidden="true" />
                </div>
                <div className="home-track-titles">
                  <h2 className="home-track-name">{t.name}</h2>
                  <p className="home-track-tag">{t.tag}</p>
                </div>
              </div>
              <p className="home-track-desc">{t.desc}</p>
              <div className="home-track-tabs">
                {t.chips.map((c) => (
                  <span key={c.label} className="home-track-chip">
                    <i className={`fa-thin fa-${c.icon}`} aria-hidden="true" />
                    {c.label}
                  </span>
                ))}
              </div>
              <span className="home-track-enter">
                الدخول للمسار
                <i className="fa-thin fa-arrow-left-long" aria-hidden="true" />
              </span>
            </div>
          ))}
        </div>

        <div className="home-present" aria-disabled="true">
          <div className="home-present-icon">
            <i className="fa-thin fa-presentation-screen" aria-hidden="true" />
          </div>
          <div className="home-present-body">
            <p className="home-present-title">العرض التقديمي</p>
            <p className="home-present-sub">عرض تقديمي متكامل للخطة — سيُفعّل لاحقاً.</p>
          </div>
          <span className="home-present-soon">قريباً</span>
        </div>
      </div>
    </div>
  );
}
