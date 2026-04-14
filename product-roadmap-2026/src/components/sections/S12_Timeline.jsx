import { motion } from 'framer-motion';
import SectionHeader from '../shared/SectionHeader';
import Icon from '../shared/Icon';
import { timelineData } from '../../data/timelineData';

export default function S12_Timeline() {
  return (
    <section id="timeline" className="section">
      <SectionHeader
        icon="calendar-days"
        title="الجدول الزمني"
        subtitle="خطة التنفيذ المرحلية لعام 2026"
      />

      <motion.div
        className="card"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="timeline">
          {timelineData.map((quarter, qi) => (
            <motion.div
              key={qi}
              className="timeline-quarter"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: qi * 0.1 }}
            >
              <div className="timeline-quarter-label">{quarter.quarter}</div>
              {quarter.items.map((item, ii) => (
                <div key={ii} className="timeline-item">
                  <Icon name={item.icon} />
                  <span>{item.title}</span>
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
