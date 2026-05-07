// vite-plugin-asana-api.js
// Vite dev plugin يضيف endpoints لقراءة وكتابة ملفات FAD JSON
// من المجلد المجاور asana-integration/fad-jsons/.
// يعمل فقط في وضع التطوير (npm run dev) — في build production هذه الـ endpoints غير متوفرة.

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FAD_ROOT = path.resolve(__dirname, '..', 'asana-integration', 'fad-jsons');
const MAIN_DIR = path.join(FAD_ROOT, 'main');
const SUB_DIR = path.join(FAD_ROOT, 'subtasks');

// validation للـ id لمنع path traversal
const SAFE_ID = /^[A-Za-z0-9._-]+$/;

function fadFilePath(kind, id) {
  if (!SAFE_ID.test(id)) return null;
  const dir = kind === 'main' ? MAIN_DIR : SUB_DIR;
  return path.join(dir, `FAD_DEV-${id}_v1.0.json`);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => {
      try {
        const raw = Buffer.concat(chunks).toString('utf8');
        resolve(raw ? JSON.parse(raw) : {});
      } catch (e) { reject(e); }
    });
    req.on('error', reject);
  });
}

function send(res, status, obj) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(obj));
}

export default function asanaApiPlugin() {
  return {
    name: 'vite-plugin-asana-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url || '';
        if (!url.startsWith('/api/asana/')) return next();

        try {
          // GET /api/asana/list  → قائمة بكل الملفات الموجودة
          if (req.method === 'GET' && url === '/api/asana/list') {
            const main = fs.existsSync(MAIN_DIR) ? fs.readdirSync(MAIN_DIR).filter((f) => f.endsWith('.json')) : [];
            const sub = fs.existsSync(SUB_DIR) ? fs.readdirSync(SUB_DIR).filter((f) => f.endsWith('.json')) : [];
            return send(res, 200, { main, sub });
          }

          // GET /api/asana/fad/:kind/:id  → اقرأ ملف
          const getMatch = url.match(/^\/api\/asana\/fad\/(main|sub)\/([^/?#]+)$/);
          if (req.method === 'GET' && getMatch) {
            const [, kind, id] = getMatch;
            const fp = fadFilePath(kind === 'sub' ? 'sub' : 'main', id);
            if (!fp) return send(res, 400, { error: 'invalid id' });
            if (!fs.existsSync(fp)) return send(res, 404, { error: 'not found', path: path.relative(FAD_ROOT, fp) });
            const data = JSON.parse(fs.readFileSync(fp, 'utf8'));
            return send(res, 200, { ok: true, kind, id, data });
          }

          // POST /api/asana/fad/:kind/:id  body: { data: {...} } → احفظ ملف
          const postMatch = url.match(/^\/api\/asana\/fad\/(main|sub)\/([^/?#]+)$/);
          if (req.method === 'POST' && postMatch) {
            const [, kind, id] = postMatch;
            const fp = fadFilePath(kind === 'sub' ? 'sub' : 'main', id);
            if (!fp) return send(res, 400, { error: 'invalid id' });
            const body = await readBody(req);
            if (!body || typeof body.data !== 'object') {
              return send(res, 400, { error: 'body.data (object) required' });
            }
            // sanity: تأكد من القيم الأساسية موجودة
            if (!body.data.feature_id || !body.data.feature_name) {
              return send(res, 400, { error: 'data.feature_id and data.feature_name are required' });
            }
            // اكتب مع pretty-print
            fs.writeFileSync(fp, JSON.stringify(body.data, null, 2), 'utf8');
            return send(res, 200, { ok: true, kind, id, savedAt: new Date().toISOString() });
          }

          return send(res, 404, { error: 'unknown endpoint', url });
        } catch (err) {
          console.error('[asana-api] error:', err);
          return send(res, 500, { error: err.message || String(err) });
        }
      });
    },
  };
}
