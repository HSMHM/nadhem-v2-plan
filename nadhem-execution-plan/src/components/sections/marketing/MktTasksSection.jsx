import { useState } from 'react';
import SectionHeader from '../../common/SectionHeader';
import { mktTasks } from '../../../data/marketing';

const priorityMap = {
  highest: { cls: 'badge-d', label: 'قصوى' },
  high: { cls: 'badge-w', label: 'عالية' },
  medium: { cls: 'badge-p', label: 'متوسطة' },
};

const tabs = [
  { id: 'productManager', label: 'مهام مدير المنتج' },
  { id: 'marketingTeam', label: 'مهام فريق التسويق' },
];

export default function MktTasksSection() {
  const [activeTab, setActiveTab] = useState('productManager');
  const tasks = mktTasks[activeTab] || [];

  return (
    <section id="mkt-tasks" className="section">
      <SectionHeader icon="list-check" title="المهام التفصيلية" />

      <div className="phase-tabs" style={{ marginBottom: 16 }}>
        {tabs.map(t => (
          <button
            key={t.id}
            className={`phase-tab ${activeTab === t.id ? 'active' : ''}`}
            onClick={() => setActiveTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div
        className="task-list"
        key={activeTab}
      >
        {tasks.map((t, i) => {
          const p = priorityMap[t.priority] || priorityMap.medium;
          return (
            <div key={t.id} className="task-item" data-aos="fade-up" data-aos-delay={Math.min(i * 80, 600)}>
              <span className="task-id">{t.id}</span>
              <span className="task-text">{t.task}</span>
              <span className={`badge ${p.cls}`} style={{ fontSize: '0.68rem', marginInlineStart: 'auto', flexShrink: 0 }}>
                {p.label}
              </span>
              <span className="task-dur" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
                <span>{t.frequency}</span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{t.duration}</span>
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
