import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { trackTabs } from '../data/navItems';

export default function PlanTabs({ track, activeTab, onTabChange }) {
  const barRef = useRef(null);
  const tabs = trackTabs[track] || [];

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      const els = gsap.utils.toArray('.track-tabs-bar .plan-tab');
      if (reduceMotion) {
        gsap.set(els, { opacity: 1, y: 0 });
        return;
      }
      gsap.from(els, { opacity: 0, y: -14, duration: 0.45, ease: 'power2.out', stagger: 0.08, clearProps: 'transform,opacity' });
    }, barRef);
    return () => ctx.revert();
  }, [track]);

  return (
    <div className="plan-tabs-bar track-tabs-bar" ref={barRef}>
      {tabs.map((t) => (
        <button
          key={t.id}
          className={`plan-tab ${activeTab === t.id ? 'active' : ''}`}
          data-tab={t.id}
          onClick={() => onTabChange(t.id)}
        >
          <i className={`fa-thin fa-${t.icon}`} aria-hidden="true" />
          <span className="tab-label-full">{t.label}</span>
          <span className="tab-label-short">{t.shortLabel}</span>
        </button>
      ))}
    </div>
  );
}
