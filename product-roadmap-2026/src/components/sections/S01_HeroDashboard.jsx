import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../shared/Icon';
import CommitteeBar from '../charts/CommitteeBar';
import SatisfactionBar from '../charts/SatisfactionBar';
import SectorDonut from '../charts/SectorDonut';
import { heroStats, readinessStats } from '../../data/statsData';

function CountUp({ end, suffix = '', duration = 1500 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const startTime = performance.now();
          const step = (now) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(eased * end));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function S01_HeroDashboard() {
  return (
    <section id="hero" className="hero-dashboard">
      <div className="glow-teal" style={{ top: -100, right: -100 }} />
      <div className="glow-teal" style={{ bottom: -100, left: -100 }} />

      <div className="hero-content">
        {/* Logo + Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 48 }}
        >
          <img src="/logos/white-logo.png" alt="نظم" className="hero-logo" />
          <h1 style={{ color: '#fff', fontSize: '1.875rem', fontWeight: 700, marginTop: 16, marginBottom: 8 }}>
            خطة تطوير منتج نظم — 2026
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem' }}>
            نحو فعاليات ذات أثر استراتيجي
          </p>
        </motion.div>

        {/* 6 Stats Cards */}
        <motion.div
          className="grid grid-6"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ marginBottom: 48 }}
        >
          {heroStats.map((stat, i) => (
            <motion.div key={i} className="glass-card" variants={fadeInUp} style={{ textAlign: 'center' }}>
              <div className="icon-circle" style={{ margin: '0 auto 12px' }}>
                <Icon name={stat.icon} size="xl" />
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>
                <CountUp end={stat.value} suffix={stat.suffix} />
              </div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', marginTop: 4 }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Committee Bar Chart */}
        <motion.div
          className="glass-card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 32 }}
        >
          <h3 style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 600, marginBottom: 16 }}>
            <Icon name="people-group" style={{ marginLeft: 8 }} />
            مخطط اعتماد اللجان
          </h3>
          <CommitteeBar dark />
        </motion.div>

        {/* Satisfaction + Sector Charts */}
        <div className="grid grid-2" style={{ marginBottom: 32 }}>
          <motion.div
            className="glass-card"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 600, marginBottom: 16 }}>
              <Icon name="face-smile" style={{ marginLeft: 8 }} />
              رضا العملاء
            </h3>
            <SatisfactionBar dark />
          </motion.div>

          <motion.div
            className="glass-card"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 600, marginBottom: 16 }}>
              <Icon name="chart-pie" style={{ marginLeft: 8 }} />
              التمركز القطاعي
            </h3>
            <SectorDonut dark />
          </motion.div>
        </div>

        {/* Readiness Indicator */}
        <motion.div
          className="glass-card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 600, marginBottom: 24 }}>
            <Icon name="gauge-high" style={{ marginLeft: 8 }} />
            مؤشر الجاهزية التشغيلية
          </h3>
          <div className="grid" style={{ gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
            {readinessStats.map((stat, i) => (
              <div key={i} className="glass-card" style={{ textAlign: 'center', padding: 16 }}>
                <div style={{ fontSize: '2rem', fontWeight: 700, color: stat.color, lineHeight: 1.2 }}>
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', marginTop: 4 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
