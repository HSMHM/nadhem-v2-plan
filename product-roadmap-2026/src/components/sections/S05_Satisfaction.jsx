import { motion } from 'framer-motion';
import SectionHeader from '../shared/SectionHeader';
import Icon from '../shared/Icon';
import SatisfactionRadar from '../charts/SatisfactionRadar';
import { satisfactionFactors } from '../../data/satisfactionData';

export default function S05_Satisfaction() {
  return (
    <section id="satisfaction" className="section">
      <SectionHeader
        icon="face-smile"
        title="رضا العملاء"
        subtitle="تحليل مستوى الرضا والعوامل المؤثرة"
      />

      <div className="grid grid-2">
        <motion.div
          className="card"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-text-heading)', marginBottom: 16 }}>
            <Icon name="chart-radar" style={{ marginLeft: 8, color: 'var(--color-primary)' }} />
            نسب الرضا
          </h3>
          <SatisfactionRadar />
        </motion.div>

        <motion.div
          className="card"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-text-heading)', marginBottom: 24 }}>
            <Icon name="list-check" style={{ marginLeft: 8, color: 'var(--color-primary)' }} />
            عوامل الرضا
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {satisfactionFactors.map((factor, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: 16, borderRadius: 'var(--radius-md)',
                background: 'var(--color-border-light)',
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: 'var(--color-primary-light)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Icon name="circle-dot" size="sm" style={{ color: 'var(--color-primary)' }} />
                </div>
                <span style={{ fontSize: '0.875rem', color: 'var(--color-text-heading)', fontWeight: 500 }}>
                  {factor}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
