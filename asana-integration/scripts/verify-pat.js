// scripts/verify-pat.js
// التحقق السريع من صحة Personal Access Token قبل تشغيل السكربتات الكبيرة.
// Usage: node verify-pat.js

import 'dotenv/config';
import Asana from 'asana';

const PAT = process.env.ASANA_PAT;
const PROJECT = process.env.ASANA_PROJECT_GID;

if (!PAT) {
  console.error('✗ ASANA_PAT غير معرّف في .env');
  process.exit(1);
}

const client = Asana.ApiClient.instance;
client.authentications['token'].accessToken = PAT;

const usersApi = new Asana.UsersApi();
const projectsApi = new Asana.ProjectsApi();
const sectionsApi = new Asana.SectionsApi();

try {
  const me = await usersApi.getUser('me', {});
  console.log(`✓ PAT صحيح. أنت: ${me.data.name} (${me.data.email})`);

  if (PROJECT) {
    const project = await projectsApi.getProject(PROJECT, {});
    console.log(`✓ المشروع: ${project.data.name}`);

    const sections = await sectionsApi.getSectionsForProject(PROJECT, {});
    console.log('✓ الأقسام:');
    for (const sec of sections.data) {
      console.log(`   - ${sec.name}  (gid: ${sec.gid})`);
    }
  } else {
    console.warn('⚠ ASANA_PROJECT_GID غير معرّف — تخطي فحص المشروع');
  }
} catch (err) {
  console.error('✗ خطأ:', err.message || err);
  if (err.value && err.value.errors) {
    console.error(JSON.stringify(err.value.errors, null, 2));
  }
  process.exit(1);
}
