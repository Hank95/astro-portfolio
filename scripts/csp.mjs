// Post-build step: fill in the Content-Security-Policy in dist/_headers.
//
// The site ships two inline scripts (theme bootstrap and analytics config).
// Rather than allow 'unsafe-inline', this hashes every inline script found in the
// built HTML and lists those hashes in script-src, so the policy always matches
// what was actually built.
import { createHash } from 'node:crypto';
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const DIST = new URL('../dist/', import.meta.url).pathname;
const PLACEHOLDER = '__CSP__';

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

const headersPath = join(DIST, '_headers');
const headers = await readFile(headersPath, 'utf8');
const target = `Content-Security-Policy: ${PLACEHOLDER}`;
if (!headers.includes(target)) {
  throw new Error(`dist/_headers has no "${target}" line; CSP was not written.`);
}
await writeFile(headersPath, headers.replace(target, `Content-Security-Policy: ${csp}`));
console.log(`[csp] wrote policy with ${hashes.size} inline script hashes`);
