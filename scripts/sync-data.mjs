// Copies brand profile, job plans, run results and logos from the repository root into web/data and web/public.
// When the parent folders are missing (a deployment rooted at web/), the committed copies are used as they are.
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(process.cwd());
const web = process.cwd();
if (!fs.existsSync(path.join(root, 'brands', 'verve.json'))) {
  console.log('sync-data: repository root not found, using committed data');
  process.exit(0);
}
const read = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const out = (name, value) => fs.writeFileSync(path.join(web, 'data', name), JSON.stringify(value, null, 2));
out('brand.json', read(path.join(root, 'brands', 'verve.json')));
const jobs = [], runs = [];
const jobsDir = path.join(root, 'jobs');
for (const id of fs.readdirSync(jobsDir)) {
  const plan = path.join(jobsDir, id, 'plan.json');
  if (fs.existsSync(plan)) {
    const p = read(plan);
    if (String(p.brand_profile || '').includes('verve')) jobs.push({ id, ...p });
  }
  const runDir = path.join(jobsDir, id, 'runs');
  if (fs.existsSync(runDir)) for (const f of fs.readdirSync(runDir)) if (f.endsWith('.json')) runs.push({ job: id, file: f, ...read(path.join(runDir, f)) });
}
out('jobs.json', jobs);
out('runs.json', runs);
const logoSrc = path.join(root, 'brands', 'verve', 'logo');
fs.mkdirSync(path.join(web, 'public', 'logo'), { recursive: true });
for (const f of fs.readdirSync(logoSrc)) fs.copyFileSync(path.join(logoSrc, f), path.join(web, 'public', 'logo', f));
console.log(`sync-data: ${jobs.length} job(s), ${runs.length} run(s)`);
