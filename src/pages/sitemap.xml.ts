import { locales, pages, localizedPath } from '../lib/site.mjs';
export function GET() {
  const urls = locales
    .flatMap((lang) =>
      pages.map(
        (slug) =>
          `<url><loc>https://kratos.website${localizedPath(lang, slug)}</loc></url>`,
      ),
    )
    .join('');
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
    { headers: { 'Content-Type': 'application/xml' } },
  );
}
