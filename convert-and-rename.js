const fs = require('fs-extra');
const path = require('path');
const sharp = require('sharp');
const { nanoid } = require('nanoid');

// --- Configuration ---
const inputDir = './public/images/banners';         // Where your JPG/PNG images are
const outputDir = './public/images/banners'; // Where converted WebPs go
const productPrefix = 'prod_';              // Product ID prefix

// --- Create output directory if not exists ---
fs.ensureDirSync(outputDir);

// --- Main Function ---
async function convertImages() {
  const files = await fs.readdir(inputDir);
  const imageFiles = files.filter(file =>
    ['.jpg', '.jpeg', '.png'].includes(path.extname(file).toLowerCase())
  );

  for (const file of imageFiles) {
    const inputPath = path.join(inputDir, file);
    const productId = productPrefix + nanoid(8); // e.g., prod_d3k92alx
    const outputFile = productId + '.webp';
    const outputPath = path.join(outputDir, outputFile);

    try {
      await sharp(inputPath)
        .webp({ quality: 80 })
        .toFile(outputPath);
      console.log(`✅ Converted: ${file} → ${outputFile}`);
    } catch (err) {
      console.error(`❌ Failed to convert ${file}:`, err);
    }
  }
}

convertImages();
