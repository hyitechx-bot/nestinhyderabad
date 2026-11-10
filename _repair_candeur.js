// Repairs damage from a find/replace that replaced the word "candeur" with a single space.
//
//   node _repair_candeur.js           -> DRY RUN (prints what would change, writes nothing)
//   node _repair_candeur.js --apply   -> writes the fixes
//
// What it fixes (safe, mechanical):
//   R1  URLs / slugs / image paths:  "/ -eternia/"  -> "/candeur-eternia/"   (also kukatpally, arbora-kukatpally, skyline, ...)
//   R2  WhatsApp text in URLs:       "%20 %20Eternia" -> "%20Candeur%20Eternia"
//   R3  <head> metadata only (title, description, keywords, OG, Twitter, JSON-LD):
//       "  Eternia" -> "Candeur Eternia"   (same for Kukatpally, Arbora, Skyline, Constructions ...)
//
// What it does NOT touch: visible body text (it only REPORTS how many stripped names remain there),
// so you can decide whether the brand name should show on those pages.
// Tip: commit (or copy the folder) before using --apply so you can diff the result.

const fs = require('fs');
const path = require('path');

const APPLY = process.argv.includes('--apply');
const ROOT = process.cwd();
const SKIP_DIRS = new Set(['.git', 'node_modules', '.vscode', 'New_Task']);
const EXTS = new Set(['.html', '.js', '.json', '.xml']);

const URL_WORDS = '(?:eternia|kukatpally|arbora-kukatpally|arbora|skyline|lakescape|crescent|twins|c40|constructions)';
const NAME_WORDS = '(?:Eternia|Kukatpally|Arbora|ARBORA|Skyline|Lakescape|Crescent|Twins|C40|Constructions)';

// R1: ' -eternia' that follows / " ' = (   -> 'candeur-eternia'
const R1 = new RegExp('(?<=[/"\'=(]) -(?=' + URL_WORDS + '\\b)', 'g');
// R2: '%20 %20Eternia' -> '%20Candeur%20Eternia'
const R2 = new RegExp('%20 %20(?=' + NAME_WORDS + '\\b)', 'g');
// R3: two spaces before a project word (head only)
const R3 = new RegExp(' {2}(?=' + NAME_WORDS + '\\b)', 'g');

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (EXTS.has(path.extname(e.name).toLowerCase()) && !e.name.startsWith('_repair') && !e.name.startsWith('_linkcheck')) out.push(p);
  }
  return out;
}

function count(re, s) { return (s.match(re) || []).length; }

let totals = { r1: 0, r2: 0, r3: 0, bodyLeft: 0, files: 0 };
const bodyLeftFiles = [];

for (const f of walk(ROOT)) {
  const ext = path.extname(f).toLowerCase();
  const original = fs.readFileSync(f, 'utf8');
  let s = original;

  const c1 = count(R1, s);
  const c2 = count(R2, s);
  s = s.replace(R1, 'candeur-').replace(R2, '%20Candeur%20');

  let c3 = 0;
  let bodyLeft = 0;
  if (ext === '.html') {
    const idx = s.search(/<\/head>/i);
    const head = idx === -1 ? s : s.slice(0, idx);
    const rest = idx === -1 ? '' : s.slice(idx);
    c3 = count(R3, head);
    const newHead = head.replace(R3, 'Candeur ');
    bodyLeft = count(R3, rest);
    s = newHead + rest;
  }

  if (s !== original) {
    totals.files++;
    totals.r1 += c1; totals.r2 += c2; totals.r3 += c3;
    console.log(`${APPLY ? 'FIXED ' : 'WOULD FIX'}  ${path.relative(ROOT, f)}  [urls:${c1} wa-text:${c2} head-names:${c3}]`);
    if (APPLY) fs.writeFileSync(f, s, 'utf8');
  }
  if (bodyLeft) { totals.bodyLeft += bodyLeft; bodyLeftFiles.push(`${path.relative(ROOT, f)} (${bodyLeft})`); }
}

console.log('\n==== SUMMARY ====');
console.log(`Files ${APPLY ? 'changed' : 'that would change'}: ${totals.files}`);
console.log(`URL/path fixes: ${totals.r1} | WhatsApp text fixes: ${totals.r2} | <head> name fixes: ${totals.r3}`);
console.log(`Stripped names still in visible BODY text (left untouched): ${totals.bodyLeft} in ${bodyLeftFiles.length} files`);
if (bodyLeftFiles.length) console.log(bodyLeftFiles.slice(0, 60).join('\n'));
if (!APPLY) console.log('\nDry run only. Re-run with --apply to write the changes.');
