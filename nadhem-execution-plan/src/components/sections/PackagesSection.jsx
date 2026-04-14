import SectionHeader from '../common/SectionHeader';
import { packages, packageMatrix } from '../../data/packages';

export default function PackagesSection() {
  return (
    <section id="packages" className="section">
      <SectionHeader icon="box-taped" title="هيكلة الباقات" subtitle="4 باقات سنوية متصاعدة تناسب مختلف أحجام الفعاليات" />

      <div className="grid g4" style={{ marginBottom: 28 }}>
        {packages.map((pkg, i) => (
          <div key={pkg.id} className="card" data-aos="fade-up" data-aos-delay={Math.min(i * 80, 600)} style={{
            textAlign: 'center', position: 'relative',
            ...(pkg.isCustom ? { border: '2px solid var(--secondary)', background: 'linear-gradient(135deg, rgba(69,32,89,0.03), rgba(42,132,138,0.03))' } : {}),
          }}>
            {pkg.isCustom && (
              <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: 'var(--secondary)', color: '#fff', padding: '3px 14px', borderRadius: 9999, fontSize: '0.68rem', fontWeight: 600 }}>
                مخصصة
              </div>
            )}
            <div className="ic" style={{ margin: '14px auto 14px', background: pkg.isCustom ? 'var(--secondary-light)' : undefined }}>
              <i className={`fa-thin fa-${pkg.icon}`} style={{ color: pkg.isCustom ? 'var(--secondary)' : undefined }} />
            </div>
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: 6 }}>{pkg.name}</h4>
            <div style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--primary)', marginBottom: 4 }}>{pkg.price}</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: 6 }}>ريال سعودي / سنوياً</div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text)', marginBottom: 10 }}>{pkg.target}</p>
            <span className="badge badge-p">{pkg.moduleCount} وحدة</span>
          </div>
        ))}
      </div>

      <div className="card" data-aos="fade-up" style={{ overflow: 'auto' }}>
        <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--text-dark)', marginBottom: 14 }}>
          <i className="fa-thin fa-table-cells" style={{ marginLeft: 8, color: 'var(--primary)' }} /> مصفوفة الوحدات والباقات
        </h3>
        <table className="tbl">
          <thead>
            <tr>
              <th style={{ textAlign: 'right' }}>الوحدة</th>
              <th>أساسية</th>
              <th>متقدمة</th>
              <th>شاملة</th>
              <th>مخصصة</th>
            </tr>
          </thead>
          <tbody>
            {packageMatrix.map((row, i) => (
              <tr key={i}>
                <td style={{ textAlign: 'right', fontWeight: 500, fontSize: '0.78rem' }}>{row.module}</td>
                {['s', 'p', 'e', 'c'].map((k) => (
                  <td key={k}>
                    {row[k] ? (
                      <i className="fa-solid fa-circle-check" style={{ color: 'var(--success)', fontSize: 14 }} />
                    ) : (
                      <i className="fa-thin fa-minus" style={{ color: 'var(--text-muted)', fontSize: 14 }} />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
