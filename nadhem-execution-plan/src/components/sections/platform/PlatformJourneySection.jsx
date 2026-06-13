import { useState, useMemo, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  lifecyclePhases,
  packages,
  crossCuttingCapabilities,
  modulesByPhase,
  getStats,
} from '../../../data/platformJourney';

// ============ View modes ============
const VIEW_MODES = [
  { id: 'phase', label: 'حسب مرحلة الفعالية', icon: 'calendar-range' },
  { id: 'package', label: 'حسب الباقة', icon: 'box-taped' },
  { id: 'matrix', label: 'مصفوفة كاملة', icon: 'table-cells' },
];

// ============ Module Card ============
function ModuleCard({ module, packageFilter = null }) {
  const [aiOpen, setAiOpen] = useState(false);
  const hasAI = Array.isArray(module.aiEnhancements) && module.aiEnhancements.length > 0;

  return (
    <div className={`pj-module-card ${hasAI ? 'has-ai' : ''}`}>
      <div className="pj-module-head">
        <div className="pj-module-icon">
          <i className={`fa-thin fa-${module.icon}`} aria-hidden="true" />
        </div>
        <div className="pj-module-name">{module.name}</div>
        {hasAI && (
          <button
            className={`pj-ai-badge ${aiOpen ? 'open' : ''}`}
            onClick={() => setAiOpen(!aiOpen)}
            title="معزَّزة بالذكاء الاصطناعي — اضغط للتفاصيل"
          >
            <i className="fa-thin fa-wand-magic-sparkles" aria-hidden="true" />
            <span>AI</span>
          </button>
        )}
      </div>
      <p className="pj-module-desc">{module.desc}</p>

      {hasAI && aiOpen && (
        <div className="pj-ai-enhancements">
          <div className="pj-ai-enhancements-head">
            <i className="fa-thin fa-wand-magic-sparkles" aria-hidden="true" />
            <span>تعزيزات الذكاء الاصطناعي (متاحة في Enterprise + Custom)</span>
          </div>
          <ul className="pj-ai-enhancements-list">
            {module.aiEnhancements.map((e, i) => (
              <li key={i}>
                <i className="fa-thin fa-sparkles" aria-hidden="true" />
                <span>{e}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="pj-module-packages">
        {packages.map((pkg) => {
          const included = module.packages.includes(pkg.id);
          const note = module.notes?.[pkg.id];
          const isFocused = packageFilter && pkg.id === packageFilter;
          return (
            <div
              key={pkg.id}
              className={`pj-pkg-pill ${included ? 'is-on' : 'is-off'} ${isFocused ? 'is-focused' : ''}`}
              style={{ '--pkg-c': pkg.color }}
              title={included ? (note || `مشمولة في ${pkg.name}`) : `غير مشمولة في ${pkg.name}`}
            >
              <i className={`fa-thin fa-${included ? 'check' : 'xmark'}`} aria-hidden="true" />
              <span>{pkg.name}</span>
              {note && included && <span className="pj-pkg-note" title={note}><i className="fa-thin fa-circle-info" /></span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ============ Phase Column (for phase view) ============
function PhaseColumn({ phase, packageFilter }) {
  const mods = useMemo(() => {
    let list = modulesByPhase(phase.id);
    if (packageFilter) {
      list = list.filter((m) => m.packages.includes(packageFilter));
    }
    return list;
  }, [phase.id, packageFilter]);

  return (
    <div className="pj-phase-col" style={{ '--phase-c': phase.color }}>
      <header className="pj-phase-head">
        <div className="pj-phase-icon">
          <i className={`fa-thin fa-${phase.icon}`} aria-hidden="true" />
        </div>
        <div>
          <h3 className="pj-phase-title">{phase.label}</h3>
          <p className="pj-phase-desc">{phase.desc}</p>
        </div>
        <div className="pj-phase-count">
          <span className="pj-phase-count-num">{mods.length}</span>
          <span className="pj-phase-count-lbl">وحدة</span>
        </div>
      </header>

      <div className="pj-modules-list">
        {mods.length === 0 && (
          <div className="pj-empty">لا توجد وحدات تنطبق على هذا الفلتر</div>
        )}
        {mods.map((m) => (
          <ModuleCard key={m.id} module={m} packageFilter={packageFilter} />
        ))}
      </div>
    </div>
  );
}

// ============ Package View ============
function PackageView() {
  const [selected, setSelected] = useState('basic');
  const pkg = packages.find((p) => p.id === selected);

  return (
    <div className="pj-pkg-view">
      <div className="pj-pkg-selector">
        {packages.map((p) => (
          <button
            key={p.id}
            className={`pj-pkg-card ${selected === p.id ? 'active' : ''}`}
            onClick={() => setSelected(p.id)}
            style={{ '--pkg-c': p.color }}
          >
            <div className="pj-pkg-card-ic"><i className={`fa-thin fa-${p.icon}`} /></div>
            <div className="pj-pkg-card-body">
              <div className="pj-pkg-card-name">{p.name}</div>
              <div className="pj-pkg-card-en">{p.nameEn}</div>
              <div className="pj-pkg-card-count">{p.moduleCount} وحدة</div>
            </div>
          </button>
        ))}
      </div>

      <div className="pj-pkg-detail" style={{ '--pkg-c': pkg.color }}>
        <header className="pj-pkg-detail-head">
          <div className="pj-pkg-detail-ic">
            <i className={`fa-thin fa-${pkg.icon}`} aria-hidden="true" />
          </div>
          <div>
            <h3>{pkg.name} <span className="pj-pkg-en-inline">({pkg.nameEn})</span></h3>
            <p>{pkg.target}</p>
            <div className="pj-pkg-meta">
              <span>السعر السنوي: <strong>{pkg.annualPrice}</strong></span>
              <span>عدد الوحدات: <strong>{pkg.moduleCount}</strong></span>
            </div>
          </div>
        </header>

        <div className="pj-pkg-phases">
          {lifecyclePhases.map((phase) => (
            <PhaseColumn key={phase.id} phase={phase} packageFilter={selected} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ============ Matrix View ============
function MatrixView() {
  return (
    <div className="pj-matrix-wrap">
      <table className="pj-matrix">
        <thead>
          <tr>
            <th className="pj-matrix-corner">المرحلة / الوحدة</th>
            {packages.map((p) => (
              <th key={p.id} className="pj-matrix-pkg-head" style={{ '--pkg-c': p.color }}>
                <div className="pj-matrix-pkg-ic"><i className={`fa-thin fa-${p.icon}`} /></div>
                <div>{p.name}</div>
                <div className="pj-matrix-pkg-en">{p.nameEn}</div>
                <div className="pj-matrix-pkg-count">{p.moduleCount} وحدة</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {lifecyclePhases.map((phase) => (
            <>
              <tr key={`phase-${phase.id}`} className="pj-matrix-phase-row">
                <td colSpan={packages.length + 1} style={{ background: `${phase.color}15`, color: phase.color, fontWeight: 700, padding: '12px 14px' }}>
                  <i className={`fa-thin fa-${phase.icon}`} aria-hidden="true" /> {phase.label}
                </td>
              </tr>
              {modulesByPhase(phase.id).map((m) => (
                <tr key={m.id}>
                  <td className="pj-matrix-mod-cell">
                    <div className="pj-matrix-mod-name">
                      <i className={`fa-thin fa-${m.icon}`} aria-hidden="true" /> {m.name}
                    </div>
                    <div className="pj-matrix-mod-desc">{m.desc}</div>
                  </td>
                  {packages.map((p) => {
                    const included = m.packages.includes(p.id);
                    const note = m.notes?.[p.id];
                    return (
                      <td key={p.id} className={`pj-matrix-cell ${included ? 'is-on' : 'is-off'}`} style={{ '--pkg-c': p.color }}>
                        <i className={`fa-thin fa-${included ? 'circle-check' : 'circle-xmark'}`} aria-hidden="true" />
                        {note && included && <span className="pj-matrix-note">{note}</span>}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ============ Phase View ============
function PhaseView() {
  const [packageFilter, setPackageFilter] = useState(null);

  return (
    <div className="pj-phase-view">
      <div className="pj-pkg-filter-bar">
        <span className="pj-pkg-filter-lbl">فلترة حسب الباقة:</span>
        <button
          className={`pj-pkg-filter-btn ${packageFilter === null ? 'active' : ''}`}
          onClick={() => setPackageFilter(null)}
        >كل الباقات</button>
        {packages.map((p) => (
          <button
            key={p.id}
            className={`pj-pkg-filter-btn ${packageFilter === p.id ? 'active' : ''}`}
            onClick={() => setPackageFilter(p.id)}
            style={{ '--pkg-c': p.color }}
          >
            <i className={`fa-thin fa-${p.icon}`} aria-hidden="true" /> {p.name}
          </button>
        ))}
      </div>

      <div className="pj-phases-grid">
        {lifecyclePhases.map((phase) => (
          <PhaseColumn key={phase.id} phase={phase} packageFilter={packageFilter} />
        ))}
      </div>
    </div>
  );
}

// ============ Main Section ============
export default function PlatformJourneySection() {
  const [view, setView] = useState('phase');
  const stats = useMemo(() => getStats(), []);
  const rootRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      const stats = gsap.utils.toArray('.pj-stat');
      if (reduceMotion) {
        gsap.set(stats, { opacity: 1, y: 0 });
        return;
      }
      gsap.from(stats, {
        opacity: 0,
        y: 26,
        duration: 0.5,
        ease: 'back.out(1.5)',
        stagger: 0.07,
        scrollTrigger: { trigger: '.pj-stats', start: 'top 88%', invalidateOnRefresh: true },
      });
    }, rootRef);
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', onResize);
    return () => {
      ctx.revert();
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <section className="pj-root" id="pj-root" ref={rootRef}>
      <div className="pj-bg" />

      <div className="pj-inner">
        <header className="pj-hero">
          <div className="pj-badge">
            <i className="fa-thin fa-route" aria-hidden="true" />
            <span>المرجع الرسمي لوصف منتج نَظِّم</span>
          </div>
          <h1 className="pj-hero-title">وصف المنتج</h1>
          <p className="pj-hero-sub">الوحدات الثماني والعشرون عبر مراحل الفعالية الثلاث والباقات الأربع</p>

          <div className="pj-stats">
            <div className="pj-stat">
              <div className="pj-stat-num">{stats.totalModules}</div>
              <div className="pj-stat-lbl">وحدة وظيفية</div>
            </div>
            {stats.perPhase.map((p) => (
              <div key={p.id} className="pj-stat" style={{ '--stat-c': p.color }}>
                <div className="pj-stat-num">{p.count}</div>
                <div className="pj-stat-lbl">{p.label}</div>
              </div>
            ))}
            <div className="pj-stat">
              <div className="pj-stat-num">{stats.totalPackages}</div>
              <div className="pj-stat-lbl">باقات</div>
            </div>
            <div className="pj-stat">
              <div className="pj-stat-num">{stats.totalCrossCutting}</div>
              <div className="pj-stat-lbl">قدرات شاملة (في كل الباقات)</div>
            </div>
          </div>
        </header>

        <div className="pj-view-switcher">
          {VIEW_MODES.map((m) => (
            <button
              key={m.id}
              className={`pj-view-btn ${view === m.id ? 'active' : ''}`}
              onClick={() => setView(m.id)}
            >
              <i className={`fa-thin fa-${m.icon}`} aria-hidden="true" />
              <span>{m.label}</span>
            </button>
          ))}
        </div>

        <div className="pj-content">
          {view === 'phase' && <PhaseView />}
          {view === 'package' && <PackageView />}
          {view === 'matrix' && <MatrixView />}
        </div>

        {/* Cross-cutting capabilities */}
        <section className="pj-cross-section">
          <header className="pj-cross-head">
            <i className="fa-thin fa-circle-nodes" aria-hidden="true" />
            <h3>قدرات شاملة في كل الباقات</h3>
            <p>تأتي افتراضياً مع كل الباقات — لا تحتاج تفعيلاً منفصلاً</p>
          </header>
          <div className="pj-cross-grid">
            {crossCuttingCapabilities.map((c) => (
              <div key={c.id} className="pj-cross-card">
                <div className="pj-cross-ic"><i className={`fa-thin fa-${c.icon}`} /></div>
                <div>
                  <div className="pj-cross-name">{c.name}</div>
                  <div className="pj-cross-desc">{c.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
