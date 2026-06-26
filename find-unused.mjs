import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const publicDirs = ['public/images', 'public/fotos'];
const allImages = [];

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walk(fullPath);
    } else {
      if (/\.(png|jpe?g|gif|svg|webp)$/i.test(fullPath)) {
        allImages.push(fullPath);
      }
    }
  }
}

for (const dir of publicDirs) walk(dir);

const unusedImages = [];
for (const img of allImages) {
  const basename = path.basename(img);
  // We search for the exact filename in app/ components/ lib/ etc
  try {
    execSync(`grep -r "${basename}" app components lib`, { stdio: 'ignore' });
  } catch (e) {
    // grep returns 1 if no matches found
    unusedImages.push(img);
  }
}

console.log("=== UNUSED IMAGES ===");
console.log(unusedImages.join('\n'));

