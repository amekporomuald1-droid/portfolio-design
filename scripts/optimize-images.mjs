import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SRC_DIR = path.join(__dirname, "../assets-src/travaux");
const DEST_DIR = path.join(__dirname, "../public/images/travaux");
const BRAND_SRC = path.join(__dirname, "../public/brand");
const BRAND_DEST = path.join(__dirname, "../public/brand");

const MAX_WIDTH = 1920;
const THUMB_WIDTH = 960;
const QUALITY = 82;

// Logo sizes
const LOGO_SIZES = [128, 256];

async function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function optimizeImage(srcPath, destPath, width, quality) {
  try {
    await sharp(srcPath)
      .resize(width, null, { fit: "inside", withoutEnlargement: true })
      .webp({ quality })
      .toFile(destPath);
    console.log(`✓ ${path.basename(destPath)}`);
  } catch (err) {
    console.error(`✗ ${srcPath}: ${err.message}`);
  }
}

async function optimizeWorkImages() {
  console.log("Optimisation des travaux...");
  await ensureDir(DEST_DIR);

  const files = fs.readdirSync(SRC_DIR).filter((f) => /\.(png|jpg|jpeg|webp)$/i.test(f));

  for (const file of files) {
    const srcPath = path.join(SRC_DIR, file);
    const baseName = path.parse(file).name;
    const destPath = path.join(DEST_DIR, `${baseName}.webp`);
    const thumbPath = path.join(DEST_DIR, `${baseName}-thumb.webp`);

    await optimizeImage(srcPath, destPath, MAX_WIDTH, QUALITY);
    await optimizeImage(srcPath, thumbPath, THUMB_WIDTH, QUALITY);
  }
}

async function optimizeLogos() {
  console.log("Optimisation des logos...");
  await ensureDir(BRAND_DEST);

  const logos = ["logo-icone-bordeaux.png", "logo-icone-blanc.png"];

  for (const logo of logos) {
    const srcPath = path.join(BRAND_SRC, logo);
    if (!fs.existsSync(srcPath)) {
      console.log(`⚠ ${logo} introuvable, ignoré`);
      continue;
    }

    for (const size of LOGO_SIZES) {
      const baseName = path.parse(logo).name;
      const destPath = path.join(BRAND_DEST, `${baseName}-${size}.png`);
      await optimizeImage(srcPath, destPath, size, QUALITY);
    }
  }
}

async function main() {
  try {
    if (!fs.existsSync(SRC_DIR)) {
      console.log(`⚠ Répertoire source ${SRC_DIR} introuvable`);
      console.log("Déplacez les originaux de public/images/travaux/ vers assets-src/travaux/");
      return;
    }

    await optimizeWorkImages();
    await optimizeLogos();
    console.log("Optimisation terminée !");
  } catch (err) {
    console.error("Erreur:", err);
    process.exit(1);
  }
}

main();
