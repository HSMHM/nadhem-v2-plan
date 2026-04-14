import { motion } from 'framer-motion';
import SectionHeader from '../../common/SectionHeader';
import { personas } from '../../../data/marketing';

const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

const priorityMap = {
  highest: { cls: 'badge badge-d', label: 'أعلى أولوية' },
  high: { cls: 'badge badge-w', label: 'أولوية عالية', style: { background: 'rgba(239,68,68,0.1)', color: '#EF4444' } },
  medium: { cls: 'badge badge-p', label: 'أولوية متوسطة' },
};

export default function PersonasSection() {
  return (
    <section id="mkt-personas" className="section">
      <SectionHeader icon="users-viewfinder" title="شرائح العملاء المستهدفة" />

      <motion.div
        className="grid g2"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {personas.map((p, i) => {
          const pri = priorityMap[p.priority] || priorityMap.medium;
          return (
            <motion.div key={i} className="card" variants={fadeIn}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                <div className="ic">
                  <i className={`fa-thin fa-${p.icon}`} style={{ color: '#452059' }} aria-hidden="true" />
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-dark)', margin: 0 }}>{p.name}</h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{p.size}</span>
                </div>
                <span className={pri.cls} style={pri.style || {}}>{pri.label}</span>
              </div>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: 1.7, margin: '0 0 12px' }}>{p.desc}</p>

              {/* Pain points */}
              <div style={{ marginBottom: 12 }}>
                <h5 style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-dark)', marginBottom: 6 }}>
                  <i className="fa-thin fa-face-frown" style={{ marginLeft: 6, color: '#EF4444' }} /> نقاط الألم
                </h5>
                <ul style={{ margin: 0, paddingRight: 18, paddingLeft: 0 }}>
                  {p.painPoints.map((pt, j) => (
                    <li key={j} style={{ color: 'var(--text-muted)', fontSize: '0.78rem', lineHeight: 1.8 }}>{pt}</li>
                  ))}
                </ul>
              </div>

              {/* Buying trigger */}
              <div style={{
                background: 'rgba(42,132,138,0.06)',
                borderRadius: 8,
                padding: '8px 12px',
                marginBottom: 8,
              }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#2A848A' }}>
                  <i className="fa-thin fa-bell" style={{ marginLeft: 6 }} /> محفز الشراء:
                </span>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginRight: 6 }}>{p.buyingTrigger}</span>
              </div>

              {/* Decision maker */}
              <div style={{
                background: 'rgba(69,32,89,0.05)',
                borderRadius: 8,
                padding: '8px 12px',
              }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#452059' }}>
                  <i className="fa-thin fa-user-tie" style={{ marginLeft: 6 }} /> متخذ القرار:
                </span>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginRight: 6 }}>{p.decisionMaker}</span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
