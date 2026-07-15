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

import { readdirSync, statSync, writeFileSync, renameSync, unlinkSync } from "node:fs";
import { join, extname } from "node:path";
import sharp from "sharp";

const DIR = "src/assets";
const MIN_BYTES = 250 * 1024; // ignore files already under 250KB
const MAX_WIDTH = 1200;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Windows (antivirus / file-watchers) can transiently lock a file right after
// it's written or while another process (e.g. a dev server) has it open.
// Write to a sibling temp file and rename over the original — atomic, and
// retried a few times so one locked handle doesn't kill the whole run.
const writeAtomic = async (path, buf) => {
  const tmp = `${path}.tmp${process.pid}`;
  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      writeFileSync(tmp, buf);
      renameSync(tmp, path);
      return;
    } catch (err) {
      try { unlinkSync(tmp); } catch { /* ignore */ }
      if (attempt === 5) throw err;
      await sleep(300 * attempt);
    }
  }
};

const files = readdirSync(DIR).filter((f) => [".png", ".jpg", ".jpeg"].includes(extname(f).toLowerCase()));

let before = 0, after = 0, changed = 0, skipped = 0, failed = 0;

for (const file of files) {
  const path = join(DIR, file);
  const origSize = statSync(path).size;
  if (origSize < MIN_BYTES) { skipped++; continue; }

  try {
    const img = sharp(path);
    const meta = await img.metadata();
    const pipeline = img.resize({ width: MAX_WIDTH, withoutEnlargement: true });
    const isPng = extname(file).toLowerCase() === ".png";
    const buf = isPng
      ? await pipeline.png({ quality: 90, palette: true, compressionLevel: 9 }).toBuffer()
      : await pipeline.jpeg({ quality: 82, mozjpeg: true }).toBuffer();

    if (buf.length < origSize * 0.85) {
      await writeAtomic(path, buf);
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
  } catch (err) {
    failed++;
    console.log(`✗ ${file}: FAILED — ${err.message}`);
  }
}

console.log(`\nCompressed ${changed} files, skipped ${skipped}, failed ${failed}.`);
console.log(`Total: ${(before / 1048576).toFixed(1)}MB -> ${(after / 1048576).toFixed(1)}MB (saved ${((before - after) / 1048576).toFixed(1)}MB)`);
