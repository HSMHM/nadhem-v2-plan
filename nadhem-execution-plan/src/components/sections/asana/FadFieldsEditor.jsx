import EditableField from './EditableField';

// محرر الحقول الرئيسية لـ FAD (مع تجاهل الحقول الميتاداتا والمتجاهَلة)
// مفاتيح يبدأ بـ _ هي meta — نُظهرها في قسم منفصل (Asana metadata)
// الحقول المتجاهَلة في docs/02-fad-template-guide.md (signatures, AC, checklists) نُخفيها

const HIDDEN_PREFIXES = ['sig_', 'check_', 'ac_', 'ch_ac_', 'log_'];
const HIDDEN_FIELDS = new Set(['_attachments', '_savedAt', '_savedBy', '_role']);

const ASANA_META_FIELDS = ['_asana_name', '_asana_notes', '_asana_due_on'];

const FIELD_LABELS = {
  feature_id: 'معرّف الميزة (feature_id)',
  feature_name: 'اسم الميزة (feature_name)',
  product: 'المنتج (product)',
  pm_name: 'مدير المنتج (pm_name)',
  analyst: 'المحلل (analyst)',
  analysis_date: 'تاريخ التحليل (analysis_date)',
  doc_id: 'معرّف الوثيقة (doc_id)',
  doc_date: 'تاريخ الوثيقة (doc_date)',
  doc_status: 'حالة الوثيقة (doc_status)',
  priority: 'الأولوية (priority)',
  request_type: 'نوع الطلب (request_type)',
  shared_feature: 'ميزة مشتركة (shared_feature)',
  version: 'الإصدار (version)',
  estimated_duration: 'المدة التقديرية',

  // Description fields
  new_description: 'وصف الخاصية الجديدة (new_description)',
  change_as_is: 'الوضع الحالي As-Is (change_as_is)',
  change_to_be: 'الوضع المستهدف To-Be (change_to_be)',

  // User stories
  us_id_1: 'US-01 ID',
  us_as_1: 'US-01 — كـ',
  us_want_1: 'US-01 — أريد',
  us_so_1: 'US-01 — حتى',
  ch_us_id_1: 'US-01 ID',
  ch_us_as_1: 'US-01 — كـ',
  ch_us_want_1: 'US-01 — أريد',
  ch_us_so_1: 'US-01 — حتى',

  // Interfaces
  iface_admin: 'تأثير على واجهة admin (نعم/لا)',
  iface_admin_desc: 'وصف تأثير admin',
  iface_user: 'تأثير على واجهة المستخدم (نعم/لا)',
  iface_user_desc: 'وصف تأثير user',
  iface_public: 'تأثير على الواجهة العامة (نعم/لا)',
  iface_public_desc: 'وصف تأثير public',
  iface_api: 'تأثير على API (نعم/لا)',
  iface_api_desc: 'وصف تأثير api',

  // Asana metadata
  _asana_name: 'اسم المهمة في أسانا',
  _asana_notes: 'وصف المهمة في أسانا (notes)',
  _asana_due_on: 'الموعد النهائي (YYYY-MM-DD أو فارغ)',

  // Internal meta
  _devId: 'معرّف التطوير الأصل',
  _quarter: 'الربع (P0..P4)',
  _section: 'القسم في أسانا (add/mod)',
  _requestType: 'نوع الطلب (مرآة لـ request_type)',
  _document: 'نوع الوثيقة',
  _company: 'الشركة',
  _phase: 'المرحلة (للفرعيات فقط)',
  _parent_id: 'TaskID الأب',
  _parent_title: 'عنوان الأب',
};

function isHidden(key) {
  if (HIDDEN_FIELDS.has(key)) return true;
  return HIDDEN_PREFIXES.some((p) => key.startsWith(p));
}

const MULTILINE_FIELDS = new Set([
  'new_description', 'change_as_is', 'change_to_be',
  'iface_admin_desc', 'iface_user_desc', 'iface_public_desc', 'iface_api_desc',
  '_asana_notes',
]);

const READONLY_FIELDS = new Set([
  '_document', '_company', '_devId', '_quarter', '_section', '_phase',
  '_parent_id', '_parent_title', '_requestType', 'version', 'request_type',
]);

// Group fields for display
function groupFields(data) {
  const all = Object.keys(data || {}).filter((k) => !isHidden(k));
  const groups = {
    asana: [],
    section1: [], // basic info
    section2: [], // request details
    interfaces: [],
    userStories: [],
    meta: [], // _* fields except asana
  };
  for (const k of all) {
    if (ASANA_META_FIELDS.includes(k)) groups.asana.push(k);
    else if (k.startsWith('_')) groups.meta.push(k);
    else if (k.startsWith('iface_')) groups.interfaces.push(k);
    else if (k.startsWith('us_') || k.startsWith('ch_us_')) groups.userStories.push(k);
    else if (['feature_id', 'feature_name', 'product', 'pm_name', 'analyst', 'analysis_date',
              'doc_id', 'doc_date', 'doc_status', 'priority', 'request_type',
              'shared_feature', 'version', 'estimated_duration'].includes(k)) groups.section1.push(k);
    else if (['new_description', 'change_as_is', 'change_to_be'].includes(k)) groups.section2.push(k);
    else groups.section1.push(k);
  }
  return groups;
}

function FieldsBlock({ title, icon, keys, data, onUpdate, readonlyAll }) {
  if (!keys || keys.length === 0) return null;
  return (
    <div className="asana-edit-block">
      <h4 className="asana-edit-block-title">
        <i className={`fa-thin fa-${icon}`} aria-hidden="true" /> {title}
      </h4>
      <div className="asana-edit-block-grid">
        {keys.map((k) => {
          const val = data[k];
          const label = FIELD_LABELS[k] || k;
          const multi = MULTILINE_FIELDS.has(k);
          const ro = readonlyAll || READONLY_FIELDS.has(k);
          const monospace = k.startsWith('_') || k === 'feature_id' || k === 'doc_id';

          if (ro) {
            return (
              <div key={k} className="asana-edit-readonly">
                <span className="asana-edit-label">{label}</span>
                <span className={`asana-edit-readonly-val ${monospace ? 'is-mono' : ''}`}>{String(val ?? '—')}</span>
              </div>
            );
          }

          return (
            <EditableField
              key={k}
              label={label}
              value={val ?? ''}
              onChange={(v) => onUpdate(k, v)}
              multiline={multi}
              rows={k === '_asana_notes' ? 12 : (multi ? 4 : 3)}
              monospace={monospace}
              placeholder={multi ? '...' : ''}
            />
          );
        })}
      </div>
    </div>
  );
}

export default function FadFieldsEditor({ data, onUpdate }) {
  if (!data) return null;
  const groups = groupFields(data);

  return (
    <div className="asana-edit-form">
      <FieldsBlock
        title="ميتاداتا أسانا (تُستخدم عند الرفع)"
        icon="cloud-arrow-up"
        keys={groups.asana}
        data={data}
        onUpdate={onUpdate}
      />
      <FieldsBlock
        title="القسم 1 — معلومات الميزة"
        icon="circle-info"
        keys={groups.section1}
        data={data}
        onUpdate={onUpdate}
      />
      <FieldsBlock
        title="القسم 2 — تفاصيل الطلب"
        icon="file-lines"
        keys={groups.section2}
        data={data}
        onUpdate={onUpdate}
      />
      <FieldsBlock
        title="الواجهات المتأثرة"
        icon="window"
        keys={groups.interfaces}
        data={data}
        onUpdate={onUpdate}
      />
      <FieldsBlock
        title="قصة المستخدم"
        icon="user-pen"
        keys={groups.userStories}
        data={data}
        onUpdate={onUpdate}
      />
      <FieldsBlock
        title="ميتاداتا داخلية (للقراءة فقط)"
        icon="database"
        keys={groups.meta}
        data={data}
        onUpdate={onUpdate}
        readonlyAll
      />
    </div>
  );
}
