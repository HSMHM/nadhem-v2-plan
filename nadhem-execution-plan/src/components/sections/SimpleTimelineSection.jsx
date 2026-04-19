import SectionHeader from '../common/SectionHeader';
import { simpleTimeline } from '../../data/timeline';

const qColors = { P0: '#EF4444', P1: '#2A848A', P2: '#BA5A31', P3: '#A61C61', P4: '#452059' };

export default function SimpleTimelineSection() {
  return (
    <section id="timeline-simple" className="section">
      <SectionHeader icon="calendar-lines" title="الجدول الزمني المبسط" subtitle="توزيع التطويرات على أرباع السنة" />

      <div className="card">
        <div className="tl">
          {simpleTimeline.map((q, qi) => (
            <div
              key={qi} className="tl-q"
              data-aos="fade-up"
             
            >
              <div className="tl-q-label" style={{ color: qColors[q.quarter] }}>
                <span style={{ marginLeft: 8 }}>{q.quarter}</span> — {q.period}
                {q.urgent && (
                  <span style={{ marginRight: 10, fontSize: '0.75rem', fontWeight: 700, background: qColors[q.quarter], color: '#fff', padding: '2px 10px', borderRadius: 6 }}>
                    <i className="fa-thin fa-bolt" style={{ marginLeft: 4 }} /> عاجل
                  </span>
                )}
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginRight: 12, fontWeight: 400 }}>
                  ({q.developments.length} تطويرات)
                </span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, paddingRight: 8 }}>
                {q.developments.map((d, di) => (
                  <span key={di} style={{
                    padding: '6px 14px', borderRadius: 8, fontSize: '0.82rem',
                    background: `${qColors[q.quarter]}12`, color: qColors[q.quarter],
                    fontWeight: 500, border: `1px solid ${qColors[q.quarter]}25`,
                  }}>
                    {d}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
