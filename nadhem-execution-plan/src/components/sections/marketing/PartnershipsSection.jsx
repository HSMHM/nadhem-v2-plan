import { motion } from 'framer-motion';
import SectionHeader from '../../common/SectionHeader';

const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const partnerships = [
  {
    icon: 'building',
    title: 'مراكز المعارض والمؤتمرات',
    description: 'شراكة إحالة مع مراكز المعارض الكبرى (RICEC، Riyadh Front) — يعرفون من يحجز قاعاتهم ويمكنهم ترشيح نظم كمزود تقني.',
    actions: [
      'التواصل مع أقسام المبيعات في المراكز لبناء شراكة إحالة',
      'تقديم عمولة أو خصم مشترك لكل إحالة ناجحة',
      'توفير مواد تعريفية بالمنتج لفرق المبيعات في المراكز',
    ],
    color: '#2A848A',
  },
  {
    icon: 'megaphone',
    title: 'شركات العلاقات العامة',
    description: 'شركات PR التي تخدم المنظمات غير الربحية تعرف من يخطط لفعالية قبل أن يبدأ البحث عن منصة.',
    actions: [
      'بناء علاقات مع 5-10 شركات PR تخدم القطاع غير الربحي',
      'تقديم نظم كحل تقني مكمّل لخدماتهم',
      'عقد لقاءات تعريفية دورية مع فرقهم',
    ],
    color: '#A61C61',
  },
  {
    icon: 'user-check',
    title: 'برنامج إحالات العملاء الحاليين',
    description: 'العملاء الحاليون (الـ 7) هم أقوى قناة تسويقية — العميل الراضي يوصي بالمنتج لزملائه في القطاع.',
    actions: [
      'إطلاق برنامج إحالات رسمي مع حوافز واضحة',
      'خصم أو مدة إضافية مجانية لكل عميل يحيل عميلاً جديداً',
      'متابعة دورية مع العملاء لطلب ترشيحات',
    ],
    color: '#10B981',
  },
  {
    icon: 'store',
    title: 'حضور الملتقيات كمزود تقني',
    description: 'التواجد في ملتقيات القطاع غير الربحي كعارض أو راعي يضعك أمام شريحتك المستهدفة مباشرة.',
    actions: [
      'رعاية أو حضور 2-3 ملتقيات سنوياً للقطاع غير الربحي',
      'تجهيز عروض توضيحية حية للمنتج',
      'جمع بيانات التواصل مع المنظمين المهتمين ومتابعتهم',
    ],
    color: '#BA5A31',
  },
];

export default function PartnershipsSection() {
  return (
    <section id="mkt-partnerships" className="section">
      <SectionHeader icon="handshake" title="الشراكات والقنوات" />

      <motion.div className="grid g2" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        {partnerships.map((p, i) => (
          <motion.div key={i} className="card" variants={fadeIn}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <div className="ic" style={{ width: 44, height: 44, borderRadius: 12, background: `${p.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className={`fa-thin fa-${p.icon}`} style={{ fontSize: 20, color: p.color }} aria-hidden="true" />
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-dark)', margin: 0 }}>{p.title}</h3>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text)', lineHeight: 1.7, marginBottom: 12 }}>{p.description}</p>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 6 }}>
              {p.actions.map((action, j) => (
                <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '0.82rem', color: 'var(--text)', lineHeight: 1.7 }}>
                  <i className="fa-thin fa-circle-dot" style={{ color: p.color, fontSize: '0.5rem', marginTop: 8, flexShrink: 0 }} aria-hidden="true" />
                  {action}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
