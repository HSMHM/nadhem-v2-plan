import { motion } from 'framer-motion';

export default function MarketingPlaceholder() {
  return (
    <section id="marketing-placeholder" className="section" style={{ textAlign: 'center', padding: '120px 32px' }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="ic" style={{ width: 80, height: 80, borderRadius: 20, margin: '0 auto 24px', background: 'rgba(166,28,97,0.1)' }}>
          <i className="fa-thin fa-bullhorn" style={{ fontSize: 36, color: 'var(--accent-pink)' }} aria-hidden="true" />
        </div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: 12 }}>خطة التسويق</h2>
        <p style={{ fontSize: '1rem', color: 'var(--text-muted)', maxWidth: 500, margin: '0 auto' }}>قيد الإعداد — سيتم إضافة خطة التسويق التفصيلية قريباً</p>
      </motion.div>
    </section>
  );
}
