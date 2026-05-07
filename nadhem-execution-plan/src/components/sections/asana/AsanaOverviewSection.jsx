import { developments } from '../../../data/developments';
import { CLASSIFICATION, SECTION_LABELS } from '../../../data/asanaClassification';
import { computeStats } from '../../../utils/buildFad';

const ASANA_RED = '#F06A6A';
const ADD_COLOR = '#10B981';
const MOD_COLOR = '#F59E0B';

function StatCard({ icon, value, label, color = ASANA_RED, sub }) {
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

function priorityBuckets() {
  const buckets = { P0: [], P1: [], P2: [], P3: [], P4: [] };
  for (const dev of developments) {
    if (!CLASSIFICATION[dev.id]) continue;
    (buckets[dev.quarter] || (buckets[dev.quarter] = [])).push(dev);
  }
  return buckets;
}

export default function AsanaOverviewSection() {
  const stats = computeStats(developments);
  const buckets = priorityBuckets();

  return (
    <section id="asana-overview" className="asana-root">
      <div className="asana-bg" />
      <div className="asana-glow asana-glow-1" />
      <div className="asana-glow asana-glow-2" />

      <div className="asana-inner">
        <header className="asana-hero" data-aos="fade-up">
          <div className="asana-badge">
            <i className="fa-thin fa-list-tree" aria-hidden="true" />
            <span>محاكاة لما سيُنشأ في أسانا</span>
          </div>
          <h1 className="asana-hero-title">شجرة المهام في أسانا</h1>
          <p className="asana-hero-sub">
            استعراض كامل للهيكل الهرمي ثلاثي المستويات الذي ستُنشئه السكربتات في أسانا — مع كل ملف JSON مرفق.
            هذا التبويب يحاكي ما ستراه في أسانا بالضبط، وكل بطاقة تعرض اسم المهمة، الوصف، والـ FAD المرفق.
          </p>

          <div className="asana-hero-meta">
            <i className="fa-thin fa-circle-info" aria-hidden="true" />
            <span>الإجمالي المتوقع في أسانا: <strong>{stats.totalAsanaTasks}</strong> مهمة (<strong>{stats.mainCount}</strong> رئيسية + <strong>{stats.phaseContainerCount}</strong> حاوية مرحلة + <strong>{stats.leafCount}</strong> تفصيلية) + <strong>{stats.totalJsonFiles}</strong> مرفق JSON</span>
          </div>

          <div className="asana-kpis">
            <StatCard icon="folder-tree" value={stats.mainCount} label="مهام رئيسية" sub={`${stats.addCount} إضافة + ${stats.modCount} تعديل`} />
            <StatCard icon="layer-group" value={stats.phaseContainerCount} label="حاويات مراحل" color="#8B5CF6" sub="4 لكل تطوير: تحليل/تصميم/تنفيذ/تدريب" />
            <StatCard icon="diagram-subtask" value={stats.leafCount} label="مهام تفصيلية" color="#3B82F6" sub="مأخوذة من developments.js" />
            <StatCard icon="file-code" value={stats.totalJsonFiles} label="ملفات FAD JSON" color="#10B981" sub={`${stats.mainCount} كاملة + ${stats.leafCount} مختصرة`} />
          </div>
        </header>

        <div className="asana-grid-2">
          <div className="asana-card" data-aos="fade-up">
            <div className="asana-card-head">
              <i className="fa-thin fa-folder-tree" style={{ color: ASANA_RED }} aria-hidden="true" />
              <h3>توزيع المهام بين الأقسام</h3>
            </div>
            <div className="asana-section-split">
              <div className="asana-section-cell" style={{ '--cell-c': ADD_COLOR }}>
                <div className="asana-section-head">
                  <i className="fa-thin fa-plus" aria-hidden="true" />
                  <span>{SECTION_LABELS.add}</span>
                </div>
                <div className="asana-section-num">{stats.addCount}</div>
                <div className="asana-section-lbl">تطوير جديد كلياً</div>
                <ul className="asana-section-list">
                  {developments.filter(d => CLASSIFICATION[d.id]?.section === 'add').map(d => (
                    <li key={d.id}><span className="asana-pill">DEV-{d.id}</span><span>{d.title}</span></li>
                  ))}
                </ul>
              </div>
              <div className="asana-section-cell" style={{ '--cell-c': MOD_COLOR }}>
                <div className="asana-section-head">
                  <i className="fa-thin fa-pen-to-square" aria-hidden="true" />
                  <span>{SECTION_LABELS.mod}</span>
                </div>
                <div className="asana-section-num">{stats.modCount}</div>
                <div className="asana-section-lbl">على خصائص قائمة في saas-events-frontend</div>
                <ul className="asana-section-list">
                  {developments.filter(d => CLASSIFICATION[d.id]?.section === 'mod').map(d => (
                    <li key={d.id}><span className="asana-pill">DEV-{d.id}</span><span>{d.title}</span></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="asana-card" data-aos="fade-up">
            <div className="asana-card-head">
              <i className="fa-thin fa-bullseye-arrow" style={{ color: ASANA_RED }} aria-hidden="true" />
              <h3>التوزيع حسب الأولوية</h3>
            </div>
            <div className="asana-priority-grid">
              {Object.entries(buckets).filter(([, list]) => list.length > 0).map(([q, list]) => {
                const colorMap = { P0: '#EF4444', P1: '#F59E0B', P2: '#3B82F6', P3: '#8B5CF6', P4: '#6B7280' };
                const labelMap = { P0: 'الحزمة العاجلة', P1: 'عالية', P2: 'متوسطة', P3: 'متوسطة', P4: 'منخفضة' };
                return (
                  <div key={q} className="asana-priority-row" style={{ '--p-c': colorMap[q] }}>
                    <span className="asana-priority-tag">{q}</span>
                    <span className="asana-priority-label">{labelMap[q]}</span>
                    <div className="asana-priority-bar">
                      <div className="asana-priority-fill" style={{ width: `${(list.length / stats.mainCount) * 100}%` }} />
                    </div>
                    <span className="asana-priority-count">{list.length}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="asana-card asana-phases-card" data-aos="fade-up">
          <div className="asana-card-head">
            <i className="fa-thin fa-layer-group" style={{ color: ASANA_RED }} aria-hidden="true" />
            <h3>إجمالي المهام التفصيلية حسب المرحلة</h3>
          </div>
          <div className="asana-phases-grid">
            <div className="asana-phase-cell" style={{ '--ph-c': '#3B82F6' }}>
              <i className="fa-thin fa-magnifying-glass-chart" aria-hidden="true" />
              <div className="asana-phase-num">{stats.analysisCount}</div>
              <div className="asana-phase-lbl">تحليل</div>
            </div>
            <div className="asana-phase-cell" style={{ '--ph-c': '#A61C61' }}>
              <i className="fa-thin fa-pen-ruler" aria-hidden="true" />
              <div className="asana-phase-num">{stats.designCount}</div>
              <div className="asana-phase-lbl">تصميم</div>
            </div>
            <div className="asana-phase-cell" style={{ '--ph-c': '#10B981' }}>
              <i className="fa-thin fa-code" aria-hidden="true" />
              <div className="asana-phase-num">{stats.implCount}</div>
              <div className="asana-phase-lbl">تنفيذ</div>
            </div>
            <div className="asana-phase-cell" style={{ '--ph-c': '#F59E0B' }}>
              <i className="fa-thin fa-chalkboard-user" aria-hidden="true" />
              <div className="asana-phase-num">{stats.trainingCount}</div>
              <div className="asana-phase-lbl">تدريب</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
