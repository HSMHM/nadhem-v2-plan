import { motion } from 'framer-motion';
import SectionHeader from '../../common/SectionHeader';
import { mktTimeline } from '../../../data/marketing';

const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

export default function MktCalendarSection() {
  return (
    <section id="mkt-calendar" className="section">
      <SectionHeader icon="calendar-check" title="الجدول الزمني" />

      <motion.div className="tl" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        {mktTimeline.map((q, qi) => (
          <motion.div key={qi} className="tl-q" variants={fadeIn}>
            <div className="tl-q-label">{q.period}</div>
            {q.tasks.map((item, ii) => (
              <div key={ii} className="tl-item">
                <i className="fa-thin fa-circle-dot" style={{ color: 'var(--primary)', fontSize: 10 }} aria-hidden="true" />
                <span>{item}</span>
              </div>
            ))}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
