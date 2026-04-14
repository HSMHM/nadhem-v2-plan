import { motion } from 'framer-motion';
import SectionHeader from '../../common/SectionHeader';
import { feedbackData } from '../../../data/operations';

const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };

export default function CustomerFeedbackSection() {
  const { topRequests, tasks } = feedbackData;

  return (
    <section id="ops-feedback" className="section">
      <SectionHeader icon="star-half-stroke" title="تقييم العملاء والأثر" />

      {/* Top requests */}
      <motion.div className="card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 12, color: 'var(--text-dark)' }}>
          <i className="fa-thin fa-ranking-star" style={{ marginLeft: 8 }} /> أبرز طلبات العملاء
        </h3>
        <ol style={{ paddingRight: 20, paddingLeft: 0, margin: 0 }}>
          {topRequests.map((req, i) => (
            <li key={i} style={{ fontSize: '0.85rem', color: 'var(--text)', lineHeight: 2.2 }}>
              {req}
            </li>
          ))}
        </ol>
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
