import { motion } from 'framer-motion';
import SectionHeader from '../shared/SectionHeader';
import Icon from '../shared/Icon';
import Badge from '../shared/Badge';
import ProgressBar from '../shared/ProgressBar';
import { committeesData } from '../../data/committeesData';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function S02_Committees() {
  return (
    <section id="committees" className="section">
      <SectionHeader
        icon="people-group"
        title="اللجان ونسبة الاعتماد"
        subtitle="8 لجان تخصصية لإدارة جميع جوانب الفعالية"
      />

      <motion.div
        className="grid grid-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
      >
        {committeesData.map((committee, i) => (
          <motion.div key={i} className="card" variants={fadeInUp}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div className="icon-circle">
                <Icon name={committee.icon} />
              </div>
              <div>
                <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-heading)', margin: 0 }}>
                  {committee.name}
                </h4>
              </div>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-body)', marginBottom: 16, minHeight: 40 }}>
              {committee.description}
            </p>
            <div style={{ marginBottom: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4, fontSize: '0.75rem' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>نسبة الاعتماد</span>
                <span style={{ fontWeight: 600, color: 'var(--color-text-heading)' }}>{committee.percentage}%</span>
              </div>
              <ProgressBar value={committee.percentage} />
            </div>
            <div style={{ marginTop: 12 }}>
              <Badge status={committee.status} />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
