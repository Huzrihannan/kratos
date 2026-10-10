import { readFile, stat } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { locales, pages, localizedPath } from '../src/lib/site.mjs';
import { en } from '../src/content/en.ts';
import { si } from '../src/content/si.ts';
import { ta } from '../src/content/ta.ts';

function keys(value, prefix = '') {
  return Object.entries(value)
    .flatMap(([key, v]) =>
      typeof v === 'object' ? keys(v, `${prefix}${key}.`) : [`${prefix}${key}`],
    )
    .sort();
}
assert.deepEqual(
  keys(si),
  keys(en),
  'Sinhala content must cover the English schema',
);
assert.deepEqual(
  keys(ta),
  keys(en),
  'Tamil content must cover the English schema',
);
let links = 0;
let images = 0;
for (const lang of locales) {
  for (const slug of pages) {
    const path = localizedPath(lang, slug);
    const html = await readFile(`dist${path}index.html`, 'utf8');
    assert.ok(
      html.includes(`<html lang="${lang}">`),
      `Wrong language at ${path}`,
    );
    assert.equal(
      (html.match(/<h1\b/g) || []).length,
      1,
      `One primary heading at ${path}`,
    );
    assert.ok(
      html.includes(`href="https://kratos.website${path}"`),
      `Canonical missing at ${path}`,
    );
    for (const target of ['en', 'si', 'ta'])
      assert.ok(
        html.includes(`href="${localizedPath(target, slug)}"`),
        `Language switch loses page at ${path}`,
      );
    for (const [, href] of html.matchAll(/\bhref="([^"\s]*)"/g)) {
      if (!href.startsWith('/') && !href.startsWith('#')) continue;
      const url = new URL(href, `https://kratos.website${path}`);
      const file = `dist${url.pathname}${url.pathname.endsWith('/') ? 'index.html' : ''}`;
      assert.ok((await stat(file)).isFile(), `Broken link ${href} at ${path}`);
      if (url.hash) {
        const target = await readFile(file, 'utf8');
        assert.ok(
          target.includes(`id="${url.hash.slice(1)}"`),
          `Missing anchor ${href} at ${path}`,
        );
      }
      links++;
    }
    for (const [, attributes] of html.matchAll(/<img\b([^>]*)>/g)) {
      const source = attributes.match(/\bsrc="([^"]+)"/)?.[1];
      if (!source) continue; // The enlargement dialog is populated on opening.
      assert.ok(source.startsWith('/'), `Image must be served locally at ${path}`);
      assert.ok((await stat(`dist${source}`)).isFile(), `Missing image ${source} at ${path}`);
      assert.match(attributes, /\balt="[^"]+"/, `Image needs descriptive alt text at ${path}`);
      assert.match(attributes, /\bwidth="\d+"/, `Image needs intrinsic width at ${path}`);
      assert.match(attributes, /\bheight="\d+"/, `Image needs intrinsic height at ${path}`);
      images++;
    }
    if (slug === 'contact') {
      assert.ok(
        html.includes('method="dialog"'),
        'Draft form must never use a network submission fallback',
      );
      assert.match(
        html,
        /<fieldset\b[^>]*\bdisabled/,
        'Form controls must wait for the local script',
      );
    }
  }
}
console.log(
  `PASS: ${locales.length * pages.length} localized pages, ${links} local links/anchors, ${images} local images with alt text and dimensions, complete language schemas, safe draft-form fallback.`,
);
