import { motion } from 'framer-motion';
import SectionHeader from '../shared/SectionHeader';
import Icon from '../shared/Icon';
import { featuresData } from '../../data/featuresData';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function S04_TopFeatures() {
  return (
    <section id="features" className="section">
      <SectionHeader
        icon="star"
        title="الخصائص الأكثر استخداماً"
        subtitle="أبرز الخصائص التي يعتمد عليها العملاء في إدارة فعالياتهم"
      />

      <motion.div
        className="grid grid-2"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
      >
        {featuresData.map((feature, i) => (
          <motion.div key={i} className="card" variants={fadeInUp} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 20 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: 'var(--color-primary-light)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
              color: 'var(--color-primary)', fontWeight: 700, fontSize: '0.875rem',
            }}>
              {i + 1}
            </div>
            <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text-heading)' }}>
              {feature}
            </span>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
