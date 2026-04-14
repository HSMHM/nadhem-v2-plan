import { motion } from 'framer-motion';
import SectionHeader from '../common/SectionHeader';
import { currentIntegrations, futureIntegrations } from '../../data/integrations';

const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

export default function IntegrationsSection() {
  return (
    <section id="integrations" className="section">
      <SectionHeader icon="plug" title="التكاملات" subtitle="التكاملات الحالية والمستقبلية للنظام" />

      <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-dark)', marginBottom: 14 }}>
        <i className="fa-thin fa-circle-check" style={{ marginLeft: 8, color: 'var(--success)' }} /> التكاملات الحالية
      </h3>
      <motion.div className="grid g4" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { transition: { staggerChildren: 0.08 } } }} style={{ marginBottom: 32 }}>
        {currentIntegrations.map((item, i) => (
          <motion.div key={i} className="card" variants={fadeIn} style={{ textAlign: 'center' }}>
            <div className="ic" style={{ margin: '0 auto 12px' }}>
              <i className={`fa-thin fa-${item.icon}`} aria-hidden="true" />
            </div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-dark)', marginBottom: 6 }}>{item.name}</h4>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '0 0 8px' }}>{item.description}</p>
            <span className="badge badge-s">{item.status}</span>
          </motion.div>
        ))}
      </motion.div>

      <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-dark)', marginBottom: 14 }}>
        <i className="fa-thin fa-clock" style={{ marginLeft: 8, color: 'var(--warning)' }} /> التكاملات المستقبلية (2026)
      </h3>
      <motion.div className="grid g4" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { transition: { staggerChildren: 0.08 } } }}>
        {futureIntegrations.map((item, i) => (
          <motion.div key={i} className="card" variants={fadeIn} style={{ textAlign: 'center' }}>
            <div className="ic" style={{ margin: '0 auto 12px', background: 'rgba(245,158,11,0.1)' }}>
              <i className={`fa-thin fa-${item.icon}`} style={{ color: 'var(--warning)' }} aria-hidden="true" />
            </div>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-dark)', marginBottom: 6 }}>{item.name}</h4>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '0 0 8px' }}>{item.description}</p>
            <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
              <span className="badge badge-q">{item.quarter}</span>
              <span className="badge badge-p">تطوير {item.devId}</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
