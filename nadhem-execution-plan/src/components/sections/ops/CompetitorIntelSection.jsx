import { motion } from 'framer-motion';
import SectionHeader from '../../common/SectionHeader';
import { competitorIntelData } from '../../../data/operations';

const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

export default function CompetitorIntelSection() {
  const { competitors, tasks } = competitorIntelData;

  return (
    <section id="ops-competitors" className="section">
      <SectionHeader icon="binoculars" title="دراسة المنافسين" />

      {/* Competitor cards */}
      <motion.div
        className="grid g2"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{ marginBottom: 24 }}
      >
        {competitors.map((c, i) => (
          <motion.div key={i} className="card" variants={fadeIn} style={{ padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-dark)', margin: 0 }}>
                {c.name}
              </h4>
              <div style={{ display: 'flex', gap: 6 }}>
                <span className={c.type === 'محلي' ? 'badge badge-p' : 'badge badge-s'} style={{ fontSize: '0.65rem' }}>
                  {c.type}
                </span>
                <span className="badge badge-w" style={{ fontSize: '0.65rem' }}>
                  {c.segment}
                </span>
              </div>
            </div>

            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#10B981', marginBottom: 4 }}>
                <i className="fa-thin fa-circle-check" style={{ marginLeft: 4 }} /> نقاط القوة
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text)', lineHeight: 1.8, margin: 0 }}>
                {c.strengths}
              </p>
            </div>

            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#EF4444', marginBottom: 4 }}>
                <i className="fa-thin fa-circle-xmark" style={{ marginLeft: 4 }} /> نقاط الضعف
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text)', lineHeight: 1.8, margin: 0 }}>
                {c.weaknesses}
              </p>
            </div>

            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              <i className="fa-thin fa-calendar" style={{ marginLeft: 4 }} /> آخر مراجعة: {c.lastReview}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Tasks */}
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 12, color: 'var(--text-dark)' }}>
          <i className="fa-thin fa-list-check" style={{ marginLeft: 8 }} /> المهام الدورية
        </h3>
        <div className="task-list">
          {tasks.map(t => (
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
