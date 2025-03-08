const fs = require('fs');
const path = require('path');

// Hexo 生成的公共目录路径
const publicDir = path.join(__dirname, 'public');
const cssPath = path.join(publicDir, 'css', 'index.css');

// 检查 CSS 文件是否存在
if (fs.existsSync(cssPath)) {
  const cssContent = fs.readFileSync(cssPath, 'utf8');

  // 遍历所有 HTML 文件
  const htmlFiles = fs.readdirSync(publicDir).filter(file => file.endsWith('.html'));
  htmlFiles.forEach(file => {
    const filePath = path.join(publicDir, file);
    let htmlContent = fs.readFileSync(filePath, 'utf8');

    // 替换占位符 <!-- inline-css --> 为内联的 CSS 内容
    htmlContent = htmlContent.replace('<!-- inline-css -->', `<style>${cssContent}</style>`);
    fs.writeFileSync(filePath, htmlContent);
    console.log(`已内联 CSS 到文件: ${file}`);
  });
}