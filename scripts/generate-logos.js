const opentype = require('opentype.js');
const fs = require('fs');
const path = require('path');

function loadFont(filePath) {
  const buf = fs.readFileSync(filePath);
  return opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
}

function buildLogos() {
  const fontBold = loadFont('d:/anti/hyperframes/scripts/fonts/JetBrainsMono-ExtraBold.ttf');
  const fontRegular = loadFont('d:/anti/hyperframes/scripts/fonts/JetBrainsMono-Regular.ttf');

  console.log('Loaded fonts successfully.');

  // Dimensions & parameters
  const wordmarkFontSize = 50;
  const taglineFontSize = 13.5;

  // Let's position the elements
  // Caret bar: width = 7px, height = 48px, y = 16px, x = 12px
  const barWidth = 7;
  const barHeight = 48;
  const barX = 14;
  const barY = 16;

  // Wordmark starting X: barX + barWidth + spacing
  const textStartX = barX + barWidth + 16; // 37
  const wordmarkBaseline = barY + barHeight - 7; // 57

  // Advance width of 1 character in JetBrains Mono
  const charWidth = fontBold.getAdvanceWidth('M', wordmarkFontSize);

  // "Krat"
  const pathKrat = fontBold.getPath('Krat', textStartX, wordmarkBaseline, wordmarkFontSize);
  const kratWidth = fontBold.getAdvanceWidth('Krat', wordmarkFontSize);

  // Red dot: A round red period (circle) placed after "Krat"
  const dotCenterX = textStartX + kratWidth + charWidth * 0.45;
  const dotCenterY = wordmarkBaseline - 7;
  const dotRadius = 5.2;

  // "OS": Placed after the dot
  const osStartX = textStartX + kratWidth + charWidth * 0.9;
  const pathOS = fontBold.getPath('OS', osStartX, wordmarkBaseline, wordmarkFontSize);
  const osWidth = fontBold.getAdvanceWidth('OS', wordmarkFontSize);

  // Tagline: "Software solutions" in JetBrains Mono Regular
  const taglineBaseline = wordmarkBaseline + 24; // 81
  const pathTagline = fontRegular.getPath('Software solutions', textStartX, taglineBaseline, taglineFontSize);

  const totalWidth = Math.ceil(osStartX + osWidth + 18);
  const totalHeight = 96;

  console.log(`Lockup layout: width=${totalWidth}, height=${totalHeight}, dot=(${dotCenterX.toFixed(1)}, ${dotCenterY.toFixed(1)})`);

  // Path data strings with 2 decimal precision
  const kratD = pathKrat.toPathData(2);
  const osD = pathOS.toPathData(2);
  const taglineD = pathTagline.toPathData(2);

  // Generate logo-dark.svg (cream text, red bar & dot, transparent)
  const logoDarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalWidth} ${totalHeight}" width="${totalWidth}" height="${totalHeight}">
  <!-- Red Bar / Caret -->
  <rect x="${barX}" y="${barY}" width="${barWidth}" height="${barHeight}" rx="1" fill="#FD142B" />
  <!-- Wordmark Krat.OS -->
  <g fill="#EFE3CF">
    <path d="${kratD}" />
    <path d="${osD}" />
  </g>
  <!-- Red LED Status Dot -->
  <circle cx="${dotCenterX.toFixed(2)}" cy="${dotCenterY.toFixed(2)}" r="${dotRadius}" fill="#FD142B" />
  <!-- Tagline Software solutions -->
  <path d="${taglineD}" fill="#A8A294" />
</svg>
`;

  // Generate logo-light.svg (charcoal text, red bar & dot, transparent)
  const logoLightSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${totalWidth} ${totalHeight}" width="${totalWidth}" height="${totalHeight}">
  <!-- Red Bar / Caret -->
  <rect x="${barX}" y="${barY}" width="${barWidth}" height="${barHeight}" rx="1" fill="#FD142B" />
  <!-- Wordmark Krat.OS -->
  <g fill="#292926">
    <path d="${kratD}" />
    <path d="${osD}" />
  </g>
  <!-- Red LED Status Dot -->
  <circle cx="${dotCenterX.toFixed(2)}" cy="${dotCenterY.toFixed(2)}" r="${dotRadius}" fill="#FD142B" />
  <!-- Tagline Software solutions -->
  <path d="${taglineD}" fill="#6B665A" />
</svg>
`;

  // Generate mark.svg (compact: cream "K" + red dot)
  // ViewBox 0 0 64 64
  const markFontSize = 44;
  const markCharWidth = fontBold.getAdvanceWidth('K', markFontSize);
  const markKPath = fontBold.getPath('K', 12, 48, markFontSize);
  const markKD = markKPath.toPathData(2);
  const markDotX = 12 + markCharWidth + 4;
  const markDotY = 44;
  const markDotR = 5;

  const markSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <path d="${markKD}" fill="#EFE3CF" />
  <circle cx="${markDotX.toFixed(2)}" cy="${markDotY.toFixed(2)}" r="${markDotR}" fill="#FD142B" />
</svg>
`;

  // Generate favicon.svg (mark on #212121 with 4px border radius)
  const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="4" fill="#212121" />
  <path d="${markKD}" fill="#EFE3CF" />
  <circle cx="${markDotX.toFixed(2)}" cy="${markDotY.toFixed(2)}" r="${markDotR}" fill="#FD142B" />
</svg>
`;

  // Generate app-icon.svg (512x512)
  const appIconFontSize = 320;
  const appCharWidth = fontBold.getAdvanceWidth('K', appIconFontSize);
  const appKPath = fontBold.getPath('K', 96, 370, appIconFontSize);
  const appKD = appKPath.toPathData(2);
  const appDotX = 96 + appCharWidth + 24;
  const appDotY = 340;
  const appDotR = 34;

  const appIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" rx="32" fill="#212121" />
  <path d="${appKD}" fill="#EFE3CF" />
  <circle cx="${appDotX.toFixed(2)}" cy="${appDotY.toFixed(2)}" r="${appDotR}" fill="#FD142B" />
</svg>
`;

  // Save all SVG files to public/brand/
  const brandDir = 'd:/anti/hyperframes/public/brand';
  fs.writeFileSync(path.join(brandDir, 'logo-dark.svg'), logoDarkSvg);
  fs.writeFileSync(path.join(brandDir, 'logo-light.svg'), logoLightSvg);
  fs.writeFileSync(path.join(brandDir, 'mark.svg'), markSvg);
  fs.writeFileSync(path.join(brandDir, 'favicon.svg'), faviconSvg);
  fs.writeFileSync(path.join(brandDir, 'app-icon.svg'), appIconSvg);

  // Fallback files for backward compatibility
  fs.writeFileSync(path.join(brandDir, 'logo.svg'), logoDarkSvg);
  fs.writeFileSync(path.join(brandDir, 'logo-cream.svg'), logoDarkSvg);
  fs.writeFileSync(path.join(brandDir, 'logo-ink.svg'), logoLightSvg);

  console.log('All brand SVG assets generated successfully!');
}

buildLogos();
