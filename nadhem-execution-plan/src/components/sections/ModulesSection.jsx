import SectionHeader from '../common/SectionHeader';
import { modules } from '../../data/modules';

export default function ModulesSection() {
  return (
    <section id="modules" className="section">
      <SectionHeader icon="cubes" title="الوحدات (16 Module)" subtitle="كل وحدة تمثل مجموعة خصائص مترابطة يمكن تفعيلها أو إيقافها حسب الباقة" />

      <div className="grid g4">
        {modules.map((m, i) => (
          <div key={m.id} className="card" data-aos="fade-up" style={{ textAlign: 'center', padding: 20 }}>
            <div className="ic" style={{ margin: '0 auto 10px' }}>
              <i className={`fa-thin fa-${m.icon}`} aria-hidden="true" />
            </div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-dark)', margin: '0 0 6px', lineHeight: 1.6 }}>
              {m.name}
            </h4>
            <p style={{ fontSize: '0.75rem', color: 'var(--text)', lineHeight: 1.7, margin: '0 0 8px' }}>
              {m.description}
            </p>
            <span className="badge badge-p" style={{ fontSize: '0.65rem' }}>{m.committee}</span>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: 20, background: 'var(--primary-light)', borderColor: 'var(--primary)' }}>
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <i className="fa-thin fa-circle-info fa-lg" style={{ color: 'var(--primary)', marginTop: 4 }} />
          <p style={{ fontSize: '0.82rem', lineHeight: 1.8, color: 'var(--text)' }}>
            الوحدات لا يختارها العميل بنفسه — بل تأتي ضمن باقات جاهزة. كل باقة تحتوي على مجموعة وحدات محددة.
          </p>
        </div>
      </div>
    </section>
  );
}
