import { motion } from 'framer-motion';
import SectionHeader from '../common/SectionHeader';

const dsTimeline = [
  { quarter: 'نوفمبر – ديسمبر 2026', label: 'بناء نظام التصميم الموحد (المكونات الأساسية + الدليل)', icon: 'hammer' },
  { quarter: 'يناير – مارس 2027', label: 'تطبيقه على لوحة تحكم المنظم تدريجياً — لجنة بلجنة', icon: 'display' },
  { quarter: 'أبريل – يونيو 2027', label: 'تطبيقه على الواجهة العامة للفعالية (ما يراه الزائر)', icon: 'browser' },
  { quarter: 'يوليو – سبتمبر 2027', label: 'تطبيقه على لوحة مدير النظام + التطبيق', icon: 'mobile-screen' },
];

const dsContents = [
  { label: 'لوحة ألوان موحدة مبنية على ألوان الشعار', icon: 'palette' },
  { label: 'مكتبة مكونات (أزرار، حقول، جداول، بطاقات، نوافذ، تنبيهات)', icon: 'puzzle-piece' },
  { label: 'نظام تباعد ومقاسات', icon: 'ruler-combined' },
  { label: 'أيقونات موحدة (Font Awesome Jelly)', icon: 'icons' },
  { label: 'خط موحد (IBM Plex Sans Arabic)', icon: 'font' },
  { label: 'دليل استخدام مكتوب ومصور', icon: 'book' },
];

export default function DesignSystemSection() {
  return (
    <section id="design-system" className="section">
      <SectionHeader icon="palette" title="التصميم الموحد (Design System)" subtitle="متى وكيف سيُطبق التصميم الموحد" />

      <div className="grid g2" style={{ marginBottom: 28 }}>
        <motion.div className="card" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-dark)', marginBottom: 16 }}>
            <i className="fa-thin fa-calendar-days" style={{ marginLeft: 8, color: 'var(--primary)' }} /> الخطة الزمنية
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {dsTimeline.map((t, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '12px 14px', borderRadius: 8, background: 'var(--border-light)' }}>
                <span className="badge badge-q" style={{ flexShrink: 0 }}>{t.quarter}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <i className={`fa-thin fa-${t.icon}`} style={{ color: 'var(--primary)', fontSize: 14 }} />
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-dark)' }}>{t.label}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div className="card" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-dark)', marginBottom: 16 }}>
            <i className="fa-thin fa-list-check" style={{ marginLeft: 8, color: 'var(--primary)' }} /> ماذا يتضمن؟
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {dsContents.map((c, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 8, background: 'var(--border-light)' }}>
                <div className="ic" style={{ width: 32, height: 32, borderRadius: 8 }}>
                  <i className={`fa-thin fa-${c.icon}`} style={{ fontSize: 14 }} />
                </div>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-dark)', fontWeight: 500 }}>{c.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="card" style={{ background: 'rgba(245,158,11,0.06)', borderColor: 'var(--warning)' }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <i className="fa-thin fa-triangle-exclamation fa-lg" style={{ color: 'var(--warning)', marginTop: 4 }} />
          <div style={{ fontSize: '0.82rem', lineHeight: 1.8 }}>
            <p style={{ margin: '0 0 6px', fontWeight: 600, color: 'var(--text-dark)' }}>لماذا نوفمبر وليس قبل؟</p>
            <p style={{ margin: 0, color: 'var(--text)' }}>
              أولاً نحتاج ننتهي من التطويرات الوظيفية (الوحدات، الهيكلة، الخصائص الجديدة).
              تطبيق التصميم الموحد قبل استقرار الخصائص = إعادة عمل مزدوجة.
              الأفضل بناء الخصائص أولاً ثم توحيد الشكل.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
