import { motion } from 'framer-motion';
import SectionHeader from '../shared/SectionHeader';
import Icon from '../shared/Icon';
import { challengesData } from '../../data/challengesData';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function S07_Challenges() {
  return (
    <section id="challenges" className="section">
      <SectionHeader
        icon="triangle-exclamation"
        title="التحديات الحالية"
        subtitle="أبرز التحديات التي تواجه المنتج وتحتاج إلى معالجة"
      />

      <motion.div
        className="grid grid-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
      >
        {challengesData.map((challenge, i) => (
          <motion.div key={i} className="card" variants={fadeInUp} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
            <div className="icon-circle" style={{ background: 'rgba(229,62,62,0.1)', flexShrink: 0 }}>
              <Icon name={challenge.icon} style={{ color: 'var(--color-danger)' }} />
            </div>
            <p style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-heading)', margin: 0, lineHeight: 1.8 }}>
              {challenge.title}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
