import { motion } from 'framer-motion';
import SectionHeader from '../../common/SectionHeader';
import { challengePoints, marketSize } from '../../../data/marketing';

const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

export default function ChallengeSection() {
  const activePct = ((7 / marketSize.total) * 100).toFixed(2);

  return (
    <section id="mkt-challenge" className="section">
      <SectionHeader icon="triangle-exclamation" title="التحدي وحجم السوق" />

      {/* Challenge cards */}
      <motion.div
        className="grid g3"
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{ marginBottom: 32 }}
      >
        {challengePoints.map((c, i) => (
          <motion.div key={i} className="card" variants={fadeIn}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
              <div className="ic">
                <i className={`fa-thin fa-${c.icon}`} style={{ color: '#A61C61' }} aria-hidden="true" />
              </div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-dark)', margin: 0 }}>{c.title}</h4>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', margin: 0, lineHeight: 1.7 }}>{c.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Market size card */}
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ marginBottom: 24 }}
      >
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 16, color: 'var(--text-dark)' }}>
          <i className="fa-thin fa-chart-simple" style={{ marginLeft: 8, color: '#452059' }} /> حجم السوق
        </h3>

        <div className="grid g4" style={{ marginBottom: 20 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#452059' }}>{marketSize.total.toLocaleString()}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>منظمة غير ربحية (الإجمالي)</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#2A848A' }}>{marketSize.riyadh.toLocaleString()}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>منظمة في الرياض</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#BA5A31' }}>{marketSize.yearGrowth}%</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>نمو سنوي</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#EF4444' }}>{marketSize.penetration}%</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>نسبة اختراق السوق</div>
          </div>
        </div>

        {/* Visual indicator: 7 out of 6,348 */}
        <div style={{
          background: 'rgba(69,32,89,0.05)',
          borderRadius: 10,
          padding: '14px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          marginBottom: 12,
        }}>
          <div>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>العملاء النشطون من إجمالي السوق</span>
            <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#452059', marginTop: 4 }}>
              7 <span style={{ fontSize: '0.85rem', fontWeight: 400, color: 'var(--text-muted)' }}>من {marketSize.total.toLocaleString()}</span>
            </div>
          </div>
          <div style={{ flex: 1, maxWidth: 260 }}>
            <div className="prog" style={{ height: 14 }}>
              <div className="prog-fill" style={{ width: `${Math.max(activePct * 10, 2)}%`, background: '#10B981' }} />
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 4, textAlign: 'left' }}>{activePct}%</div>
          </div>
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', margin: 0 }}>
          <i className="fa-thin fa-bookmark" style={{ marginLeft: 4 }} /> المصدر: {marketSize.source}
        </p>
      </motion.div>
    </section>
  );
}
