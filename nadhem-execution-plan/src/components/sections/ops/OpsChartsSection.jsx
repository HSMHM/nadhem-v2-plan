import SectionHeader from '../../common/SectionHeader';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ResponsivePie } from '@nivo/pie';
import { opsTasksSummary } from '../../../data/operations';

const categoryColors = ['#2A848A', '#BA5A31', '#452059', '#A61C61', '#10B981', '#F59E0B', '#6366F1'];

const tooltipStyle = {
  fontFamily: 'IBM Plex Sans Arabic',
  direction: 'rtl',
  borderRadius: 8,
  border: 'none',
  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
};

export default function OpsChartsSection() {
  const clientStatusData = [
    { id: 'بحالة صحية', label: 'بحالة صحية', value: 5, color: '#10B981' },
    { id: 'يحتاجون متابعة', label: 'يحتاجون متابعة', value: 2, color: '#F59E0B' },
  ];

  const frequencyData = opsTasksSummary.byFrequency.map(d => ({
    id: d.frequency,
    label: d.frequency,
    value: d.count,
    color: d.color,
  }));

  const categoryData = opsTasksSummary.byCategory.map(d => ({
    name: d.category,
    value: d.count,
  }));

  const weeklyHours = opsTasksSummary.weeklyHours;
  const dailyHours = opsTasksSummary.dailyHours;
  const days = 5;

  return (
    <section id="ops-charts" className="section">
      <SectionHeader icon="chart-pie" title="الرسوم البيانية" />

      <div className="grid g2">
        {/* Chart 1: Client Status Pie */}
        <div className="card" data-aos="fade-up">
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-dark)', marginBottom: 14 }}>
            <i className="fa-thin fa-heart-pulse" style={{ marginLeft: 8, color: '#10B981' }} aria-hidden="true" />
            حالة العملاء النشطين
          </h3>
          <div style={{ height: 260, direction: 'ltr' }}>
            <ResponsivePie
              data={clientStatusData}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              innerRadius={0}
              padAngle={2}
              cornerRadius={4}
              colors={d => d.data.color}
              borderWidth={0}
              enableArcLinkLabels={true}
              arcLinkLabelsColor="var(--text-muted)"
              arcLinkLabelsTextColor="var(--text)"
              arcLinkLabelsThickness={1}
              arcLabelsTextColor="#fff"
              arcLabel={d => `${d.value}`}
              tooltip={({ datum }) => (
                <div style={{ ...tooltipStyle, background: '#fff', padding: '6px 12px', fontSize: '0.8rem', color: 'var(--text-dark)' }}>
                  {datum.label}: {datum.value} عميل
                </div>
              )}
            />
          </div>
        </div>

        {/* Chart 2: Tasks by Frequency Donut */}
        <div className="card" data-aos="fade-up">
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-dark)', marginBottom: 14 }}>
            <i className="fa-thin fa-chart-pie" style={{ marginLeft: 8, color: 'var(--primary)' }} aria-hidden="true" />
            المهام حسب التكرار
          </h3>
          <div style={{ height: 260, direction: 'ltr' }}>
            <ResponsivePie
              data={frequencyData}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              innerRadius={0.5}
              padAngle={2}
              cornerRadius={4}
              colors={d => d.data.color}
              borderWidth={0}
              enableArcLinkLabels={true}
              arcLinkLabelsColor="var(--text-muted)"
              arcLinkLabelsTextColor="var(--text)"
              arcLinkLabelsThickness={1}
              arcLabelsTextColor="#fff"
              arcLabel={d => `${d.value}`}
              tooltip={({ datum }) => (
                <div style={{ ...tooltipStyle, background: '#fff', padding: '6px 12px', fontSize: '0.8rem', color: 'var(--text-dark)' }}>
                  {datum.label}: {datum.value} مهمة
                </div>
              )}
            />
          </div>
        </div>

        {/* Chart 3: Tasks by Category Horizontal Bar */}
        <div className="card" data-aos="fade-up">
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-dark)', marginBottom: 14 }}>
            <i className="fa-thin fa-layer-group" style={{ marginLeft: 8, color: 'var(--secondary)' }} aria-hidden="true" />
            المهام حسب الفئة
          </h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={categoryData} layout="vertical" margin={{ top: 5, right: 30, left: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-light)" horizontal={false} />
              <XAxis type="number" tick={{ fill: 'var(--text)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" width={120} tick={{ fill: 'var(--text-dark)', fontSize: 13, fontFamily: 'IBM Plex Sans Arabic' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(v) => [`${v} مهمة`, 'العدد']}
              />
              <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={20}>
                {categoryData.map((_, i) => (
                  <Cell key={i} fill={categoryColors[i % categoryColors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Chart 4: Weekly Work Hours Card */}
        <div className="card" data-aos="fade-up" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-dark)', marginBottom: 20, alignSelf: 'stretch' }}>
            <i className="fa-thin fa-clock" style={{ marginLeft: 8, color: 'var(--accent-orange)' }} aria-hidden="true" />
            ساعات العمل التشغيلية الأسبوعية
          </h3>

          <div style={{ fontSize: '3.5rem', fontWeight: 800, color: 'var(--primary)', lineHeight: 1 }}>
            {weeklyHours}
          </div>
          <div style={{ fontSize: '1rem', color: 'var(--text-muted)', marginTop: 6, marginBottom: 24 }}>
            ساعة / أسبوع
          </div>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
            {Array.from({ length: days }).map((_, i) => (
              <div key={i} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                background: 'var(--bg-glass, rgba(42,132,138,0.08))', borderRadius: 12, padding: '12px 16px', minWidth: 60,
              }}>
                <i className="fa-thin fa-calendar-day" style={{ fontSize: '1.1rem', color: 'var(--primary)', marginBottom: 6 }} aria-hidden="true" />
                <span style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-dark)' }}>{dailyHours}</span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>ساعات</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 20, marginTop: 20, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <span><i className="fa-thin fa-equals" style={{ marginLeft: 4 }} aria-hidden="true" />{days} أيام x {dailyHours} ساعات</span>
            <span><i className="fa-thin fa-plus" style={{ marginLeft: 4 }} aria-hidden="true" />{opsTasksSummary.monthlyExtra} ساعة إضافية/شهر</span>
          </div>
        </div>
      </div>
    </section>
  );
}
