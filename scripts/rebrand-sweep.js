const fs = require('fs');
const path = require('path');

const targetDirs = ['src', 'functions', 'public'];
const skipFiles = ['audit-raw.json', 'REDESIGN_AUDIT.md', 'CHANGELOG.md'];

function processFile(filePath) {
  const ext = path.extname(filePath);
  if (!['.ts', '.tsx', '.js', '.jsx', '.json', '.css', '.html', '.svg', '.md'].includes(ext)) {
    return;
  }
  if (filePath.includes('node_modules') || filePath.includes('.next') || filePath.includes('.git')) {
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  // Exact replacements preserving env var names
  content = content.replace(/Kratos Software Solutions/g, 'Krat.OS Software Solutions');
  content = content.replace(/kratos\.dev/g, 'krat-os.dev');
  content = content.replace(/cal\.com\/kratos/g, 'cal.com/krat-os');
  content = content.replace(/kratos_estimator_session/g, 'krat_os_estimator_session');
  content = content.replace(/kratos_attribution/g, 'krat_os_attribution');
  content = content.replace(/why kratos/g, 'why krat.os');
  content = content.replace(/Why Kratos/g, 'Why Krat.OS');
  content = content.replace(/WhyKratos/g, 'WhyKratOS');
  content = content.replace(/Kratos/g, 'Krat.OS');
  content = content.replace(/kratos/g, 'krat.os');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated: ${filePath}`);
  }
}

function traverse(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!['node_modules', '.next', '.git', 'source'].includes(entry.name)) {
        traverse(fullPath);
      }
    } else {
      if (!skipFiles.includes(entry.name)) {
        processFile(fullPath);
      }
    }
  }
}

targetDirs.forEach(d => {
  const p = path.join('d:/anti/hyperframes', d);
  if (fs.existsSync(p)) {
    traverse(p);
  }
});

console.log('Sweep complete.');
