import { motion } from 'framer-motion';
import SectionHeader from '../../common/SectionHeader';
import { winbackPlan } from '../../../data/marketing';

const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const phaseColors = ['#452059', '#2A848A', '#BA5A31'];

export default function WinbackSection() {
  return (
    <section id="mkt-winback" className="section">
      <SectionHeader icon="user-plus" title="استعادة العملاء السابقين" />

      {/* Timeline phases */}
      <div className="tl" style={{ marginBottom: 28 }}>
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {winbackPlan.phases.map((phase, i) => (
            <motion.div key={i} className="tl-item" variants={fadeIn}>
              <div className="card" style={{ borderRight: `3px solid ${phaseColors[i]}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <div className="ic" style={{ background: `${phaseColors[i]}15` }}>
                    <i className="fa-thin fa-flag" style={{ color: phaseColors[i] }} aria-hidden="true" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-dark)', margin: 0 }}>{phase.name}</h4>
                  </div>
                  <span className="badge badge-s">{phase.period}</span>
                </div>

                <div className="task-list">
                  {phase.tasks.map((task, j) => (
                    <div key={j} className="task-item">
                      <span className="task-id">{i + 1}.{j + 1}</span>
                      <span className="task-text">{task}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Target card */}
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(69,32,89,0.06), rgba(42,132,138,0.06))',
          border: '1px solid rgba(69,32,89,0.12)',
        }}
      >
        <div className="ic" style={{ width: 56, height: 56, borderRadius: 14, margin: '0 auto 12px', background: 'rgba(16,185,129,0.1)' }}>
          <i className="fa-thin fa-bullseye-arrow" style={{ fontSize: 24, color: '#10B981' }} aria-hidden="true" />
        </div>
        <div style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: 6 }}>
          هدف الاستعادة
        </div>
        <div style={{ fontSize: '1.6rem', fontWeight: 700, color: '#10B981', marginBottom: 4 }}>
          15-20% من 71 = 11-14 عميل مُستعاد
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', margin: 0 }}>
          {winbackPlan.targetConversion}
        </p>
      </motion.div>
    </section>
  );
}
