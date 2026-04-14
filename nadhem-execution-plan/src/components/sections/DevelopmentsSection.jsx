import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeader from '../common/SectionHeader';
import PhaseTable from '../common/PhaseTable';
import { developments } from '../../data/developments';

const quarterLabel = { Q1: 'الربع الأول', Q2: 'الربع الثاني', Q3: 'الربع الثالث', Q4: 'الربع الرابع' };
const phaseNames = [
  { key: 'analysis', label: 'التحليل', icon: 'magnifying-glass-chart', color: '#2A848A' },
  { key: 'design', label: 'التصميم', icon: 'pen-ruler', color: '#A61C61' },
  { key: 'implementation', label: 'التنفيذ', icon: 'code', color: '#BA5A31' },
];

function DevelopmentCard({ dev }) {
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState('analysis');

  const totalTasks = dev.analysis.length + dev.design.length + dev.implementation.length;

  return (
    <div className="dev-card">
      <div className="dev-header" onClick={() => setOpen(!open)}>
        <div className="num">{dev.id}</div>
        <div className="ic" style={{ width: 36, height: 36, borderRadius: 8 }}>
          <i className={`fa-thin fa-${dev.icon}`} style={{ fontSize: 16 }} aria-hidden="true" />
        </div>
        <div className="title">{dev.title}</div>
        <span className="badge badge-q">{quarterLabel[dev.quarter]}</span>
        <span className="badge badge-p">{totalTasks} مهمة</span>
        <i className={`fa-thin fa-chevron-down chevron ${open ? 'open' : ''}`} aria-hidden="true" />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="dev-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="dev-desc">{dev.description}</p>
            <div className="dev-meta">
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <i className="fa-thin fa-location-dot" style={{ marginLeft: 4 }} /> {dev.location}
              </span>
            </div>

            {/* Phase duration summary */}
            <div className="grid g3" style={{ marginBottom: 16, gap: 10 }}>
              {phaseNames.map(p => (
                <div key={p.key} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 8, background: 'var(--border-light)' }}>
                  <i className={`fa-thin fa-${p.icon}`} style={{ color: p.color, fontSize: 14 }} />
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-dark)', fontWeight: 500 }}>{p.label}</span>
                  <span style={{ marginRight: 'auto', fontSize: '0.78rem', color: p.color, fontWeight: 600 }}>{dev.totalDays[p.key]} يوم</span>
                </div>
              ))}
            </div>

            {/* Phase progress bar */}
            <div style={{ display: 'flex', height: 6, borderRadius: 9999, overflow: 'hidden', marginBottom: 16 }}>
              <div style={{ width: `${(dev.totalDays.analysis / dev.totalDays.total) * 100}%`, background: '#2A848A' }} />
              <div style={{ width: `${(dev.totalDays.design / dev.totalDays.total) * 100}%`, background: '#A61C61' }} />
              <div style={{ width: `${(dev.totalDays.implementation / dev.totalDays.total) * 100}%`, background: '#BA5A31' }} />
            </div>

            {/* Phase tabs */}
            <div className="phase-tabs">
              {phaseNames.map(p => (
                <button key={p.key} className={`phase-tab ${phase === p.key ? 'active' : ''}`} onClick={() => setPhase(p.key)}>
                  <i className={`fa-thin fa-${p.icon}`} style={{ marginLeft: 6 }} />
                  {p.label} ({dev[p.key].length})
                </button>
              ))}
            </div>

            <PhaseTable tasks={dev[phase]} />

            <div style={{ textAlign: 'center', marginTop: 16, padding: '10px 0', borderTop: '1px solid var(--border-light)' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--primary)' }}>
                المجموع: {dev.totalDays.total} يوم عمل
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function DevelopmentsSection() {
  return (
    <section id="developments" className="section">
      <SectionHeader icon="rocket-launch" title="التطويرات المطلوبة" subtitle="15 تطويراً مخططاً — اضغط على أي تطوير لعرض مهامه التفصيلية" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {developments.map(dev => <DevelopmentCard key={dev.id} dev={dev} />)}
      </div>
    </section>
  );
}
