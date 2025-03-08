const fs = require('fs');
const path = require('path')

hexo.extend.filter.register('after_render:html', function (str, data) {
  // 生成的 CSS 文件路径
  const cssPath = path.join(hexo.public_dir, 'css/index.css');
  console.log('Hexo 公共目录:', hexo.public_dir);
  console.log('CSS 文件路径:', cssPath);
  console.log('CSS 文件是否存在:', fs.existsSync(cssPath));
  // 检查 CSS 文件是否存在
  if (fs.existsSync(cssPath)) {
    // 读取 CSS 文件内容
    const cssContent = fs.readFileSync(cssPath, 'utf8');

    // 替换 Pug 模板中的占位符
    str = str.replace('<!-- inline-css -->', `<style>${cssContent}</style>`);
  }

  return str;
});