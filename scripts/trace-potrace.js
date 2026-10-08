const potrace = require('potrace');
const fs = require('fs');

// We use the clean transparent mark or high-contrast thresholded image
// Let's create a clean monochrome bitmap first for perfect potrace tracing
const { execSync } = require('child_process');

// Prepare high-contrast black on white silhouette
execSync(`python -c "
import cv2
import numpy as np

img = cv2.imread('public/brand/logo.png')
bg = np.array([217, 235, 252], dtype=np.float32)
diff = np.linalg.norm(img.astype(np.float32) - bg, axis=2)

# Morphological clean up
diff_clean = cv2.bilateralFilter(diff.astype(np.uint8), 5, 50, 50)
_, thresh = cv2.threshold(diff_clean, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

# Crop exactly to logo area (y: 350 to 680, x: 90 to 940)
cropped = thresh[340:685, 85:945]

# Potrace traces black shapes on white background
inv = 255 - cropped
cv2.imwrite('public/brand/_potrace_input.png', inv)
"`);

const params = {
  color: '#FB9A5E',
  threshold: 128,
  turdSize: 10,
  optCurve: true,
  optTolerance: 0.2,
};

potrace.trace('public/brand/_potrace_input.png', params, function(err, svg) {
  if (err) throw err;
  
  // Clean up SVG header to be responsive
  let cleanedSvg = svg
    .replace(/width="[0-9]+pt"/, 'width="100%"')
    .replace(/height="[0-9]+pt"/, 'height="100%"');

  fs.writeFileSync('public/brand/logo.svg', cleanedSvg);

  // Ink variant
  let inkSvg = cleanedSvg.replace(/fill="#[A-Fa-f0-9]+"/g, 'fill="#2A1810"');
  fs.writeFileSync('public/brand/logo-ink.svg', inkSvg);

  // Cream variant
  let creamSvg = cleanedSvg.replace(/fill="#[A-Fa-f0-9]+"/g, 'fill="#FDEBD9"');
  fs.writeFileSync('public/brand/logo-cream.svg', creamSvg);

  // App icon squircle
  const appIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <rect width="512" height="512" rx="140" fill="#FB9A5E" />
  <g transform="translate(60, 95) scale(0.48)">
    ${cleanedSvg.replace(/<svg[^>]*>/, '').replace('</svg>', '').replace(/fill="#[A-Fa-f0-9]+"/g, 'fill="#FDEBD9"')}
  </g>
</svg>`;
  fs.writeFileSync('public/brand/app-icon.svg', appIconSvg);

  // Favicon
  const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <rect width="512" height="512" rx="140" fill="#FB9A5E" />
  <g transform="translate(50, 85) scale(0.50)">
    ${cleanedSvg.replace(/<svg[^>]*>/, '').replace('</svg>', '').replace(/fill="#[A-Fa-f0-9]+"/g, 'fill="#FDEBD9"')}
  </g>
</svg>`;
  fs.writeFileSync('public/brand/favicon.svg', faviconSvg);

  // Remove temporary file
  if (fs.existsSync('public/brand/_potrace_input.png')) {
    fs.unlinkSync('public/brand/_potrace_input.png');
  }

  console.log('Successfully generated professional Potrace SVG vector assets!');
});
