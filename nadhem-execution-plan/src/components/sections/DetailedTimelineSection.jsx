import SectionHeader from '../common/SectionHeader';
import { detailedTimeline } from '../../data/timeline';

export default function DetailedTimelineSection() {
  const maxTotal = Math.max(...detailedTimeline.map(d => d.total));

  return (
    <section id="timeline-detailed" className="section">
      <SectionHeader icon="list-timeline" title="الجدول الزمني المفصل" subtitle="مدة كل مرحلة لكل تطوير بالأيام" />

      <div className="card" data-aos="fade-up" style={{ overflow: 'auto' }}>
        <table className="tbl">
          <thead>
            <tr>
              <th style={{ width: 30 }}>#</th>
              <th style={{ textAlign: 'right' }}>التطوير</th>
              <th style={{ color: '#2A848A' }}>تحليل</th>
              <th style={{ color: '#A61C61' }}>تصميم</th>
              <th style={{ color: '#BA5A31' }}>تنفيذ</th>
              <th>المجموع</th>
              <th style={{ width: 200 }}>التقدم</th>
            </tr>
          </thead>
          <tbody>
            {detailedTimeline.map((d) => (
              <tr key={d.id}>
                <td style={{ fontWeight: 600, color: 'var(--primary)' }}>{d.id}</td>
                <td style={{ textAlign: 'right', fontWeight: 500 }}>{d.title}</td>
                <td>{d.analysis} يوم</td>
                <td>{d.design} يوم</td>
                <td>{d.implementation} يوم</td>
                <td style={{ fontWeight: 700, color: 'var(--text-dark)' }}>{d.total} يوم</td>
                <td>
                  <div style={{ display: 'flex', height: 8, borderRadius: 9999, overflow: 'hidden', width: `${(d.total / maxTotal) * 100}%`, minWidth: 40 }}>
                    <div style={{ width: `${(d.analysis / d.total) * 100}%`, background: '#2A848A' }} />
                    <div style={{ width: `${(d.design / d.total) * 100}%`, background: '#A61C61' }} />
                    <div style={{ width: `${(d.implementation / d.total) * 100}%`, background: '#BA5A31' }} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ display: 'flex', gap: 20, justifyContent: 'center', marginTop: 16, paddingTop: 12, borderTop: '1px solid var(--border-light)' }}>
          {[{ label: 'التحليل', color: '#2A848A' }, { label: 'التصميم', color: '#A61C61' }, { label: 'التنفيذ', color: '#BA5A31' }].map(l => (
            <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.78rem', color: 'var(--text)' }}>
              <div style={{ width: 12, height: 12, borderRadius: 3, background: l.color }} />
              {l.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
