const STEPS = [
  {
    num: 1,
    icon: 'key',
    title: 'إعداد بيانات أسانا',
    desc: 'إنشاء Personal Access Token + جلب Project GID + إنشاء قسمَي إضافات و التعديلات.',
    detail: 'اقرأ asana-integration/docs/00-asana-setup.md للخطوات بالتفصيل. ضع القيم في scripts/.env.',
  },
  {
    num: 2,
    icon: 'cubes',
    title: 'تثبيت الاعتماديات',
    desc: 'cd asana-integration/scripts && npm install',
    detail: 'ينصّب asana SDK + dotenv + form-data — حوالي 114 حزمة.',
  },
  {
    num: 3,
    icon: 'file-export',
    title: 'توليد ملفات JSON',
    desc: 'node generate-fad-jsons.js',
    detail: 'يُنتج 26 ملف رئيسي + ~416 ملف فرعي = 442 ملف JSON. ثم يمكنك تعديل أي ملف من تبويب "شجرة المهام" في هذا التطبيق وحفظه.',
  },
  {
    num: 4,
    icon: 'pen-to-square',
    title: 'مراجعة وتعديل المحتوى',
    desc: 'استخدم تبويب "شجرة المهام" في هذا التطبيق لتعديل اسم/وصف كل مهمة + حقول FAD.',
    detail: 'كل تغيير يُحفظ مباشرة على القرص في asana-integration/fad-jsons/. push-to-asana.js يقرأ من نفس الملفات عند الرفع.',
    highlight: true,
  },
  {
    num: 5,
    icon: 'flask',
    title: 'معاينة (Dry-Run)',
    desc: 'node push-to-asana.js --dry-run',
    detail: 'يطبع شجرة المهام التي سيتم إنشاؤها بدون إرسال أي طلب لأسانا — للتحقق قبل التنفيذ.',
  },
  {
    num: 6,
    icon: 'cloud-arrow-up',
    title: 'الرفع الفعلي',
    desc: 'node push-to-asana.js',
    detail: 'ينشئ الهرم الكامل: 26 مهمة رئيسية + 104 حاوية مرحلة + ~416 مهمة تفصيلية + 442 مرفق JSON. يحفظ التقدم في .asana-state.json.',
  },
  {
    num: 7,
    icon: 'check-double',
    title: 'التحقق في أسانا',
    desc: 'افتح المشروع في أسانا — يجب رؤية المهام موزّعة بين قسمَي إضافات و التعديلات بهرم 3 مستويات.',
    detail: 'كل مهمة فيها FAD JSON مرفق. افتح الـ JSON عبر ANALYSIS_DOCUMENT_TEMPLATE.html → زر "تحميل ملف" للمعاينة البصرية.',
  },
];

const FILES_TOUCHED = [
  { path: 'asana-integration/scripts/.env', role: 'بيانات الاعتماد (ليس في git)' },
  { path: 'asana-integration/fad-jsons/main/*.json', role: '26 ملف JSON كامل (مرفقات للمهام الرئيسية)' },
  { path: 'asana-integration/fad-jsons/subtasks/*.json', role: '~416 ملف JSON مختصر (مرفقات للفرعيات التفصيلية)' },
  { path: 'asana-integration/scripts/.asana-state.json', role: 'حالة التقدم (يُحدَّث تلقائياً عند الرفع)' },
  { path: 'nadhem-execution-plan/vite-plugin-asana-api.js', role: 'API لقراءة/كتابة JSONs من تبويب أسانا (dev mode)' },
];

export default function AsanaPipelineSection() {
  return (
    <section id="asana-pipeline" className="asana-root">
      <div className="asana-inner">
        <header className="asana-section-hdr" data-aos="fade-up">
          <h2><i className="fa-thin fa-cloud-arrow-up" aria-hidden="true" /> خط الرفع إلى أسانا</h2>
          <p>الخطوات الكاملة من الإعداد إلى التحقق النهائي. كل ما تحتاجه موجود في مجلد <code className="asana-code">asana-integration/</code> في جذر المشروع.</p>
        </header>

        <div className="asana-pipeline-grid" data-aos="fade-up">
          {STEPS.map((s) => (
            <div key={s.num} className={`asana-pipe-step ${s.highlight ? 'is-highlight' : ''}`}>
              <div className="asana-pipe-num">{s.num}</div>
              <div className="asana-pipe-icon">
                <i className={`fa-thin fa-${s.icon}`} aria-hidden="true" />
              </div>
              <div className="asana-pipe-body">
                <h4>{s.title}</h4>
                <code className="asana-pipe-cmd">{s.desc}</code>
                <p>{s.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="asana-card" data-aos="fade-up">
          <div className="asana-card-head">
            <i className="fa-thin fa-folder-tree" style={{ color: '#F06A6A' }} aria-hidden="true" />
            <h3>الملفات المُلامَسة في خلال العملية</h3>
          </div>
          <table className="asana-files-table">
            <thead><tr><th>المسار</th><th>الدور</th></tr></thead>
            <tbody>
              {FILES_TOUCHED.map((f) => (
                <tr key={f.path}>
                  <td><code className="asana-code asana-code-path">{f.path}</code></td>
                  <td>{f.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="asana-info-block" data-aos="fade-up">
          <i className="fa-thin fa-shield-check" aria-hidden="true" />
          <div>
            <strong>إعادة التشغيل آمنة:</strong> سكربت push-to-asana.js يحفظ تقدّمه في <code className="asana-code">.asana-state.json</code>. إذا توقّف في المنتصف، أعد تشغيله — سيكمل من حيث توقّف بدون تكرار المهام.
          </div>
        </div>
      </div>
    </section>
  );
}
