import { motion } from 'framer-motion';
import SectionHeader from '../../common/SectionHeader';

const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const strategies = [
  {
    icon: 'magnifying-glass',
    title: 'تحسين محركات البحث (SEO)',
    description: 'استهداف كلمات مفتاحية يبحث عنها المنظمون عند الحاجة لمنصة إدارة فعاليات.',
    keywords: ['نظام إدارة فعاليات', 'تسجيل مؤتمرات', 'منصة تنظيم فعاليات'],
    actions: [
      'نشر مقال أسبوعي محسّن لمحركات البحث على مدونة الشركة',
      'إصدار دليل شامل شهري عن إدارة الفعاليات',
      'بناء صفحات هبوط مخصصة لكل كلمة مفتاحية',
    ],
    color: '#2A848A',
  },
  {
    icon: 'briefcase',
    title: 'LinkedIn',
    description: 'التواصل المباشر مع مسؤولي الفعاليات في المنظمات غير الربحية والجهات الحكومية.',
    actions: [
      'البحث عن مديري الفعاليات ومنسقي المؤتمرات ومديري العلاقات العامة',
      'تواصل مباشر مع 50 شخصاً شهرياً عبر رسائل مخصصة',
      'نشر محتوى تعليمي ودراسات حالة بشكل منتظم',
    ],
    color: '#0A66C2',
  },
  {
    icon: 'hashtag',
    title: 'X (تويتر)',
    description: 'التواجد في محادثات الفعاليات السعودية والتفاعل مع المنظمين.',
    actions: [
      'متابعة هاشتاقات الفعاليات السعودية ومنظميها',
      'التفاعل مع منشورات المنظمين والتعليق بقيمة مضافة',
      'نشر محتوى تعليمي قصير عن أفضل ممارسات إدارة الفعاليات',
    ],
    color: '#1DA1F2',
  },
  {
    icon: 'rectangle-ad',
    title: 'Google Ads',
    description: 'إعلانات مدفوعة تستهدف من يبحث عن حلول إدارة فعاليات في السعودية.',
    actions: [
      'استهداف الكلمات المفتاحية ذات النية الشرائية العالية',
      'مراجعة أداء الحملة وتحسينها شهرياً',
      'تخصيص ميزانية شهرية مع تتبع تكلفة الاكتساب',
    ],
    color: '#EA4335',
  },
  {
    icon: 'envelope',
    title: 'النشرة البريدية',
    description: 'التواصل الدوري مع العملاء المحتملين والحاليين عبر محتوى قيّم.',
    actions: [
      'إرسال نشرة بريدية شهرية للعملاء المحتملين والحاليين',
      'تضمين تحديثات المنتج وقصص النجاح والنصائح',
      'تتبع معدلات الفتح والنقر لتحسين المحتوى',
    ],
    color: '#452059',
  },
];

export default function DigitalSection() {
  return (
    <section id="mkt-digital" className="section">
      <SectionHeader icon="globe" title="التسويق الرقمي" />

      <motion.div className="grid g2" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        {strategies.map((s, i) => (
          <motion.div key={i} className="card" variants={fadeIn}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <div className="ic" style={{ width: 44, height: 44, borderRadius: 12, background: `${s.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className={`fa-thin fa-${s.icon}`} style={{ fontSize: 20, color: s.color }} aria-hidden="true" />
              </div>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-dark)', margin: 0 }}>{s.title}</h3>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text)', lineHeight: 1.7, marginBottom: 12 }}>{s.description}</p>

            {s.keywords && (
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
                {s.keywords.map((kw, j) => (
                  <span key={j} className="badge" style={{ background: `${s.color}12`, color: s.color, fontSize: '0.72rem' }}>
                    {kw}
                  </span>
                ))}
              </div>
            )}

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 6 }}>
              {s.actions.map((action, j) => (
                <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '0.82rem', color: 'var(--text)', lineHeight: 1.7 }}>
                  <i className="fa-thin fa-circle-dot" style={{ color: s.color, fontSize: '0.5rem', marginTop: 8, flexShrink: 0 }} aria-hidden="true" />
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
