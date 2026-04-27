const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const publicDir = path.join(__dirname, 'public');
const servicePagesDir = path.join(publicDir, 'asset', 'ServicePages');

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      arrayOfFiles.push(path.join(dirPath, "/", file));
    }
  });
  return arrayOfFiles;
}

async function compressImage(fullPath) {
  const actualExt = path.extname(fullPath);
  const extLower = actualExt.toLowerCase();
  
  if (fullPath.includes('_opt.webp') || !['.png', '.jpg', '.jpeg', '.webp'].includes(extLower)) {
    return;
  }

  const relativePath = path.relative(publicDir, fullPath);
  
  // Robust way to replace extension regardless of case
  const pathWithoutExt = fullPath.slice(0, -actualExt.length);
  const outPath = pathWithoutExt + '_opt.webp';

  if (fs.existsSync(outPath)) {
    const originalStat = fs.statSync(fullPath);
    const optStat = fs.statSync(outPath);
    if (optStat.mtime > originalStat.mtime) {
      return;
    }
  }

  const originalSize = fs.statSync(fullPath).size;

  try {
    await sharp(fullPath)
      .resize(1400, 1050, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({ quality: 80, effort: 5 })
      .toFile(outPath);

    const newSize = fs.statSync(outPath).size;
    const saved = ((1 - newSize / originalSize) * 100).toFixed(1);
    
    if (originalSize > 500 * 1024) { 
        console.log(`✅ ${relativePath}: ${(originalSize/1024/1024).toFixed(2)}MB → ${(newSize/1024/1024).toFixed(2)}MB (${saved}% saved)`);
    } else if (originalSize > 0) {
        // console.log(`✅ ${relativePath}: ${(originalSize/1024).toFixed(0)}KB optimized`);
    }
  } catch (err) {
    console.error(`❌ Error processing ${relativePath}: ${err.message}`);
  }
}

(async () => {
  console.log('🔧 Starting Comprehensive Image Optimization...\n');
  
  const scanDirs = [
    servicePagesDir,
    path.join(publicDir, 'asset', 'landing-page')
  ];

  for (const dir of scanDirs) {
    if (fs.existsSync(dir)) {
      console.log(`Scanning ${path.relative(publicDir, dir)}...`);
      const files = getAllFiles(dir);
      for (const file of files) {
        await compressImage(file);
      }
    }
  }

  console.log('\n✅ Optimization Complete!');
})();
