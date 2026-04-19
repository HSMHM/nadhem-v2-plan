const plans = [
  { id: 'dev', label: 'خطة التطوير', shortLabel: 'التطوير', icon: 'code', color: '#2A848A' },
  { id: 'ops', label: 'خطة التشغيل', shortLabel: 'التشغيل', icon: 'gears', color: '#BA5A31' },
  { id: 'marketing', label: 'خطة التسويق', shortLabel: 'التسويق', icon: 'bullhorn', color: '#A61C61' },
  { id: 'journey', label: 'رحلة المنتج', shortLabel: 'الرحلة', icon: 'compass', color: '#452059' },
];

export default function PlanTabs({ active, onChange }) {
  return (
    <div className="plan-tabs-bar">
      {plans.map((p) => (
        <button
          key={p.id}
          className={`plan-tab ${active === p.id ? 'active' : ''}`}
          data-plan={p.id}
          onClick={() => onChange(p.id)}
        >
          <i className={`fa-thin fa-${p.icon}`} aria-hidden="true" />
          <span className="tab-label-full">{p.label}</span>
          <span className="tab-label-short">{p.shortLabel}</span>
        </button>
      ))}
    </div>
  );
}
