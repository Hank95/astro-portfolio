// Post-build step: keep the Content-Security-Policy in vercel.json in sync with the build.
//
// The site ships two inline scripts (theme bootstrap and analytics config).
// Rather than allow 'unsafe-inline', this hashes every inline script found in the
// built HTML and lists those hashes in script-src.
//
// Vercel reads vercel.json before it builds, so the policy has to be committed.
// A local build rewrites it when an inline script has changed; a CI or Vercel build
// fails instead, so a stale policy can never be deployed.
import { createHash } from 'node:crypto';
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DIST = fileURLToPath(new URL('../dist/', import.meta.url));
const CONFIG = fileURLToPath(new URL('../vercel.json', import.meta.url));
const HEADER = 'Content-Security-Policy';
const readOnly = Boolean(process.env.CI || process.env.VERCEL);

async function htmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) return htmlFiles(path);
      return entry.name.endsWith('.html') ? [path] : [];
    }),
  );
  return nested.flat();
}

const hashes = new Set();
const inlineScript = /<script(?![^>]*\ssrc=)([^>]*)>([\s\S]*?)<\/script>/g;

for (const file of await htmlFiles(DIST)) {
  const html = await readFile(file, 'utf8');
  for (const [, attrs, body] of html.matchAll(inlineScript)) {
    // JSON-LD is a data block, not executed, so CSP does not apply to it.
    if (/type="application\/(ld\+)?json"/.test(attrs)) continue;
    hashes.add(`'sha256-${createHash('sha256').update(body).digest('base64')}'`);
  }
}

const analytics = 'https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com';
const csp = [
  `default-src 'self'`,
  `script-src 'self' ${[...hashes].sort().join(' ')} https://www.googletagmanager.com`,
  // View transitions and a few components set inline styles.
  `style-src 'self' 'unsafe-inline'`,
  `img-src 'self' data: ${analytics}`,
  `font-src 'self'`,
  `connect-src 'self' ${analytics}`,
  `frame-ancestors 'none'`,
  `base-uri 'self'`,
  `form-action 'self'`,
  `object-src 'none'`,
  `upgrade-insecure-requests`,
].join('; ');

const config = JSON.parse(await readFile(CONFIG, 'utf8'));
const entry = config.headers
  ?.flatMap((rule) => rule.headers)
  .find((header) => header.key === HEADER);
if (!entry) {
  throw new Error(`vercel.json has no ${HEADER} header to fill in.`);
}

if (entry.value === csp) {
  console.log(`[csp] vercel.json is up to date (${hashes.size} inline script hashes)`);
} else if (readOnly) {
  console.error(
    `[csp] The ${HEADER} in vercel.json does not match this build.\n` +
      `      Run "npm run build" locally and commit vercel.json.\n\n` +
      `      expected: ${csp}\n`,
  );
  process.exit(1);
} else {
  entry.value = csp;
  await writeFile(CONFIG, `${JSON.stringify(config, null, 2)}\n`);
  console.log(`[csp] updated vercel.json (${hashes.size} inline script hashes); commit the change`);
}
