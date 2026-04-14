import { motion } from 'framer-motion';
import SectionHeader from '../../common/SectionHeader';
import { opsCalendar } from '../../../data/operations';

const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.08 } } };

function SubHeader({ icon, title, color }) {
  return (
    <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-dark)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
      <i className={`fa-thin fa-${icon}`} style={{ color }} aria-hidden="true" />
      {title}
    </h3>
  );
}

export default function OpsCalendarSection() {
  return (
    <section id="ops-calendar" className="section">
      <SectionHeader icon="calendar-check" title="الجدول التشغيلي" />

      <div className="grid g2" style={{ marginBottom: 24 }}>
        {/* Daily */}
        <motion.div className="card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
          <SubHeader icon="sun" title="يومي" color="var(--danger)" />
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ display: 'grid', gap: 8 }}>
            {opsCalendar.daily.map((item, i) => (
              <motion.div key={i} variants={fadeIn} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: 'var(--bg-light)', borderRadius: 10, fontSize: '0.88rem' }}>
                <span className="badge badge-d" style={{ fontSize: '0.75rem', minWidth: 'fit-content' }}>{item.time}</span>
                <span style={{ flex: 1, color: 'var(--text-dark)' }}>{item.task}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{item.duration}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Weekly */}
        <motion.div className="card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
          <SubHeader icon="calendar-week" title="أسبوعي" color="var(--accent-orange)" />
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ display: 'grid', gap: 8 }}>
            {opsCalendar.weekly.map((item, i) => (
              <motion.div key={i} variants={fadeIn} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: 'var(--bg-light)', borderRadius: 10, fontSize: '0.88rem' }}>
                <span className="badge badge-w" style={{ fontSize: '0.75rem', minWidth: 'fit-content' }}>{item.day}</span>
                <span style={{ flex: 1, color: 'var(--text-dark)' }}>{item.task}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{item.duration}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <div className="grid g2">
        {/* Monthly */}
        <motion.div className="card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
          <SubHeader icon="calendar-days" title="شهري" color="var(--primary)" />
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ display: 'grid', gap: 8 }}>
            {opsCalendar.monthly.map((item, i) => (
              <motion.div key={i} variants={fadeIn} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: 'var(--bg-light)', borderRadius: 10, fontSize: '0.88rem' }}>
                <span className="badge badge-s" style={{ fontSize: '0.75rem', minWidth: 'fit-content' }}>{item.week}</span>
                <span style={{ flex: 1, color: 'var(--text-dark)' }}>{item.task}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Quarterly */}
        <motion.div className="card" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
          <SubHeader icon="calendar-lines" title="ربع سنوي" color="var(--secondary)" />
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ display: 'grid', gap: 8 }}>
            {opsCalendar.quarterly.map((item, i) => (
              <motion.div key={i} variants={fadeIn} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: 'var(--bg-light)', borderRadius: 10, fontSize: '0.88rem' }}>
                <span className="badge badge-q" style={{ fontSize: '0.75rem' }}>{i + 1}</span>
                <span style={{ flex: 1, color: 'var(--text-dark)' }}>{item}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
