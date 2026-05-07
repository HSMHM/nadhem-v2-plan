import { useEffect, useState } from 'react';

// Editable field — يدعم input أو textarea مع dirty state
export default function EditableField({
  label,
  value = '',
  onChange,
  multiline = false,
  rows = 3,
  placeholder = '',
  monospace = false,
  ltr = false,
  hint = null,
}) {
  const [local, setLocal] = useState(value);

  useEffect(() => { setLocal(value); }, [value]);

  const dirty = local !== value;

  const commit = (v) => {
    setLocal(v);
    onChange?.(v);
  };

  const inputProps = {
    value: local,
    placeholder,
    className: `asana-edit-input ${monospace ? 'is-mono' : ''} ${ltr ? 'is-ltr' : ''}`,
    onChange: (e) => commit(e.target.value),
  };

  return (
    <label className={`asana-edit-field ${dirty ? 'is-dirty' : ''}`}>
      <span className="asana-edit-label">
        {label}
        {dirty && <span className="asana-edit-dirty-dot" title="غير محفوظ" />}
      </span>
      {multiline ? (
        <textarea {...inputProps} rows={rows} />
      ) : (
        <input type="text" {...inputProps} />
      )}
      {hint && <span className="asana-edit-hint">{hint}</span>}
    </label>
  );
}
