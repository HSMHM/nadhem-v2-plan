import SectionHeader from '../common/SectionHeader';
import { ResponsivePie } from '@nivo/pie';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, AreaChart, Area } from 'recharts';
import { chartData } from '../../data/timeline';

const phaseColors = ['#2A848A', '#A61C61', '#BA5A31'];
const devColors = ['#2A848A', '#BA5A31', '#A61C61', '#452059', '#10B981', '#F59E0B', '#EF4444', '#6366F1', '#EC4899', '#14B8A6', '#8B5CF6', '#F97316', '#06B6D4', '#84CC16', '#E11D48'];

export default function ChartsSection() {
  return (
    <section id="charts" className="section">
      <SectionHeader icon="chart-pie" title="الرسوم البيانية" subtitle="تمثيلات بصرية شاملة لبيانات الخطة" />

      <div className="grid g2" style={{ marginBottom: 20 }}>
        {/* Chart 1: Tasks by phase (Donut) */}
        <div className="card" data-aos="fade-up">
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-dark)', marginBottom: 14 }}>
            <i className="fa-thin fa-chart-pie" style={{ marginLeft: 8, color: 'var(--primary)' }} /> توزيع المهام حسب المرحلة
          </h3>
          <div style={{ height: 300, direction: 'ltr' }}>
            <ResponsivePie
              data={chartData.tasksByPhase.map(d => ({ id: d.name, label: d.name, value: d.value, color: d.color }))}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              innerRadius={0.55} padAngle={2} cornerRadius={4}
              colors={d => d.data.color} borderWidth={0}
              enableArcLinkLabels={true}
              arcLinkLabelsColor="#6B7280"
              arcLinkLabelsTextColor="#1E1E2F"
              arcLinkLabelsThickness={1}
              arcLabelsTextColor="#fff"
              arcLabel={d => `${d.value}`}
              tooltip={({ datum }) => (
                <div style={{ background: '#fff', padding: '6px 12px', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.15)', fontFamily: 'IBM Plex Sans Arabic', direction: 'rtl', fontSize: '0.8rem' }}>
                  {datum.label}: {datum.value} مهمة ({Math.round((datum.value / 247) * 100)}%)
                </div>
              )}
            />
          </div>
        </div>

        {/* Chart 2: Tasks per development (Horizontal Bar) */}
        <div className="card" data-aos="fade-up">
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-dark)', marginBottom: 14 }}>
            <i className="fa-thin fa-chart-bar" style={{ marginLeft: 8, color: 'var(--primary)' }} /> عدد المهام لكل تطوير
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData.tasksByDev} layout="vertical" margin={{ top: 5, right: 30, left: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-light)" horizontal={false} />
              <XAxis type="number" tick={{ fill: 'var(--text)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" width={120} tick={{ fill: 'var(--text-dark)', fontSize: 13, fontFamily: 'IBM Plex Sans Arabic' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#fff', border: 'none', borderRadius: 8, fontFamily: 'IBM Plex Sans Arabic', direction: 'rtl' }} formatter={(v) => [`${v} مهمة`]} />
              <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={16}>
                {chartData.tasksByDev.map((_, i) => <Cell key={i} fill={devColors[i % devColors.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid g2" style={{ marginBottom: 20 }}>
        {/* Chart 3: Before/After comparison (Grouped Bar) */}
        <div className="card" data-aos="fade-up">
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-dark)', marginBottom: 14 }}>
            <i className="fa-thin fa-arrow-right-arrow-left" style={{ marginLeft: 8, color: 'var(--primary)' }} /> مقارنة قبل/بعد — نسبة اعتماد اللجان
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData.beforeAfter} layout="vertical" margin={{ top: 5, right: 30, left: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-light)" horizontal={false} />
              <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} tick={{ fill: 'var(--text)', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" width={120} tick={{ fill: 'var(--text-dark)', fontSize: 13, fontFamily: 'IBM Plex Sans Arabic' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#fff', border: 'none', borderRadius: 8, fontFamily: 'IBM Plex Sans Arabic', direction: 'rtl' }} formatter={(v) => [`${v}%`]} />
              <Bar dataKey="before" fill="#EF4444" radius={[0, 4, 4, 0]} barSize={10} name="قبل" />
              <Bar dataKey="after" fill="#10B981" radius={[0, 4, 4, 0]} barSize={10} name="بعد (متوقع)" />
            </BarChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', gap: 20, justifyContent: 'center', marginTop: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.78rem' }}>
              <div style={{ width: 12, height: 12, borderRadius: 3, background: '#EF4444' }} /> قبل
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.78rem' }}>
              <div style={{ width: 12, height: 12, borderRadius: 3, background: '#10B981' }} /> بعد (متوقع)
            </div>
          </div>
        </div>

        {/* Chart 5: Progress by quarter (Area) */}
        <div className="card" data-aos="fade-up">
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-dark)', marginBottom: 14 }}>
            <i className="fa-thin fa-chart-area" style={{ marginLeft: 8, color: 'var(--primary)' }} /> نسبة تقدم الإنجاز المتوقعة
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData.progressByQuarter} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
              <defs>
                <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2A848A" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#2A848A" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-light)" />
              <XAxis dataKey="name" tick={{ fill: 'var(--text)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} tick={{ fill: 'var(--text)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: '#fff', border: 'none', borderRadius: 8, fontFamily: 'IBM Plex Sans Arabic', direction: 'rtl' }} formatter={(v) => [`${v}%`, 'نسبة الإنجاز']} />
              <Area type="monotone" dataKey="value" stroke="#2A848A" strokeWidth={3} fill="url(#colorProgress)" dot={{ fill: '#2A848A', r: 5 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
