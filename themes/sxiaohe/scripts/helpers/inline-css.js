const fs = require('fs');
const path = require('path');

hexo.extend.filter.register('after_post_render', function (data) {
  const cssPath = path.join(hexo.public_dir, 'css', 'index.css');
  console.log('CSS 文件路径:', cssPath);
  console.log('CSS 文件是否存在:', fs.existsSync(cssPath));

  if (fs.existsSync(cssPath)) {
    const cssContent = fs.readFileSync(cssPath, 'utf8');
    data.content = data.content.replace('<!-- inline-css -->', `<style>${cssContent}</style>`);
  } else {
    console.error('CSS 文件未找到:', cssPath);
  }

  return data;
});