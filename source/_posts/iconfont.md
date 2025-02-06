---
title: 菜单栏多色动态图标
description: 对导航栏进行修改，以支持多色图标
date: '2025-02-05 10:00'
cover: /img/2025/01/daohanglan/cover.webp
category:
  - hexo
top_img: /img/2025/01/daohanglan/cover.webp
tags:
  - hexo
  - butterfly
abbrlink: 18107
---
# 一.添加iconfont
打开[iconfont](https://www.iconfont.cn/)，进行注册，注册完毕后在搜索栏中进行搜索，搜索到对应图标选择图标，点击右上角进入添加图标到选定的图标库名称。
进入到图标库后可以选择项目设置，设置彩色图标,设置页面如下，我们选择彩色，如果需要自定义图标，可以在这里自定义, **这里不推荐自定义**
![如图所示](/img/2025/01/iconfont/1.png)
# 二.添加到菜单
{% note warning flat %}
前置教程：[Hexo引入阿里矢量图标库-iconfont inject](https://akilar.top/posts/d2ebecef/)和[基于Butterfly的外挂标签引入-Tag Plugins Plus](https://akilar.top/posts/615e2dec/#%E5%8A%A8%E6%80%81%E6%A0%87%E7%AD%BE-anima)中关于动态标签anima的内容。请确保您已经完成了前置教程，并实现了在文章中使用symbol写法来引入iconfont图标。同时引入了fontawesome_animation的前置依赖。
主要检查您的inject配置项中是否有这两个依赖
``` YAML
inject:
  head:
    #动画标签anima的依赖
    - <link rel="stylesheet" href="https://cdn.jsdmirror.com/gh/l-lin/font-awesome-animation/dist/font-awesome-animation.min.css"  media="defer" onload="this.media='all'">
  bottom:
    # 阿里矢量图标,这串是我的图标库，你的链接会有所不同。
    - <script async src="//at.alicdn.com/t/font_2032782_ev6ytrh30f.js"></script>
```
{% endnote %}
替换[BlogRoot]\themes\butterfly\layout\includes\header\menu_item.pug为以下代码，本方案默认使用观感最佳的悬停父元素触发子元素动画效果，默认动画为faa-tada。**注意：可以把之前的代码注释掉，再在后面加上如下代码，以便于回滚**。我这里放出**[fomal](https://www.fomal.cc/posts/5389e93f.html#%E8%8F%9C%E5%8D%95%E6%A0%8F%E5%A4%9A%E8%89%B2%E5%8A%A8%E6%80%81%E5%9B%BE%E6%A0%87%EF%BC%88%E5%BA%97%E9%95%BF%EF%BC%89)**的4.3.1版本以及**我**修改的4.5.0版本（当然4.5.1也可以自己进行修改）。
