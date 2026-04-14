import StatCard from '../../common/StatCard';
import { mktStats, mktTargets } from '../../../data/marketing';

export default function MktDashboardSection() {
  return (
    <section id="mkt-dashboard" className="hero">
      <div className="glow" style={{ top: -100, right: -100 }} />
      <div className="glow" style={{ bottom: -100, left: -100 }} />

      <div className="hero-inner">
        <div
          data-aos="fade-up"
          style={{ textAlign: 'center', marginBottom: 40 }}
        >
          <img src="/logos/white-logo.png" alt="نظم" style={{ width: 150, height: 'auto' }} />
          <h1 style={{ color: '#fff', fontSize: '1.7rem', fontWeight: 700, marginTop: 14, marginBottom: 6 }}>
            خطة التسويق — منتج نظم 2026
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.95rem' }}>
            سوق واسع بكل القطاعات — 7 عملاء نشطون — هدف 25-32 عميل بنهاية 2026
          </p>
        </div>

        {/* PM role note */}
        <div style={{
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 12,
          padding: '14px 20px',
          marginBottom: 28,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}>
          <i className="fa-thin fa-circle-info" style={{ color: 'var(--primary)', fontSize: 18 }} aria-hidden="true" />
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.82rem', margin: 0, lineHeight: 1.7 }}>
            يوجد مهام لمدير المنتج في خطتي
            <strong style={{ color: 'rgba(255,255,255,0.85)' }}> التطوير </strong>
            و
            <strong style={{ color: 'rgba(255,255,255,0.85)' }}> التشغيل </strong>
            أيضاً.
          </p>
        </div>

        {/* Stat cards */}
        <div
          className="grid g3"
          style={{ marginBottom: 32 }}
        >
          {mktStats.map((s, i) => (
            <div key={i} data-aos="fade-up">
              <StatCard {...s} glass />
            </div>
          ))}
        </div>

        {/* Targets cards */}
        <div data-aos="fade-up">
          <h3 style={{ color: '#fff', fontSize: '1rem', fontWeight: 600, marginBottom: 16 }}>
            <i className="fa-thin fa-bullseye-arrow" style={{ marginLeft: 8 }} /> الأهداف المستهدفة نهاية 2026
          </h3>
          <div className="grid g3" style={{ marginBottom: 0 }}>
            {mktTargets.map((t, i) => (
              <div
                key={i}
                className="glass"
                data-aos="fade-up"
               
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                  <div className="ic" style={{ background: 'rgba(42,132,138,0.15)', flexShrink: 0 }}>
                    <i className={`fa-thin fa-${t.icon}`} style={{ color: '#2A848A' }} aria-hidden="true" />
                  </div>
                  <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.88rem', fontWeight: 600 }}>{t.metric}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                  <div>
                    <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.72rem', marginBottom: 2 }}>الهدف</div>
                    <div style={{ color: '#10B981', fontSize: '1.1rem', fontWeight: 700 }}>{t.target}</div>
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.72rem', marginBottom: 2 }}>الحالي</div>
                    <div style={{ color: '#EF4444', fontSize: '1.1rem', fontWeight: 700 }}>{t.current}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
