import { useState } from 'react';
import AsanaOverviewSection from './AsanaOverviewSection';
import AsanaTasksSection from './AsanaTasksSection';
import AsanaMarketingTasksSection from './AsanaMarketingTasksSection';

const TABS = [
  { id: 'dev', label: 'مهام التطوير', icon: 'rocket-launch', color: '#2A848A' },
  { id: 'marketing', label: 'مهام التسويق', icon: 'bullhorn', color: '#A61C61' },
  { id: 'ops', label: 'مهام التشغيل', icon: 'gears', color: '#BA5A31' },
];

function OpsPlaceholder() {
  return (
    <section className="asana-root">
      <div className="asana-bg" />
      <div className="asana-inner">
        <div className="asana-empty" style={{ padding: '80px 20px', textAlign: 'center' }}>
          <i className="fa-thin fa-hourglass-clock" style={{ fontSize: 64, color: '#BA5A31', marginBottom: 20, display: 'block' }} aria-hidden="true" />
          <h3 style={{ color: '#fff', fontSize: '1.4rem', fontWeight: 700, marginBottom: 12 }}>
            مهام التشغيل — قيد المراجعة
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.95rem', lineHeight: 1.9, maxWidth: 620, margin: '0 auto' }}>
            هذا التبويب جاهز لاستقبال مهام خطة التشغيل (CustomerSuccess، CustomerFeedback، CompetitorIntel، أفضل الممارسات، الحضور الميداني، التقارير الدورية، الجدول التشغيلي).
            <br /><br />
            سيتم تفعيله بعد مراجعة المهام التشغيلية واعتمادها.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function AsanaTaskTabs() {
  const [active, setActive] = useState('dev');

  return (
    <div className="asana-tabs-wrapper">
      <div className="asana-tabs-cards-bar">
        {TABS.map((t) => (
          <button
            key={t.id}
            className={`asana-tab-card ${active === t.id ? 'active' : ''}`}
            onClick={() => setActive(t.id)}
            style={{ '--tab-c': t.color }}
          >
            <div className="asana-tab-card-ic">
              <i className={`fa-thin fa-${t.icon}`} aria-hidden="true" />
            </div>
            <div className="asana-tab-card-body">
              <span className="asana-tab-card-label">{t.label}</span>
            </div>
          </button>
        ))}
      </div>

      <div className="asana-tab-content">
        {active === 'dev' && (
          <>
            <AsanaOverviewSection />
            <AsanaTasksSection />
          </>
        )}
        {active === 'marketing' && <AsanaMarketingTasksSection />}
        {active === 'ops' && <OpsPlaceholder />}
      </div>
    </div>
  );
}
