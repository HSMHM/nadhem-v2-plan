import { motion } from 'framer-motion';
import SectionHeader from '../shared/SectionHeader';
import Icon from '../shared/Icon';
import Badge from '../shared/Badge';
import { modulesData } from '../../data/modulesData';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function S09_Modules() {
  return (
    <section id="modules" className="section">
      <SectionHeader
        icon="puzzle-piece"
        title="الوحدات (Modules)"
        subtitle="16 وحدة وظيفية تشكل بنية النظام"
      />

      <motion.div
        className="grid grid-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
      >
        {modulesData.map((mod, i) => (
          <motion.div key={i} className="card" variants={fadeInUp} style={{ textAlign: 'center', padding: 20 }}>
            <div className="icon-circle" style={{ margin: '0 auto 12px' }}>
              <Icon name={mod.icon} />
            </div>
            <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-text-heading)', margin: '0 0 8px', lineHeight: 1.6 }}>
              {mod.name}
            </h4>
            {mod.note && (
              <Badge status={mod.note === 'أساسية' ? 'existing' : 'new'} label={mod.note} />
            )}
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="card"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        style={{ marginTop: 24, background: 'var(--color-primary-light)', borderColor: 'var(--color-primary)' }}
      >
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <Icon name="circle-info" size="lg" style={{ color: 'var(--color-primary)', marginTop: 4 }} />
          <div style={{ fontSize: '0.875rem', lineHeight: 1.8 }}>
            <p style={{ margin: '0 0 8px', fontWeight: 600, color: 'var(--color-text-heading)' }}>ملاحظة مهمة</p>
            <p style={{ margin: 0, color: 'var(--color-text-body)' }}>
              الوحدات ليست من اختيار العميل — بل تأتي ضمن باقات جاهزة. كل باقة تحتوي على مجموعة وحدات.
              إذا أراد العميل كل الوحدات فهذه باقة مخصصة.
              الوحدات تُفعّل في المكان المناسب داخل كل لجنة.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
