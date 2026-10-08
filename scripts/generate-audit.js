const fs = require('fs');
const path = require('path');

const audit = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'audit-raw.json'), 'utf8'));

const files = Object.keys(audit)
  .filter(f => !f.includes('package-lock.json') && !f.includes('audit-raw.json') && !f.startsWith('lh-'))
  .sort();

let md = '# Krat.OS v2 Redesign Audit (v1 -> v2 Migration Checklist)\n\n';
md += 'Generated as part of **Prompt R1** on branch `redesign/krat-os-v2`.\n';
md += 'This document catalogs all 68 active codebase files containing legacy v1 tokens, typography, branding, and shape/motion metaphors.\n\n';

md += '## 1. Summary Statistics\n\n';
md += '- **Total Audited Source Files:** ' + files.length + '\n';

const kratosFiles = files.filter(f => audit[f].includes('kratos'));
const fontFiles = files.filter(f => audit[f].includes('fredoka') || audit[f].includes('outfit'));
const colorFiles = files.filter(f => audit[f].some(m => ['cream', 'peach', 'orange', 'orange-deep', 'ink', 'cocoa', 'butter'].includes(m)));
const shapeFiles = files.filter(f => audit[f].some(m => ['blob', 'pill', 'rounded-full', 'spring'].includes(m)));

md += '- **Files with Brand Name "Kratos" / "kratos":** ' + kratosFiles.length + ' (Target: Replace with "Krat.OS")\n';
md += '- **Files with Legacy Fonts (Fredoka / Outfit):** ' + fontFiles.length + ' (Target: Replace with JetBrains Mono + Geist)\n';
md += '- **Files with Legacy Color Tokens:** ' + colorFiles.length + ' (Target: Map to semantic tokens: bg, surface, fg, fg-muted, line, line-strong, red, red-text, ok)\n';
md += '- **Files with Legacy Shapes / Motion (blobs, pills, springs):** ' + shapeFiles.length + ' (Target: Migrate to sharp 0-4px radii, hairline borders, mechanical motion)\n\n';

md += '## 2. Prompt Mapping & Execution Strategy\n\n';
md += '| Prompt | Scope | Target Files |\n';
md += '|---|---|---|\n';
md += '| **R1** | Rebrand sweep: name, logo, tokens, fonts, theme | `site.ts`, metadata, JSON-LD, `tokens.css`, `tailwind.config.ts`, `layout.tsx`, `globals.css`, logo SVGs, theme provider, backward-compatibility token bridge |\n';
md += '| **R2** | Design system v2 & motion engine | `src/components/ui/*`, `src/lib/motion/*`, `src/app/design-system/*` |\n';
md += '| **R3** | Global shell | `Nav.tsx`, `Footer.tsx`, `StickyCta.tsx`, boot sequence, command palette, status bar |\n';
md += '| **R4** | The Hero (signature moment) | `src/components/sections/Hero.tsx`, shader field, terminal, live windows |\n';
md += '| **R5** | Home sections A | `Modules.tsx`, `Pipeline.tsx`, `Work.tsx`, `Proof.tsx` |\n';
md += '| **R6** | Home sections B | `StackMarquee.tsx`, `Principles.tsx`, `Faq.tsx`, `FinalCta.tsx` |\n';
md += '| **R7** | Estimator configurator | `src/components/estimator/*` |\n';
md += '| **R8** | Inner pages | `/services`, `/work`, `/about`, `/contact`, `/start`, `/privacy`, `/terms` |\n';
md += '| **R9** | Motion polish & levels | MotionContext (full / lite / off), performance audit, FPS profiling |\n';
md += '| **R10** | SEO, emails, identity | Email templates, meta tags, sitemap, 301 redirects, robots.txt |\n';
md += '| **R11** | QA & Release | End-to-end verification, Lighthouse >= 90 mobile, bundle size <= 220KB gzipped |\n\n';

md += '## 3. Detailed File Audit Table\n\n';
md += '| File | Brand Name | Fonts | Color Tokens | Shapes / Motion | Primary Prompt Action |\n';
md += '|---|:---:|:---:|---|---|---|\n';

files.forEach(f => {
  const m = audit[f];
  const normalized = f.replace(/\\/g, '/');
  const hasName = m.includes('kratos') ? '`kratos`' : '-';
  const fonts = m.filter(x => ['fredoka', 'outfit'].includes(x)).map(x => '`' + x + '`').join(', ') || '-';
  const colors = m.filter(x => ['cream', 'peach', 'orange', 'orange-deep', 'ink', 'cocoa', 'butter'].includes(x)).map(x => '`' + x + '`').join(', ') || '-';
  const shapes = m.filter(x => ['blob', 'pill', 'rounded-full', 'spring'].includes(x)).map(x => '`' + x + '`').join(', ') || '-';
  
  let action = 'R2 UI components';
  if (normalized.includes('site.ts') || normalized.includes('tokens.css') || normalized.includes('tailwind.config.ts') || normalized.includes('layout.tsx') || normalized.includes('globals.css') || normalized.includes('package.json') || normalized.includes('public/brand')) {
    action = '**R1 (Immediate)**';
  } else if (normalized.includes('Hero.tsx')) {
    action = 'R4 Hero';
  } else if (normalized.includes('Nav.tsx') || normalized.includes('Footer.tsx') || normalized.includes('StickyCta.tsx') || normalized.includes('PageTransition.tsx')) {
    action = 'R3 Shell';
  } else if (normalized.includes('estimator') || normalized.includes('BubbleOption')) {
    action = 'R7 Estimator';
  } else if (normalized.includes('services') || normalized.includes('work') || normalized.includes('about') || normalized.includes('contact') || normalized.includes('privacy') || normalized.includes('terms') || normalized.includes('start')) {
    action = normalized.startsWith('src/components/sections') ? 'R5/R6 Home Sections' : 'R8 Inner Pages';
  } else if (normalized.startsWith('src/components/ui/')) {
    action = 'R2 Design System';
  } else if (normalized.startsWith('src/components/fx/')) {
    action = 'R2 / R4 FX Components';
  } else if (normalized.startsWith('src/content/')) {
    action = 'R5/R6/R8 Content Data';
  }
  
  md += '| `' + normalized + '` | ' + hasName + ' | ' + fonts + ' | ' + colors + ' | ' + shapes + ' | ' + action + ' |\n';
});

fs.writeFileSync(path.join(__dirname, '..', 'REDESIGN_AUDIT.md'), md);
console.log('Successfully written REDESIGN_AUDIT.md');
