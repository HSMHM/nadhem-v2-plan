import { useState } from 'react';
import SectionHeader from '../../common/SectionHeader';
import { mktTasks } from '../../../data/marketing';

const priorityMap = {
  urgent: { color: '#EF4444', label: 'عاجلة' },
  highest: { color: '#F59E0B', label: 'قصوى' },
  high: { color: '#2A848A', label: 'عالية' },
  medium: { color: '#6366F1', label: 'متوسطة' },
};

const statusMeta = {
  completed: { icon: 'square-check', color: '#10B981', label: 'مكتمل' },
  'design-done': { icon: 'pen-ruler', color: '#F59E0B', label: 'التصميم مكتمل · متبقي التنفيذ' },
  pending: { icon: 'square', color: 'var(--text-muted)', label: 'لم يبدأ' },
};

const tabs = [
  { id: 'productManager', label: 'مهام مدير المنتج', icon: 'user-tie' },
  { id: 'marketingTeam', label: 'مهام فريق التسويق', icon: 'bullhorn' },
];

function TaskCard({ t, defaultIcon }) {
  const [open, setOpen] = useState(false);
  const p = priorityMap[t.priority] || priorityMap.medium;
  const hasSubtasks = Array.isArray(t.subtasks) && t.subtasks.length > 0;

  return (
    <div className={`dev-card ${t.priority === 'urgent' ? 'dev-card-urgent' : ''}`} style={
      t.priority === 'urgent' ? { borderColor: '#EF4444', boxShadow: '0 0 0 2px rgba(239,68,68,0.12)' } : undefined
    }>
      <div className="dev-header" onClick={() => hasSubtasks && setOpen(!open)} style={{ cursor: hasSubtasks ? 'pointer' : 'default' }}>
        <div className="num">{t.id}</div>
        <div className="ic" style={{
          width: 36, height: 36, borderRadius: 8,
          background: t.priority === 'urgent' ? 'rgba(239,68,68,0.12)' : `${p.color}20`,
          color: t.priority === 'urgent' ? '#EF4444' : p.color,
        }}>
          <i className={`fa-thin fa-${defaultIcon}`} style={{ fontSize: 16 }} aria-hidden="true" />
        </div>
        <div className="title">{t.task}</div>
        <span className="badge" style={{ background: p.color, color: '#fff', fontWeight: 700, fontSize: '0.68rem' }}>
          {t.priority === 'urgent' && <i className="fa-thin fa-bolt" style={{ marginLeft: 4 }} />}
          {p.label}
        </span>
        <span className="badge badge-q" style={{ fontSize: '0.7rem' }}>{t.frequency}</span>
        <span className="badge badge-p" style={{ fontSize: '0.7rem' }}>{t.duration}</span>
        {hasSubtasks && <i className={`fa-thin fa-chevron-down chevron ${open ? 'open' : ''}`} aria-hidden="true" />}
      </div>

      {hasSubtasks && open && (
        <div className="dev-body">
          <div style={{
            background: `${p.color}0D`,
            border: `1px solid ${p.color}40`,
            borderRadius: 10, padding: '12px 14px',
          }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
              <i className="fa-thin fa-list-tree" style={{ color: p.color, fontSize: 18 }} />
              <div style={{ fontSize: '0.82rem', color: 'var(--text-dark)', fontWeight: 600 }}>
                المهام الفرعية
              </div>
            </div>
            <div style={{ display: 'grid', gap: 8, paddingRight: 26 }}>
              {t.subtasks.map((s) => {
                const meta = s.status ? (statusMeta[s.status] || statusMeta.pending) : { icon: 'circle-dot', color: p.color, label: '' };
                return (
                  <div key={s.id} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: '0.82rem', color: 'var(--text)', lineHeight: 1.7 }}>
                    <i className={`fa-thin fa-${meta.icon}`} style={{ color: meta.color, marginTop: 3, flexShrink: 0 }} />
                    <span style={{ flex: 1 }}>
                      <span style={{ color: meta.color, fontWeight: 600, fontSize: '0.72rem', marginLeft: 6 }}>{s.id}</span>
                      {s.task}
                      {s.note && <span style={{ display: 'block', fontSize: '0.74rem', color: meta.color, marginTop: 2 }}>⓵ {s.note}</span>}
                    </span>
                    {s.period && (
                      <span style={{ fontSize: '0.7rem', color: meta.color, background: `${meta.color}1A`, padding: '2px 8px', borderRadius: 999, fontWeight: 600, whiteSpace: 'nowrap', flexShrink: 0 }}>
                        {s.period}
                      </span>
                    )}
                    {s.duration && (
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', flexShrink: 0 }}>
                        {s.duration}
                      </span>
                    )}
                    {meta.label && (
                      <span className="badge" style={{ background: meta.color, color: '#fff', fontSize: '0.66rem', fontWeight: 600, padding: '2px 8px', flexShrink: 0 }}>
                        {meta.label}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function MktTasksSection() {
  const [activeTab, setActiveTab] = useState('productManager');
  const tasks = mktTasks[activeTab] || [];
  const activeTabMeta = tabs.find(t => t.id === activeTab);

  return (
    <section id="mkt-tasks" className="section">
      <SectionHeader icon="list-check" title="المهام التفصيلية" subtitle={`${tasks.length} مهمة — اضغط على أي مهمة بمهام فرعية لعرض تفاصيلها`} />

      <div className="phase-tabs" style={{ marginBottom: 16 }}>
        {tabs.map(t => (
          <button
            key={t.id}
            className={`phase-tab ${activeTab === t.id ? 'active' : ''}`}
            onClick={() => setActiveTab(t.id)}
          >
            <i className={`fa-thin fa-${t.icon}`} style={{ marginLeft: 6 }} aria-hidden="true" />
            <span>{t.label}</span>
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }} key={activeTab}>
        {tasks.map((t) => (
          <TaskCard key={t.id} t={t} defaultIcon={activeTabMeta?.icon || 'list-check'} />
        ))}
      </div>
    </section>
  );
}
