import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeader from '../common/SectionHeader';
import {
  sectorData,
  committeesAdoption,
  readinessData,
  userTypes,
  topFeatures,
  satisfactionData,
  marketData,
  competitorCategories,
  comparisonFeatures,
  challengesData,
  roadmapDevelopments,
  roadmapModules,
  roadmapTimeline,
} from '../../data/roadmap';

const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } };
const stagger = { visible: { transition: { staggerChildren: 0.06 } } };

function SubHeader({ icon, title, color }) {
  return (
    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: 16, marginTop: 36, display: 'flex', alignItems: 'center', gap: 10 }}>
      <i className={`fa-thin fa-${icon}`} style={{ color: color || 'var(--primary)' }} aria-hidden="true" />
      {title}
    </h3>
  );
}

function ProgressBar({ value, color }) {
  return (
    <div className="prog" style={{ height: 8 }}>
      <div className="prog-fill" style={{ width: `${value}%`, background: color || 'var(--primary)' }} />
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    completed: { cls: 'badge-s', label: 'مكتملة' },
    medium: { cls: 'badge-w', label: 'متوسطة' },
    inactive: { cls: 'badge-d', label: 'غير مفعلة' },
    new: { cls: 'badge-q', label: 'جديدة' },
  };
  const s = map[status] || map.inactive;
  return <span className={`badge ${s.cls}`}>{s.label}</span>;
}

function PriorityBadge({ priority }) {
  const map = {
    high: { cls: 'badge-d', label: 'أولوية عالية' },
    medium: { cls: 'badge-w', label: 'أولوية متوسطة' },
    low: { cls: 'badge-p', label: 'أولوية منخفضة' },
  };
  const p = map[priority] || map.medium;
  return <span className={`badge ${p.cls}`}>{p.label}</span>;
}

function DevTabs() {
  const [tab, setTab] = useState('structure');
  const tabs = [
    { id: 'structure', label: 'البنية والنظام' },
    { id: 'features', label: 'الخصائص والمزايا' },
    { id: 'technical', label: 'تقنية ومستقبلية' },
  ];
  const items = roadmapDevelopments[tab] || [];
  return (
    <>
      <div className="phase-tabs" style={{ marginBottom: 16 }}>
        {tabs.map(t => (
          <button key={t.id} className={`phase-tab ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>
      <motion.div className="grid g2" initial="hidden" animate="visible" key={tab} variants={stagger}>
        {items.map((d, i) => (
          <motion.div key={i} className="card" variants={fadeIn} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <div className="ic" style={{ marginTop: 2 }}>
              <i className={`fa-thin fa-${d.icon}`} aria-hidden="true" />
            </div>
            <div style={{ flex: 1 }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-dark)', marginBottom: 4 }}>{d.title}</h4>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '0 0 8px', lineHeight: 1.7 }}>{d.description}</p>
              <PriorityBadge priority={d.priority} />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}

export default function RoadmapSection() {
  return (
    <section id="roadmap" className="section">
      <SectionHeader icon="map" title="الاجتماع الأخير — خارطة الطريق" subtitle="ملخص شامل لمحتوى خارطة طريق المنتج التي تم عرضها سابقاً — الوضع الحالي والمستهدفات" />

      {/* التمركز القطاعي */}
      <SubHeader icon="chart-pie" title="التمركز القطاعي — 2025" />
      <motion.div className="grid g3" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
        {sectorData.sectors.map((s, i) => (
          <motion.div key={i} className="card" variants={fadeIn} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2.2rem', fontWeight: 700, color: s.color }}>{s.value}%</div>
            <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-dark)', marginTop: 4 }}>{s.label}</div>
          </motion.div>
        ))}
      </motion.div>
      <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 10, textAlign: 'center' }}>{sectorData.note}</p>

      {/* اللجان ونسبة الاعتماد */}
      <SubHeader icon="people-group" title="اللجان ونسبة الاعتماد لكل لجنة" />
      <motion.div className="grid g2" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
        {committeesAdoption.map((c, i) => (
          <motion.div key={i} className="card" variants={fadeIn}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-dark)' }}>{c.name}</h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <StatusBadge status={c.status} />
                <span style={{ fontWeight: 700, fontSize: '0.95rem', color: c.pct >= 90 ? 'var(--success)' : c.pct >= 40 ? 'var(--warning)' : 'var(--danger)' }}>{c.pct}%</span>
              </div>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 10 }}>{c.desc}</p>
            <ProgressBar value={c.pct} color={c.pct >= 90 ? 'var(--success)' : c.pct >= 40 ? 'var(--warning)' : 'var(--danger)'} />
          </motion.div>
        ))}
      </motion.div>

      {/* مؤشر الجاهزية التشغيلية */}
      <SubHeader icon="gauge-high" title="مؤشر الجاهزية التشغيلية" />
      <motion.div className="grid g3" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ marginBottom: 8 }}>
        <motion.div className="card" variants={fadeIn} style={{ textAlign: 'center', borderTop: '3px solid var(--warning)' }}>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--warning)' }}>{readinessData.avgAdoption}%</div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>متوسط الاعتماد العام</div>
        </motion.div>
        <motion.div className="card" variants={fadeIn} style={{ textAlign: 'center', borderTop: '3px solid var(--success)' }}>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--success)' }}>{readinessData.completedCommittees}</div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>لجان مكتملة (90%+)</div>
        </motion.div>
        <motion.div className="card" variants={fadeIn} style={{ textAlign: 'center', borderTop: '3px solid var(--danger)' }}>
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--danger)' }}>{readinessData.activationGap}%</div>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>فجوة التفعيل</div>
        </motion.div>
      </motion.div>

      {/* المستخدمون */}
      <SubHeader icon="users" title="المستخدمون وأنواعهم" />
      <motion.div className="grid g4" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
        {userTypes.map((u, i) => (
          <motion.div key={i} className="card" variants={fadeIn} style={{ textAlign: 'center', padding: '18px 14px', position: 'relative' }}>
            {u.isNew && <span className="badge badge-d" style={{ position: 'absolute', top: 8, left: 8, fontSize: '0.6rem' }}>جديد</span>}
            <div className="ic" style={{ margin: '0 auto 10px' }}>
              <i className={`fa-thin fa-${u.icon}`} aria-hidden="true" />
            </div>
            <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-dark)' }}>{u.name}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* الخصائص الأكثر استخداماً */}
      <SubHeader icon="star" title="الخصائص الأكثر استخداماً" />
      <motion.div className="grid g2" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
        {topFeatures.map((f, i) => (
          <motion.div key={i} className="card" variants={fadeIn} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px' }}>
            <span style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.85rem', minWidth: 26 }}>{i + 1}.</span>
            <span style={{ fontSize: '0.88rem', color: 'var(--text-dark)' }}>{f}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* صوت العميل / رضا العملاء */}
      <SubHeader icon="face-smile" title="صوت العميل — نسبة الرضا" />
      <div className="grid g2" style={{ marginBottom: 16 }}>
        <div className="card">
          <h4 style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-dark)', marginBottom: 16 }}>نسبة الرضا</h4>
          {satisfactionData.metrics.map((m, i) => (
            <div key={i} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-dark)' }}>{m.label}</span>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: m.value >= 80 ? 'var(--success)' : m.value >= 50 ? 'var(--warning)' : 'var(--danger)' }}>{m.value}%</span>
              </div>
              <ProgressBar value={m.value} color={m.value >= 80 ? 'var(--success)' : m.value >= 50 ? 'var(--warning)' : 'var(--danger)'} />
            </div>
          ))}
        </div>
        <div className="card">
          <h4 style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--text-dark)', marginBottom: 16 }}>عوامل نسبة الرضا</h4>
          {satisfactionData.factors.map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: i < satisfactionData.factors.length - 1 ? '1px solid var(--border-light)' : 'none' }}>
              <i className="fa-thin fa-circle-small" style={{ color: 'var(--warning)', fontSize: 10 }} aria-hidden="true" />
              <span style={{ fontSize: '0.85rem', color: 'var(--text)' }}>{f}</span>
            </div>
          ))}
        </div>
      </div>

      {/* سوق الفعاليات */}
      <SubHeader icon="chart-bar" title="سوق الفعاليات — 2025" />
      <div className="grid g2" style={{ marginBottom: 16 }}>
        {[
          { title: 'فعاليات كبرى', data: marketData.large, color: 'var(--secondary)' },
          { title: 'فعاليات متوسطة', data: marketData.medium, color: 'var(--primary)' },
          { title: 'فعاليات صغرى', data: marketData.small, color: 'var(--accent-orange)' },
          { title: 'فعاليات صغيرة جداً', data: marketData.verySmall, color: 'var(--accent-pink)' },
        ].map((cat, ci) => (
          <div key={ci} className="card">
            <h4 style={{ fontSize: '0.92rem', fontWeight: 600, color: cat.color, marginBottom: 12 }}>{cat.title}</h4>
            {cat.data.map((e, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < cat.data.length - 1 ? '1px solid var(--border-light)' : 'none' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-dark)' }}>{e.name}</span>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: cat.color }}>{e.participants} مشارك</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* المنافسون */}
      <SubHeader icon="shield-halved" title="أبرز المنافسين" />
      <motion.div className="grid g3" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} style={{ marginBottom: 24 }}>
        {competitorCategories.map((c, i) => (
          <motion.div key={i} className="card" variants={fadeIn} style={{ textAlign: 'center' }}>
            <h4 style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-dark)', marginBottom: 10 }}>{c.category}</h4>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
              {c.competitors.map((name, j) => (
                <span key={j} className="badge badge-q">{name}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* مقارنة الأنظمة */}
      <SubHeader icon="table-columns" title="مقارنة بين الأنظمة" />
      <div className="card" style={{ overflowX: 'auto', marginBottom: 16 }}>
        <table className="tbl">
          <thead>
            <tr>
              <th style={{ textAlign: 'right' }}>الخاصية</th>
              <th style={{ color: 'var(--primary)' }}>نظم</th>
              <th>WOTN</th>
              <th>Eventech</th>
              <th>عزام</th>
              <th>Zoho</th>
            </tr>
          </thead>
          <tbody>
            {comparisonFeatures.map((r, i) => (
              <tr key={i}>
                <td style={{ textAlign: 'right', fontWeight: 500, color: 'var(--text-dark)' }}>{r.feature}</td>
                <td><i className={`fa-thin fa-${r.nadhem ? 'circle-check' : 'circle-xmark'}`} style={{ color: r.nadhem ? 'var(--success)' : 'var(--danger)', fontSize: 16 }} /></td>
                <td><i className={`fa-thin fa-${r.wotn ? 'circle-check' : 'circle-xmark'}`} style={{ color: r.wotn ? 'var(--success)' : 'var(--danger)', fontSize: 16 }} /></td>
                <td><i className={`fa-thin fa-${r.eventech ? 'circle-check' : 'circle-xmark'}`} style={{ color: r.eventech ? 'var(--success)' : 'var(--danger)', fontSize: 16 }} /></td>
                <td><i className={`fa-thin fa-${r.azzam ? 'circle-check' : 'circle-xmark'}`} style={{ color: r.azzam ? 'var(--success)' : 'var(--danger)', fontSize: 16 }} /></td>
                <td><i className={`fa-thin fa-${r.zoho ? 'circle-check' : 'circle-xmark'}`} style={{ color: r.zoho ? 'var(--success)' : 'var(--danger)', fontSize: 16 }} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* التحديات */}
      <SubHeader icon="triangle-exclamation" title="التحديات الحالية" color="var(--danger)" />
      <motion.div className="grid g3" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
        {challengesData.map((c, i) => (
          <motion.div key={i} className="card" variants={fadeIn} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 18px' }}>
            <div className="ic" style={{ background: 'rgba(239,68,68,0.08)' }}>
              <i className={`fa-thin fa-${c.icon}`} style={{ color: 'var(--danger)' }} aria-hidden="true" />
            </div>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-dark)', lineHeight: 1.7 }}>{c.title}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* التطويرات المطلوبة */}
      <SubHeader icon="rocket-launch" title="التطويرات المطلوبة (15 تطوير)" />
      <DevTabs />

      {/* الوحدات */}
      <SubHeader icon="puzzle-piece" title="الوحدات (16 Module)" />
      <motion.div className="grid g4" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
        {roadmapModules.map((m, i) => (
          <motion.div key={i} className="card" variants={fadeIn} style={{ textAlign: 'center', padding: '16px 12px' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 28, height: 28, borderRadius: 8, background: 'var(--primary-light)', color: 'var(--primary)', fontWeight: 700, fontSize: '0.78rem', marginBottom: 8 }}>{i + 1}</span>
            <div style={{ fontSize: '0.82rem', fontWeight: 500, color: 'var(--text-dark)', lineHeight: 1.6 }}>{m}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* الجدول الزمني */}
      <SubHeader icon="calendar-days" title="الجدول الزمني" />
      <div className="tl">
        {roadmapTimeline.map((q, qi) => (
          <div key={qi} className="tl-q">
            <div className="tl-q-label">{q.quarter}</div>
            {q.items.map((item, ii) => (
              <div key={ii} className="tl-item">
                <i className="fa-thin fa-circle-dot" style={{ color: 'var(--primary)', fontSize: 10 }} aria-hidden="true" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

    </section>
  );
}
