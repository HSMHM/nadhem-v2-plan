import { motion } from 'framer-motion';
import SectionHeader from '../../common/SectionHeader';
import { fieldResearchData } from '../../../data/operations';

const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

export default function FieldResearchSection() {
  return (
    <section id="ops-field" className="section">
      <SectionHeader icon="person-walking" title="الحضور الميداني" />

      {/* Target Events */}
      <motion.div className="card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-dark)', marginBottom: 14 }}>
          <i className="fa-thin fa-calendar-range" style={{ marginLeft: 8, color: 'var(--primary)' }} aria-hidden="true" />
          الفعاليات المستهدفة
        </h3>
        <motion.div className="grid g2" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {fieldResearchData.targetEvents.map((ev, i) => (
            <motion.div key={i} className="card" variants={fadeIn} style={{ background: 'var(--bg-light)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <div className="ic" style={{ flexShrink: 0 }}>
                  <i className="fa-thin fa-calendar-star" style={{ color: 'var(--primary)' }} aria-hidden="true" />
                </div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-dark)', margin: 0 }}>
                  {ev.event}
                </h4>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                <i className="fa-thin fa-location-dot" aria-hidden="true" />
                {ev.location}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text)', lineHeight: 1.6 }}>
                {ev.note}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Evaluation Criteria */}
      <motion.div className="card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn} style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-dark)', marginBottom: 14 }}>
          <i className="fa-thin fa-clipboard-check" style={{ marginLeft: 8, color: 'var(--accent-orange)' }} aria-hidden="true" />
          معايير التقييم
        </h3>
        <motion.div className="grid g2" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          {fieldResearchData.evaluationCriteria.map((criterion, i) => (
            <motion.div key={i} variants={fadeIn} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 14px', background: 'var(--bg-light)', borderRadius: 10 }}>
              <span style={{ minWidth: 28, height: 28, borderRadius: 8, background: 'rgba(42,132,138,0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem' }}>
                {i + 1}
              </span>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-dark)', lineHeight: 1.6 }}>{criterion}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Tasks */}
      <motion.div className="card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-dark)', marginBottom: 14 }}>
          <i className="fa-thin fa-list-check" style={{ marginLeft: 8, color: 'var(--secondary)' }} aria-hidden="true" />
          المهام
        </h3>
        <div className="task-list">
          {fieldResearchData.tasks.map(t => (
            <div key={t.id} className="task-item">
              <span className="task-id">{t.id}</span>
              <span className="task-text">{t.task}</span>
              <span className="task-dur">{t.duration}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
