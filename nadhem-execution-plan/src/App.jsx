import { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import HomeSplit from './components/HomeSplit';
import Sidebar from './components/Sidebar';
import PlanTabs from './components/PlanTabs';
import { trackTabs, trackNavMap, trackMeta } from './data/navItems';
import './components/sections/platform/platform.css';
import './components/sections/v2/tracks.css';

import OpsDashboardSection from './components/sections/ops/OpsDashboardSection';
import SubscriptionsSection from './components/sections/ops/SubscriptionsSection';
import CustomerSuccessSection from './components/sections/ops/CustomerSuccessSection';
import CustomerFeedbackSection from './components/sections/ops/CustomerFeedbackSection';
import CompetitorIntelSection from './components/sections/ops/CompetitorIntelSection';
import BestPracticesSection from './components/sections/ops/BestPracticesSection';
import FieldResearchSection from './components/sections/ops/FieldResearchSection';

import MktDashboardSection from './components/sections/marketing/MktDashboardSection';
import ChallengeSection from './components/sections/marketing/ChallengeSection';
import PersonasSection from './components/sections/marketing/PersonasSection';
import ChannelsSection from './components/sections/marketing/ChannelsSection';
import DigitalSection from './components/sections/marketing/DigitalSection';
import PartnershipsSection from './components/sections/marketing/PartnershipsSection';
import GapsSection from './components/sections/marketing/GapsSection';
import MktTasksSection from './components/sections/marketing/MktTasksSection';
import MktCalendarSection from './components/sections/marketing/MktCalendarSection';

import ProductJourneySection from './components/sections/journey/ProductJourneySection';
import PlatformJourneySection from './components/sections/platform/PlatformJourneySection';
import V2RoadmapSection from './components/sections/v2/V2RoadmapSection';

gsap.registerPlugin(Flip);

const fullPageTabs = ['journey', 'product', 'roadmap'];

function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <button
      className={`scroll-top ${visible ? 'visible' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <i className="fa-thin fa-circle-arrow-up" aria-hidden="true" />
    </button>
  );
}

function App() {
  const [track, setTrack] = useState('home');
  const [transitioning, setTransitioning] = useState(false);
  const [tab, setTab] = useState('ops');
  const [active, setActive] = useState('ops-dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const appRootRef = useRef(null);
  const cameFromHomeRef = useRef(false);
  const flipStateRef = useRef(null);

  const finishTransition = useCallback(() => {
    cameFromHomeRef.current = false;
    setTransitioning(false);
  }, []);

  useLayoutEffect(() => {
    if (track === 'home') return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fromHome = cameFromHomeRef.current;
    const ctx = gsap.context(() => {
      const heroInner = gsap.utils.toArray('.track-hero-inner > *');
      const blocks = gsap.utils.toArray('.track-content > *');
      if (reduceMotion) {
        gsap.set(['.track-hero', '.track-tabs-bar', ...heroInner, ...blocks], { opacity: 1, y: 0, clearProps: 'transform,opacity' });
        if (fromHome) finishTransition();
        return;
      }
      if (fromHome && flipStateRef.current) {
        const heroEl = appRootRef.current.querySelector('.track-hero');
        const slotEl = appRootRef.current.querySelector('.track-hero-slot');
        const reservedH = heroEl ? heroEl.offsetHeight : 0;
        if (slotEl && reservedH) gsap.set(slotEl, { height: reservedH });
        gsap.set('.track-tabs-bar', { opacity: 0, y: 16 });
        gsap.set(blocks, { opacity: 0, y: 32 });
        gsap.set('.home-track.is-selected', { autoAlpha: 0 });
        const master = gsap.timeline({
          defaults: { ease: 'power3.out' },
          onComplete: () => {
            gsap.set(['.track-hero', '.track-tabs-bar', ...heroInner, ...blocks], { clearProps: 'transform,opacity,visibility,borderRadius,padding' });
            if (slotEl) gsap.set(slotEl, { clearProps: 'height' });
            flipStateRef.current = null;
            finishTransition();
          },
        });
        const FLIP_DUR = 0.6;
        master.add(Flip.from(flipStateRef.current, { targets: '.track-hero', absolute: true, scale: false, fade: true, duration: FLIP_DUR, ease: 'power2.inOut' }), 0);
        master.to('.home-split-head, .home-present', { opacity: 0, y: -12, duration: 0.28, ease: 'power2.in' }, 0);
        master.to('.home-track:not(.is-selected)', { opacity: 0, y: 14, duration: 0.28, ease: 'power2.in' }, 0);
        master.to('.home-split-overlay-layer', { autoAlpha: 0, duration: 0.4 }, 0.18);
        master.to('.track-tabs-bar', { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }, FLIP_DUR);
        master.to(blocks, { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out', stagger: 0.1 }, FLIP_DUR + 0.08);
      } else {
        gsap.from(blocks, { opacity: 0, y: 28, duration: 0.5, ease: 'power3.out', stagger: 0.1, clearProps: 'transform,opacity' });
      }
    }, appRootRef);
    return () => ctx.revert();
  }, [track, tab, finishTransition]);

  useEffect(() => {
    if (track === 'home') return;
    const currentNav = trackNavMap[tab] || [];
    const ids = currentNav.map(n => n.id);
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }); },
      { rootMargin: '-120px 0px -60% 0px', threshold: 0.1 }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [tab, track]);

  const handleNav = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleTrackSelect = useCallback((newTrack) => {
    const firstTab = trackTabs[newTrack]?.[0]?.id || 'ops';
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    flipStateRef.current = reduceMotion
      ? null
      : Flip.getState(`[data-flip-id="banner-${newTrack}"]`, { props: 'borderRadius,padding' });
    cameFromHomeRef.current = true;
    setTransitioning(true);
    setTrack(newTrack);
    setTab(firstTab);
    setActive(trackNavMap[firstTab]?.[0]?.id || '');
    window.scrollTo({ top: 0 });
  }, []);

  const handleTabChange = useCallback((newTab) => {
    setTab(newTab);
    setActive(trackNavMap[newTab]?.[0]?.id || '');
    window.scrollTo({ top: 0 });
  }, []);

  const handleHome = useCallback(() => {
    cameFromHomeRef.current = false;
    setTransitioning(false);
    setTrack('home');
    setSidebarOpen(false);
    window.scrollTo({ top: 0 });
  }, []);

  const showOverlay = track === 'home' || transitioning;
  const isFullPage = fullPageTabs.includes(tab);
  const meta = trackMeta[track] || trackMeta.v1;

  return (
    <div className="app-root" ref={appRootRef}>
    {track !== 'home' && (
    <div className={`app ${isFullPage ? 'app-platform' : ''} ${transitioning ? 'is-entering' : ''}`}>
      {!isFullPage && (
        <button className="mobile-btn" onClick={() => setSidebarOpen(true)}>
          <i className="fa-thin fa-bars" aria-hidden="true" />
        </button>
      )}

      {!isFullPage && (
        <Sidebar active={active} onNav={handleNav} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} tab={tab} />
      )}

      <main className="main">
        <div className="track-back-bar">
          <button className="track-back-btn" onClick={handleHome}>
            <i className="fa-thin fa-arrow-right-long" aria-hidden="true" />
            <span>الرئيسية</span>
          </button>
          <span className="track-back-name">{meta.name}</span>
        </div>

        <div className="track-hero-slot">
          <div className="track-hero" data-flip-id={`banner-${track}`} style={{ '--track-c': meta.color }}>
            <div className="track-hero-inner">
              <div className="track-hero-icon">
                <i className={`fa-thin fa-${meta.icon}`} aria-hidden="true" />
              </div>
              <div className="track-hero-titles">
                <h1 className="track-hero-name">{meta.name}</h1>
                <p className="track-hero-tag">{meta.tag}</p>
                <p className="track-hero-desc">{meta.desc}</p>
              </div>
            </div>
          </div>
        </div>

        <PlanTabs track={track} activeTab={tab} onTabChange={handleTabChange} />

        <div className="track-content">

        {tab === 'ops' && (
          <>
            <OpsDashboardSection />
            <SubscriptionsSection />
            <CustomerSuccessSection />
            <CustomerFeedbackSection />
            <CompetitorIntelSection />
            <BestPracticesSection />
            <FieldResearchSection />
          </>
        )}

        {tab === 'marketing' && (
          <>
            <MktDashboardSection />
            <div className="hero-divider" />
            <ChallengeSection />
            <PersonasSection />
            <ChannelsSection />
            <DigitalSection />
            <PartnershipsSection />
            <GapsSection />
            <MktTasksSection />
            <MktCalendarSection />
          </>
        )}

        {tab === 'journey' && <ProductJourneySection />}

        {tab === 'product' && <PlatformJourneySection />}

        {tab === 'roadmap' && <V2RoadmapSection />}
        </div>
      </main>

      <ScrollToTop />
    </div>
    )}

    {showOverlay && (
      <HomeSplit onSelect={handleTrackSelect} selectedTrack={transitioning ? track : null} />
    )}
    </div>
  );
}

export default App;
