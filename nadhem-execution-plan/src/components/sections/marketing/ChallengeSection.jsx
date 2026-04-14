import SectionHeader from '../../common/SectionHeader';
import { challengePoints, marketSize } from '../../../data/marketing';

export default function ChallengeSection() {
  return (
    <section id="mkt-challenge" className="section">
      <SectionHeader icon="triangle-exclamation" title="التحدي وحجم السوق" />

      {/* Challenge cards */}
      <div
        className="grid g3"
        style={{ marginBottom: 32 }}
      >
        {challengePoints.map((c, i) => (
          <div key={i} className="card" data-aos="fade-up" data-aos-delay={Math.min(i * 80, 600)}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
              <div className="ic">
                <i className={`fa-thin fa-${c.icon}`} style={{ color: '#A61C61' }} aria-hidden="true" />
              </div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-dark)', margin: 0 }}>{c.title}</h4>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', margin: 0, lineHeight: 1.7 }}>{c.desc}</p>
          </div>
        ))}
      </div>

      {/* Market size card */}
      <div
        className="card"
        data-aos="fade-up"
        style={{ marginBottom: 24 }}
      >
        <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: 16, color: 'var(--text-dark)' }}>
          <i className="fa-thin fa-chart-simple" style={{ marginLeft: 8, color: '#452059' }} /> حجم السوق المستهدف
        </h3>

        <div className="grid g4" style={{ marginBottom: 20 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#2A848A' }}>{marketSize.nonprofits.toLocaleString()}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>منظمة غير ربحية</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#452059' }}>{marketSize.government}+</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>جهة حكومية تنظم فعاليات</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#BA5A31' }}>{marketSize.privateEventCompanies}+</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>شركة تنظيم فعاليات</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.8rem', fontWeight: 700, color: '#10B981' }}>{marketSize.totalAddressable}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>إجمالي السوق المستهدف</div>
          </div>
        </div>

        {/* Visual indicator: 7 out of 7,000+ */}
        <div style={{
          background: 'rgba(69,32,89,0.05)',
          borderRadius: 10,
          padding: '14px 18px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          marginBottom: 12,
        }}>
          <div>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>العملاء النشطون من إجمالي السوق</span>
            <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#452059', marginTop: 4 }}>
              7 <span style={{ fontSize: '0.85rem', fontWeight: 400, color: 'var(--text-muted)' }}>من {marketSize.totalAddressable}</span>
            </div>
          </div>
          <div style={{ flex: 1, maxWidth: 260 }}>
            <div className="prog" style={{ height: 14 }}>
              <div className="prog-fill" style={{ width: '2%', background: '#10B981' }} />
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 4, textAlign: 'left' }}>{marketSize.penetration}%</div>
          </div>
        </div>
      </div>
    </section>
  );
}
