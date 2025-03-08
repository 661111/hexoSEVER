const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const cssPath = path.join(publicDir, 'css', 'index.css');

console.log('Hexo 公共目录:', publicDir);
console.log('CSS 文件路径:', cssPath);

if (fs.existsSync(cssPath)) {
  const cssContent = fs.readFileSync(cssPath, 'utf8');
  console.log('CSS 文件内容:', cssContent);

  // 递归遍历 public 目录下的所有 HTML 文件
  function processDirectory(dir) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        // 如果是目录，递归处理
        processDirectory(filePath);
      } else if (file.endsWith('.html')) {
        // 如果是 HTML 文件，内联 CSS
        let htmlContent = fs.readFileSync(filePath, 'utf8');
        console.log(`处理文件: ${filePath}`);

        // 替换 .neilian-class 元素的内容
        htmlContent = htmlContent.replace(
          /<style class="neilian-class"><\/style>/,
          `<style>${cssContent}</style>`
        );

        fs.writeFileSync(filePath, htmlContent);
        console.log(`已更新文件: ${filePath}`);
      }
    });
  }

  // 开始处理 public 目录
  processDirectory(publicDir);
} else {
  console.error('CSS 文件未找到:', cssPath);
}