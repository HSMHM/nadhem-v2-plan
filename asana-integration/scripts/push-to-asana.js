// scripts/push-to-asana.js
// يبني هرم 3 مستويات في أسانا:
//   مستوى 1: 19 مهمة رئيسية تحت قسم إضافات/التعديلات (مع مرفق FAD JSON)
//   مستوى 2: 4 حاويات مراحل (تحليل/تصميم/تنفيذ/تدريب) — بدون مرفق
//   مستوى 3: المهام التفصيلية (~297 مهمة) — كل واحدة بمرفق FAD JSON مختصر
//
// Usage:
//   node push-to-asana.js              # تنفيذ فعلي
//   node push-to-asana.js --dry-run    # معاينة بدون إرسال

import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Asana from 'asana';
import { developments } from '../../nadhem-execution-plan/src/data/developments.js';
import { CLASSIFICATION } from './classification.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DRY_RUN = process.argv.includes('--dry-run');
const RATE_LIMIT_MS = parseInt(process.env.ASANA_RATE_LIMIT_MS || '400', 10);
const STATE_FILE = path.resolve(__dirname, '.asana-state.json');
const FAD_MAIN_DIR = path.resolve(__dirname, '..', 'fad-jsons', 'main');
const FAD_SUB_DIR = path.resolve(__dirname, '..', 'fad-jsons', 'subtasks');

// ===== التحقق من الإعدادات =====

function need(name) {
  const v = process.env[name];
  if (!v) {
    console.error(`✗ ${name} غير معرّف في .env`);
    process.exit(1);
  }
  return v;
}

const PAT = need('ASANA_PAT');
const PROJECT = need('ASANA_PROJECT_GID');
const SECTION_ADD = need('SECTION_ADD_GID');
const SECTION_MOD = need('SECTION_MOD_GID');

// ===== Asana client =====

const client = Asana.ApiClient.instance;
client.authentications['token'].accessToken = PAT;
const tasksApi = new Asana.TasksApi();
const attachmentsApi = new Asana.AttachmentsApi();

// ===== الحالة =====

function loadState() {
  if (fs.existsSync(STATE_FILE)) {
    return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
  }
  return { createdAt: new Date().toISOString(), tasks: {} };
}

function saveState(state) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2), 'utf8');
}

// ===== Helpers =====

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const PHASE_LABELS = {
  analysis: 'تحليل',
  design: 'تصميم',
  implementation: 'تنفيذ',
  training: 'تدريب',
};

function buildMainNotes(dev, classification) {
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
    '   (وثيقة تحليل الميزة الكاملة بصيغة JSON — افتحها بـ ANALYSIS_DOCUMENT_TEMPLATE.html)',
    '',
    '🌳 المهام الفرعية:',
    `   1. تحليل (${dev.analysis?.length || 0} مهمة)`,
    `   2. تصميم (${dev.design?.length || 0} مهمة)`,
    `   3. تنفيذ (${dev.implementation?.length || 0} مهمة)`,
    `   4. تدريب (${dev.training?.length || 0} مهمة)`,
    '',
    '🔗 المرجع: nadhem-execution-plan/src/data/developments.js',
  ].filter(Boolean).join('\n');
}

function buildPhaseNotes(dev, phase) {
  const list = dev[phase] || [];
  const dur = dev.totalDays?.[phase];
  return [
    `مرحلة ${PHASE_LABELS[phase]}`,
    '',
    `إجمالي: ${dur || '-'} يوم — ${list.length} مهمة فرعية`,
    '',
    `Parent: [DEV-${dev.id}] ${dev.title}`,
  ].join('\n');
}

function buildLeafNotes(dev, phase, subTask) {
  return [
    `Duration: ${subTask.duration || '-'}`,
    '',
    `Parent: [DEV-${dev.id}] ${dev.title}`,
    `Phase: ${PHASE_LABELS[phase]}`,
    '',
    `FAD attached: FAD_DEV-${subTask.id}_v1.0.json`,
  ].join('\n');
}

// ===== عمليات أسانا =====

async function asanaCall(label, fn) {
  if (DRY_RUN) {
    console.log(`   [DRY] ${label}`);
    return { gid: `dry-${label}` };
  }
  await sleep(RATE_LIMIT_MS);
  try {
    const res = await fn();
    return res.data || res;
  } catch (err) {
    const msg = err.message || JSON.stringify(err);
    console.error(`   ✗ ${label}: ${msg}`);
    if (err.value && err.value.errors) {
      console.error('     Details:', JSON.stringify(err.value.errors, null, 2));
    }
    throw err;
  }
}

function readMainFad(dev) {
  const fp = path.join(FAD_MAIN_DIR, `FAD_DEV-${dev.id}_v1.0.json`);
  if (!fs.existsSync(fp)) return null;
  try { return JSON.parse(fs.readFileSync(fp, 'utf8')); } catch { return null; }
}

function readLeafFad(subTaskId) {
  const fp = path.join(FAD_SUB_DIR, `FAD_DEV-${subTaskId}_v1.0.json`);
  if (!fs.existsSync(fp)) return null;
  try { return JSON.parse(fs.readFileSync(fp, 'utf8')); } catch { return null; }
}

async function createMainTask(dev, classification) {
  const sectionGid = classification.section === 'add' ? SECTION_ADD : SECTION_MOD;
  // اقرأ من ملف FAD ليستخدم النسخة المعدّلة من تبويب محاكاة أسانا (إن وجدت)
  const fad = readMainFad(dev);
  const name = (fad && fad._asana_name) || `[DEV-${dev.id}] ${dev.title}`;
  const notes = (fad && fad._asana_notes) || buildMainNotes(dev, classification);
  const dueOn = (fad && fad._asana_due_on) || (dev.quarter === 'P0' && dev.endDate ? dev.endDate : null);

  const body = {
    data: {
      name,
      notes,
      projects: [PROJECT],
      memberships: [{ project: PROJECT, section: sectionGid }],
    },
  };
  if (dueOn) body.data.due_on = dueOn;

  return await asanaCall(
    `createTask main DEV-${dev.id}`,
    () => tasksApi.createTask(body, {})
  );
}

async function createSubtask(parentGid, name, notes) {
  return await asanaCall(
    `createSubtask "${name.slice(0, 50)}"`,
    () => tasksApi.createSubtaskForTask({ data: { name, notes } }, parentGid, {})
  );
}

async function uploadAttachment(parentGid, filePath, label) {
  if (DRY_RUN) {
    console.log(`   [DRY] uploadAttachment ${label} → ${path.basename(filePath)}`);
    return { gid: `dry-attach-${label}` };
  }
  await sleep(RATE_LIMIT_MS);
  try {
    const stream = fs.createReadStream(filePath);
    const res = await attachmentsApi.createAttachmentForObject({
      parent: parentGid,
      file: stream,
      name: path.basename(filePath),
    }, {});
    return res.data;
  } catch (err) {
    const msg = err.message || JSON.stringify(err);
    console.error(`   ✗ uploadAttachment ${label}: ${msg}`);
    throw err;
  }
}

// ===== الحلقة الرئيسية =====

async function processDev(dev, state) {
  const cls = CLASSIFICATION[dev.id];
  if (!cls) {
    console.warn(`⚠ تخطّي DEV-${dev.id} — تصنيف ناقص`);
    return;
  }
  const key = `DEV-${dev.id}`;
  state.tasks[key] = state.tasks[key] || { phases: {}, leaves: {}, attachments: {} };
  const slot = state.tasks[key];

  // 1) المهمة الرئيسية
  if (!slot.mainGid) {
    const main = await createMainTask(dev, cls);
    slot.mainGid = main.gid;
    saveState(state);
  }
  console.log(`▸ [${key}] ${dev.title.slice(0, 60)} (gid: ${slot.mainGid})`);

  // 2) رفع مرفق رئيسي
  if (!slot.attachments.main) {
    const filePath = path.join(FAD_MAIN_DIR, `FAD_DEV-${dev.id}_v1.0.json`);
    if (fs.existsSync(filePath)) {
      await uploadAttachment(slot.mainGid, filePath, `main DEV-${dev.id}`);
      slot.attachments.main = true;
      saveState(state);
    } else {
      console.warn(`   ⚠ ملف رئيسي غير موجود: ${filePath}`);
    }
  }

  // 3) حاويات المراحل + المهام التفصيلية
  const phases = ['analysis', 'design', 'implementation', 'training'];
  for (const phase of phases) {
    const list = dev[phase] || [];
    if (list.length === 0) continue;

    if (!slot.phases[phase]) {
      const ph = await createSubtask(slot.mainGid, PHASE_LABELS[phase], buildPhaseNotes(dev, phase));
      slot.phases[phase] = ph.gid;
      saveState(state);
    }
    const phaseGid = slot.phases[phase];

    for (const subTask of list) {
      const sk = subTask.id;
      if (!slot.leaves[sk]) {
        // اقرأ من ملف FAD الفرعي ليستخدم النسخة المعدّلة
        const leafFad = readLeafFad(sk);
        const leafName = (leafFad && leafFad._asana_name) || `[${sk}] ${subTask.task}`;
        const leafNotes = (leafFad && leafFad._asana_notes) || buildLeafNotes(dev, phase, subTask);
        const leaf = await createSubtask(phaseGid, leafName, leafNotes);
        slot.leaves[sk] = leaf.gid;
        saveState(state);
      }
      // مرفق الفرع
      if (!slot.attachments[sk]) {
        const subFile = path.join(FAD_SUB_DIR, `FAD_DEV-${sk}_v1.0.json`);
        if (fs.existsSync(subFile)) {
          await uploadAttachment(slot.leaves[sk], subFile, `leaf ${sk}`);
          slot.attachments[sk] = true;
          saveState(state);
        }
      }
    }
  }
  console.log(`✓ [${key}] مكتمل (${Object.keys(slot.leaves).length} مهمة فرعية تفصيلية)`);
}

// ===== Bootstrap =====

(async () => {
  console.log(`\n══════════ Asana Push${DRY_RUN ? ' [DRY-RUN]' : ''} ══════════`);
  console.log(`Project: ${PROJECT}`);
  console.log(`Section ADD: ${SECTION_ADD}`);
  console.log(`Section MOD: ${SECTION_MOD}`);
  console.log(`Rate limit: ${RATE_LIMIT_MS}ms بين الطلبات`);
  console.log(`Developments: ${developments.length}`);
  console.log('═════════════════════════════════════\n');

  const state = loadState();

  let totalLeaves = 0;
  for (const dev of developments) {
    totalLeaves += (dev.analysis?.length || 0) + (dev.design?.length || 0) + (dev.implementation?.length || 0) + (dev.training?.length || 0);
  }
  console.log(`خطة الإنشاء: 19 رئيسية + 76 حاوية مرحلة + ${totalLeaves} تفصيلية = ${19 + 76 + totalLeaves} مهمة\n`);

  if (DRY_RUN) {
    console.log('🟡 وضع المعاينة فقط — لن يُرسل أي شيء.\n');
  }

  let count = 0;
  const total = developments.length;
  for (const dev of developments) {
    count++;
    console.log(`\n━━━ [${count}/${total}] DEV-${dev.id} ━━━`);
    try {
      await processDev(dev, state);
    } catch (err) {
      console.error(`\n✗ توقّف بسبب فشل DEV-${dev.id}:`, err.message);
      console.error('احفظ الحالة في .asana-state.json — أعد التشغيل لاستكمال.');
      saveState(state);
      process.exit(1);
    }
  }

  saveState(state);
  console.log('\n══════════ مكتمل ══════════');
  console.log(`19 مهمة رئيسية + ${totalLeaves} مهمة تفصيلية في أسانا`);
  console.log(`الحالة محفوظة في: ${path.relative(process.cwd(), STATE_FILE)}`);
  if (DRY_RUN) {
    console.log('\n💡 لتنفيذ فعلي: شغّل بدون --dry-run');
  }
})();
