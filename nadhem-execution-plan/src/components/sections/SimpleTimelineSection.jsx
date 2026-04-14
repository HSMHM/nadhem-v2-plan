import { motion } from 'framer-motion';
import SectionHeader from '../common/SectionHeader';
import { simpleTimeline } from '../../data/timeline';

const qColors = { Q1: '#2A848A', Q2: '#BA5A31', Q3: '#A61C61', Q4: '#452059' };

export default function SimpleTimelineSection() {
  return (
    <section id="timeline-simple" className="section">
      <SectionHeader icon="calendar-lines" title="الجدول الزمني المبسط" subtitle="توزيع التطويرات على أرباع السنة" />

      <div className="card">
        <div className="tl">
          {simpleTimeline.map((q, qi) => (
            <motion.div
              key={qi} className="tl-q"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: qi * 0.1 }}
            >
              <div className="tl-q-label" style={{ color: qColors[q.quarter] }}>
                <span style={{ marginLeft: 8 }}>{q.quarter}</span> — {q.period}
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginRight: 12, fontWeight: 400 }}>
                  ({q.developments.length} تطويرات)
                </span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, paddingRight: 8 }}>
                {q.developments.map((d, di) => (
                  <span key={di} style={{
                    padding: '6px 14px', borderRadius: 8, fontSize: '0.82rem',
                    background: `${qColors[q.quarter]}12`, color: qColors[q.quarter],
                    fontWeight: 500, border: `1px solid ${qColors[q.quarter]}25`,
                  }}>
                    {d}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
