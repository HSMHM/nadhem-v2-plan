import { useState } from 'react';
import SectionHeader from '../common/SectionHeader';
import PhaseTable from '../common/PhaseTable';
import { developments } from '../../data/developments';

const periodLabel = { P0: '19 أبريل – 14 مايو', P1: 'مايو – يونيو', P2: 'يوليو – أغسطس', P3: 'سبتمبر – أكتوبر', P4: 'نوفمبر – ديسمبر' };
const phaseNames = [
  { key: 'analysis', label: 'التحليل', badge: 'مدير المنتج', icon: 'magnifying-glass-chart', color: '#2A848A', badgeColor: 'var(--primary)' },
  { key: 'design', label: 'التصميم', badge: 'فريق التصميم', icon: 'pen-ruler', color: '#A61C61', badgeColor: 'var(--accent-pink)' },
  { key: 'implementation', label: 'التنفيذ', badge: 'فريق التطوير', icon: 'code', color: '#BA5A31', badgeColor: 'var(--accent-orange)' },
  { key: 'training', label: 'التدريب والتسليم', badge: 'مدير المنتج', icon: 'chalkboard-user', color: '#452059', badgeColor: 'var(--primary)' },
];

function TaskList({ tasks, phase }) {
  return (
    <div className="task-list">
      {tasks.map((t) => (
        <div key={t.id} className="task-item">
          <span className="task-id">{t.id}</span>
          <span className="task-text">{t.task}</span>
          {phase === 'analysis' || phase === 'training' ? (
            <span className="task-dur">{t.duration}</span>
          ) : (
            <span className="task-dur" style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
              {phase === 'design' ? 'فريق التصميم' : 'فريق التطوير'}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

function DevelopmentCard({ dev }) {
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState('analysis');

  const totalTasks = dev.analysis.length + dev.design.length + dev.implementation.length + (dev.training?.length || 0);

  return (
    <div className={`dev-card ${dev.urgent ? 'dev-card-urgent' : ''} ${dev.completed ? 'dev-card-completed' : ''} ${dev.partial ? 'dev-card-partial' : ''}`} style={
      dev.completed ? { borderColor: '#10B981', boxShadow: '0 0 0 2px rgba(16,185,129,0.15)' }
      : dev.partial ? { borderColor: '#F59E0B', boxShadow: '0 0 0 2px rgba(245,158,11,0.15)' }
      : dev.urgent ? { borderColor: '#EF4444', boxShadow: '0 0 0 2px rgba(239,68,68,0.12)' }
      : undefined
    }>
      <div className="dev-header" onClick={() => setOpen(!open)}>
        <div className="num">{dev.id}</div>
        <div className="ic" style={{
          width: 36, height: 36, borderRadius: 8,
          background: dev.completed ? 'rgba(16,185,129,0.12)' : dev.partial ? 'rgba(245,158,11,0.12)' : dev.urgent ? 'rgba(239,68,68,0.12)' : undefined,
          color: dev.completed ? '#10B981' : dev.partial ? '#F59E0B' : dev.urgent ? '#EF4444' : undefined,
        }}>
          <i className={`fa-thin fa-${dev.icon}`} style={{ fontSize: 16 }} aria-hidden="true" />
        </div>
        <div className="title">{dev.title}</div>
        {dev.completed ? (
          <span className="badge" style={{ background: '#10B981', color: '#fff', fontWeight: 700 }}>
            <i className="fa-thin fa-circle-check" style={{ marginLeft: 4 }} /> مكتمل{dev.completedDate ? ` · ${dev.completedDate}` : ''}
          </span>
        ) : dev.partial ? (
          <span className="badge" style={{ background: '#F59E0B', color: '#fff', fontWeight: 700 }}>
            <i className="fa-thin fa-circle-half-stroke" style={{ marginLeft: 4 }} /> جزئي · التصميم مكتمل
          </span>
        ) : dev.urgent && (
          <span className="badge" style={{ background: '#EF4444', color: '#fff', fontWeight: 700 }}>
            <i className="fa-thin fa-bolt" style={{ marginLeft: 4 }} /> عاجلة
          </span>
        )}
        <span className="badge badge-q">{periodLabel[dev.quarter]}</span>
        <span className="badge badge-p">{totalTasks} مهمة</span>
        <i className={`fa-thin fa-chevron-down chevron ${open ? 'open' : ''}`} aria-hidden="true" />
      </div>

      {open && (
        <div className="dev-body">
          <p className="dev-desc">{dev.description}</p>
          <div className="dev-meta">
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <i className="fa-thin fa-location-dot" style={{ marginLeft: 4 }} /> {dev.location}
            </span>
          </div>

          {dev.subtasks && (() => {
            const accent = dev.completed ? '#10B981' : dev.partial ? '#F59E0B' : dev.urgent ? '#EF4444' : 'var(--primary)';
            const bgSoft = dev.completed ? 'rgba(16,185,129,0.06)' : dev.partial ? 'rgba(245,158,11,0.06)' : dev.urgent ? 'rgba(239,68,68,0.05)' : 'rgba(42,132,138,0.05)';
            const borderSoft = dev.completed ? 'rgba(16,185,129,0.30)' : dev.partial ? 'rgba(245,158,11,0.30)' : dev.urgent ? 'rgba(239,68,68,0.25)' : 'rgba(42,132,138,0.25)';
            const headIcon = dev.completed ? 'circle-check' : dev.partial ? 'circle-half-stroke' : 'list-tree';
            const headLabel = dev.completed ? 'المخرجات المُسلَّمة' : dev.partial ? 'حالة المخرجات' : 'المهام الفرعية';
            const statusMeta = {
              completed: { icon: 'square-check', color: '#10B981', label: 'مكتمل' },
              'design-done': { icon: 'pen-ruler', color: '#F59E0B', label: 'التصميم مكتمل · متبقي التنفيذ' },
              pending: { icon: 'square', color: 'var(--text-muted)', label: 'لم يبدأ' },
            };
            return (
              <div style={{ background: bgSoft, border: `1px solid ${borderSoft}`, borderRadius: 10, padding: '12px 14px', marginBottom: 16 }}>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
                  <i className={`fa-thin fa-${headIcon}`} style={{ color: accent, fontSize: 18 }} />
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-dark)', fontWeight: 600 }}>
                    {headLabel}
                  </div>
                  {dev.partialNote && (
                    <div style={{ fontSize: '0.74rem', color: accent, marginRight: 'auto', fontWeight: 500 }}>
                      {dev.partialNote}
                    </div>
                  )}
                </div>
                <div style={{ display: 'grid', gap: 8, paddingRight: 26 }}>
                  {dev.subtasks.map((s) => {
                    const meta = statusMeta[s.status] || statusMeta.pending;
                    return (
                      <div key={s.id} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: '0.82rem', color: 'var(--text)', lineHeight: 1.7 }}>
                        <i className={`fa-thin fa-${meta.icon}`} style={{ color: meta.color, marginTop: 3, flexShrink: 0 }} />
                        <span style={{ flex: 1 }}>
                          {s.task}
                          {s.note && <span style={{ display: 'block', fontSize: '0.74rem', color: meta.color, marginTop: 2 }}>⓵ {s.note}</span>}
                        </span>
                        {s.period && (
                          <span style={{ fontSize: '0.7rem', color: meta.color, background: `${meta.color}1A`, padding: '2px 8px', borderRadius: 999, fontWeight: 600, whiteSpace: 'nowrap', flexShrink: 0 }}>
                            {s.period}
                          </span>
                        )}
                        <span className="badge" style={{ background: meta.color, color: '#fff', fontSize: '0.66rem', fontWeight: 600, padding: '2px 8px', flexShrink: 0 }}>{meta.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })()}

          {dev.urgent && !dev.completed && !dev.partial && (
            <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: 10, padding: '12px 14px', marginBottom: 16 }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: dev.milestones ? 10 : 0 }}>
                <i className="fa-thin fa-bolt" style={{ color: '#EF4444', fontSize: 18 }} />
                <div style={{ fontSize: '0.82rem', color: 'var(--text-dark)', fontWeight: 600 }}>
                  مرحلة التطوير العاجل — من {dev.startDate} إلى {dev.endDate}
                </div>
              </div>
              {dev.milestones && (
                <div style={{ display: 'grid', gap: 6, paddingRight: 26 }}>
                  {dev.milestones.map((m, i) => (
                    <div key={i} style={{ fontSize: '0.78rem', color: 'var(--text)', display: 'flex', gap: 8, alignItems: 'center' }}>
                      <i className="fa-thin fa-flag-checkered" style={{ color: '#EF4444' }} />
                      <span style={{ flex: 1 }}>{m.label}</span>
                      <span style={{ color: '#EF4444', fontWeight: 600 }}>{m.deadline}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Phase duration summary */}
          <div className="grid g4" style={{ marginBottom: 16, gap: 10 }}>
            {phaseNames.map(p => (
              <div key={p.key} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 8, background: 'var(--border-light)' }}>
                <i className={`fa-thin fa-${p.icon}`} style={{ color: p.color, fontSize: 14 }} />
                <span style={{ fontSize: '0.78rem', color: 'var(--text-dark)', fontWeight: 500 }}>{p.label}</span>
                <span style={{ marginRight: 'auto', fontSize: '0.78rem', color: p.color, fontWeight: 600 }}>
                  {p.key === 'analysis' || p.key === 'training'
                    ? `${dev.totalDays?.[p.key] || (dev.training ? 2.5 : 0)} يوم`
                    : 'الفريق التقني'}
                </span>
              </div>
            ))}
          </div>

          {/* Phase progress bar */}
          <div style={{ display: 'flex', height: 6, borderRadius: 9999, overflow: 'hidden', marginBottom: 16 }}>
            <div style={{ width: `${(dev.totalDays.analysis / dev.totalDays.total) * 100}%`, background: '#2A848A' }} />
            <div style={{ width: `${(dev.totalDays.design / dev.totalDays.total) * 100}%`, background: '#A61C61' }} />
            <div style={{ width: `${(dev.totalDays.implementation / dev.totalDays.total) * 100}%`, background: '#BA5A31' }} />
            <div style={{ width: `${(2.5 / dev.totalDays.total) * 100}%`, background: '#452059' }} />
          </div>

          {/* Phase tabs */}
          <div className="phase-tabs">
            {phaseNames.map(p => (
              <button key={p.key} className={`phase-tab ${phase === p.key ? 'active' : ''}`} onClick={() => setPhase(p.key)}>
                <i className={`fa-thin fa-${p.icon}`} style={{ marginLeft: 6 }} />
                <span>{p.label}</span>
                <span style={{ fontSize: '0.6rem', color: p.badgeColor, display: 'block', marginTop: 2 }}>{p.badge}</span>
              </button>
            ))}
          </div>

          <TaskList tasks={dev[phase] || []} phase={phase} />

          <div style={{ textAlign: 'center', marginTop: 16, padding: '10px 0', borderTop: '1px solid var(--border-light)' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--primary)' }}>
              المجموع: {dev.totalDays.total} يوم عمل (التحليل والتدريب: مدير المنتج — التصميم والتنفيذ: الفريق التقني)
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DevelopmentsSection() {
  return (
    <section id="developments" className="section">
      <SectionHeader icon="rocket-launch" title="التطويرات المطلوبة" subtitle="17 تطويراً (4 عاجلة + 13 مخططة) — اضغط على أي تطوير لعرض مهامه التفصيلية" />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {developments.map(dev => <DevelopmentCard key={dev.id} dev={dev} />)}
      </div>
    </section>
  );
}
