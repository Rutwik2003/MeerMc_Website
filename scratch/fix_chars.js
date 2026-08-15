const fs = require('fs');
const path = require('path');

function checkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory() && !fullPath.includes('node_modules') && !fullPath.includes('.next')) {
      checkDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      const original = content;
      // These represent the mangled sequences from Windows-1252 to UTF-8
      content = content.replace(/â€¢/g, '•');
      content = content.replace(/â€”/g, '—');
      content = content.replace(/â€™/g, '\'');
      content = content.replace(/â€œ/g, '"');
      content = content.replace(/â€/g, '"'); // catch all quotes
      content = content.replace(/â/g, ''); // catch any leftover â
      
      if (content !== original) {
        console.log('Fixed corrupted chars in: ' + fullPath);
        fs.writeFileSync(fullPath, content);
      }
    }
  }
}

checkDir('./app');
checkDir('./components');
console.log('Done scanning!');
