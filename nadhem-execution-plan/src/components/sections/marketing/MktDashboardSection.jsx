import { motion } from 'framer-motion';
import StatCard from '../../common/StatCard';
import { mktStats, mktTargets } from '../../../data/marketing';

const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

export default function MktDashboardSection() {
  return (
    <section id="mkt-dashboard" className="hero">
      <div className="glow" style={{ top: -100, right: -100 }} />
      <div className="glow" style={{ bottom: -100, left: -100 }} />

      <div className="hero-inner">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 40 }}
        >
          <img src="/logos/white-logo.png" alt="نظم" style={{ width: 150, height: 'auto' }} />
          <h1 style={{ color: '#fff', fontSize: '1.7rem', fontWeight: 700, marginTop: 14, marginBottom: 6 }}>
            خطة التسويق — منتج نظم 2026
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.95rem' }}>
            6,348 منظمة غير ربحية — 7 عملاء نشطون — فرصة نمو كبيرة
          </p>
        </motion.div>

        {/* PM role note */}
        <div style={{
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 12,
          padding: '14px 20px',
          marginBottom: 28,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}>
          <i className="fa-thin fa-circle-info" style={{ color: 'var(--primary)', fontSize: 18 }} aria-hidden="true" />
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.82rem', margin: 0, lineHeight: 1.7 }}>
            يوجد مهام لمدير المنتج في خطتي
            <strong style={{ color: 'rgba(255,255,255,0.85)' }}> التطوير </strong>
            و
            <strong style={{ color: 'rgba(255,255,255,0.85)' }}> التشغيل </strong>
            أيضاً.
          </p>
        </div>

        {/* Stat cards */}
        <motion.div
          className="grid g3"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{ marginBottom: 32 }}
        >
          {mktStats.map((s, i) => (
            <motion.div key={i} variants={fadeIn}>
              <StatCard {...s} glass />
            </motion.div>
          ))}
        </motion.div>

        {/* Targets cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h3 style={{ color: '#fff', fontSize: '1rem', fontWeight: 600, marginBottom: 16 }}>
            <i className="fa-thin fa-bullseye-arrow" style={{ marginLeft: 8 }} /> الأهداف المستهدفة نهاية 2026
          </h3>
          <div className="grid g3" style={{ marginBottom: 0 }}>
            {mktTargets.map((t, i) => (
              <motion.div
                key={i}
                className="glass"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                  <div className="ic" style={{ background: 'rgba(42,132,138,0.15)', flexShrink: 0 }}>
                    <i className={`fa-thin fa-${t.icon}`} style={{ color: '#2A848A' }} aria-hidden="true" />
                  </div>
                  <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.88rem', fontWeight: 600 }}>{t.metric}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                  <div>
                    <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.72rem', marginBottom: 2 }}>الهدف</div>
                    <div style={{ color: '#10B981', fontSize: '1.1rem', fontWeight: 700 }}>{t.target}</div>
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.72rem', marginBottom: 2 }}>الحالي</div>
                    <div style={{ color: '#EF4444', fontSize: '1.1rem', fontWeight: 700 }}>{t.current}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
