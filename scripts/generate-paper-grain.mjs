import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const WIDTH = 256;
const HEIGHT = 256;
const OUTPUT_DIR = path.join(process.cwd(), "public", "textures");

async function generatePaperGrain() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // Create raw RGBA buffer for 256x256 noise
  const buffer = Buffer.alloc(WIDTH * HEIGHT * 4);

  // Pseudo-random noise with slight grain coherence (fibers)
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const idx = (y * WIDTH + x) * 4;

      // Base random value around neutral gray (128)
      const noise = (Math.random() - 0.5) * 40;
      // Slight periodic organic frequency
      const fiber = Math.sin(x * 0.15) * Math.cos(y * 0.15) * 10;
      const val = Math.min(255, Math.max(0, Math.round(128 + noise + fiber)));

      buffer[idx] = val; // R
      buffer[idx + 1] = val; // G
      buffer[idx + 2] = val; // B
      // Alpha: subtle variation between 100 and 160
      buffer[idx + 3] = Math.min(255, Math.max(0, Math.round(128 + (Math.random() - 0.5) * 30)));
    }
  }

  const webpPath = path.join(OUTPUT_DIR, "paper-grain.webp");
  const pngPath = path.join(OUTPUT_DIR, "paper-grain.png");

  await sharp(buffer, { raw: { width: WIDTH, height: HEIGHT, channels: 4 } })
    .webp({ quality: 85, effort: 6 })
    .toFile(webpPath);

  await sharp(buffer, { raw: { width: WIDTH, height: HEIGHT, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(pngPath);

  const stats = fs.statSync(webpPath);
  console.log(`✅ Generated paper-grain.webp: ${stats.size} bytes at ${webpPath}`);
}

generatePaperGrain().catch((err) => {
  console.error("Failed to generate paper grain texture:", err);
  process.exit(1);
});
