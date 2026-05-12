import SectionHeader from '../common/SectionHeader';
import { platformModules, lifecyclePhases } from '../../data/platformJourney';

const phaseMap = Object.fromEntries(lifecyclePhases.map((p) => [p.id, p]));

export default function ModulesSection() {
  return (
    <section id="modules" className="section">
      <SectionHeader icon="cubes" title="الوحدات (29 Module)" subtitle="كل وحدة تمثل مجموعة خصائص مترابطة يمكن تفعيلها أو إيقافها حسب الباقة — للتفاصيل الكاملة بحسب مرحلة الفعالية والباقات انظر تبويب رحلة منصة العميل" />

      <div className="grid g4">
        {platformModules.map((m) => {
          const phase = phaseMap[m.phase];
          return (
            <div key={m.id} className="card" data-aos="fade-up" style={{ textAlign: 'center', padding: 20 }}>
              <div className="ic" style={{ margin: '0 auto 10px' }}>
                <i className={`fa-thin fa-${m.icon}`} aria-hidden="true" />
              </div>
              <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-dark)', margin: '0 0 6px', lineHeight: 1.6 }}>
                {m.name}
              </h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text)', lineHeight: 1.7, margin: '0 0 8px' }}>
                {m.desc}
              </p>
              <span className="badge badge-p" style={{ fontSize: '0.65rem', background: `${phase?.color}15`, color: phase?.color }}>{phase?.label}</span>
            </div>
          );
        })}
      </div>

    </section>
  );
}
