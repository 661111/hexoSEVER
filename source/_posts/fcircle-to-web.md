---
title: 友链朋友圈前端部署方案
description: 本篇转载几种不同方案（已经放好原文章链接）
date: '2025-03-06 12:45'
updated: '2025-03-06 17:04'
cover: https://jsd.sxiaohe.top/gh/661111/hexoSEVER/source/img/2025/01/daohanglan/cover.avif
category:
  - hexo
  - butterfly
top_img: false
tags:
  - hexo
  - butterfly
  - 美化
  - 友链朋友圈
abbrlink: 2901kf
---
# 壹.原文来源
{% link 友链朋友圈5 - 我的部署历程与主题样式分享,张洪Heo,https://blog.zhheo.com/p/4e18a507.html %}
{% link 鱼塘朋友圈部署前端方案,安知鱼,https://blog.anheyu.com/posts/3753.html %}

# 贰.zhheo样式
## 1.添加朋友圈页面
``` CODE
hexo new page fcircle
```
## 2.进入[blogroot]/source/fcircle/index.md，添加以下代码
``` MARKDOWN
---
title: 朋友圈
date: 2022-10-09 00:38:16
---

<div id="hexo-circle-of-friends-root"></div>
<script>
    let UserConfig = {
        // 填写你的api地址
        private_api_url: 'http://192.168.142.88:8000/',
        // 点击加载更多时，一次最多加载几篇文章，默认10
        page_turning_number: 12,
        // 头像加载失败时，默认头像地址
        error_img: 'https://sdn.geekzu.org/avatar/57d8260dfb55501c37dde588e7c3852c',
        // 进入页面时第一次的排序规则
        sort_rule: 'created'
    }
</script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/zhheo/JS-Heo@master/mainColor/heoMainColor.css">
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/zhheo/JS-Heo@master/moments5/app.min.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/zhheo/JS-Heo@master/moments5/bundle.js"></script>
```

# 叁.安知鱼样式
## 1.安装插件
在博客根目录[Blogroot]下打开终端，运行以下指令（与旧版前端方案不兼容，如有安装旧版请先卸载）：
``` BASH
npm uninstall hexo-butterfly-fcircle --save
npm uninstall hexo-filter-fcircle --save
npm install hexo-filter-fcircle-anzhiyu --save
```
## 2.添加配置信息
在站点配置文件_config.yml或者主题配置文件例如_config.butterfly.yml中添加:
``` YML
# fcircle
# see https://blog.anheyu.com/posts/3753.html
fcircle:
  enable: true #控制开关
  apiurl: https://friends.anheyu.com/ #api地址
  initnumber: 30 #【可选】页面初始化展示文章数量
  stepnumber: 30 #【可选】每次加载增加的篇数
  css: https://npm.elemecdn.com/hexo-filter-fcircle-anzhiyu@1.1.2/assets/css/default.css #【可选】开发者接口，自定义css链接
  js: https://npm.elemecdn.com/hexo-filter-fcircle-anzhiyu@1.1.2/assets/js/fcircle.js #【可选】开发者接口，自定义js链接
  fetchJs: https://npm.elemecdn.com/hexo-filter-fcircle-anzhiyu@1.1.2/assets/js/fetch.js
  randomFriendsPostJS: https://npm.elemecdn.com/hexo-filter-fcircle-anzhiyu@1.1.2/assets/js/random-friends-post.js
  topIcon: fas fa-arrow-right
  topLink: /about/
  top_background: https://img02.anheyu.com/adminuploads/1/2022/08/21/630249e2df20f.jpg
  path: /fcircle #【可选】fcircle的路径名称。默认为 fcircle，生成的页面为 fcircle/index.html
  front_matter: #【可选】fcircle页面的 front_matter 配置
    title: 朋友圈
    comments: false
    aside: false
    top_img: false
```
## 3.插件参数释义:
**参数**                            | **备选值/类型**  |	**释义**
------------------------------------|-------------|-------------------------------------------------------------------------------------------------------
**enable**                          | true/false  |	控制开关
**apiurl**                          | URL	      | api 链接，配置教程参看后端部署文档
**initnumber**                      | number      |【可选】填写阿拉伯数字，页面展示文章数量，默认 20
**stepnumber**                      | number      |【可选】填写阿拉伯数字，每次加载增加的篇数，默认 10
**error_img**                       | URL         |【可选】头像图片加载失败时的默认头像
**css**                             | URL         |【可选】开发者接口，自定义 css 链接
**js**                              | URL         |【可选】开发者接口，自定义 js 链接
**fetchJs**                         | URL         |【可选】开发者接口，自定义 fetchJs 链接
**randomFriendsPostJS**             | URL         |【可选】开发者接口，自定义 randomFriendsPostJS 链接
**path**                            | string	  |【可选】字符串，fcircle 的路径名称。默认为 fcircle，生成的页面为 fcircle/index.html
**topIcon**                         | string	  |【可选】字符串，顶部按钮的图标类名
**topLink**                         | URL         |【可选】字符串，顶部按钮点击跳转的链接（仅支持 pjax 跳转）
**front_matter**                    | object	  |【可选】写法见上文示例，fcircle 页面的 front_matter 配置
**top_background**                  | URL         |【可选】字符串，页面顶部模块背景图

## 4.样式适配
样式适配
安装完成 ✅ 以后，会发现顶部样式有亿点奇怪, 需要与自己的主题样式进行适配, 可以尝试加入以下自定义 css。
1.颜色说明: 该项目中 css 使用了 css 变量, 添加变量 css 如下, 您可自行修改。
``` CSS
/* 颜色 */
:root {
  --anzhiyu-theme-op: #4259ef23;
  --anzhiyu-gray-op: #9999992b;
  --anzhiyu-theme-top: var(--anzhiyu-theme);
  --anzhiyu-white: #fff;
  --anzhiyu-white-op: rgba(255, 255, 255, 0.2);
  --anzhiyu-black: #000;
  --anzhiyu-black-op: rgba(0, 0, 0, 0.2);
  --anzhiyu-none: rgba(0, 0, 0, 0);
  --anzhiyu-gray: #999999;
  --anzhiyu-yellow: #ffc93e;
  --anzhiyu-border-radius: 8px;
  --anzhiyu-main: var(--anzhiyu-theme);
  --anzhiyu-main-op: var(--anzhiyu-theme-op);
  --anzhiyu-shadow-theme: 0 8px 12px -3px var(--anzhiyu-theme-op);
  --anzhiyu-shadow-main: 0 8px 12px -3px var(--anzhiyu-main-op);
  --anzhiyu-shadow-blue: 0 8px 12px -3px rgba(40, 109, 234, 0.2);
  --anzhiyu-shadow-white: 0 8px 12px -3px rgba(255, 255, 255, 0.2);
  --anzhiyu-shadow-black: 0 0 12px 4px rgba(0, 0, 0, 0.05);
  --anzhiyu-shadow-yellow: 0px 38px 77px -26px rgba(255, 201, 62, 0.12);
  --anzhiyu-shadow-red: 0 8px 12px -3px #ee7d7936;
  --anzhiyu-shadow-green: 0 8px 12px -3px #87ee7936;
  --anzhiyu-shadow-border: 0 8px 16px -4px #2c2d300c;
  --anzhiyu-shadow-blackdeep: 0 2px 16px -3px rgba(0, 0, 0, 0.15);
  --anzhiyu-logo-color: linear-gradient(215deg, #4584ff 30%, #ff7676 70%);
  --style-border: 1px solid var(--anzhiyu-card-border);
  --anzhiyu-blue-main: #3b70fc;
  --style-border-hover: 1px solid var(--anzhiyu-main);
  --style-border-dashed: 1px dashed var(--anzhiyu-theme-op);
  --style-border-avatar: 4px solid var(--anzhiyu-background);
  --style-border-always: 1px solid var(--anzhiyu-card-border);
  --anzhiyu-white-acrylic1: #fefeff !important;
  --anzhiyu-white-acrylic2: #fcfdff !important;
  --anzhiyu-black-acrylic2: #08080a !important;
  --anzhiyu-black-acrylic1: #0b0b0e !important;
  --anzhiyu-main-none: #b8b8b800 !important;
}

[data-theme="light"] {
  --anzhiyu-theme: #3b70fc;
  --anzhiyu-theme-op: #4259ef23;
  --anzhiyu-blue: #3b70fc;
  --anzhiyu-red: #d8213c;
  --anzhiyu-pink: #ff7c7c;
  --anzhiyu-green: #57bd6a;
  --anzhiyu-fontcolor: #363636;
  --anzhiyu-background: #f7f9fe;
  --anzhiyu-reverse: #000;
  --anzhiyu-maskbg: rgba(255, 255, 255, 0.6);
  --anzhiyu-maskbgdeep: rgba(255, 255, 255, 0.85);
  --anzhiyu-hovertext: var(--anzhiyu-theme);
  --anzhiyu-ahoverbg: #f7f7fa;
  --anzhiyu-lighttext: var(--anzhiyu-main);
  --anzhiyu-secondtext: rgba(60, 60, 67, 0.6);
  --anzhiyu-scrollbar: rgba(60, 60, 67, 0.4);
  --anzhiyu-card-btn-bg: #edf0f7;
  --anzhiyu-post-blockquote-bg: #fafcff;
  --anzhiyu-post-tabs-bg: #f2f5f8;
  --anzhiyu-secondbg: #edf0f7;
  --anzhiyu-shadow-nav: 0 5px 12px -5px rgba(102, 68, 68, 0.05);
  --anzhiyu-card-bg: #fff;
  --anzhiyu-shadow-lightblack: 0 5px 12px -5px rgba(102, 68, 68, 0);
  --anzhiyu-shadow-light2black: 0 5px 12px -5px rgba(102, 68, 68, 0);
  --anzhiyu-card-border: #c0c6d8;
}

[data-theme="dark"] {
  --global-bg: #191919;
  --anzhiyu-theme: #0084ff;
  --anzhiyu-theme-op: #0084ff23;
  --anzhiyu-blue: #0084ff;
  --anzhiyu-red: #ff3842;
  --anzhiyu-pink: #ff7c7c;
  --anzhiyu-green: #57bd6a;
  --anzhiyu-fontcolor: #f7f7fa;
  --anzhiyu-background: #18171d;
  --anzhiyu-reverse: #fff;
  --anzhiyu-maskbg: rgba(0, 0, 0, 0.6);
  --anzhiyu-maskbgdeep: rgba(0, 0, 0, 0.85);
  --anzhiyu-hovertext: #0a84ff;
  --anzhiyu-ahoverbg: #fff;
  --anzhiyu-lighttext: #f2b94b;
  --anzhiyu-secondtext: #a1a2b8;
  --anzhiyu-scrollbar: rgba(200, 200, 223, 0.4);
  --anzhiyu-card-btn-bg: #30343f;
  --anzhiyu-post-blockquote-bg: #000;
  --anzhiyu-post-tabs-bg: #121212;
  --anzhiyu-secondbg: #30343f;
  --anzhiyu-shadow-nav: 0 5px 20px 0px rgba(28, 28, 28, 0.4);
  --anzhiyu-card-bg: #1d1b26;
  --anzhiyu-shadow-lightblack: 0 5px 12px -5px rgba(102, 68, 68, 0);
  --anzhiyu-shadow-light2black: 0 5px 12px -5px rgba(102, 68, 68, 0);
  --anzhiyu-card-border: #42444a;
}
```
2.整页背景调整: 可以自行使用样式进行覆盖
``` CSS
#web_bg ~ .page:has(.fcircle_page) {
  background-color: #f7f9fe !important;
}
```
## 5.顶部图片样式修改
可以通过配置项top_background修改
<!-- endtab -->

<!-- tab fomal版本 -->
在Heo样式的基础上，重新换了一些CDN以及一些细节微调，看完Heo的教程并配置好前端后，可以将fcircle.md文件的内容覆写为以下形式，记住填上你的API以及error_img：
``` MARKDOWN
<style>
  #cf-container {
    background: transparent !important;
  }
  .cf-article .cf-article-title:hover {
    color: #f4f4f4 !important;
  }
  .cf-img-avatar {
    opacity: .4 !important;
  }
  .cf-article-author:hover {
    background: var(--theme-color) !important;
  }
  #cf-more:hover {
    background: var(--theme-color) !important;
  }
  .cf-overshow p a:hover {
    color: #f4f4f4 !important;
  }
  .cf-article {
    transition: transform linear 0.3s;
  }
  .cf-article:hover {
    transform: scale(1.05);
    box-shadow: 0 5px 10px 8px #07111b29;
  }
  .cf-article {
    border-radius: 15px !important;
    border: 1px solid #a5a5a5ee !important;
  }
  ::selection {
  background: var(--theme-color) !important;
  color: #f4f4f4 !important;
  }
</style>

<div id="hexo-circle-of-friends-root"></div>
<script>
    let UserConfig = {
        // 填写你的api地址
        private_api_url: '',
        // 点击加载更多时，一次最多加载几篇文章，默认10
        page_turning_number: 12,
        // 头像加载失败时，默认头像地址
        error_img: '',
        // 进入页面时第一次的排序规则
        sort_rule: 'created'
    }
</script>
<link rel="stylesheet" href="https://cdn1.tianli0.top/gh/zhheo/JS-Heo@master/mainColor/heoMainColor.css">
<script type="text/javascript" src="https://cdn1.tianli0.top/gh/zhheo/JS-Heo@master/moments5/app.min.js"></script>
<script type="text/javascript" src="https://cdn1.tianli0.top/gh/zhheo/JS-Heo@master/moments5/bundle.js"></script>
```