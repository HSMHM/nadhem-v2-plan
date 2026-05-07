import { useMemo, useState } from 'react';
import { developments } from '../../../data/developments';
import { CLASSIFICATION, SECTION_LABELS, PHASE_LABELS, PHASE_ICONS } from '../../../data/asanaClassification';
import TaskCard from './TaskCard';

const QUARTER_COLORS = {
  P0: '#EF4444', P1: '#F59E0B', P2: '#3B82F6', P3: '#8B5CF6', P4: '#6B7280',
};
const SECTION_COLORS = { add: '#10B981', mod: '#F59E0B' };

function PhaseGroup({ dev, phase, items, refresh }) {
  const [open, setOpen] = useState(false);
  if (!items || items.length === 0) return null;
  return (
    <div className="asana-phase-group">
      <button className={`asana-phase-head ${open ? 'is-open' : ''}`} onClick={() => setOpen(!open)}>
        <i className={`fa-thin fa-chevron-${open ? 'down' : 'left'}`} aria-hidden="true" />
        <i className={`fa-thin fa-${PHASE_ICONS[phase]}`} aria-hidden="true" />
        <span className="asana-phase-name">{PHASE_LABELS[phase]}</span>
        <span className="asana-phase-count">{items.length} مهمة</span>
        {dev.totalDays?.[phase] && (
          <span className="asana-phase-dur">{dev.totalDays[phase]} يوم</span>
        )}
      </button>
      {open && (
        <div className="asana-phase-body">
          {items.map((sub) => (
            <TaskCard
              key={sub.id}
              kind="sub"
              id={sub.id}
              level={2}
              summary={{
                id: sub.id,
                title: sub.task,
                badges: sub.duration ? [{ label: sub.duration, color: '#3B82F6' }] : [],
                meta: [
                  { label: 'الأب', value: `[DEV-${dev.id}] ${dev.title}` },
                  { label: 'المرحلة', value: PHASE_LABELS[phase] },
                  { label: 'المدة المقدّرة', value: sub.duration || '-' },
                ],
              }}
              onAfterSave={refresh}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function DevTask({ dev, refresh }) {
  const cls = CLASSIFICATION[dev.id];
  if (!cls) return null;
  const sectionColor = SECTION_COLORS[cls.section];
  const qColor = QUARTER_COLORS[dev.quarter] || '#6B7280';
  const sectionLabel = SECTION_LABELS[cls.section];
  const total = dev.totalDays?.total || '-';

  return (
    <div className="asana-dev-task">
      <TaskCard
        kind="main"
        id={dev.id}
        level={0}
        defaultOpen={false}
        summary={{
          id: `DEV-${dev.id}`,
          title: dev.title,
          badges: [
            { label: sectionLabel, color: sectionColor },
            { label: dev.quarter, color: qColor },
            { label: cls.type === 'change' ? 'تعديل' : 'إضافة', color: sectionColor },
          ],
          meta: [
            { label: 'الموقع في النظام', value: dev.location || '-' },
            { label: 'الفترة', value: dev.startDate && dev.endDate ? `${dev.startDate} → ${dev.endDate}` : '-' },
            { label: 'إجمالي الأيام', value: `${total} يوم` },
            { label: 'الواجهات المتأثرة', value: cls.interfaces.join('، ') },
          ],
        }}
        onAfterSave={refresh}
      />

      {/* Phase containers as nested children */}
      <div className="asana-dev-phases">
        {['analysis', 'design', 'implementation', 'training'].map((p) => (
          <PhaseGroup key={p} dev={dev} phase={p} items={dev[p]} refresh={refresh} />
        ))}
      </div>
    </div>
  );
}

const FILTERS = [
  { id: 'all', label: 'الكل' },
  { id: 'add', label: SECTION_LABELS.add },
  { id: 'mod', label: SECTION_LABELS.mod },
];

const QUARTERS = ['all', 'P0', 'P1', 'P2', 'P3', 'P4'];

export default function AsanaTasksSection() {
  const [refresh, setRefresh] = useState(0);
  const [filter, setFilter] = useState('all');
  const [quarter, setQuarter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return developments.filter((d) => {
      const cls = CLASSIFICATION[d.id];
      if (!cls) return false;
      if (filter !== 'all' && cls.section !== filter) return false;
      if (quarter !== 'all' && d.quarter !== quarter) return false;
      if (search && !d.title.toLowerCase().includes(search.toLowerCase()) && !String(d.id).includes(search)) return false;
      return true;
    });
  }, [filter, quarter, search]);

  return (
    <section id="asana-tasks" className="asana-root asana-tasks-root">
      <div className="asana-inner">
        <header className="asana-section-hdr" data-aos="fade-up">
          <h2><i className="fa-thin fa-list-tree" aria-hidden="true" /> شجرة المهام في أسانا</h2>
          <p>كل بطاقة قابلة للفتح والتعديل المباشر. أي تغيير → اضغط <strong>"حفظ التغييرات"</strong> ليُحفظ في ملف JSON على القرص ويُستخدم عند رفع المهام إلى أسانا.</p>
        </header>

        <div className="asana-filter-bar" data-aos="fade-up">
          <div className="asana-filter-group">
            <span className="asana-filter-lbl">القسم:</span>
            {FILTERS.map((f) => (
              <button
                key={f.id}
                className={`asana-filter-btn ${filter === f.id ? 'active' : ''}`}
                onClick={() => setFilter(f.id)}
              >{f.label}</button>
            ))}
          </div>
          <div className="asana-filter-group">
            <span className="asana-filter-lbl">الأولوية:</span>
            {QUARTERS.map((q) => (
              <button
                key={q}
                className={`asana-filter-btn ${quarter === q ? 'active' : ''}`}
                onClick={() => setQuarter(q)}
              >{q === 'all' ? 'الكل' : q}</button>
            ))}
          </div>
          <div className="asana-filter-group asana-filter-search">
            <i className="fa-thin fa-magnifying-glass" aria-hidden="true" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="بحث في العنوان أو المعرّف..."
            />
            {search && <button className="asana-filter-clear" onClick={() => setSearch('')}><i className="fa-thin fa-xmark" aria-hidden="true" /></button>}
          </div>
        </div>

        <div className="asana-tasks-summary">
          عرض <strong>{filtered.length}</strong> من أصل <strong>{developments.length}</strong> تطوير
        </div>

        <div className="asana-tasks-list">
          {filtered.map((dev) => (
            <DevTask key={dev.id} dev={dev} refresh={() => setRefresh(refresh + 1)} />
          ))}
          {filtered.length === 0 && (
            <div className="asana-empty">
              <i className="fa-thin fa-inbox" aria-hidden="true" />
              <p>لا توجد مهام مطابقة للفلاتر الحالية.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
