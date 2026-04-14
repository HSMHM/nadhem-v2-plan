import { useState, useEffect, useCallback } from 'react';
import Sidebar, { navItems } from './components/Sidebar';
import DashboardSection from './components/sections/DashboardSection';
import DevelopmentsSection from './components/sections/DevelopmentsSection';
import ModulesSection from './components/sections/ModulesSection';
import PackagesSection from './components/sections/PackagesSection';
import IntegrationsSection from './components/sections/IntegrationsSection';
import SimpleTimelineSection from './components/sections/SimpleTimelineSection';
import DetailedTimelineSection from './components/sections/DetailedTimelineSection';
import DesignSystemSection from './components/sections/DesignSystemSection';
import ChartsSection from './components/sections/ChartsSection';
import { motion, AnimatePresence } from 'framer-motion';

function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.button className="scroll-top" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <i className="fa-thin fa-circle-arrow-up" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

function App() {
  const [active, setActive] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const ids = navItems.map(n => n.id);
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }); },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0.1 }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);

  const handleNav = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="app">
      <button className="mobile-btn" onClick={() => setSidebarOpen(true)}>
        <i className="fa-thin fa-bars" aria-hidden="true" />
      </button>

      <Sidebar active={active} onNav={handleNav} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="main">
        <DashboardSection />
        <DevelopmentsSection />
        <ModulesSection />
        <PackagesSection />
        <IntegrationsSection />
        <SimpleTimelineSection />
        <DetailedTimelineSection />
        <DesignSystemSection />
        <ChartsSection />
      </main>

      <ScrollToTop />
    </div>
  );
}

export default App;
