import fs from "node:fs";
import path from "node:path";

const SRC_DIR = path.resolve(process.cwd(), "src");

const FORBIDDEN_REGEX =
  /\[placeholder\]|lorem\s+ipsum|\bTODO\b|\bTBD\b|\bundefined\b|\bNaN\b/i;

function walkDir(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath, fileList);
    } else if (/\.(tsx|jsx|ts|js)$/.test(file)) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

function wordCount(str) {
  return str.trim().split(/\s+/).filter(Boolean).length;
}

function main() {
  console.log("=== Checking <Flair /> components across codebase ===");
  const files = walkDir(SRC_DIR);
  let totalFlair = 0;
  const errors = [];

  // Match <Flair dark="..." light="..." dream="..." />
  // Can span multiple lines
  const flairRegex = /<Flair\s+([\s\S]*?)\/>/g;

  for (const file of files) {
    const content = fs.readFileSync(file, "utf8");
    let match;
    while ((match = flairRegex.exec(content)) !== null) {
      totalFlair++;
      const propsStr = match[1];

      // Extract dark, light, dream strings (handling quotes and JSX expressions)
      const darkMatch = propsStr.match(/dark=(?:["']([^"']*)["']|{["']([^"']*)["']})/);
      const lightMatch = propsStr.match(/light=(?:["']([^"']*)["']|{["']([^"']*)["']})/);
      const dreamMatch = propsStr.match(/dream=(?:["']([^"']*)["']|{["']([^"']*)["']})/);

      const relPath = path.relative(process.cwd(), file);

      if (!darkMatch) errors.push(`[${relPath}] <Flair /> missing required prop: dark`);
      if (!lightMatch) errors.push(`[${relPath}] <Flair /> missing required prop: light`);
      if (!dreamMatch) errors.push(`[${relPath}] <Flair /> missing required prop: dream`);

      const darkVal = darkMatch ? (darkMatch[1] ?? darkMatch[2] ?? "") : "";
      const lightVal = lightMatch ? (lightMatch[1] ?? lightMatch[2] ?? "") : "";
      const dreamVal = dreamMatch ? (dreamMatch[1] ?? dreamMatch[2] ?? "") : "";

      // Check max 12 words
      if (wordCount(darkVal) > 12) {
        errors.push(`[${relPath}] dark flair exceeds 12 words (${wordCount(darkVal)} words): "${darkVal}"`);
      }
      if (wordCount(lightVal) > 12) {
        errors.push(`[${relPath}] light flair exceeds 12 words (${wordCount(lightVal)} words): "${lightVal}"`);
      }
      if (wordCount(dreamVal) > 12) {
        errors.push(`[${relPath}] dream flair exceeds 12 words (${wordCount(dreamVal)} words): "${dreamVal}"`);
      }

      // Check forbidden patterns
      [
        { name: "dark", val: darkVal },
        { name: "light", val: lightVal },
        { name: "dream", val: dreamVal },
      ].forEach(({ name, val }) => {
        if (FORBIDDEN_REGEX.test(val)) {
          errors.push(`[${relPath}] ${name} flair contains forbidden pattern: "${val}"`);
        }
      });
    }
  }

  console.log(`Scanned ${files.length} files. Found ${totalFlair} <Flair /> instances.`);

  if (errors.length > 0) {
    console.error("\n❌ <Flair /> Guardrail Violations Found:");
    errors.forEach((err) => console.error(` - ${err}`));
    process.exit(1);
  }

  console.log("✅ All <Flair /> components pass word count and content checks.\n");
}

main();
