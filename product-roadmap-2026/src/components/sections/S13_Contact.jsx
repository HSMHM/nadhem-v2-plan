import { motion } from 'framer-motion';
import SectionHeader from '../shared/SectionHeader';
import Icon from '../shared/Icon';

const contactItems = [
  { icon: 'phone', label: 'الاتصال المباشر', value: '0112000292 تحويلة 205' },
  { icon: 'envelope', label: 'البريد الإلكتروني', value: 'care@tts.sa' },
  { icon: 'ticket', label: 'تذاكر الدعم الفني', value: 'من داخل المنتج' },
  { icon: 'message', label: 'واتساب الأعمال', value: '+966112000292' },
];

export default function S13_Contact() {
  return (
    <section id="contact" className="section">
      <SectionHeader
        icon="phone"
        title="معلومات التواصل"
        subtitle="تواصل معنا لأي استفسارات أو دعم فني"
      />

      <motion.div
        className="grid grid-2"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        {contactItems.map((item, i) => (
          <motion.div
            key={i}
            className="card"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
            style={{ display: 'flex', alignItems: 'center', gap: 16 }}
          >
            <div className="icon-circle">
              <Icon name={item.icon} />
            </div>
            <div>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', margin: '0 0 4px' }}>{item.label}</p>
              <p style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text-heading)', margin: 0, direction: item.label === 'واتساب الأعمال' ? 'ltr' : 'rtl' }}>
                {item.value}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <div style={{ textAlign: 'center', marginTop: 48, padding: '24px 0', borderTop: '1px solid var(--color-border-light)' }}>
        <img src="/logos/colored-logo.png" alt="نظم" style={{ width: 120, marginBottom: 8 }} />
        <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>نظم — خطة تطوير المنتج 2026</p>
      </div>
    </section>
  );
}
