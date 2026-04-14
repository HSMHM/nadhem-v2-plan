import { motion } from 'framer-motion';
import SectionHeader from '../shared/SectionHeader';
import Icon from '../shared/Icon';
import { comparisonFeatures, competitorCategories } from '../../data/competitorsData';

export default function S06_Market() {
  const systems = ['نظم', 'WOTN', 'Eventech', 'عزام', 'Zoho'];
  const keys = ['nadhem', 'wotn', 'eventech', 'azzam', 'zoho'];

  return (
    <section id="market" className="section">
      <SectionHeader
        icon="chart-bar"
        title="السوق والمنافسون"
        subtitle="مقارنة خصائص نظم مع الأنظمة المنافسة في السوق"
      />

      <motion.div
        className="card"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ marginBottom: 32, overflow: 'auto' }}
      >
        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-text-heading)', marginBottom: 16 }}>
          <Icon name="table-cells" style={{ marginLeft: 8, color: 'var(--color-primary)' }} />
          مقارنة الأنظمة
        </h3>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ textAlign: 'right' }}>الخاصية</th>
              {systems.map((s, i) => (
                <th key={i} style={{ textAlign: 'center', fontWeight: i === 0 ? 700 : 500, color: i === 0 ? 'var(--color-primary)' : undefined }}>
                  {s}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparisonFeatures.map((row, i) => (
              <tr key={i}>
                <td style={{ textAlign: 'right', fontWeight: 500 }}>{row.feature}</td>
                {keys.map((key, j) => (
                  <td key={j}>
                    {row[key] ? (
                      <i className="fa-solid fa-circle-check" style={{ color: 'var(--color-success)', fontSize: 16 }} />
                    ) : (
                      <i className="fa-solid fa-circle-xmark" style={{ color: 'var(--color-danger)', fontSize: 16 }} />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
      >
        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-text-heading)', marginBottom: 16 }}>
          <Icon name="layer-group" style={{ marginLeft: 8, color: 'var(--color-primary)' }} />
          تصنيف المنافسين حسب حجم الفعالية
        </h3>
        <div className="grid grid-3">
          {competitorCategories.map((cat, i) => (
            <motion.div
              key={i}
              className="card"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
              style={{ textAlign: 'center' }}
            >
              <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-primary)', marginBottom: 12 }}>
                {cat.category}
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
                {cat.competitors.map((c, j) => (
                  <span key={j} className="badge badge-info">{c}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
