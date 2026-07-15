// ============================================================================
// PRODUCT IMAGE COMPRESSION (one-off / repeatable)
// ============================================================================
// Recompresses oversized images in src/assets IN PLACE:
//   • resizes anything wider than 1200px down to 1200px (largest size the
//     layout ever displays is ~700px, so 1200px keeps retina headroom)
//   • PNG  -> palette PNG, quality 90  (photos survive this visually intact)
//   • JPEG -> mozjpeg, quality 82
// A file is only overwritten when the result is at least 15% smaller, so
// already-optimised images are left untouched. Safe to re-run any time new
// product photos are added:  node scripts/compress-images.mjs
// ============================================================================

import { readdirSync, statSync, writeFileSync } from "node:fs";
import { join, extname } from "node:path";
import sharp from "sharp";

const DIR = "src/assets";
const MIN_BYTES = 250 * 1024; // ignore files already under 250KB
const MAX_WIDTH = 1200;

const files = readdirSync(DIR).filter((f) => [".png", ".jpg", ".jpeg"].includes(extname(f).toLowerCase()));

let before = 0, after = 0, changed = 0, skipped = 0;

for (const file of files) {
  const path = join(DIR, file);
  const origSize = statSync(path).size;
  if (origSize < MIN_BYTES) { skipped++; continue; }

  const img = sharp(path);
  const meta = await img.metadata();
  const pipeline = img.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  const isPng = extname(file).toLowerCase() === ".png";
  const buf = isPng
    ? await pipeline.png({ quality: 90, palette: true, compressionLevel: 9 }).toBuffer()
    : await pipeline.jpeg({ quality: 82, mozjpeg: true }).toBuffer();

  if (buf.length < origSize * 0.85) {
    writeFileSync(path, buf);
    before += origSize;
    after += buf.length;
    changed++;
    console.log(
      `✓ ${file}: ${(origSize / 1024).toFixed(0)}KB -> ${(buf.length / 1024).toFixed(0)}KB` +
      (meta.width > MAX_WIDTH ? ` (${meta.width}px -> ${MAX_WIDTH}px)` : ""),
    );
  } else {
    skipped++;
  }
}

console.log(`\nCompressed ${changed} files, skipped ${skipped}.`);
console.log(`Total: ${(before / 1048576).toFixed(1)}MB -> ${(after / 1048576).toFixed(1)}MB (saved ${((before - after) / 1048576).toFixed(1)}MB)`);
