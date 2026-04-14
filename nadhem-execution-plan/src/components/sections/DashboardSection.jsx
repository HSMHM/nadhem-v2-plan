import StatCard from '../common/StatCard';
import { ResponsivePie } from '@nivo/pie';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { chartData } from '../../data/timeline';

const stats = [
  { icon: 'rocket-launch', value: 15, label: 'إجمالي التطويرات', color: '#2A848A' },
  { icon: 'list-check', value: 292, label: 'إجمالي المهام التفصيلية', color: '#BA5A31' },
  { icon: 'cubes', value: 16, label: 'إجمالي الوحدات', color: '#A61C61' },
  { icon: 'box-taped', value: 4, label: 'الباقات المقترحة', color: '#452059' },
  { icon: 'plug', value: 8, label: 'التكاملات المخططة', color: '#2A848A' },
  { icon: 'hourglass-half', value: '8', label: 'المدة التقديرية (شهر)', color: '#BA5A31', suffix: '' },
  { icon: 'magnifying-glass-chart', value: 68, label: 'مهام التحليل', color: '#2A848A' },
  { icon: 'pen-ruler', value: 72, label: 'مهام التصميم', color: '#A61C61' },
  { icon: 'code', value: 107, label: 'مهام التنفيذ', color: '#BA5A31' },
  { icon: 'chalkboard-user', value: 45, label: 'مهام التدريب والتسليم', color: '#452059' },
];

const committeeColors = ['#2A848A', '#BA5A31', '#452059', '#A61C61', '#10B981', '#F59E0B', '#EF4444', '#6366F1'];

export default function DashboardSection() {
  return (
    <>
    <section id="dashboard" className="hero">
      <div className="glow" style={{ top: -100, right: -100 }} />
      <div className="glow" style={{ bottom: -100, left: -100 }} />

      <div className="hero-inner">
        <div data-aos="fade-up" style={{ textAlign: 'center', marginBottom: 40 }}>
          <img src="/logos/white-logo.png" alt="نظم" style={{ width: 150, height: 'auto' }} />
          <h1 style={{ color: '#fff', fontSize: '1.7rem', fontWeight: 700, marginTop: 14, marginBottom: 6 }}>
            خطة تنفيذ تطوير منتج نظم — 2026
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.95rem' }}>من الخارطة إلى التنفيذ — 292 مهمة خلال 8 أشهر (مايو – ديسمبر)</p>
        </div>

        <div className="grid g3" style={{ marginBottom: 32 }}>
          {stats.map((s, i) => (
            <div key={i} data-aos="fade-up" data-aos-delay={Math.min(i * 80, 600)}>
              <StatCard {...s} glass />
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid g3" style={{ marginBottom: 0 }}>
          {/* Donut: tasks by phase */}
          <div className="glass" data-aos="fade-up">
            <h3 style={{ color: '#fff', fontSize: '1rem', fontWeight: 600, marginBottom: 12 }}>
              <i className="fa-thin fa-chart-pie" style={{ marginLeft: 8 }} /> توزيع المهام حسب المرحلة
            </h3>
            <div style={{ height: 240, direction: 'ltr' }}>
              <ResponsivePie
                data={chartData.tasksByPhase.map(d => ({ id: d.name, label: d.name, value: d.value, color: d.color }))}
                margin={{ top: 15, right: 15, bottom: 15, left: 15 }}
                innerRadius={0.55} padAngle={2} cornerRadius={4}
                colors={d => d.data.color} borderWidth={0}
                enableArcLinkLabels={true}
                arcLinkLabelsColor="rgba(255,255,255,0.4)"
                arcLinkLabelsTextColor="rgba(255,255,255,0.7)"
                arcLinkLabelsThickness={1}
                arcLabelsTextColor="#fff"
                arcLabel={d => `${d.value}`}
                tooltip={({ datum }) => (
                  <div style={{ background: 'rgba(15,7,32,0.95)', padding: '6px 12px', borderRadius: 8, color: '#fff', fontFamily: 'IBM Plex Sans Arabic', direction: 'rtl', fontSize: '0.8rem' }}>
                    {datum.label}: {datum.value} مهمة
                  </div>
                )}
              />
            </div>
          </div>

          {/* Bar: developments by quarter */}
          <div className="glass" data-aos="fade-up" data-aos-delay={80}>
            <h3 style={{ color: '#fff', fontSize: '1rem', fontWeight: 600, marginBottom: 12 }}>
              <i className="fa-thin fa-calendar-days" style={{ marginLeft: 8 }} /> التطويرات حسب الربع
            </h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={chartData.tasksByQuarter} margin={{ top: 10, right: 10, left: -10, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: 'rgba(15,7,32,0.95)', border: 'none', borderRadius: 8, color: '#fff', fontFamily: 'IBM Plex Sans Arabic', direction: 'rtl' }} formatter={(v) => [`${v} تطويرات`]} />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={36}>
                  {chartData.tasksByQuarter.map((_, i) => <Cell key={i} fill={['#2A848A', '#BA5A31', '#A61C61', '#452059'][i]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Horizontal bar: tasks by committee */}
          <div className="glass" data-aos="fade-up" data-aos-delay={160}>
            <h3 style={{ color: '#fff', fontSize: '1rem', fontWeight: 600, marginBottom: 12 }}>
              <i className="fa-thin fa-people-group" style={{ marginLeft: 8 }} /> المهام حسب اللجنة
            </h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={chartData.tasksByCommittee} layout="vertical" margin={{ top: 5, right: 30, left: 5, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" horizontal={false} />
                <XAxis type="number" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" width={120} tick={{ fill: 'rgba(255,255,255,0.8)', fontSize: 13, fontFamily: 'IBM Plex Sans Arabic' }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: 'rgba(15,7,32,0.95)', border: 'none', borderRadius: 8, color: '#fff', fontFamily: 'IBM Plex Sans Arabic', direction: 'rtl' }} formatter={(v) => [`${v} مهمة`]} />
                <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={18}>
                  {chartData.tasksByCommittee.map((_, i) => <Cell key={i} fill={committeeColors[i % committeeColors.length]} />)}
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
