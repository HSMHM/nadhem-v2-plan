import { useMemo, useState, useEffect } from 'react';
import { mktTasks } from '../../../data/marketing';
import { getMktDescription } from '../../../data/marketingDescriptions';

const ASANA_RED = '#F06A6A';
const STORAGE_KEY = 'mkt_tasks_edits_v1';

const PRIORITY_COLORS = {
  urgent: '#EF4444',
  highest: '#F59E0B',
  high: '#2A848A',
  medium: '#6366F1',
};
const PRIORITY_LABELS = {
  urgent: 'عاجلة',
  highest: 'قصوى',
  high: 'عالية',
  medium: 'متوسطة',
};

// ============ Stats helper ============
function computeMktStats(tasks) {
  const stats = {
    mainCount: 0, subtaskCount: 0,
    pmCount: 0, mktCount: 0,
    urgent: 0, highest: 0, high: 0, medium: 0,
  };
  for (const t of tasks) {
    stats.mainCount++;
    if (t._group === 'productManager') stats.pmCount++;
    else stats.mktCount++;
    if (t.priority && stats[t.priority] !== undefined) stats[t.priority]++;
    if (Array.isArray(t.subtasks)) stats.subtaskCount += t.subtasks.length;
  }
  stats.totalAsanaTasks = stats.mainCount + stats.subtaskCount;
  return stats;
}

function StatCard({ icon, value, label, color = '#F06A6A', sub }) {
  return (
    <div className="asana-stat" style={{ '--stat-accent': color }}>
      <div className="asana-stat-ic"><i className={`fa-thin fa-${icon}`} aria-hidden="true" /></div>
      <div className="asana-stat-body">
        <div className="asana-stat-num">{value}</div>
        <div className="asana-stat-lbl">{label}</div>
        {sub && <div className="asana-stat-sub">{sub}</div>}
      </div>
    </div>
  );
}

const ASANA_COLUMN = 'دراسة / تحليل';
const ASANA_PROJECT_URL = 'https://app.asana.com/1/501959893727986/project/1205956345128900/board/1205956711736490';

// ============ Storage helpers ============
function loadEdits() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}
function saveEdits(edits) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(edits));
  } catch (e) {
    console.error('Failed to save edits', e);
  }
}

// ============ Editable text ============
function EditableField({ value, onChange, multiline, placeholder, label }) {
  return (
    <label className="mkt-edit-field">
      {label && <span className="mkt-edit-label">{label}</span>}
      {multiline ? (
        <textarea
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={4}
        />
      ) : (
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      )}
    </label>
  );
}

// ============ Marketing Task Card ============
function MarketingTaskCard({ task, group, edits, onChange, onSendToAsana }) {
  const [open, setOpen] = useState(false);
  const baseDesc = useMemo(() => getMktDescription(task.id), [task.id]);
  const edit = edits[task.id] || {};

  // إن لم تكن هناك subtasks في البيانات، نستخدم المخرجات من الوصف كقيمة ابتدائية للمهام الفرعية
  const fallbackSubtasksFromDeliverables = (baseDesc.deliverables || []).map((d, i) => ({
    id: `${task.id}.${i + 1}`,
    task: d,
    period: '',
    duration: '',
  }));
  const initialSubtasks = (task.subtasks && task.subtasks.length > 0)
    ? task.subtasks.map((s) => ({ id: s.id, task: s.task, period: s.period || '', duration: s.duration || '' }))
    : fallbackSubtasksFromDeliverables;

  const merged = {
    title: edit.title ?? task.task,
    description: edit.description ?? baseDesc.description,
    successCriteria: edit.successCriteria ?? baseDesc.successCriteria,
    frequency: edit.frequency ?? task.frequency,
    duration: edit.duration ?? task.duration,
    subtasks: edit.subtasks ?? initialSubtasks,
    sentToAsana: !!edit.sentToAsana,
    sentAt: edit.sentAt || null,
  };

  const priColor = PRIORITY_COLORS[task.priority] || PRIORITY_COLORS.medium;
  const priLabel = PRIORITY_LABELS[task.priority] || PRIORITY_LABELS.medium;
  const dirty = !!edit && Object.keys(edit).some((k) => k !== 'sentToAsana' && k !== 'sentAt');

  const updateField = (field, value) => onChange(task.id, { ...edit, [field]: value });
  const updateSubtask = (idx, field, value) => {
    const next = [...merged.subtasks];
    next[idx] = { ...next[idx], [field]: value };
    onChange(task.id, { ...edit, subtasks: next });
  };
  const addSubtask = () => {
    const nextId = `${task.id}.${(merged.subtasks.length || 0) + 1}`;
    onChange(task.id, { ...edit, subtasks: [...merged.subtasks, { id: nextId, task: '', period: '', duration: '' }] });
  };
  const removeSubtask = (idx) => {
    const next = merged.subtasks.filter((_, i) => i !== idx);
    onChange(task.id, { ...edit, subtasks: next });
  };
  const reset = () => onChange(task.id, { sentToAsana: edit.sentToAsana, sentAt: edit.sentAt });

  return (
    <div className={`mkt-asana-card ${task.priority === 'urgent' ? 'is-urgent' : ''} ${dirty ? 'is-dirty' : ''} ${merged.sentToAsana ? 'is-sent' : ''}`}>
      <header className="mkt-asana-head" onClick={() => setOpen(!open)}>
        <button className="mkt-asana-toggle" tabIndex={-1}>
          <i className={`fa-thin fa-chevron-${open ? 'down' : 'left'}`} aria-hidden="true" />
        </button>
        <div className="mkt-asana-id" style={{ background: `${priColor}1A`, color: priColor }}>{task.id}</div>
        <div className="mkt-asana-title">{merged.title}</div>
        <div className="mkt-asana-badges">
          <span className="mkt-asana-badge" style={{ background: priColor, color: '#fff' }}>
            {task.priority === 'urgent' && <i className="fa-thin fa-bolt" style={{ marginLeft: 4 }} />}
            {priLabel}
          </span>
          <span className="mkt-asana-badge" style={{ background: '#1E293B', color: '#fff' }}>{group}</span>
          {merged.sentToAsana && (
            <span className="mkt-asana-badge" style={{ background: '#10B981', color: '#fff' }}>
              <i className="fa-thin fa-check" style={{ marginLeft: 4 }} /> أُرسلت
            </span>
          )}
          {dirty && <span className="mkt-asana-dirty">● غير محفوظ</span>}
        </div>
      </header>

      {open && (
        <div className="mkt-asana-body">
          <div className="mkt-asana-meta">
            <div><strong>العمود في أسانا:</strong> <span style={{ color: ASANA_RED }}>{ASANA_COLUMN}</span></div>
            <div><strong>المسؤول:</strong> {group}</div>
            <div><strong>التكرار:</strong> {merged.frequency}</div>
            <div><strong>المدة:</strong> {merged.duration}</div>
          </div>

          <EditableField
            label="عنوان المهمة"
            value={merged.title}
            onChange={(v) => updateField('title', v)}
          />
          <EditableField
            label="الوصف التفصيلي"
            value={merged.description}
            onChange={(v) => updateField('description', v)}
            multiline
          />

          <EditableField
            label="معيار النجاح"
            value={merged.successCriteria}
            onChange={(v) => updateField('successCriteria', v)}
            multiline
          />

          {/* Subtasks */}
          <div className="mkt-edit-field">
            <span className="mkt-edit-label">المهام الفرعية</span>
            {merged.subtasks.length === 0 && (
              <div className="mkt-empty-subtasks">لا توجد مهام فرعية. أضف واحدة إن لزم.</div>
            )}
            {merged.subtasks.map((s, i) => (
              <div key={i} className="mkt-subtask-row">
                <span className="mkt-subtask-id">{s.id}</span>
                <input
                  type="text"
                  placeholder="نص المهمة الفرعية"
                  value={s.task}
                  onChange={(e) => updateSubtask(i, 'task', e.target.value)}
                  style={{ flex: 1 }}
                />
                <input
                  type="text"
                  placeholder="الفترة"
                  value={s.period}
                  onChange={(e) => updateSubtask(i, 'period', e.target.value)}
                  style={{ width: 140 }}
                />
                <input
                  type="text"
                  placeholder="المدة"
                  value={s.duration}
                  onChange={(e) => updateSubtask(i, 'duration', e.target.value)}
                  style={{ width: 100 }}
                />
                <button className="mkt-btn-icon" onClick={() => removeSubtask(i)} title="حذف">
                  <i className="fa-thin fa-xmark" />
                </button>
              </div>
            ))}
            <button className="mkt-btn mkt-btn-ghost" onClick={addSubtask}>
              <i className="fa-thin fa-plus" /> إضافة مهمة فرعية
            </button>
          </div>

          {/* Toolbar */}
          <div className="mkt-asana-toolbar">
            <button
              className="mkt-btn mkt-btn-primary"
              onClick={() => onSendToAsana(task.id)}
              disabled={merged.sentToAsana && !dirty}
              title={merged.sentToAsana ? 'تم الإرسال — اضغط لإعادة الإرسال بعد التعديل' : 'إرسال إلى عمود "دراسة / تحليل" في أسانا'}
            >
              <i className="fa-thin fa-paper-plane" /> {merged.sentToAsana ? 'إعادة إرسال إلى أسانا' : 'إرسال إلى أسانا'}
            </button>
            <button className="mkt-btn mkt-btn-ghost" onClick={reset} disabled={!dirty}>
              <i className="fa-thin fa-rotate-left" /> استرجاع
            </button>
            {merged.sentAt && (
              <span className="mkt-asana-savedat">آخر إرسال: {new Date(merged.sentAt).toLocaleString('ar-SA')}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ============ Section ============
const FILTERS = [
  { id: 'all', label: 'الكل' },
  { id: 'productManager', label: 'مدير المنتج (PM)' },
  { id: 'marketingTeam', label: 'فريق التسويق (MKT)' },
];

const PRIORITY_FILTERS = ['all', 'urgent', 'highest', 'high', 'medium'];

export default function AsanaMarketingTasksSection() {
  const [edits, setEdits] = useState({});
  const [filter, setFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => { setEdits(loadEdits()); }, []);

  const handleChange = (id, value) => {
    const next = { ...edits, [id]: value };
    setEdits(next);
    saveEdits(next);
  };

  const handleSendToAsana = (id) => {
    const next = { ...edits, [id]: { ...(edits[id] || {}), sentToAsana: true, sentAt: new Date().toISOString() } };
    setEdits(next);
    saveEdits(next);
    alert(`✓ المهمة ${id} مُجهَّزة للإرسال إلى عمود "${ASANA_COLUMN}".\n\nسيتم الإرسال الفعلي عند تشغيل سكربت push-to-asana.\n\nالمشروع:\n${ASANA_PROJECT_URL}`);
  };

  const allTasks = useMemo(() => {
    return [
      ...(mktTasks.productManager || []).map((t) => ({ ...t, _group: 'productManager', _groupLabel: 'مدير المنتج' })),
      ...(mktTasks.marketingTeam || []).map((t) => ({ ...t, _group: 'marketingTeam', _groupLabel: 'فريق التسويق' })),
    ];
  }, []);

  const filtered = useMemo(() => {
    return allTasks.filter((t) => {
      if (filter !== 'all' && t._group !== filter) return false;
      if (priorityFilter !== 'all' && t.priority !== priorityFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!t.task.toLowerCase().includes(q) && !t.id.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [allTasks, filter, priorityFilter, search]);

  const sentCount = Object.values(edits).filter((e) => e?.sentToAsana).length;
  const stats = useMemo(() => computeMktStats(allTasks), [allTasks]);

  return (
    <section id="asana-marketing-tasks" className="asana-root">
      <div className="asana-bg" />
      <div className="asana-glow asana-glow-1" />

      <div className="asana-inner">
        <header className="asana-section-hdr" data-aos="fade-up">
          <h2><i className="fa-thin fa-bullhorn" aria-hidden="true" /> مهام التسويق في أسانا</h2>
          <p>
            مهام خطة التسويق (PM + MKT) جاهزة للإرسال إلى أسانا — ستُضاف إلى عمود <strong>"{ASANA_COLUMN}"</strong> في
            <a href={ASANA_PROJECT_URL} target="_blank" rel="noreferrer" style={{ color: ASANA_RED, marginRight: 6 }}>المشروع</a>.
            عدّل المحتوى محلياً، ثم اضغط "إرسال إلى أسانا" لكل مهمة عند الاستعداد.
          </p>
          <div className="asana-hero-meta">
            <i className="fa-thin fa-circle-info" aria-hidden="true" />
            <span>الإجمالي المتوقع في أسانا: <strong>{stats.totalAsanaTasks}</strong> مهمة (<strong>{stats.mainCount}</strong> رئيسية + <strong>{stats.subtaskCount}</strong> فرعية)</span>
          </div>

          <div className="asana-kpis">
            <StatCard icon="folder-tree" value={stats.mainCount} label="مهام رئيسية" color="#F06A6A" sub={`${stats.pmCount} PM + ${stats.mktCount} MKT`} />
            <StatCard icon="diagram-subtask" value={stats.subtaskCount} label="مهام فرعية" color="#3B82F6" sub="موزّعة على المهام الرئيسية" />
            <StatCard icon="bolt" value={stats.urgent} label="عاجلة" color="#EF4444" sub={`${stats.highest} قصوى + ${stats.high} عالية + ${stats.medium} متوسطة`} />
            <StatCard icon="paper-plane" value={sentCount} label="مُرسَلة لأسانا" color="#10B981" sub={`${allTasks.length - sentCount} متبقية`} />
          </div>
        </header>

        <div className="asana-filter-bar" data-aos="fade-up">
          <div className="asana-filter-group">
            <span className="asana-filter-lbl">الفريق:</span>
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
            {PRIORITY_FILTERS.map((p) => (
              <button
                key={p}
                className={`asana-filter-btn ${priorityFilter === p ? 'active' : ''}`}
                onClick={() => setPriorityFilter(p)}
              >{p === 'all' ? 'الكل' : PRIORITY_LABELS[p]}</button>
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
            {search && <button className="asana-filter-clear" onClick={() => setSearch('')}><i className="fa-thin fa-xmark" /></button>}
          </div>
        </div>

        <div className="asana-tasks-summary">
          عرض <strong>{filtered.length}</strong> من <strong>{allTasks.length}</strong> مهمة
        </div>

        <div className="mkt-asana-list">
          {filtered.map((t) => (
            <MarketingTaskCard
              key={t.id}
              task={t}
              group={t._groupLabel}
              edits={edits}
              onChange={handleChange}
              onSendToAsana={handleSendToAsana}
            />
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
