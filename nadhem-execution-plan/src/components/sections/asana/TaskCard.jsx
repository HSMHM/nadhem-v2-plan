import { useState, useEffect, useMemo } from 'react';
import useFadFile from '../../../hooks/useFadFile';
import FadFieldsEditor from './FadFieldsEditor';
import { downloadJson } from '../../../utils/buildFad';

// بطاقة مهمة قابلة للتعديل (تستخدم لكل من الرئيسي والفرعي).
// kind: 'main' أو 'sub'
// id: 101  أو  101.1.1
// summary: { id, title, badges:[{label,color}], meta:[{label,value}] } للعرض المختصر
// onAfterSave: optional callback
export default function TaskCard({ kind, id, summary, defaultOpen = false, onAfterSave, level = 0 }) {
  const { data, loading, saving, error, savedAt, save } = useFadFile(kind, id);
  const [open, setOpen] = useState(defaultOpen);
  const [working, setWorking] = useState(null); // الحقول المعدّلة محلياً
  const [toast, setToast] = useState(null);

  useEffect(() => { if (data) setWorking(data); }, [data]);

  const dirty = useMemo(() => {
    if (!data || !working) return false;
    return JSON.stringify(data) !== JSON.stringify(working);
  }, [data, working]);

  const updateField = (k, v) => {
    setWorking((prev) => {
      const next = { ...(prev || {}), [k]: v };
      // مرآة للحقول المتطابقة
      if (k === 'request_type') next._requestType = v;
      if (k === 'feature_id') next.doc_id = v;
      return next;
    });
  };

  const handleSave = async () => {
    if (!working) return;
    const result = await save(working);
    if (result.ok) {
      setToast({ type: 'ok', msg: 'تم الحفظ ✓' });
      onAfterSave?.();
    } else {
      setToast({ type: 'err', msg: result.error || 'فشل الحفظ' });
    }
    setTimeout(() => setToast(null), 2200);
  };

  const handleReset = () => setWorking(data);
  const handleDownload = () => {
    if (!working) return;
    downloadJson(working, `FAD_DEV-${id}_v1.0.json`);
  };

  // ===== Header (collapsed view) =====
  return (
    <div className={`asana-task-card asana-task-${kind} asana-level-${level} ${open ? 'is-open' : ''} ${dirty ? 'is-dirty' : ''}`}>
      <header className="asana-task-head" onClick={() => setOpen(!open)} role="button" tabIndex={0}>
        <button className="asana-task-toggle" tabIndex={-1}>
          <i className={`fa-thin fa-chevron-${open ? 'down' : 'left'}`} aria-hidden="true" />
        </button>
        <div className="asana-task-id">
          {kind === 'main' ? `DEV-${id}` : id}
        </div>
        <div className="asana-task-title">{summary.title}</div>
        <div className="asana-task-badges">
          {(summary.badges || []).map((b, i) => (
            <span key={i} className="asana-task-badge" style={{ '--b-c': b.color }}>{b.label}</span>
          ))}
          {dirty && !saving && <span className="asana-task-dirty">● غير محفوظ</span>}
          {saving && <span className="asana-task-saving">جارٍ الحفظ...</span>}
        </div>
      </header>

      {open && (
        <div className="asana-task-body">
          {(summary.meta || []).length > 0 && (
            <div className="asana-task-meta">
              {summary.meta.map((m, i) => (
                <div key={i} className="asana-task-meta-row">
                  <span className="asana-task-meta-lbl">{m.label}:</span>
                  <span className="asana-task-meta-val">{m.value}</span>
                </div>
              ))}
            </div>
          )}

          {loading && <div className="asana-task-loading">جارٍ تحميل ملف FAD JSON...</div>}
          {error && (
            <div className="asana-task-error">
              <i className="fa-thin fa-circle-exclamation" aria-hidden="true" /> خطأ في تحميل الملف: {error}
            </div>
          )}

          {!loading && !error && working && (
            <>
              <div className="asana-task-toolbar">
                <button
                  className="asana-btn asana-btn-primary"
                  disabled={!dirty || saving}
                  onClick={handleSave}
                  title={dirty ? 'حفظ التغييرات إلى ملف JSON' : 'لا تغييرات'}
                >
                  <i className="fa-thin fa-floppy-disk" aria-hidden="true" />
                  {saving ? 'جارٍ الحفظ...' : 'حفظ التغييرات'}
                </button>
                <button
                  className="asana-btn asana-btn-ghost"
                  disabled={!dirty || saving}
                  onClick={handleReset}
                >
                  <i className="fa-thin fa-rotate-left" aria-hidden="true" />
                  استرجاع
                </button>
                <button
                  className="asana-btn asana-btn-ghost"
                  onClick={handleDownload}
                >
                  <i className="fa-thin fa-download" aria-hidden="true" />
                  تحميل JSON
                </button>
                {savedAt && (
                  <span className="asana-task-savedat" title={savedAt}>
                    آخر حفظ: {new Date(savedAt).toLocaleTimeString('ar-SA')}
                  </span>
                )}
                {toast && (
                  <span className={`asana-toast asana-toast-${toast.type}`}>
                    {toast.msg}
                  </span>
                )}
              </div>

              <FadFieldsEditor data={working} onUpdate={updateField} />
            </>
          )}
        </div>
      )}
    </div>
  );
}
