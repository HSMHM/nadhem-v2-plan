import { motion } from 'framer-motion';
import SectionHeader from '../shared/SectionHeader';
import Icon from '../shared/Icon';
import { integrationsData } from '../../data/integrationsData';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function S11_Integrations() {
  return (
    <section id="integrations" className="section">
      <SectionHeader
        icon="link"
        title="التكاملات الحالية"
        subtitle="الخدمات الخارجية المتكاملة مع النظام"
      />

      <motion.div
        className="grid grid-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        {integrationsData.map((item, i) => (
          <motion.div key={i} className="card" variants={fadeInUp} style={{ textAlign: 'center' }}>
            <div className="icon-circle" style={{ margin: '0 auto 16px' }}>
              <Icon name={item.icon} />
            </div>
            <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-heading)', marginBottom: 8 }}>
              {item.name}
            </h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', margin: 0 }}>
              {item.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
