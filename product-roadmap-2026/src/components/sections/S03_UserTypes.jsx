import { motion } from 'framer-motion';
import SectionHeader from '../shared/SectionHeader';
import Icon from '../shared/Icon';
import Badge from '../shared/Badge';
import { usersData } from '../../data/usersData';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function S03_UserTypes() {
  return (
    <section id="users" className="section">
      <SectionHeader
        icon="users"
        title="المستخدمون وأنواعهم"
        subtitle="12 نوع مستخدم مختلف لتغطية جميع أدوار إدارة الفعاليات"
      />

      <motion.div
        className="grid grid-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
      >
        {usersData.map((user, i) => (
          <motion.div key={i} className="card" variants={fadeInUp} style={{ textAlign: 'center', padding: 20 }}>
            <div className="icon-circle" style={{ margin: '0 auto 12px', background: user.isNew ? 'rgba(56,161,105,0.1)' : undefined }}>
              <Icon name={user.icon} style={{ color: user.isNew ? 'var(--color-success)' : undefined }} />
            </div>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-heading)', margin: '0 0 8px' }}>
              {user.name}
            </h4>
            {user.isNew && <Badge status="new" />}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
