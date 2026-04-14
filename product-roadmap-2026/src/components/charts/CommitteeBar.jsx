import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { committeesData } from '../../data/committeesData';
import { chartColors } from './chartTheme';

export default function CommitteeBar({ dark = false }) {
  const data = committeesData.map((c) => ({
    name: c.name,
    value: c.percentage,
  }));

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 10, bottom: 5 }}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={dark ? chartColors.darkGridColor : chartColors.gridColor}
          horizontal={false}
        />
        <XAxis
          type="number"
          domain={[0, 100]}
          tickFormatter={(v) => `${v}%`}
          tick={{ fill: dark ? 'rgba(255,255,255,0.4)' : '#4A5568', fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          type="category"
          dataKey="name"
          width={80}
          tick={{ fill: dark ? 'rgba(255,255,255,0.7)' : '#4A5568', fontSize: 13 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          formatter={(value) => [`${value}%`, 'نسبة الاعتماد']}
          contentStyle={{
            background: dark ? 'rgba(26,11,34,0.95)' : '#fff',
            border: 'none',
            borderRadius: 8,
            color: dark ? '#fff' : '#1A1120',
            fontFamily: 'IBM Plex Sans Arabic',
            direction: 'rtl',
          }}
        />
        <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={24}>
          {data.map((entry, index) => (
            <Cell key={index} fill={chartColors.committees[entry.name] || chartColors.palette[index]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
