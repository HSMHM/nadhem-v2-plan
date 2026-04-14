import { motion } from 'framer-motion';
import SectionHeader from '../shared/SectionHeader';
import Icon from '../shared/Icon';
import { packagesData } from '../../data/packagesData';
import { modulesData } from '../../data/modulesData';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function S10_Packages() {
  return (
    <section id="packages" className="section">
      <SectionHeader
        icon="credit-card"
        title="هيكلة الباقات"
        subtitle="4 باقات سنوية متصاعدة تناسب مختلف أحجام الفعاليات"
      />

      <motion.div
        className="grid grid-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        style={{ marginBottom: 32 }}
      >
        {packagesData.map((pkg, i) => (
          <motion.div
            key={i}
            className="card"
            variants={fadeInUp}
            style={{
              textAlign: 'center',
              position: 'relative',
              ...(pkg.isCustom ? {
                border: '2px solid var(--color-secondary)',
                background: 'linear-gradient(135deg, rgba(69,32,89,0.03), rgba(42,132,138,0.03))',
              } : {}),
            }}
          >
            {pkg.isCustom && (
              <div style={{
                position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)',
                background: 'var(--color-secondary)', color: '#fff',
                padding: '4px 16px', borderRadius: 9999, fontSize: '0.75rem', fontWeight: 600,
              }}>
                مخصصة
              </div>
            )}
            <div className="icon-circle" style={{
              margin: '16px auto 16px',
              background: pkg.isCustom ? 'var(--color-secondary-light)' : undefined,
            }}>
              <Icon name={pkg.icon} style={{ color: pkg.isCustom ? 'var(--color-secondary)' : undefined }} />
            </div>
            <h4 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-text-heading)', marginBottom: 8 }}>
              {pkg.name}
            </h4>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: 16 }}>
              {pkg.description}
            </p>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: 600 }}>
              {pkg.pricing}
            </div>
            <div style={{ marginTop: 16, fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
              {pkg.modules.length} وحدة
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Module × Package Matrix */}
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ overflow: 'auto' }}
      >
        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-text-heading)', marginBottom: 16 }}>
          <Icon name="table-cells" style={{ marginLeft: 8, color: 'var(--color-primary)' }} />
          مصفوفة الوحدات والباقات
        </h3>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ textAlign: 'right' }}>الوحدة</th>
              {packagesData.map((pkg, i) => (
                <th key={i} style={{ textAlign: 'center' }}>{pkg.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {modulesData.map((mod, modIdx) => (
              <tr key={modIdx}>
                <td style={{ textAlign: 'right', fontWeight: 500, fontSize: '0.8rem' }}>{mod.name}</td>
                {packagesData.map((pkg, pkgIdx) => (
                  <td key={pkgIdx}>
                    {pkg.modules.includes(modIdx) ? (
                      <i className="fa-solid fa-circle-check" style={{ color: pkg.isCustom ? 'var(--color-secondary)' : 'var(--color-success)', fontSize: 14 }} />
                    ) : (
                      <i className="fa-thin fa-minus" style={{ color: 'var(--color-text-muted)', fontSize: 14 }} />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </section>
  );
}
