async function validateStructuredData() {
  const routes = [
    'https://kratos-site.pages.dev/',
    'https://kratos-site.pages.dev/services',
    'https://kratos-site.pages.dev/services/web-apps',
    'https://kratos-site.pages.dev/work',
    'https://kratos-site.pages.dev/work/fintech-portal',
    'https://kratos-site.pages.dev/about',
    'https://kratos-site.pages.dev/contact',
    'https://kratos-site.pages.dev/start'
  ];

  for (const url of routes) {
    const res = await fetch(url);
    const html = await res.text();
    const regex = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
    let match;
    console.log(`\n=== Route: ${url} ===`);
    let count = 0;
    while ((match = regex.exec(html)) !== null) {
      count++;
      try {
        const parsed = JSON.parse(match[1]);
        if (parsed['@graph']) {
          console.log(`  [Schema #${count}] @graph: ${parsed['@graph'].map(i => i['@type']).join(', ')}`);
        } else {
          console.log(`  [Schema #${count}] Single: ${parsed['@type']}`);
        }
      } catch (e) {
        console.error(`  [Schema #${count}] Invalid JSON: ${e.message}`);
      }
    }
  }
}

validateStructuredData();
