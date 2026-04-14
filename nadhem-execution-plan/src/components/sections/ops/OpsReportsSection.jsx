import { motion } from 'framer-motion';
import SectionHeader from '../../common/SectionHeader';
import { reportsData } from '../../../data/operations';

const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };

export default function OpsReportsSection() {
  return (
    <section id="ops-reports" className="section">
      <SectionHeader icon="file-chart-column" title="التقارير الدورية" />

      <motion.div className="grid g2" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        {reportsData.map((report, i) => (
          <motion.div key={i} className="card" variants={fadeIn}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <div className="ic" style={{ width: 44, height: 44, borderRadius: 12, background: `${report.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className={`fa-thin fa-${report.icon}`} style={{ fontSize: 20, color: report.color }} aria-hidden="true" />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-dark)', margin: 0 }}>{report.title}</h3>
              </div>
              <span className="badge" style={{ background: `${report.color}18`, color: report.color, fontWeight: 600, fontSize: '0.75rem' }}>
                {report.frequency}
              </span>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 6 }}>
              {report.contents.map((item, j) => (
                <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: '0.85rem', color: 'var(--text)', lineHeight: 1.6 }}>
                  <i className="fa-thin fa-circle-dot" style={{ color: report.color, fontSize: '0.5rem', marginTop: 8, flexShrink: 0 }} aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
