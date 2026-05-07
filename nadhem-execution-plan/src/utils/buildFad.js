// utils/buildFad.js
// مرآة في المتصفح لـ asana-integration/scripts/generate-fad-jsons.js
// تُستخدم لتوليد محتوى JSON المعروض في FadJsonModal بدون قراءة ملفات الديسك.

import {
  CLASSIFICATION,
  AS_IS_DESCRIPTIONS,
  INTERFACE_DESCRIPTIONS,
  PRIORITY_MAP,
  PHASE_LABELS,
  DEFAULTS,
} from '../data/asanaClassification';

const today = () => new Date().toISOString().slice(0, 10);
const nowIso = () => new Date().toISOString();

function inferRole(dev) {
  const loc = (dev.location || '').toLowerCase();
  if (loc.includes('إعدادات') || loc.includes('مدير النظام') || loc.includes('admin')) return 'مدير نظام';
  if (loc.includes('لجنة')) return 'موظف لجنة';
  if (loc.includes('عارض') || loc.includes('معرض')) return 'عارض';
  if (loc.includes('راعي') || loc.includes('رعاية')) return 'راعي';
  if (loc.includes('علمية') || loc.includes('متحدث')) return 'مشارك علمي';
  return 'منظم فعالية';
}

function inferBenefit(dev) {
  const t = (dev.title + ' ' + (dev.description || '')).toLowerCase();
  if (t.includes('توحيد') || t.includes('هيكلة')) return 'يصبح النظام أبسط وأوضح في الاستخدام';
  if (t.includes('تقارير') || t.includes('مؤشرات')) return 'أتمكن من قراءة الأداء واتخاذ قرارات مبنية على بيانات';
  if (t.includes('وحدات') || t.includes('باقات')) return 'يتوافق المنتج مع نموذج إيرادات مرن وقابل للتوسعة';
  if (t.includes('تصميم') || t.includes('ثيم')) return 'يصبح النظام أكثر جاذبية بصرياً ومرونة';
  if (t.includes('توقيع')) return 'تختصر دورة الاتفاقيات وتُوثّق رقمياً';
  if (t.includes('نفاذ')) return 'يقلل احتكاك التسجيل لمستخدمين سعوديين';
  if (t.includes('قوالب') || t.includes('سحب')) return 'يستقل المنظم في بناء صفحاته دون دعم فني';
  if (t.includes('kiosk') || t.includes('خدمات الذاتية')) return 'يحصل الحاضر على بطاقته بسرعة بدون انتظار';
  if (t.includes('تطبيق') || t.includes('هواتف')) return 'يصل الحاضر للمعلومات في جيبه طوال الفعالية';
  if (t.includes('ذكاء اصطناعي') || t.includes('مساعد')) return 'تختصر وقت إنشاء الجدول وتجيب على الأسئلة فوراً';
  if (t.includes('دعوات')) return 'يعرف المنظم سريعاً من سيحضر دون متابعة يدوية';
  if (t.includes('خصومات') || t.includes('فنادق')) return 'يستفيد الحاضرون من عروض حصرية متعلقة بالفعالية';
  return 'يرفع كفاءة وجودة المنتج';
}

function buildInterfaces(classification) {
  const present = new Set(classification.interfaces);
  const result = {};
  for (const k of ['admin', 'user', 'public', 'api']) {
    const isPresent = present.has(k);
    result[`iface_${k}`] = isPresent ? 'نعم' : 'لا';
    result[`iface_${k}_desc`] = isPresent ? INTERFACE_DESCRIPTIONS[k] : '';
  }
  return result;
}

function buildUserStories(dev, classification) {
  const role = inferRole(dev);
  const want = dev.title.replace(/^تطوير\s|^تمكين\s|^إضافة\s/, '');
  const benefit = inferBenefit(dev);
  const prefix = classification.type === 'change' ? 'ch_' : '';
  return {
    [`${prefix}us_id_1`]: 'US-01',
    [`${prefix}us_as_1`]: role,
    [`${prefix}us_want_1`]: want,
    [`${prefix}us_so_1`]: benefit,
  };
}

function buildDescription(dev) {
  const phases = [];
  if (dev.analysis?.length) phases.push(`تحليل (${dev.analysis.length} مهمة، ${dev.totalDays?.analysis || '-'} يوم)`);
  if (dev.design?.length) phases.push(`تصميم (${dev.design.length} مهمة، ${dev.totalDays?.design || '-'} يوم)`);
  if (dev.implementation?.length) phases.push(`تنفيذ (${dev.implementation.length} مهمة، ${dev.totalDays?.implementation || '-'} يوم)`);
  if (dev.training?.length) phases.push(`تدريب (${dev.training.length} مهمة)`);
  const loc = dev.location ? `📌 الموقع في النظام: ${dev.location}` : '';
  return `${dev.description}\n\n${loc}\n\n🌳 المراحل: ${phases.join(' • ')}\n\n⏱️ الإجمالي: ${dev.totalDays?.total || '-'} يوم`;
}

export function buildMainFAD(dev) {
  const cls = CLASSIFICATION[dev.id];
  if (!cls) return null;
  const ifaces = buildInterfaces(cls);
  const userStories = buildUserStories(dev, cls);
  const priority = PRIORITY_MAP[dev.quarter] || 'P3';
  const featureId = `NDM-DEV-${dev.quarter}-F${dev.id}`;
  const fullDescription = buildDescription(dev);
  const asIsDesc = AS_IS_DESCRIPTIONS[dev.id] || '(الوضع الحالي يحوي خصائص متعلقة — راجع docs/01-saas-events-frontend-features.md)';
  const t = today();
  return {
    _document: 'Feature Analysis Document (FAD)',
    _company: DEFAULTS.company,
    _savedAt: nowIso(),
    _savedBy: 'محاكاة — React Asana Tab',
    _role: 'analyst',
    _requestType: cls.type,
    _attachments: { general: [], int_api_doc: [] },
    _devId: dev.id,
    _quarter: dev.quarter,
    _section: cls.section,
    version: '1.0',
    feature_id: featureId,
    feature_name: dev.title,
    product: DEFAULTS.product,
    pm_name: DEFAULTS.pmName,
    analyst: DEFAULTS.analystName,
    analysis_date: t,
    doc_id: featureId,
    doc_date: t,
    doc_status: 'مسودة',
    priority,
    request_type: cls.type,
    shared_feature: 'لا',
    ...(cls.type === 'new'
      ? { new_description: fullDescription }
      : { change_as_is: asIsDesc, change_to_be: fullDescription }),
    ...userStories,
    ...ifaces,
    log_date_1: t,
    log_ver_1: '1.0',
    log_author_1: 'محاكاة — React Asana Tab',
    log_change_1: 'الإصدار الأولي — توليد آلي من developments.js',
  };
}

export function buildSubtaskFAD(dev, phase, subTask) {
  const cls = CLASSIFICATION[dev.id];
  if (!cls) return null;
  const priority = PRIORITY_MAP[dev.quarter] || 'P3';
  const featureId = `NDM-DEV-${dev.quarter}-F${subTask.id}`;
  const t = today();
  return {
    _document: 'Feature Analysis Document (FAD) — Subtask',
    _parent_id: `DEV-${dev.id}`,
    _parent_title: dev.title,
    _phase: phase,
    _savedAt: nowIso(),
    _savedBy: 'محاكاة — React Asana Tab',
    _requestType: cls.type,
    version: '1.0',
    feature_id: featureId,
    feature_name: subTask.task,
    product: DEFAULTS.product,
    pm_name: DEFAULTS.pmName,
    analyst: DEFAULTS.analystName,
    analysis_date: t,
    priority,
    request_type: cls.type,
    estimated_duration: subTask.duration || '',
    ...(cls.type === 'new'
      ? { new_description: subTask.task }
      : { change_to_be: subTask.task }),
  };
}

export function downloadJson(obj, filename) {
  const blob = new Blob([JSON.stringify(obj, null, 2)], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function buildAsanaTaskName(dev) {
  return `[DEV-${dev.id}] ${dev.title}`;
}

export function buildAsanaSubtaskName(subTask) {
  return `[${subTask.id}] ${subTask.task}`;
}

export function buildMainNotes(dev) {
  const cls = CLASSIFICATION[dev.id];
  if (!cls) return dev.description;
  const total = dev.totalDays?.total ?? '-';
  const a = dev.totalDays?.analysis ?? '-';
  const d = dev.totalDays?.design ?? '-';
  const i = dev.totalDays?.implementation ?? '-';
  const tCount = dev.training?.length ?? 0;
  const clsLabel = cls.type === 'change' ? 'تعديل' : 'إضافة';
  return [
    dev.title,
    '',
    `📌 الموقع في النظام: ${dev.location || '-'}`,
    `🏷️ التصنيف: ${clsLabel}`,
    `⚡ الأولوية: ${dev.quarter}`,
    dev.startDate && dev.endDate ? `📅 الفترة: ${dev.startDate} → ${dev.endDate}` : '',
    `⏱️ الإجمالي: ${total} يوم`,
    `   • تحليل: ${a} يوم   • تصميم: ${d} يوم   • تنفيذ: ${i} يوم   • تدريب: ${tCount} مهمة`,
    '',
    '📝 الوصف:',
    dev.description,
    '',
    `📎 الملف المرفق: FAD_DEV-${dev.id}_v1.0.json`,
    '',
    '🌳 المهام الفرعية:',
    `   1. تحليل (${dev.analysis?.length || 0} مهمة)`,
    `   2. تصميم (${dev.design?.length || 0} مهمة)`,
    `   3. تنفيذ (${dev.implementation?.length || 0} مهمة)`,
    `   4. تدريب (${dev.training?.length || 0} مهمة)`,
  ].filter(Boolean).join('\n');
}

export function buildLeafNotes(dev, phase, subTask) {
  return [
    `Duration: ${subTask.duration || '-'}`,
    '',
    `Parent: [DEV-${dev.id}] ${dev.title}`,
    `Phase: ${PHASE_LABELS[phase]}`,
    '',
    `FAD attached: FAD_DEV-${subTask.id}_v1.0.json`,
  ].join('\n');
}

export function computeStats(developments) {
  let mainCount = 0, leafCount = 0, addCount = 0, modCount = 0;
  let analysisCount = 0, designCount = 0, implCount = 0, trainingCount = 0;
  for (const dev of developments) {
    const cls = CLASSIFICATION[dev.id];
    if (!cls) continue;
    mainCount++;
    if (cls.section === 'add') addCount++;
    else modCount++;
    analysisCount += dev.analysis?.length || 0;
    designCount += dev.design?.length || 0;
    implCount += dev.implementation?.length || 0;
    trainingCount += dev.training?.length || 0;
  }
  leafCount = analysisCount + designCount + implCount + trainingCount;
  return {
    mainCount,
    addCount,
    modCount,
    leafCount,
    analysisCount,
    designCount,
    implCount,
    trainingCount,
    phaseContainerCount: mainCount * 4,
    totalAsanaTasks: mainCount + (mainCount * 4) + leafCount,
    totalJsonFiles: mainCount + leafCount,
  };
}
