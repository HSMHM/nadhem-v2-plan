import { motion } from 'framer-motion';
import SectionHeader from '../../common/SectionHeader';
import { bestPracticesData } from '../../../data/operations';

const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const cardColors = ['#2A848A', '#BA5A31', '#452059'];

export default function BestPracticesSection() {
  const { categories, tasks } = bestPracticesData;

  return (
    <section id="ops-practices" className="section">
      <SectionHeader icon="lightbulb" title="أفضل الممارسات والاتجاهات" />

      {/* Category cards */}
      <motion.div
        className="grid g3"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{ marginBottom: 24 }}
      >
        {categories.map((cat, i) => (
          <motion.div key={i} className="card" variants={fadeIn} style={{ padding: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div className="ic" style={{ flexShrink: 0 }}>
                <i className={`fa-thin fa-${cat.icon}`} style={{ color: cardColors[i] }} aria-hidden="true" />
              </div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-dark)', margin: 0 }}>
                {cat.title}
              </h4>
            </div>
            <ul style={{ paddingRight: 18, paddingLeft: 0, margin: 0 }}>
              {cat.items.map((item, j) => (
                <li key={j} style={{ fontSize: '0.8rem', color: 'var(--text)', lineHeight: 2.1 }}>
                  {item}
                </li>
              ))}
            </ul>
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
