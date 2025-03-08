const fs = require('fs');
const path = require('path');

hexo.extend.filter.register('after_generate', function () {
  console.log('after_generate 钩子已触发');

  // 延迟 2 秒执行，确保 CSS 文件生成
  setTimeout(() => {
    const cssPath = path.join(hexo.public_dir, 'css', 'index.css');
    console.log('CSS 文件路径:', cssPath);
    console.log('CSS 文件是否存在:', fs.existsSync(cssPath));

    if (fs.existsSync(cssPath)) {
      const cssContent = fs.readFileSync(cssPath, 'utf8');
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
  }, 2000); // 延迟 2 秒
});