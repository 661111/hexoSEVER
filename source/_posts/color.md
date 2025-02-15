---
title: 颜色样式
description: 适配样式的颜色（后续会更新）
date: '2025-02-14 9:00'
cover: /img/2025/01/daohanglan/cover.avif
category:
  - hexo
top_img: /img/2025/01/daohanglan/cover.avif
tags:
  - hexo
  - butterfly
abbrlink: 90908
---
# 一.安知鱼样式

在自定义文件中写入，以下代码
``` CSS
/* 颜色 */
:root {
    --anzhiyu-theme-op: #4259ef23;
    --anzhiyu-white: #fff;
    --anzhiyu-black: #000;
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

# 二.轻笑样式

在自定义文件中写入，以下代码

``` CSS
:root {
    --mj-white: #fff;
    --mj-card-bg: rgba(255, 255, 255, 0.67);
    --mj-theme: #128adadb;
    --mj-secondbg: #ededed;
    --mj-card-border: #e3e8f7;
    --mj-style-border: 2px solid rgba(0, 255, 255, 0.6);
    --anchor-border: 1px solid rgba(21, 158, 208, 0.8);
    --style-hover-border: 2px solid var(--mj-theme)
}

[data-theme=dark] {
    --mj-card-bg: rgba(0, 0, 0, 0.6);
    --style-border: 2px solid rgba(56, 211, 203, 0.8)
}
```

# 三.heo样式

在自定义文件中写入，以下代码

``` CSS
:root{
    --heo-white: #fff;
    --heo-black: #000;
    --heo-none: rgba(0,0,0,0);
    --heo-gray: #999999;
    --heo-yellow: #ffc93e;
    --heo-main: var(--heo-theme);
    --heo-main-op: var(--heo-theme-op);
    --heo-shadow-theme: 0 8px 12px -3px var(--heo-theme-op);
    --heo-shadow-main: 0 8px 12px -3px var(--heo-main-op);
    --heo-shadow-blue: 0 8px 12px -3px rgba(40, 109, 234,.20);
    --heo-shadow-white: 0 8px 12px -3px rgba(255, 255, 255,.20);
    --heo-shadow-black: 0 0 12px 4px rgba(0, 0, 0,.05);
    --heo-shadow-yellow: 0px 38px 77px -26px rgba(255, 201, 62,.12);
    --heo-shadow-red: 0 8px 12px -3px #ee7d7936;
    --heo-shadow-green: 0 8px 12px -3px #87ee7936;
    --heo-logo-color: linear-gradient(215deg,#4584ff 30%,#ff7676 70%);
    --style-border: 1px solid var(--heo-card-border);
    --style-border-hover: 1px solid var(--heo-theme);
  }
  
  ::selection {
    background: var(--heo-fontcolor);
    color: var(--heo-background);
  }
  
  [data-theme=light] {
    --heo-theme: #425AEF;
    --heo-theme-op: #4259ef23;
    --heo-blue: #425AEF;
    --heo-red: #D8213C;
    --heo-pink: #FF7C7C;
    --heo-green: #57bd6a;
    --heo-fontcolor: #363636;
    --heo-background: #f7f9fe;
    --heo-reverse: #000;
    --heo-maskbg: rgba(255, 255, 255, 0.6);
    --heo-maskbgdeep: rgba(255, 255, 255, 0.85);
    --heo-hovertext: var(--heo-theme);
    --heo-ahoverbg: #F7F7FA;
    --heo-lighttext: var(--heo-main);
    --heo-secondtext: rgba(60, 60, 67, 0.6);
    --heo-scrollbar: rgba(60, 60, 67, 0.4);
    --heo-card-btn-bg: #edf0f7;
    --heo-post-blockquote-bg: #fafcff;
    --heo-post-tabs-bg: #f2f5f8;
    --heo-secondbg: #edf0f7;
    --heo-shadow-nav:0 5px 12px -5px rgba(102, 68, 68, 0.05);
    --heo-card-bg: #fff;
    --heo-shadow-lightblack:0 5px 12px -5px rgba(102, 68, 68, 0.00);
    --heo-shadow-light2black:0 5px 12px -5px rgba(102, 68, 68, 0.00);
    --heo-card-border: #e3e8f7;
  }
  
  [data-theme=dark] {
    --heo-theme: #0084FF;
    --heo-theme-op: #0084FF23;
    --heo-blue: #0084FF;
    --heo-red: #FF3842;
    --heo-pink: #FF7C7C;
    --heo-green: #57bd6a;
    --heo-fontcolor: #F7F7FA;
    --heo-background: #18171d;
    --heo-reverse: #fff;
    --heo-maskbg: rgba(0,0,0, 0.6);
    --heo-maskbgdeep: rgba(0,0,0, 0.85);
    --heo-hovertext: #0A84FF;
    --heo-ahoverbg: #fff;
    --heo-lighttext: #f2b94b;
    --heo-secondtext: #a1a2b8;
    --heo-scrollbar: rgba(200, 200, 223, 0.4);
    --heo-card-btn-bg: #30343f;
    --heo-post-blockquote-bg: #000;
    --heo-post-tabs-bg: #121212;
    --heo-secondbg: #30343f;
    --heo-shadow-nav:0 5px 20px 0px rgba(28, 28, 28, 0.4);
    --heo-card-bg: #1d1b26;
    --heo-shadow-lightblack:0 5px 12px -5px rgba(102, 68, 68, 0.0);
    --heo-shadow-light2black:0 5px 12px -5px rgba(102, 68, 68, 0.0);
    --heo-card-border: #42444a;
  }
  
  @media screen and (max-width: 768px){
    :root{
      --style-border: 0px solid var(--heo-card-border);
      --style-border-hover: 0px solid var(--heo-theme);
    }
  }
```

# 四.bwind样式

在自定义文件中写入，以下代码

``` CSS
:root {
    --bywind-white: #fff;
    --bywind-white-op: rgba(255, 255, 255, 0.2);
    --bywind-black: #000;
    --bywind-black-op: rgba(0, 0, 0, 0.2);
    --bywind-none: #00000000;
    --bywind-gray: #999999;
    --bywind-gray-op: #9999992b;
    --bywind-vip: #e5a80d;
    --bywind-main: var(--bywind-theme);
    --bywind-main-op: var(--bywind-theme-op);
    --bywind-main-op-deep: var(--bywind-theme-op-deep);
    --bywind-main-none: var(--bywind-theme-none);
    --bywind-shadow-theme: 0 8px 12px -3px var(--bywind-theme-op);
    --bywind-shadow-blackdeep: 0 2px 16px -3px rgba(0, 0, 0, .15);
    --bywind-shadow-main: 0 8px 12px -3px var(--bywind-main-op);
    --bywind-shadow-blue: 0 8px 12px -3px rgba(40, 109, 234, .20);
    --bywind-shadow-white: 0 8px 12px -3px rgba(255, 255, 255, .20);
    --bywind-shadow-black: 0 0 12px 4px rgba(0, 0, 0, .05);
    --bywind-shadow-yellow: 0px 38px 77px -26px rgba(255, 201, 62, .12);
    --bywind-shadow-red: 0 8px 12px -3px #ee7d7936;
    --bywind-shadow-green: 0 8px 12px -3px #87ee7936;
    --bywind-logo-color: linear-gradient(215deg, #4584ff 0%, #cf0db9 100%);
    --bywind-snackbar-time: 2s;
}

[data-theme=light] {
    --bywind-theme: #425AEF;
    --bywind-theme-op: #4259ef23;
    --bywind-theme-op-deep: #4259efdd;
    --bywind-theme-none: #4259ef01;
    --bywind-blue: #425AEF;
    --bywind-red: #f04a63;
    --bywind-pink: #FF7C7C;
    --bywind-green: #57bd6a;
    --bywind-yellow: #c28b00;
    --bywind-yellow-op: #d99c001a;
    --bywind-orange: #e38100;
    --bywind-purple: #7a60d2;
    --bywind-fontcolor: #363636;
    --bywind-background: #f7f9fe;
    --bywind-reverse: #000;
    --bywind-maskbg: rgba(255, 255, 255, 0.6);
    --bywind-maskbgdeep: rgba(255, 255, 255, 0.85);
    --bywind-hovertext: var(--bywind-main);
    --bywind-ahoverbg: #F7F7FA;
    --bywind-lighttext: var(--bywind-main);
    --bywind-secondtext: rgba(60, 60, 67, 0.8);
    --bywind-scrollbar: rgba(60, 60, 67, 0.4);
    --bywind-card-btn-bg: #edf0f7;
    --bywind-post-blockquote-bg: #fafcff;
    --bywind-post-tabs-bg: #f2f5f8;
    --bywind-secondbg: #f1f3f8;
    --bywind-shadow-nav: 0 5px 12px -5px rgba(102, 68, 68, 0.05);
    --bywind-card-bg: #fff;
    --bywind-card-bg-op: var(--bywind-black-op);
    --bywind-card-bg-none: rgba(255, 255, 255, 0);
    --bywind-shadow-lightblack: 0 5px 12px -5px rgba(102, 68, 68, 0.00);
    --bywind-shadow-light2black: 0 5px 12px -5px rgba(102, 68, 68, 0.00);
    --bywind-card-border: #e3e8f7;
    --bywind-shadow-border: 0 8px 16px -4px #2c2d300c;
    --style-border: 1px solid var(--bywind-card-border);
    --style-border-always: 1px solid var(--bywind-card-border);
    --style-border-hover: 1px solid var(--bywind-main);
    --style-border-hover-always: 1px solid var(--bywind-main);
    --style-border-dashed: 1px dashed var(--bywind-theme-op);
    --style-border-forever: 2px solid var(--bywind-main);
}

[data-theme=dark] {
    --bywind-theme: #f2b94b;
    --bywind-theme-op: #f2b94b23;
    --bywind-theme-op-deep: #f2b94bdd;
    --bywind-theme-none: #f2b94b00;
    --bywind-blue: #0084FF;
    --bywind-red: #FF3842;
    --bywind-pink: #d44040;
    --bywind-green: #3e9f50;
    --bywind-purple: #7a60d2;
    --bywind-yellow: #ffc93e;
    --bywind-yellow-op: #ffc93e30;
    --bywind-orange: #ff953e;
    --bywind-fontcolor: #F7F7FA;
    --bywind-background: #18171d;
    --bywind-reverse: #fff;
    --bywind-maskbg: rgba(0, 0, 0, 0.6);
    --bywind-maskbgdeep: rgba(0, 0, 0, 0.85);
    --bywind-hovertext: #0A84FF;
    --bywind-ahoverbg: #fff;
    --bywind-lighttext: var(--bywind-theme);
    --bywind-secondtext: #a1a2b8;
    --bywind-scrollbar: rgba(200, 200, 223, 0.4);
    --bywind-card-btn-bg: #30343f;
    --bywind-post-blockquote-bg: #000;
    --bywind-post-tabs-bg: #121212;
    --bywind-secondbg: #30343f;
    --bywind-shadow-nav: 0 5px 20px 0px rgba(28, 28, 28, 0.4);
    --bywind-card-bg: #1d1e22;
    --bywind-card-bg-op: var(--bywind-white-op);
    --bywind-card-bg-none: #1d1b2600;
    --bywind-shadow-lightblack: 0 5px 12px -5px rgba(102, 68, 68, 0.0);
    --bywind-shadow-light2black: 0 5px 12px -5px rgba(102, 68, 68, 0.0);
    --bywind-card-border: #3d3d3f;
    --bywind-shadow-border: 0 8px 16px -4px #00000050;
    --style-border: 1px solid var(--bywind-card-border);
    --style-border-always: 1px solid var(--bywind-card-border);
    --style-border-hover: 1px solid var(--bywind-theme);
    --style-border-hover-always: 1px solid var(--bywind-theme);
    --style-border-dashed: 1px dashed var(--bywind-theme-op);
    --style-border-forever: 2px solid var(--bywind-lighttext);
}
```

# 五.icat样式

在自定义文件中写入，以下代码

``` CSS
@charset "UTF-8";:root {
    --icat-white: #fff;
    --icat-white-op: rgba(255, 255, 255, 0.2);
    --icat-black: #000;
    --icat-black-op: rgba(0, 0, 0, 0.2);
    --icat-none: #00000000;
    --icat-gray: #999999;
    --icat-gray-op: #9999992b;
    --icat-vip: #e5a80d;
    --icat-main: var(--icat-theme);
    --icat-main-op: var(--icat-theme-op);
    --icat-main-op-deep: var(--icat-theme-op-deep);
    --icat-main-op-light: var(--icat-theme-op-light);
    --icat-main-none: var(--icat-theme-none);
    --icat-shadow-theme: 0 8px 12px -3px var(--icat-theme-op);
    --icat-shadow-blackdeep: 0 2px 16px -3px rgba(0, 0, 0, .15);
    --icat-shadow-main: 0 8px 12px -3px var(--icat-main-op);
    --icat-shadow-blue: 0 8px 12px -3px rgba(40, 109, 234, .20);
    --icat-shadow-white: 0 8px 12px -3px rgba(255, 255, 255, .20);
    --icat-shadow-black: 0 0 12px 4px rgba(0, 0, 0, .05);
    --icat-shadow-yellow: 0px 38px 77px -26px rgba(255, 201, 62, .12);
    --icat-shadow-red: 0 8px 12px -3px #ee7d7936;
    --icat-shadow-green: 0 8px 12px -3px #87ee7936;
    --icat-logo-color: linear-gradient(215deg, #4584ff 0%, #cf0db9 100%);
    --icat-snackbar-time: 5s;
    --icat-post-bg: var(--icat-blue);
    --style-border-hover-always: 1px solid var(--icat-blue)
}

[data-theme=light] {
    --icat-theme: #425AEF;
    --icat-theme-op: #4259ef23;
    --icat-theme-op-deep: #4259efdd;
    --icat-theme-op-light: #4259ef0d;
    --icat-theme-none: #4259ef01;
    --icat-blue: #425AEF;
    --icat-blue-op: #425AEF4D;
    --icat-red: #f04a63;
    --icat-pink: #FF7C7C;
    --icat-green: #57bd6a;
    --icat-yellow: #c28b00;
    --icat-yellow-op: #d99c001a;
    --icat-orange: #e38100;
    --icat-shadow-orange: 0 8px 12px -3px rgba(227, 129, 0, .2);
    --icat-purple: #7a60d2;
    --icat-fontcolor: #363636;
    --icat-background: #f7f9fe;
    --icat-reverse: #000;
    --icat-maskbg: rgba(255, 255, 255, 0.6);
    --icat-maskbgdeep: rgba(255, 255, 255, 0.85);
    --icat-hovertext: var(--icat-main);
    --icat-ahoverbg: #F7F7FA;
    --icat-lighttext: var(--icat-main);
    --icat-secondtext: rgba(60, 60, 67, 0.8);
    --icat-scrollbar: rgba(60, 60, 67, 0.4);
    --icat-card-btn-bg: #edf0f7;
    --icat-post-blockquote-bg: #fafcff;
    --icat-post-tabs-bg: #f2f5f8;
    --icat-secondbg: #f7f7f9;
    --icat-shadow-nav: 0 5px 12px -5px rgba(102, 68, 68, 0.05);
    --icat-card-bg: #fff;
    --icat-card-bg-op: var(--icat-black-op);
    --icat-card-bg-none: rgba(255, 255, 255, 0);
    --icat-shadow-lightblack: 0 5px 12px -5px rgba(102, 68, 68, 0.00);
    --icat-shadow-light2black: 0 5px 12px -5px rgba(102, 68, 68, 0.00);
    --icat-card-border: #e3e8f7;
    --icat-shadow-border: 0 8px 16px -4px #2c2d300c;
    --icat-tabs-background: #49B1F5;
    --style-border: 1px solid var(--icat-card-border);
    --style-border-hover: 1px solid var(--icat-main);
    --style-border-dashed: 1px dashed var(--icat-theme-op);
    --style-border-forever: 2px solid var(--icat-main)
}

[data-theme=dark] {
    --icat-theme: #f2b94b;
    --icat-theme-op: #f2b94b23;
    --icat-theme-op-deep: #f2b94bdd;
    --icat-theme-none: #f2b94b00;
    --icat-blue: #0084FF;
    --icat-blue-op: #0084FF4D;
    --icat-red: #FF3842;
    --icat-pink: #d44040;
    --icat-green: #3e9f50;
    --icat-purple: #7a60d2;
    --icat-yellow: #ffc93e;
    --icat-yellow-op: #ffc93e30;
    --icat-orange: #ff953e;
    --icat-shadow-orange: 0 8px 12px -3px rgba(255, 149, 62, .2);
    --icat-fontcolor: #F7F7FA;
    --icat-background: #18171d;
    --icat-reverse: #fff;
    --icat-maskbg: rgba(0, 0, 0, 0.6);
    --icat-maskbgdeep: rgba(0, 0, 0, 0.85);
    --icat-hovertext: #0A84FF;
    --icat-ahoverbg: #fff;
    --icat-lighttext: var(--icat-theme);
    --icat-secondtext: #a1a2b8;
    --icat-scrollbar: rgba(200, 200, 223, 0.4);
    --icat-card-btn-bg: #30343f;
    --icat-post-blockquote-bg: #000;
    --icat-post-tabs-bg: #121212;
    --icat-secondbg: #21232a;
    --icat-shadow-nav: 0 5px 20px 0px rgba(28, 28, 28, 0.4);
    --icat-card-bg: #1b1c20;
    --icat-card-bg-op: var(--icat-white-op);
    --icat-card-bg-none: #1d1b2600;
    --icat-shadow-lightblack: 0 5px 12px -5px rgba(102, 68, 68, 0.0);
    --icat-shadow-light2black: 0 5px 12px -5px rgba(102, 68, 68, 0.0);
    --icat-card-border: #3d3d3f;
    --icat-shadow-border: 0 8px 16px -4px #00000050;
    --icat-tabs-background: #81d8cf;
    --style-border: 1px solid var(--icat-card-border);
    --style-border-hover: 1px solid var(--icat-theme);
    --style-border-dashed: 1px dashed var(--icat-theme-op);
    --style-border-forever: 2px solid var(--icat-lighttext)
}
```

# 六.june样式

在自定义文件中写入，以下代码

``` CSS
/* 颜色 */
:root {
    --june: #E68282;
    --june-theme-op: #4259ef23;
    --june-gray-op: #9999992b;
    --june-white: #fff;
    --june-black: #000;
    --june-none: rgba(0, 0, 0, 0);
    --june-purple: #E764FF;
    --june-gray: #999999;
    --june-light-grey: #F2F2F2;
    --june-yellow: #ffc93e;
    --june-orange: #ff9900;
    --june-border-radius: 8px;
    --june-main: var(--june-theme);
    --june-main-op: var(--june-theme-op);
    --june-shadow-theme: 0 8px 12px -3px var(--june-theme-op);
    --june-shadow-main: 0 8px 12px -3px var(--june-main-op);
    --june-shadow-blue: 0 8px 12px -3px rgba(40, 109, 234, 0.2);
    --june-shadow-white: 0 8px 12px -3px rgba(255, 255, 255, 0.2);
    --june-shadow-black: 0 0 12px 4px rgba(0, 0, 0, 0.05);
    --june-shadow-yellow: 0px 38px 77px -26px rgba(255, 201, 62, 0.12);
    --june-shadow-red: 0 8px 12px -3px #ee7d7936;
    --june-shadow-green: 0 8px 12px -3px #87ee7936;
    --june-shadow-border: 0 8px 16px -4px #2c2d300c;
    --june-logo-color: linear-gradient(215deg, #4584ff 30%, #ff7676 70%);
    --style-border: 1px solid var(--june-card-border);
    --june-blue-main: #3b70fc;
    --style-border-hover: 1px solid var(--june-main);
    --style-border-dashed: 1px dashed var(--june-theme-op);
    --style-border-avatar: 4px solid var(--june-background);
    --style-border-always: 1px solid var(--june-card-border);
    --june-white-acrylic1: #fefeff !important;
    --june-white-acrylic2: #fcfdff !important;
    --june-black-acrylic2: #08080a !important;
    --june-black-acrylic1: #0b0b0e !important;
    --middle-y-multiplier: 1.5; /* 假设元素在 Y 轴上的平移为原始位置的 1.5 倍 */
    --middle-scale-multiplier: 1.2; /* 假设元素的纵向缩放为原始大小的 1.2 倍 */
    --heo-theme: var(--june-border) !important;
}

[data-theme="light"] {
    --june-theme: #E68282;
    --june-theme-op: #4259ef23;
    --june-blue: #3b70fc;
    --june-red: #d8213c;
    --june-pink: #ff7c7c;
    --june-green: #57bd6a;
    --june-fontcolor: #4c4948;
    --june-background: #f7f9fe;
    --june-reverse: #000;
    --june-maskbg: rgba(255, 255, 255, 0.6);
    --june-maskbgdeep: rgba(255, 255, 255, 0.85);
    --june-hovertext: var(--june);
    --june-ahoverbg: #f7f7fa;
    --june-lighttext: var(--june-main);
    --june-secondtext: rgba(60, 60, 67, 0.6);
    --june-scrollbar: rgba(60, 60, 67, 0.4);
    --june-card-btn-bg: #edf0f7;
    --june-post-blockquote-bg: #fafcff;
    --june-post-tabs-bg: #f2f5f8;
    --june-secondbg: #f7f7f9;
    --june-shadow-nav: 0 5px 12px -5px rgba(102, 68, 68, 0.05);
    --june-card-bg: #fff;
    --june-shadow-lightblack: 0 5px 12px -5px rgba(102, 68, 68, 0);
    --june-shadow-light2black: 0 5px 12px -5px rgba(102, 68, 68, 0);
    --june-card-border: #c0c6d8;
    --june-copyright-bg: #eff1f3;
    --june-border: #E68282
}

[data-theme="dark"] {
    --june-theme: #333333;
    --june-theme-op: #0084ff23;
    --june-blue: #0084ff;
    --june-red: #ff3842;
    --june-pink: #ff7c7c;
    --june-green: #57bd6a;
    --june-fontcolor: #f7f7fa;
    --june-background: #18171d;
    --june-reverse: #fff;
    --june-maskbg: rgba(0, 0, 0, 0.6);
    --june-maskbgdeep: rgba(0, 0, 0, 0.85);
    --june-hovertext: #0a84ff;
    --june-ahoverbg: #fff;
    --june-lighttext: #f2b94b;
    --june-secondtext: #a1a2b8;
    --june-scrollbar: rgba(200, 200, 223, 0.4);
    --june-card-btn-bg: #30343f;
    --june-post-blockquote-bg: #000;
    --june-post-tabs-bg: #121212;
    --june-secondbg: #30343f;
    --june-shadow-nav: 0 5px 20px 0px rgba(28, 28, 28, 0.4);
    --june-card-bg: #1b1c20;
    --june-shadow-lightblack: 0 5px 12px -5px rgba(102, 68, 68, 0);
    --june-shadow-light2black: 0 5px 12px -5px rgba(102, 68, 68, 0);
    --june-card-border: #42444a;
    --june-copyright-bg: #323335;
    --june-border: #c8c8c8
}
```