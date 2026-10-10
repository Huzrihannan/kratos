export function GET() {
  const approved = import.meta.env.PUBLIC_SITE_APPROVED === 'true';
  return new Response(
    approved
      ? 'User-agent: *\nAllow: /\nSitemap: https://kratos.website/sitemap.xml\n'
      : 'User-agent: *\nDisallow: /\n',
    { headers: { 'Content-Type': 'text/plain' } },
  );
}
