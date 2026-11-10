// Internal link/asset checker. Usage: node _linkcheck.js
const fs = require('fs');
const path = require('path');
const ROOT = process.cwd();
const SKIP = new Set(['.git', 'node_modules', '.vscode']);

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out); else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}

function exists(p) { try { return fs.existsSync(p); } catch { return false; } }

function resolveTarget(fromFile, ref) {
  let u = ref.split('#')[0].split('?')[0].trim();
  if (!u) return true;
  if (/^(https?:|mailto:|tel:|data:|javascript:|\/\/)/i.test(u)) return true;
  let base;
  if (u.startsWith('/')) base = path.join(ROOT, decodeURIComponent(u));
  else base = path.resolve(path.dirname(fromFile), decodeURIComponent(u));
  if (u.endsWith('/')) return exists(path.join(base, 'index.html'));
  return exists(base) || exists(base + '.html') || exists(path.join(base, 'index.html'));
}

const files = walk(ROOT);
const broken = new Map(); // file -> [refs]
let total = 0;
for (const f of files) {
  const h = fs.readFileSync(f, 'utf8');
  const refs = [...h.matchAll(/(?:href|src)\s*=\s*"([^"]*)"/gi)].map(m => m[1]);
  for (const r of refs) {
    total++;
    if (!resolveTarget(f, r)) {
      if (!broken.has(f)) broken.set(f, []);
      broken.get(f).push(r);
    }
  }
}
let n = 0;
for (const [f, refs] of broken) n += refs.length;
console.log('HTML files:', files.length, '| refs checked:', total, '| broken refs:', n, '| files with broken refs:', broken.size);
const verbose = process.argv.includes('-v');
const summary = new Map();
for (const [f, refs] of broken) for (const r of refs) summary.set(r, (summary.get(r) || 0) + 1);
[...summary.entries()].sort((a, b) => b[1] - a[1]).slice(0, verbose ? 200 : 25).forEach(([r, c]) => console.log(String(c).padStart(4), r));
