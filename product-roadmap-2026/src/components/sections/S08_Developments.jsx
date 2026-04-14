import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../shared/SectionHeader';
import Icon from '../shared/Icon';
import Badge from '../shared/Badge';
import Tabs from '../shared/Tabs';
import { developmentTabs, developmentsData } from '../../data/developmentsData';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function S08_Developments() {
  const [activeTab, setActiveTab] = useState('structure');

  const items = developmentsData[activeTab] || [];

  return (
    <section id="developments" className="section">
      <SectionHeader
        icon="rocket-launch"
        title="التطويرات المطلوبة"
        subtitle="15 تطويراً مخططاً لرفع قدرات المنتج في 2026"
      />

      <Tabs tabs={developmentTabs} activeTab={activeTab} onChange={setActiveTab} />

      <motion.div
        className="grid grid-2"
        key={activeTab}
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
      >
        {items.map((dev, i) => (
          <motion.div key={i} className="card" variants={fadeInUp}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div className="icon-circle">
                  <Icon name={dev.icon} />
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-heading)', margin: 0 }}>
                  {dev.title}
                </h4>
              </div>
              <Badge status={dev.priority} label={dev.priority === 'high' ? 'عالية' : dev.priority === 'medium' ? 'متوسطة' : 'منخفضة'} />
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-body)', margin: 0, lineHeight: 1.8 }}>
              {dev.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
