import { useState } from 'react';

const agenda = [
  { num: '1', title: 'الوضع الحالي للمنتج', desc: 'الإحصائيات والمؤشرات الرئيسية — اللجان والاعتماد والتحديات', plan: 'التطوير' },
  { num: '2', title: 'التطويرات المطلوبة', desc: '15 تطويراً مع 292 مهمة تفصيلية موزعة على 4 فترات (مايو – ديسمبر)', plan: 'التطوير' },
  { num: '3', title: 'الوحدات والباقات', desc: '16 وحدة وظيفية و4 باقات سنوية — هيكلة المنتج ونموذج التسعير', plan: 'التطوير' },
  { num: '4', title: 'الخطة التشغيلية', desc: '59 مهمة تشغيلية دورية — تمكين العملاء، متابعة الاشتراكات، دراسة المنافسين', plan: 'التشغيل' },
  { num: '5', title: 'دراسة المنافسين والسوق', desc: '6 منافسين تحت المراقبة — تحليل نقاط القوة والضعف والفرص', plan: 'التشغيل' },
  { num: '6', title: 'التحدي التسويقي وحجم السوق', desc: '7,000+ منظمة مستهدفة — 7 عملاء نشطون — فرصة نمو كبيرة', plan: 'التسويق' },
  { num: '7', title: 'خطة اكتساب واستعادة العملاء', desc: 'هدف 25-32 عميل نهاية 2026 — قنوات الوصول وشرائح العملاء', plan: 'التسويق' },
  { num: '8', title: 'الجدول الزمني والمستهدفات', desc: 'خارطة التنفيذ على 8 أشهر مع مؤشرات أداء قابلة للقياس', plan: 'الثلاثة' },
];

const planColor = { 'التطوير': '#2A848A', 'التشغيل': '#BA5A31', 'التسويق': '#A61C61', 'الثلاثة': '#452059' };

export default function WelcomePage({ onEnter }) {
  return (
    <div className="welcome-page">
      <div className="welcome-bg" />
      <div className="welcome-overlay" />

      <div className="welcome-content">
        {/* Logo + Title */}
        <div data-aos="fade-up" style={{ textAlign: 'center', marginBottom: 32 }}>
          <img src="/logos/white-logo.png" alt="نظم" style={{ width: 180, height: 'auto', marginBottom: 20 }} />
          <h1 style={{
            color: '#fff', fontSize: '2.2rem', fontWeight: 700,
            lineHeight: 1.4, marginBottom: 0,
          }}>
            خطة منتج نظم لعام 2026
          </h1>
        </div>

        {/* CTA Button */}
        <div data-aos="fade-up" style={{ textAlign: 'center', marginBottom: 56 }}>
          <button className="welcome-btn" onClick={onEnter}>
            استعراض
          </button>
        </div>

        {/* Agenda */}
        <div data-aos="fade-up" style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{
            color: 'rgba(255,255,255,0.7)', fontSize: '1rem', fontWeight: 600,
            textAlign: 'center', marginBottom: 20, letterSpacing: '0.5px',
          }}>
            <i className="fa-thin fa-list-check" style={{ marginLeft: 8 }} />
            المحتوى
          </h2>

          <div className="welcome-agenda">
            {agenda.map((item, i) => (
              <div key={i} className="agenda-row" data-aos="fade-up">
                <span className="agenda-num">{item.num}</span>
                <div className="agenda-info">
                  <span className="agenda-title">{item.title}</span>
                  <span className="agenda-desc">{item.desc}</span>
                </div>
                <span className="agenda-plan" style={{ color: planColor[item.plan] }}>{item.plan}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
