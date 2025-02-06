---
title: 博客魔改教程总结(一)
description: 从零开始魔改butterfly
date: 2025-02-05 8:00
cover: /img/2025/01/meihua-post/cover.webp
category: 
  - hexo
top_img: /img/2025/01/meihua-post/cover.webp
tags: 
  - hexo
  - butterfly
---
> **魔改前必看（我当你们都懂了，太细节的就不写在教程中了🤣🤣🤣）**
> 1.博客魔改有风险，如果博客魔改出问题了又没有备份，可通过此项目查看基础源码进行回滚：jerryc127/hexo-theme-butterfly、ccknbc-actions/blog-butterfly.这部分魔改基本上都是大佬们造好的轮子，我按照大佬们的轮子结合自己的喜好进行魔改的，具体见我友人帐第一个栏目大佬们的网站，本处仅做一个总结，如有侵权请联系删除。
> 2.鉴于每个人的根目录名称都不一样，本帖博客根目录一律以[BlogRoot]指代。
> 3.本帖涉及魔改源码的内容，会使用diff代码块标识，复制时请不要忘记删除前面的+、-符号。
> 4.因为.pug和.styl以及.yml等对缩进要求较为严格，请尽量不要使用记事本等无法提供语法高亮的文本编辑器进行修改。
> 5.本帖基于Butterfly主题进行魔改方案编写，因此请读者优先掌握Butterfly主题官方文档的内容后再来进行魔改。
> 6.魔改会过程常常引入自定义的css与js文件，方法见Hexo博客添加自定义css和js文件(后续引入)
> **博客搭建与魔改系列教程导航🚥🚥🚥**
> 1.🥬Hexo博客搭建基础教程(一)
> 2.🍒Hexo博客搭建基础教程(二)
> 3.🥪Hexo博客搭建基础教程(三)
> 4.🍀博客魔改教程总结(一) ⇦当前位置🪂
> 5.🍚博客魔改教程总结(二)
> 6.🎋博客魔改教程总结(三)
> 7.🥕博客魔改教程总结(四)
> 8.🍊博客魔改教程总结(五)

# 一.仿轻笑博客背景美化
<details>
<summary>请查看教程内容</summary>
一.前言
因为这部分内容轻笑并没有有关于这个内容，所以我在这里写好了，方便以后查找
{% link 轻笑Chuckle,漫天倾尘 风中轻笑,https://qcqx.cn/ %}

二.教程开始
1.在 [BlogRoot]\themes\butterfly\layout\includes\head.pug 中引入 div模块
``` pug
#web_bg
#svg_bg
```

2.在自定义css里面引入以下样式
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

# 二.导航栏居中教程
这里我放当前大部分教程
{% link butterfly导航栏修改方案(自用方案),安知鱼,https://blog.anheyu.com/posts/8e53.html %}
{% link 关于Butterfly的导航栏的一些教程,Ariasakaの小窝,https://blog.yaria.top/posts/895003b5 %}
{% link Butterfly的魔改教程：导航栏魔改美化,Meuicat,https://meuicat.com/posts/2dbd58d6.html %}
{% link butterfly导航栏修改方案,苏晓河,https://www.sxiaohe.top/posts/36435.html %}