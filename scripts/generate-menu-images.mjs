#!/usr/bin/env node
/**
 * Generates AI photos for menu items from scripts/menu-image-prompts.json.
 *
 *   OPENAI_API_KEY=sk-... node scripts/generate-menu-images.mjs            # all missing images
 *   OPENAI_API_KEY=sk-... node scripts/generate-menu-images.mjs beef-burger # just these ids
 *   ... --force   regenerate even if the image already exists
 *
 * The key can also live in .env.local as OPENAI_API_KEY=...
 * Images are saved to public/menu/ai/<id>.jpg and listed in src/data/ai-images.json,
 * which src/data/menu.ts reads. The 6 owner-supplied photos are never in the prompt
 * list, so they are never replaced.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const PROMPTS = path.join(ROOT, 'scripts', 'menu-image-prompts.json');
const OUT_DIR = path.join(ROOT, 'public', 'menu', 'ai');
const MANIFEST = path.join(ROOT, 'src', 'data', 'ai-images.json');
const MODEL = process.env.IMAGE_MODEL || 'gpt-image-2';
const QUALITY = process.env.IMAGE_QUALITY || 'medium'; // low | medium | high
const CONCURRENCY = 3;

function loadKey() {
  if (process.env.OPENAI_API_KEY) return process.env.OPENAI_API_KEY;
  const envFile = path.join(ROOT, '.env.local');
  if (fs.existsSync(envFile)) {
    const m = fs.readFileSync(envFile, 'utf8').match(/^OPENAI_API_KEY=(.+)$/m);
    if (m) return m[1].trim().replace(/^["']|["']$/g, '');
  }
  console.error('Missing OPENAI_API_KEY (set it in your shell or in .env.local).');
  process.exit(1);
}

const key = loadKey();
const args = process.argv.slice(2);
const force = args.includes('--force');
const only = new Set(args.filter((a) => !a.startsWith('--')));

const all = JSON.parse(fs.readFileSync(PROMPTS, 'utf8'));
const unknown = [...only].filter((id) => !all.some((p) => p.id === id));
if (unknown.length) {
  console.error('Unknown ids:', unknown.join(', '));
  process.exit(1);
}

fs.mkdirSync(OUT_DIR, { recursive: true });
const fileFor = (id) => path.join(OUT_DIR, `${id}.jpg`);
const todo = all.filter((p) => (only.size ? only.has(p.id) : true) && (force || !fs.existsSync(fileFor(p.id))));
console.log(`${todo.length} image(s) to generate with ${MODEL} (${QUALITY}).`);

async function generate({ id, prompt }) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    const res = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: MODEL, prompt, size: '1536x1024', quality: QUALITY, output_format: 'jpeg', output_compression: 85, n: 1 }),
    });
    if (res.ok) {
      const json = await res.json();
      fs.writeFileSync(fileFor(id), Buffer.from(json.data[0].b64_json, 'base64'));
      return;
    }
    const body = await res.text();
    if (res.status === 429 || res.status >= 500) {
      console.warn(`  ${id}: ${res.status}, retrying (${attempt}/3)`);
      await new Promise((r) => setTimeout(r, 5000 * attempt));
      continue;
    }
    throw new Error(`${res.status} ${body.slice(0, 300)}`);
  }
  throw new Error('gave up after 3 attempts');
}

function writeManifest() {
  const ids = all.map((p) => p.id).filter((id) => fs.existsSync(fileFor(id)));
  fs.writeFileSync(MANIFEST, JSON.stringify(ids, null, 2) + '\n');
  return ids.length;
}

let done = 0;
const failed = [];
const queue = [...todo];
await Promise.all(
  Array.from({ length: CONCURRENCY }, async () => {
    for (let p; (p = queue.shift()); ) {
      try {
        await generate(p);
        console.log(`  [${++done}/${todo.length}] ${p.id}`);
      } catch (e) {
        failed.push(p.id);
        console.error(`  FAILED ${p.id}: ${e.message}`);
      }
    }
  }),
);

const total = writeManifest();
console.log(`Done. ${total}/${all.length} menu items now have AI photos.`);
if (failed.length) {
  console.log(`Failed: ${failed.join(' ')}\nRe-run the script to retry them.`);
  process.exit(1);
}
