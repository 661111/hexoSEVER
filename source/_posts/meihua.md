---
title: Butterfly美化-1
description: 从零开始美化butterfly，并且魔改
date: 2025-02-05 8:00
cover: /img/2025/01/meihua-post/cover.webp
category: hexo
top_img: /img/2025/01/meihua-post/cover.webp
tags: hexo,butterfly
---
# 一.仿轻笑博客背景美化
<details>
<summary>请查看教程内容</summary>
在 [blogroot]\themes\butterfly\layout\includes\head.pug 中引入 div模块
``` pug
#web_bg
#svg_bg
```
在自定义css里面引入以下样式
``` css
#web_bg {
    position: fixed;
    z-index: -999;
    width: 100%;
    height: 100%;
    background: -webkit-linear-gradient(35deg, #0095c2 21%, #64e1C8f9 100%);
    background: -moz-linear-gradient(35deg, #0095c2 21%, #64e1C8f9 100%);
    background: -o-linear-gradient(35deg, #0095c2 21%, #64e1C8f9 100%);
    background: -ms-linear-gradient(35deg, #0095c2 21%, #64e1C8f9 100%);
    background: linear-gradient(55deg, #0095c2 21%, #64e1C8f9 100%);
    background-attachment: local;
    background-position: center;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    background-size: cover;
    background-repeat: no-repeat;
}
#svg_bg {
    background-image: url(https://www.sxiaohe.top/img/background.svg);
    -webkit-background-size: initial;
    -moz-background-size: initial;
    background-size: initial;
    position: fixed;
    height: 100%;
    width: 100%;
    opacity: .2;
    background-position: center;
    z-index: -998;
}
```
</details>