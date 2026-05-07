// scripts/generate-fad-jsons.js
// يقرأ developments.js + classification.js ويولّد:
//   - fad-jsons/main/FAD_DEV-{id}_v1.0.json     (19 ملف)
//   - fad-jsons/subtasks/FAD_DEV-{subId}_v1.0.json  (~317 ملف)
//
// Usage:
//   node generate-fad-jsons.js                 # ولّد الكل (يكتب فوق الموجود)
//   node generate-fad-jsons.js --dev=200       # تطوير واحد فقط مع فرعياته
//   node generate-fad-jsons.js --only-missing  # تخطّ الملفات الموجودة (يحمي تعديلاتك)
//   node generate-fad-jsons.js --dev=200 --only-missing  # دمج الخيارين

import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { developments } from '../../nadhem-execution-plan/src/data/developments.js';
import { CLASSIFICATION, AS_IS_DESCRIPTIONS, INTERFACE_DESCRIPTIONS, PRIORITY_MAP } from './classification.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PM_NAME = process.env.DEFAULT_PM_NAME || 'أحمد محمد';
const ANALYST_NAME = process.env.DEFAULT_ANALYST_NAME || 'سارة علي';
const TODAY = new Date().toISOString().slice(0, 10);
const NOW_ISO = new Date().toISOString();

// ===== تحليل الـ flags =====
const args = process.argv.slice(2);
const onlyMissing = args.includes('--only-missing');
const targetDevArg = args.find((a) => a.startsWith('--dev='));
const targetDevId = targetDevArg ? targetDevArg.split('=')[1] : null;
const targetDevIdNum = targetDevId !== null ? Number(targetDevId) : null;

const OUT_MAIN = path.resolve(__dirname, '..', 'fad-jsons', 'main');
const OUT_SUB = path.resolve(__dirname, '..', 'fad-jsons', 'subtasks');
fs.mkdirSync(OUT_MAIN, { recursive: true });
fs.mkdirSync(OUT_SUB, { recursive: true });

// ===== Helpers =====

function buildFeatureId(devId, classification, subId = null) {
  // النمط: NDM-DEV-P{Q}-F{ID}[.subId]
  // نأخذ priority من dev.quarter (P0-P4)
  const dev = developments.find((d) => d.id === devId);
  const q = dev ? dev.quarter : 'P0';
  const base = `NDM-DEV-${q}-F${devId}`;
  return subId ? `${base}.${subId.split('.').slice(1).join('.')}` : base;
}

function ifaceDesc(key) {
  return INTERFACE_DESCRIPTIONS[key] || '';
}

function buildInterfaces(classification, devTitle) {
  const present = new Set(classification.interfaces);
  const result = {};
  for (const k of ['admin', 'user', 'public', 'api']) {
    const isPresent = present.has(k);
    result[`iface_${k}`] = isPresent ? 'نعم' : 'لا';
    result[`iface_${k}_desc`] = isPresent ? ifaceDesc(k) : '';
  }
  return result;
}

function buildUserStories(dev, classification) {
  // قصة مستخدم افتراضية واحدة تُولَّد من العنوان
  // الصيغة: كـ <role>، أريد <action>، حتى <benefit>
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

function locationToText(dev) {
  return dev.location ? `📌 الموقع في النظام: ${dev.location}` : '';
}

function buildDescription(dev, classification) {
  // وصف يضع description + location + ملخص المراحل
  const loc = locationToText(dev);
  const phases = [];
  if (dev.analysis?.length) phases.push(`تحليل (${dev.analysis.length} مهمة، ${dev.totalDays?.analysis || '-'} يوم)`);
  if (dev.design?.length) phases.push(`تصميم (${dev.design.length} مهمة، ${dev.totalDays?.design || '-'} يوم)`);
  if (dev.implementation?.length) phases.push(`تنفيذ (${dev.implementation.length} مهمة، ${dev.totalDays?.implementation || '-'} يوم)`);
  if (dev.training?.length) phases.push(`تدريب (${dev.training.length} مهمة)`);
  return `${dev.description}\n\n${loc}\n\n🌳 المراحل: ${phases.join(' • ')}\n\n⏱️ الإجمالي: ${dev.totalDays?.total || '-'} يوم`;
}

const PHASE_LABELS = {
  analysis: 'تحليل',
  design: 'تصميم',
  implementation: 'تنفيذ',
  training: 'تدريب',
};

function buildMainAsanaNotes(dev, classification) {
  const total = dev.totalDays?.total ?? '-';
  const a = dev.totalDays?.analysis ?? '-';
  const d = dev.totalDays?.design ?? '-';
  const i = dev.totalDays?.implementation ?? '-';
  const tCount = dev.training?.length ?? 0;
  const cls = classification.type === 'change' ? 'تعديل' : 'إضافة';
  return [
    dev.title,
    '',
    `📌 الموقع في النظام: ${dev.location || '-'}`,
    `🏷️ التصنيف: ${cls}`,
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

function buildLeafAsanaNotes(dev, phase, subTask) {
  return [
    `Duration: ${subTask.duration || '-'}`,
    '',
    `Parent: [DEV-${dev.id}] ${dev.title}`,
    `Phase: ${PHASE_LABELS[phase]}`,
    '',
    `FAD attached: FAD_DEV-${subTask.id}_v1.0.json`,
  ].join('\n');
}

// ===== توليد JSON رئيسي =====

function buildMainFAD(dev) {
  const cls = CLASSIFICATION[dev.id];
  if (!cls) {
    console.warn(`⚠ تصنيف ناقص لـ DEV-${dev.id}, استخدام defaults`);
    return null;
  }
  const ifaces = buildInterfaces(cls, dev.title);
  const userStories = buildUserStories(dev, cls);
  const priority = PRIORITY_MAP[dev.quarter] || 'P3';
  const featureId = buildFeatureId(dev.id, cls);
  const fullDescription = buildDescription(dev, cls);
  const asIsDesc = AS_IS_DESCRIPTIONS[dev.id] || `(الوضع الحالي يحوي خصائص متعلقة — راجع docs/01-saas-events-frontend-features.md للتفاصيل)`;

  const data = {
    _document: 'Feature Analysis Document (FAD)',
    _company: 'شركة التحول التقني (TTS)',
    _savedAt: NOW_ISO,
    _savedBy: 'آلي — generate-fad-jsons.js',
    _role: 'analyst',
    _requestType: cls.type,
    _attachments: { general: [], int_api_doc: [] },
    _devId: dev.id,
    _quarter: dev.quarter,
    _section: cls.section, // 'add' أو 'mod' — يستخدمه push-to-asana.js

    // ===== Asana metadata (قابلة للتعديل عبر تبويب محاكاة أسانا) =====
    // push-to-asana.js يستخدم هذه القيم مباشرة عند إنشاء المهمة في أسانا
    _asana_name: `[DEV-${dev.id}] ${dev.title}`,
    _asana_notes: buildMainAsanaNotes(dev, cls),
    _asana_due_on: dev.quarter === 'P0' && dev.endDate ? dev.endDate : null,

    // ===== القسم 1 — معلومات الميزة الأساسية =====
    version: '1.0',
    feature_id: featureId,
    feature_name: dev.title,
    product: 'نظم (Nadhem)',
    pm_name: PM_NAME,
    analyst: ANALYST_NAME,
    analysis_date: TODAY,
    doc_id: featureId,
    doc_date: TODAY,
    doc_status: 'مسودة',
    priority: priority,
    request_type: cls.type,
    shared_feature: 'لا',

    // ===== القسم 2 — تفاصيل الطلب (ديناميكي) =====
    ...(cls.type === 'new'
      ? {
          new_description: fullDescription,
        }
      : {
          change_as_is: asIsDesc,
          change_to_be: fullDescription,
        }),
    ...userStories,
    ...ifaces,

    // ===== القسم 15 — سجل التعديلات (صف واحد فقط) =====
    log_date_1: TODAY,
    log_ver_1: '1.0',
    log_author_1: 'آلي — generate-fad-jsons.js',
    log_change_1: 'الإصدار الأولي — توليد آلي من developments.js',
  };
  return data;
}

// ===== توليد JSON فرعي =====

function buildSubtaskFAD(dev, phase, subTask) {
  const cls = CLASSIFICATION[dev.id];
  if (!cls) return null;
  const priority = PRIORITY_MAP[dev.quarter] || 'P3';
  const subId = subTask.id; // مثال: "101.1.1"
  const featureId = `NDM-DEV-${dev.quarter}-F${subId}`;

  const data = {
    _document: 'Feature Analysis Document (FAD) — Subtask',
    _parent_id: `DEV-${dev.id}`,
    _parent_title: dev.title,
    _phase: phase, // analysis | design | implementation | training
    _savedAt: NOW_ISO,
    _savedBy: 'آلي — generate-fad-jsons.js',
    _requestType: cls.type,

    // ===== Asana metadata =====
    _asana_name: `[${subTask.id}] ${subTask.task}`,
    _asana_notes: buildLeafAsanaNotes(dev, phase, subTask),

    version: '1.0',
    feature_id: featureId,
    feature_name: subTask.task,
    product: 'نظم (Nadhem)',
    pm_name: PM_NAME,
    analyst: ANALYST_NAME,
    analysis_date: TODAY,
    priority: priority,
    request_type: cls.type,
    estimated_duration: subTask.duration || '',
    ...(cls.type === 'new'
      ? { new_description: subTask.task }
      : { change_to_be: subTask.task }),
  };
  return data;
}

// ===== الحلقة الرئيسية =====

const stats = { mainCount: 0, subCount: 0, mainSkipped: 0, subSkipped: 0, totalDevTasks: {} };

// فلترة قائمة التطويرات حسب --dev=
let toProcess = developments;
if (targetDevIdNum !== null) {
  toProcess = developments.filter((d) => d.id === targetDevIdNum);
  if (toProcess.length === 0) {
    console.error(`✗ لم يُعثر على تطوير بـ id=${targetDevId} في developments.js`);
    process.exit(1);
  }
}

console.log('\n══════════ خيارات التشغيل ══════════');
if (targetDevId !== null) console.log(`🎯 تطوير محدد: DEV-${targetDevId}`);
if (onlyMissing) console.log(`🛡️ وضع آمن: تخطي الملفات الموجودة (--only-missing)`);
console.log('═══════════════════════════════════\n');

for (const dev of toProcess) {
  // الرئيسي
  const mainPath = path.join(OUT_MAIN, `FAD_DEV-${dev.id}_v1.0.json`);
  const mainExists = fs.existsSync(mainPath);

  if (onlyMissing && mainExists) {
    stats.mainSkipped++;
  } else {
    const mainFad = buildMainFAD(dev);
    if (mainFad) {
      fs.writeFileSync(mainPath, JSON.stringify(mainFad, null, 2), 'utf8');
      stats.mainCount++;
    }
  }

  // الفرعيات (المستوى 3)
  const phases = ['analysis', 'design', 'implementation', 'training'];
  let devSubCount = 0;
  let devSubSkipped = 0;
  for (const phase of phases) {
    const list = dev[phase] || [];
    for (const subTask of list) {
      const subPath = path.join(OUT_SUB, `FAD_DEV-${subTask.id}_v1.0.json`);
      const subExists = fs.existsSync(subPath);

      if (onlyMissing && subExists) {
        stats.subSkipped++;
        devSubSkipped++;
        continue;
      }
      const subFad = buildSubtaskFAD(dev, phase, subTask);
      if (subFad) {
        fs.writeFileSync(subPath, JSON.stringify(subFad, null, 2), 'utf8');
        stats.subCount++;
        devSubCount++;
      }
    }
  }
  stats.totalDevTasks[`DEV-${dev.id}`] = { written: devSubCount, skipped: devSubSkipped };
  const skipNote = devSubSkipped > 0 ? ` (تخطّي ${devSubSkipped})` : '';
  const mainNote = (onlyMissing && mainExists) ? ' [main تخطّي]' : '';
  console.log(`✓ DEV-${dev.id}${mainNote} — ${devSubCount} subtasks${skipNote}`);
}

console.log('\n══════════ تقرير التوليد ══════════');
console.log(`ملفات رئيسية: مكتوبة ${stats.mainCount} | تخطّي ${stats.mainSkipped}`);
console.log(`ملفات فرعية:  مكتوبة ${stats.subCount} | تخطّي ${stats.subSkipped}`);
console.log(`الإجمالي المكتوب: ${stats.mainCount + stats.subCount}`);
console.log('═══════════════════════════════════');
if (onlyMissing && (stats.mainSkipped + stats.subSkipped > 0)) {
  console.log('\n💡 الملفات المتخطّاة محفوظة كما هي — تعديلاتك السابقة لم تُلمَس.');
}
console.log('\nالمسارات:');
console.log(`  ${path.relative(process.cwd(), OUT_MAIN)}/`);
console.log(`  ${path.relative(process.cwd(), OUT_SUB)}/`);
