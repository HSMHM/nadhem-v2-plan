import { useState, useEffect, useCallback } from 'react';
import WelcomePage from './components/WelcomePage';
import Sidebar, { devNavItems, opsNavItems, marketingNavItems } from './components/Sidebar';
import PlanTabs from './components/PlanTabs';

// Dev sections
import DashboardSection from './components/sections/DashboardSection';
import DevelopmentsSection from './components/sections/DevelopmentsSection';
import ModulesSection from './components/sections/ModulesSection';
import PackagesSection from './components/sections/PackagesSection';
import IntegrationsSection from './components/sections/IntegrationsSection';
import SimpleTimelineSection from './components/sections/SimpleTimelineSection';
import DesignSystemSection from './components/sections/DesignSystemSection';
import ChartsSection from './components/sections/ChartsSection';
import RoadmapSection from './components/sections/RoadmapSection';

// Ops sections
import OpsDashboardSection from './components/sections/ops/OpsDashboardSection';
import SubscriptionsSection from './components/sections/ops/SubscriptionsSection';
import CustomerFeedbackSection from './components/sections/ops/CustomerFeedbackSection';
import CompetitorIntelSection from './components/sections/ops/CompetitorIntelSection';
import BestPracticesSection from './components/sections/ops/BestPracticesSection';
import FieldResearchSection from './components/sections/ops/FieldResearchSection';
import OpsReportsSection from './components/sections/ops/OpsReportsSection';
import OpsCalendarSection from './components/sections/ops/OpsCalendarSection';
import OpsChartsSection from './components/sections/ops/OpsChartsSection';

// Marketing
import MktDashboardSection from './components/sections/marketing/MktDashboardSection';
import ChallengeSection from './components/sections/marketing/ChallengeSection';
import PersonasSection from './components/sections/marketing/PersonasSection';
import ChannelsSection from './components/sections/marketing/ChannelsSection';
import WinbackSection from './components/sections/marketing/WinbackSection';
import DigitalSection from './components/sections/marketing/DigitalSection';
import PartnershipsSection from './components/sections/marketing/PartnershipsSection';
import GapsSection from './components/sections/marketing/GapsSection';
import MktTasksSection from './components/sections/marketing/MktTasksSection';
import MktCalendarSection from './components/sections/marketing/MktCalendarSection';

const navMap = { dev: devNavItems, ops: opsNavItems, marketing: marketingNavItems };

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
  const [showWelcome, setShowWelcome] = useState(true);
  const [plan, setPlan] = useState('dev');
  const [active, setActive] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const currentNav = navMap[plan] || devNavItems;

  useEffect(() => {
    if (showWelcome) return;
    const ids = currentNav.map(n => n.id);
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }); },
      { rootMargin: '-120px 0px -60% 0px', threshold: 0.1 }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, [plan, showWelcome]);

  const handleNav = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handlePlanChange = useCallback((newPlan) => {
    setPlan(newPlan);
    setActive(navMap[newPlan]?.[0]?.id || '');
    window.scrollTo({ top: 0 });
  }, []);

  if (showWelcome) {
    return <WelcomePage onEnter={() => { setShowWelcome(false); window.scrollTo({ top: 0 }); }} />;
  }

  return (
    <div className="app">
      <button className="mobile-btn" onClick={() => setSidebarOpen(true)}>
        <i className="fa-thin fa-bars" aria-hidden="true" />
      </button>

      <Sidebar active={active} onNav={handleNav} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} plan={plan} />

      <main className="main">
        <PlanTabs active={plan} onChange={handlePlanChange} />

        {plan === 'dev' && (
          <>
            <DashboardSection />
            <DevelopmentsSection />
            <ModulesSection />
            <PackagesSection />
            <IntegrationsSection />
            <SimpleTimelineSection />
            <DesignSystemSection />
            <ChartsSection />
            <RoadmapSection />
          </>
        )}

        {plan === 'ops' && (
          <>
            <OpsDashboardSection />
            <SubscriptionsSection />
            <CustomerFeedbackSection />
            <CompetitorIntelSection />
            <BestPracticesSection />
            <FieldResearchSection />
            <OpsReportsSection />
            <OpsCalendarSection />
            <OpsChartsSection />
          </>
        )}

        {plan === 'marketing' && (
          <>
            <MktDashboardSection />
            <div className="hero-divider" />
            <ChallengeSection />
            <PersonasSection />
            <ChannelsSection />
            <WinbackSection />
            <DigitalSection />
            <PartnershipsSection />
            <GapsSection />
            <MktTasksSection />
            <MktCalendarSection />
          </>
        )}
      </main>

      <ScrollToTop />
    </div>
  );
}

export default App;
