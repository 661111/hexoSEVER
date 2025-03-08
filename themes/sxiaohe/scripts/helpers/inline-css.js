const fs = require('fs');
const path = require('path');

hexo.extend.filter.register('after_generate', function () {
  // CSS 文件路径
  const cssPath = path.join(hexo.public_dir, 'css', 'index.css');

  // 未生成前调试信息
  console.log('Hexo 公共目录:', hexo.public_dir);
  console.log('CSS 文件路径:', cssPath);
  console.log('CSS 文件是否存在:', fs.existsSync(cssPath));

  // 检查 CSS 文件是否存在
  if (fs.existsSync(cssPath)) {
    // 读取 CSS 文件内容
    const cssContent = fs.readFileSync(cssPath, 'utf8');

    // 遍历所有 HTML 文件，内联 CSS
    const htmlFiles = fs.readdirSync(hexo.public_dir).filter(file => file.endsWith('.html'));
    htmlFiles.forEach(file => {
      const filePath = path.join(hexo.public_dir, file);
      let htmlContent = fs.readFileSync(filePath, 'utf8');
      htmlContent = htmlContent.replace('<!-- inline-css -->', `<style>${cssContent}</style>`);
      fs.writeFileSync(filePath, htmlContent);
    });
  } else {
    console.error('CSS 文件未找到:', cssPath);
  }
});