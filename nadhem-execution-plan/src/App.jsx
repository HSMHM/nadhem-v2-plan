import { useState, useEffect, useCallback } from 'react';
import WelcomePage from './components/WelcomePage';
import Sidebar, { devNavItems, opsNavItems, marketingNavItems, journeyNavItems, asanaNavItems } from './components/Sidebar';
import PlanTabs from './components/PlanTabs';
import './components/sections/asana/asana.css';
import './components/sections/platform/platform.css';

// Dev sections
import DashboardSection from './components/sections/DashboardSection';
import DevelopmentsSection from './components/sections/DevelopmentsSection';
import ModulesSection from './components/sections/ModulesSection';
import SimpleTimelineSection from './components/sections/SimpleTimelineSection';

// Ops sections
import OpsDashboardSection from './components/sections/ops/OpsDashboardSection';
import UrgentSprintSection from './components/sections/ops/UrgentSprintSection';
import SubscriptionsSection from './components/sections/ops/SubscriptionsSection';
import CustomerSuccessSection from './components/sections/ops/CustomerSuccessSection';
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
import DigitalSection from './components/sections/marketing/DigitalSection';
import PartnershipsSection from './components/sections/marketing/PartnershipsSection';
import GapsSection from './components/sections/marketing/GapsSection';
import MktTasksSection from './components/sections/marketing/MktTasksSection';
import MktCalendarSection from './components/sections/marketing/MktCalendarSection';

// Journey
import ProductJourneySection from './components/sections/journey/ProductJourneySection';

// Asana simulation
import AsanaTaskTabs from './components/sections/asana/AsanaTaskTabs';
import AsanaTemplateSection from './components/sections/asana/AsanaTemplateSection';
import AsanaPipelineSection from './components/sections/asana/AsanaPipelineSection';

// Platform Journey
import PlatformJourneySection from './components/sections/platform/PlatformJourneySection';

const navMap = { dev: devNavItems, ops: opsNavItems, marketing: marketingNavItems, journey: journeyNavItems, asana: asanaNavItems };

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

  const isJourney = plan === 'journey';
  const isAsana = plan === 'asana';
  const isPlatform = plan === 'platform';
  const isFullPage = isJourney || isAsana || isPlatform;

  return (
    <div className={`app ${isJourney ? 'app-journey' : ''} ${isAsana ? 'app-asana' : ''} ${isPlatform ? 'app-platform' : ''}`}>
      {!isFullPage && (
        <button className="mobile-btn" onClick={() => setSidebarOpen(true)}>
          <i className="fa-thin fa-bars" aria-hidden="true" />
        </button>
      )}

      {!isFullPage && (
        <Sidebar active={active} onNav={handleNav} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} plan={plan} />
      )}

      <main className="main">
        <PlanTabs active={plan} onChange={handlePlanChange} />

        {plan === 'dev' && (
          <>
            <DashboardSection />
            <DevelopmentsSection />
            <ModulesSection />
            <SimpleTimelineSection />
          </>
        )}

        {plan === 'ops' && (
          <>
            <OpsDashboardSection />
            <UrgentSprintSection />
            <SubscriptionsSection />
            <CustomerSuccessSection />
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
            <DigitalSection />
            <PartnershipsSection />
            <GapsSection />
            <MktTasksSection />
            <MktCalendarSection />
          </>
        )}

        {plan === 'journey' && (
          <ProductJourneySection />
        )}

        {plan === 'platform' && (
          <PlatformJourneySection />
        )}

        {plan === 'asana' && (
          <>
            <AsanaTaskTabs />
            <AsanaTemplateSection />
            <AsanaPipelineSection />
          </>
        )}
      </main>

      <ScrollToTop />
    </div>
  );
}

export default App;
