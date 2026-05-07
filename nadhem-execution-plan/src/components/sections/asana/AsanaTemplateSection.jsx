const FIELDS_FILLED = [
  { key: 'feature_id', desc: 'معرّف الميزة بصيغة NDM-DEV-P{Q}-F{ID} — يُولَّد آلياً' },
  { key: 'feature_name', desc: 'اسم الميزة من title' },
  { key: 'product', desc: '"نظم (Nadhem)" ثابت' },
  { key: 'pm_name / analyst', desc: 'من DEFAULT_PM_NAME و DEFAULT_ANALYST_NAME في .env' },
  { key: 'analysis_date', desc: 'تاريخ توليد الملف (يُحدَّث عند الحفظ في تبويب أسانا)' },
  { key: 'priority', desc: 'مأخوذ من quarter (P0→P1، P1→P2، إلخ)' },
  { key: 'request_type', desc: 'new (إضافة) أو change (تعديل) — حسب docs/03-developments-classification.md' },
  { key: 'shared_feature', desc: '"لا" دائماً (نظم منتج وحده)' },
  { key: 'new_description / change_to_be', desc: 'وصف الخاصية + الموقع + ملخص المراحل' },
  { key: 'change_as_is', desc: 'وصف الوضع الحالي (للتعديلات فقط) من AS_IS_DESCRIPTIONS' },
  { key: 'us_*  (us_id_1 ... us_so_1)', desc: 'قصة مستخدم واحدة مولّدة من السياق (دور+فعل+فائدة)' },
  { key: 'iface_admin / iface_user / iface_public / iface_api', desc: 'نعم/لا حسب CLASSIFICATION.interfaces' },
  { key: '_asana_name', desc: '[DEV-{id}] {title} — قابل للتعديل في تبويب محاكاة أسانا' },
  { key: '_asana_notes', desc: 'وصف Asana كامل — قابل للتعديل، يُستخدم عند الرفع' },
  { key: '_asana_due_on', desc: 'الموعد النهائي لمهام P0 فقط (YYYY-MM-DD)' },
  { key: 'log_*_1', desc: 'صف واحد في سجل التعديلات — تاريخ التوليد' },
];

const FIELDS_SKIPPED = [
  { key: 'ac_* / ch_ac_*', reason: 'معايير القبول — مهمة المحلل/QA لاحقاً' },
  { key: 'sig_*', reason: 'التواقيع — لا تُملأ آلياً' },
  { key: 'check_pm_* / check_qa_* / check_tech_*', reason: 'قوائم تحقق المراجعة — تُترك للمراجعين' },
  { key: 'الأقسام 3-14', reason: 'أقسام رئيس التطوير و QA — اختيارية أصلاً (تأثير النظام، DB، NFR، إلخ)' },
];

const SECTIONS = [
  { id: 0, title: 'دليل استخدام الوثيقة', who: 'الجميع', kind: 'مرجعي' },
  { id: 1, title: 'معلومات الميزة الأساسية', who: 'محلل / مدير منتج', kind: 'إلزامي', filled: true },
  { id: 2, title: 'تفاصيل الطلب (ديناميكي)', who: 'محلل / مدير منتج', kind: 'إلزامي', filled: true },
  { id: 3, title: 'تحليل التأثير على النظام', who: 'رئيس تطوير', kind: 'اختياري' },
  { id: 4, title: 'المدخلات والمخرجات', who: 'رئيس تطوير', kind: 'اختياري' },
  { id: 5, title: 'المعادلات والمنطق الرياضي', who: 'رئيس تطوير', kind: 'اختياري' },
  { id: 6, title: 'جدول القرار', who: 'رئيس تطوير', kind: 'اختياري' },
  { id: 7, title: 'حالات الحدود', who: 'QA / تطوير', kind: 'اختياري' },
  { id: 8, title: 'سيناريوهات BDD', who: 'QA / تطوير', kind: 'اختياري' },
  { id: 10, title: 'التأثير على قاعدة البيانات', who: 'رئيس تطوير', kind: 'اختياري' },
  { id: 11, title: 'متطلبات غير وظيفية', who: 'رئيس تطوير', kind: 'اختياري' },
  { id: 12, title: 'المخاطر والتبعيات', who: 'رئيس تطوير', kind: 'اختياري' },
  { id: 13, title: 'الرسائل والإشعارات', who: 'رئيس تطوير', kind: 'اختياري' },
  { id: 14, title: 'ملخص للفريق البرمجي', who: 'رئيس تطوير', kind: 'اختياري' },
  { id: 15, title: 'قائمة التحقق النهائية والتوقيعات', who: 'الجميع', kind: 'إلزامي', skipped: true },
];

export default function AsanaTemplateSection() {
  return (
    <section id="asana-template" className="asana-root">
      <div className="asana-inner">
        <header className="asana-section-hdr" data-aos="fade-up">
          <h2><i className="fa-thin fa-file-lines" aria-hidden="true" /> قالب FAD (وثيقة تحليل الميزة)</h2>
          <p>كل ملف JSON في هذا التبويب يلتزم بـ schema القالب التفاعلي
            <a href="/asana-integration/ANALYSIS_DOCUMENT_TEMPLATE.html" target="_blank" rel="noreferrer" className="asana-link">
              {' '}ANALYSIS_DOCUMENT_TEMPLATE.html{' '}
            </a>
            (في مجلد asana-integration/). يمكنك فتح القالب وتحميل أي JSON من هنا للمعاينة البصرية.
          </p>
        </header>

        <div className="asana-grid-2">
          <div className="asana-card" data-aos="fade-up">
            <div className="asana-card-head">
              <i className="fa-thin fa-circle-check" style={{ color: '#10B981' }} aria-hidden="true" />
              <h3>الحقول التي تُملأ آلياً</h3>
            </div>
            <ul className="asana-field-list">
              {FIELDS_FILLED.map((f) => (
                <li key={f.key}>
                  <code className="asana-code">{f.key}</code>
                  <span>{f.desc}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="asana-card" data-aos="fade-up">
            <div className="asana-card-head">
              <i className="fa-thin fa-circle-xmark" style={{ color: '#EF4444' }} aria-hidden="true" />
              <h3>الحقول المتجاهلة (متعمداً)</h3>
            </div>
            <ul className="asana-field-list">
              {FIELDS_SKIPPED.map((f) => (
                <li key={f.key} className="asana-field-skipped">
                  <code className="asana-code">{f.key}</code>
                  <span>{f.reason}</span>
                </li>
              ))}
            </ul>
            <div className="asana-info-note">
              <i className="fa-thin fa-circle-info" aria-hidden="true" />
              <span>هذه الحقول تُترك فارغة في JSON ولن تظهر في القالب التفاعلي عند فتحه.</span>
            </div>
          </div>
        </div>

        <div className="asana-card asana-template-sections" data-aos="fade-up">
          <div className="asana-card-head">
            <i className="fa-thin fa-list-ol" style={{ color: '#F06A6A' }} aria-hidden="true" />
            <h3>أقسام القالب الـ16</h3>
          </div>
          <div className="asana-template-table">
            <div className="asana-template-row asana-template-head">
              <span>#</span>
              <span>عنوان القسم</span>
              <span>المسؤول</span>
              <span>النوع</span>
              <span>التعبئة الآلية</span>
            </div>
            {SECTIONS.map((s) => (
              <div
                key={s.id}
                className={`asana-template-row ${s.filled ? 'is-filled' : ''} ${s.skipped ? 'is-skipped' : ''}`}
              >
                <span className="asana-template-num">{s.id}</span>
                <span className="asana-template-title">{s.title}</span>
                <span className="asana-template-who">{s.who}</span>
                <span className={`asana-template-kind kind-${s.kind === 'إلزامي' ? 'req' : 'opt'}`}>{s.kind}</span>
                <span className="asana-template-fill">
                  {s.filled && <span className="asana-tag-filled">يُملأ</span>}
                  {s.skipped && <span className="asana-tag-skipped">يُترك فارغاً</span>}
                  {!s.filled && !s.skipped && <span className="asana-tag-none">—</span>}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
