import StatCard from '../../common/StatCard';
import { ResponsivePie } from '@nivo/pie';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { opsStats, opsTasksSummary } from '../../../data/operations';

const categoryColors = ['#2A848A', '#BA5A31', '#452059', '#A61C61', '#10B981', '#F59E0B', '#6366F1'];

const tooltipStyle = {
  background: 'rgba(15,7,32,0.95)',
  border: 'none',
  borderRadius: 8,
  color: '#fff',
  fontFamily: 'Alexandria',
  direction: 'rtl',
};

export default function OpsDashboardSection() {
  const frequencyData = opsTasksSummary.byFrequency.map(d => ({
    id: d.frequency,
    label: d.frequency,
    value: d.count,
    color: d.color,
  }));

  const clientStatusData = [
    { id: 'بحالة صحية', label: 'بحالة صحية', value: 5, color: '#10B981' },
    { id: 'يحتاجون متابعة', label: 'يحتاجون متابعة', value: 2, color: '#F59E0B' },
  ];

  const categoryData = opsTasksSummary.byCategory.map(d => ({
    name: d.category,
    value: d.count,
  }));

  return (
    <>
    <section id="ops-dashboard" className="hero">
      <div className="glow" style={{ top: -100, right: -100 }} />
      <div className="glow" style={{ bottom: -100, left: -100 }} />

      <div className="hero-inner">
        <div
          data-aos="fade-up"
          style={{ textAlign: 'center', marginBottom: 40 }}
        >
          <img src="/logos/white-logo.png" alt="نظم" style={{ width: 150, height: 'auto' }} />
          <h1 style={{ color: '#fff', fontSize: '1.7rem', fontWeight: 700, marginTop: 14, marginBottom: 6 }}>
            خطة التشغيل — منتج نظم 2026
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.95rem' }}>
            78 اشتراك — 7 نشط — خطة تشغيلية لتحسين التجديد والاحتفاظ
          </p>
        </div>

        <div data-aos="fade-up" style={{
          background: 'rgba(239,68,68,0.12)',
          border: '1px solid rgba(239,68,68,0.35)',
          borderRadius: 12,
          padding: '14px 20px',
          marginBottom: 20,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}>
          <i className="fa-thin fa-bolt" style={{ color: '#EF4444', fontSize: 20 }} aria-hidden="true" />
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem', margin: 0, lineHeight: 1.7 }}>
            <strong style={{ color: '#fff' }}>حزمة تحسينات عاجلة سارية الآن </strong>
            (19 أبريل – 14 مايو): 4 تطويرات متوازية + 7 مهام تشغيلية يومية/عند الطلب. تفاصيلها في قسم «الحزمة العاجلة».
          </p>
        </div>

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
            هذه المهام التشغيلية خاصة بدور مدير المنتج. يوجد مهام إضافية لمدير المنتج في
            <strong style={{ color: 'rgba(255,255,255,0.85)' }}> خطة التطوير </strong>
            (مرحلة التحليل + تدريب فريق نجاح العملاء) وفي
            <strong style={{ color: 'rgba(255,255,255,0.85)' }}> خطة التسويق </strong>
            (استعادة العملاء السابقين + استراتيجية النمو).
          </p>
        </div>

        <div
          className="grid g3"
          style={{ marginBottom: 32 }}
        >
          {opsStats.map((s, i) => (
            <div key={i} data-aos="fade-up">
              <StatCard {...s} glass />
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid g3" style={{ marginBottom: 0 }}>
          {/* Donut: tasks by frequency */}
          <div className="glass" data-aos="fade-up">
            <h3 style={{ color: '#fff', fontSize: '1rem', fontWeight: 600, marginBottom: 12 }}>
              <i className="fa-thin fa-chart-pie" style={{ marginLeft: 8 }} /> المهام حسب التكرار
            </h3>
            <div style={{ height: 240, direction: 'ltr' }}>
              <ResponsivePie
                data={frequencyData}
                margin={{ top: 15, right: 15, bottom: 15, left: 15 }}
                innerRadius={0.55}
                padAngle={2}
                cornerRadius={4}
                colors={d => d.data.color}
                borderWidth={0}
                enableArcLinkLabels={true}
                arcLinkLabelsColor="rgba(255,255,255,0.4)"
                arcLinkLabelsTextColor="rgba(255,255,255,0.7)"
                arcLinkLabelsThickness={1}
                arcLabelsTextColor="#fff"
                arcLabel={d => `${d.value}`}
                tooltip={({ datum }) => (
                  <div style={{ ...tooltipStyle, padding: '6px 12px', fontSize: '0.8rem' }}>
                    {datum.label}: {datum.value} مهمة
                  </div>
                )}
              />
            </div>
          </div>

          {/* Donut: client status */}
          <div className="glass" data-aos="fade-up">
            <h3 style={{ color: '#fff', fontSize: '1rem', fontWeight: 600, marginBottom: 12 }}>
              <i className="fa-thin fa-heart-pulse" style={{ marginLeft: 8 }} /> حالة العملاء النشطين
            </h3>
            <div style={{ height: 240, direction: 'ltr' }}>
              <ResponsivePie
                data={clientStatusData}
                margin={{ top: 15, right: 15, bottom: 15, left: 15 }}
                innerRadius={0.55}
                padAngle={2}
                cornerRadius={4}
                colors={d => d.data.color}
                borderWidth={0}
                enableArcLinkLabels={true}
                arcLinkLabelsColor="rgba(255,255,255,0.4)"
                arcLinkLabelsTextColor="rgba(255,255,255,0.7)"
                arcLinkLabelsThickness={1}
                arcLabelsTextColor="#fff"
                arcLabel={d => `${d.value}`}
                tooltip={({ datum }) => (
                  <div style={{ ...tooltipStyle, padding: '6px 12px', fontSize: '0.8rem' }}>
                    {datum.label}: {datum.value} عميل
                  </div>
                )}
              />
            </div>
          </div>

          {/* Horizontal Bar: tasks by category */}
          <div className="glass" data-aos="fade-up">
            <h3 style={{ color: '#fff', fontSize: '1rem', fontWeight: 600, marginBottom: 12 }}>
              <i className="fa-thin fa-layer-group" style={{ marginLeft: 8 }} /> المهام حسب الفئة
            </h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={categoryData} layout="vertical" margin={{ top: 5, right: 30, left: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" horizontal={false} />
                <XAxis type="number" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" width={120} tick={{ fill: 'rgba(255,255,255,0.8)', fontSize: 13, fontFamily: 'Alexandria' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={tooltipStyle}
                  formatter={(v) => [`${v} مهمة`]}
                />
                <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={18}>
                  {categoryData.map((_, i) => (
                    <Cell key={i} fill={categoryColors[i % categoryColors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
    <div className="hero-divider" />
    </>
  );
}
