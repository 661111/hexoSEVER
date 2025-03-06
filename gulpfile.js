const { src, dest, parallel } = require('gulp');
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-html-minifier-terser');
const htmlclean = require('gulp-htmlclean');
const terser = require('gulp-terser');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');

// 错误处理函数
const handleError = (err) => {
    notify.onError({
        title: `Gulp 任务出错: ${err.plugin}`,
        message: `错误信息: ${err.message}`,
        sound: 'Basso'
    })(err);
    this.emit('end');
};

// 压缩 JavaScript
const compressJS = () => {
    return src(['./public/**/*.js', '!./public/**/*.min.js'])
       .pipe(plumber({ errorHandler: handleError }))
       .pipe(terser())
       .pipe(dest('./public'));
};

// 压缩 CSS
const minifyCSS = () => {
    return src(['./public/**/*.css'])
       .pipe(plumber({ errorHandler: handleError }))
       .pipe(cleanCSS({
            compatibility: 'ie11',
            level: {
                1: {
                    specialComments: 0 // 移除所有注释
                },
                2: {
                    mergeMedia: true, // 合并媒体查询
                    removeEmpty: true // 移除空的规则
                }
            }
        }))
       .pipe(dest('./public'));
};

// 压缩 HTML
const minifyHTML = () => {
    return src('./public/**/*.html')
       .pipe(plumber({ errorHandler: handleError }))
       .pipe(htmlclean())
       .pipe(htmlmin({
            removeComments: true, // 清除 HTML 注释
            collapseWhitespace: true, // 压缩 HTML
            collapseBooleanAttributes: true, // 省略布尔属性的值
            removeEmptyAttributes: true, // 删除所有空格作属性值
            removeScriptTypeAttributes: true, // 删除 <script> 的 type="text/javascript"
            removeStyleLinkTypeAttributes: true, // 删除 <style> 和 <link> 的 type="text/css"
            minifyJS: true, // 压缩页面 JS
            minifyCSS: true, // 压缩页面 CSS
            minifyURLs: true // 压缩页面 URL
        }))
       .pipe(dest('./public'));
};

// 导出任务
exports.compress = compressJS;
exports['minify-css'] = minifyCSS;
exports['minify-html'] = minifyHTML;
exports.default = parallel(compressJS, minifyCSS, minifyHTML);