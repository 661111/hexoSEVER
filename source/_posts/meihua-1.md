---
title: 博客魔改教程总结(一)
description: 从零开始魔改butterfly
date: '2025-02-05 8:00'
cover: https://jsd.sxiaohe.top/gh/661111/hexoSEVER/source/img/2025/01/meihua-post/cover.avif
category:
  - hexo
  - butterfly
top_img: https://jsd.sxiaohe.top/gh/661111/hexoSEVER/source/img/2025/01/meihua-post/cover.avif
tags:
  - hexo
  - butterfly
abbrlink: 4220
---
> **魔改前必看（我当你们都懂了，太细节的就不写在教程中了🤣🤣🤣）**
> 1.博客魔改有风险，如果博客魔改出问题了又没有备份，可通过此项目查看基础源码进行回滚：jerryc127/hexo-theme-butterfly、ccknbc-actions/blog-butterfly.这部分魔改基本上都是大佬们造好的轮子，我按照大佬们的轮子结合自己的喜好进行魔改的，如有侵权请联系删除。
> 2.鉴于每个人的根目录名称都不一样，本帖博客根目录一律以[BlogRoot]指代。
> 3.本帖涉及魔改源码的内容，会使用diff代码块标识，复制时请不要忘记删除前面的+、-符号。
> 4.因为.pug和.styl以及.yml等对缩进要求较为严格，请尽量不要使用记事本等无法提供语法高亮的文本编辑器进行修改。
> 5.本帖基于Butterfly主题进行魔改方案编写，因此请读者优先掌握Butterfly主题官方文档的内容后再来进行魔改。
> 6.魔改会过程常常引入自定义的css与js文件，方法见Hexo博客添加自定义css和js文件(后续引入)
> **博客搭建与魔改系列教程导航🚥🚥🚥**
> 1.[🥬Hexo博客搭建基础教程(一)]()
> 2.[🍒Hexo博客搭建基础教程(二)]()
> 3.[🥪Hexo博客搭建基础教程(三)]()
> 4.[🍀博客魔改教程总结(一)](https://www.sxiaohe.top/posts/4220.html) ⇦当前位置🪂
> 5.[🍚博客魔改教程总结(二)]()
> 6.[🎋博客魔改教程总结(三)]()
> 7.[🥕博客魔改教程总结(四)]()
> 8.[🍊博客魔改教程总结(五)]()

# 1.仿轻笑博客背景美化
**原作者**
{% link 轻笑Chuckle,漫天倾尘 风中轻笑,https://qcqx.cn/ %}
{% folding cyan, 请查看教程内容 %}
一.前言
因为这部分内容轻笑并没有有关于这个内容，所以我在这里写好了，方便以后查找

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
{% endfolding %}

# 2.导航栏居中教程
这里我放当前比较有效的教程
{% link butterfly导航栏修改方案(自用方案),安知鱼,https://blog.anheyu.com/posts/8e53.html %}
{% link 关于Butterfly的导航栏的一些教程,Ariasakaの小窝,https://blog.yaria.top/posts/895003b5 %}
{% link Butterfly的魔改教程：导航栏魔改美化,Meuicat,https://meuicat.com/posts/2dbd58d6.html %}
{% link butterfly导航栏修改方案,苏晓河,https://www.sxiaohe.top/posts/36435.html %}

# 3.图标引入
这里分为两种不同位置的自定义iconfont图标
**1.导航栏添加**
{% link 菜单栏多色动态图标（店长）,Fomalhaut🥝,https://www.fomal.cc/posts/5389e93f.html#%E5%BC%95%E5%85%A5iconfont%E8%87%AA%E5%AE%9A%E4%B9%89%E5%9B%BE%E6%A0%87%EF%BC%88%E5%BA%97%E9%95%BF%EF%BC%89 %}
{% link 菜单栏多色动态图标,苏晓河,https://www.fomal.cc/ %}

**2.社交添加**
{% link Social卡片彩色图标引入（店长）,Fomalhaut🥝,https://www.fomal.cc/posts/5389e93f.html#Social%E5%8D%A1%E7%89%87%E5%BD%A9%E8%89%B2%E5%9B%BE%E6%A0%87%E5%BC%95%E5%85%A5%EF%BC%88%E5%BA%97%E9%95%BF%EF%BC%89 %}

# 5.侧边栏美化以及侧边栏卡片美化（轻笑）
**原作者**
{% link 轻笑Chuckle,漫天倾尘 风中轻笑,https://qcqx.cn/ %}

{% folding cyan, 请查看教程内容 %}

一.前言
因为这部分内容轻笑并没有有关于这个内容，所以我在这里写好了，方便以后查找，喜欢这个风格的可以进行CTRL+C和CTRL+V

二.教程开始
大部分已经有进行标识，对于以后可以进行维护
``` CSS
/* 侧边栏整体卡片样式调整 */
#aside-content .card-widget {
    border-width: 2px;
    border-style: solid;
    border-color: rgba(0, 255, 255, 0.6);
    border-image: initial;
    transition: 0.3s;
    background: rgba(255, 255, 255, .67);
}
/* 侧边栏整体卡片文字样式调整 */
#aside-content .card-widget.card-friend-link, .card-webinfo {
    font-size: 105%;
}
/* 侧边栏整体卡片和首页文章列表样式调整 */
#aside-content .card-widget, #recent-posts>.recent-post-item {
    border-radius: 18px;
}
/* 侧边栏本人介绍卡片样式调整 */
.avatar-img {
    border-radius: 25px!important;
    box-shadow: 2.2px 2.2px 2.2px rgba(10, 207, 233, .3)!important;
}
#aside-content > .card-widget:first-child {
    clip-path: polygon(0px 0px, 100% 0px, 100% 50%, 100% 100%, 80% 100%, 75% 99%, 25% 99%, 20% 100%, 0px 100%);
}
#aside-content .card-info .author-info__name {
    font-weight: 800!important;
    font-size: 1.8em!important;
}
#aside-content .card-info .author-info__description {
    margin-top: -.2em!important;
    font-size: 16.5px!important;
    font-weight: 700;
}
.card-info-data-item:not(:last-child)::after {
    opacity: .3;
    position: absolute;
    top: 11px;
    right: 0;
    content: "";
    width: 1px;
    height: 35px;
    background: var(--font-color);
}
.site-data > a .headline {
    color: var(--font-color);
    font-size: 1em!important;
}
.site-data > a .length-num {
    margin-top: -.42em!important;
    color: var(--text-highlight-color);
    font-size: 1.4em!important;
}
/* 侧边栏其他卡片样式调整 */
#aside-content .card-widget:not(.card-info):not(#card-tuijian):before {
    content: "";
    width: 12.5px;
    background: linear-gradient(to top, transparent, #ee6363bb);
    display: block;
    position: absolute;
    left: 0;
    height: 113px;
    bottom: 27px;
}
#aside-content .card-widget:not(.card-info):not(#card-tuijian) {
    clip-path: polygon(100% 0, 100% 100%, 0 100%, 0 calc(100% - 52.5px), 12.5px calc(100% - 40px), 12.5px calc(100% - 50px), 0 calc(100% - 62.5px), 0 calc(100% - 82.5px), 12.5px calc(100% - 70px), 12.5px calc(100% - 80px), 0 calc(100% - 92.5px), 0 calc(100% - 112.5px), 12.5px calc(100% - 100px), 12.5px calc(100% - 112.5px), 12.5px calc(100% - 110px), 0 calc(100% - 122.5px), 0 calc(100% - 142.5px), 12.5px calc(100% - 130px), 12.5px calc(100% - 141.5px), 0 calc(100% - 154px), 0 0);
    border-left: none !important;
}
```
{% endfolding %}

# 5.侧边栏美化以及侧边栏卡片美化（轻笑）
**原作者**
{% link 轻笑Chuckle,漫天倾尘 风中轻笑,https://qcqx.cn/ %}
{% folding cyan, 请查看教程内容 %}

一.前言
因为这部分内容轻笑并没有有关于这个内容，所以我在这里写好了，方便以后查找，喜欢这个风格的可以进行CTRL+C和CTRL+V

二.教程开始
``` CSS
/* 首页文章卡片样式表调整 */
#recent-posts > .recent-post-item >.recent-post-info > .article-title {
    text-align: center;
}
#recent-posts > .recent-post-item >.recent-post-info > .article-meta-wrap {
    text-align: center;
}
#recent-posts > .recent-post-item >.recent-post-info > .content {
    text-align: center;
}
/* QCQX 首页文章卡片设置 */
#recent-posts>.recent-post-item {
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: box;
    display: flex;
    -webkit-box-orient: horizontal;
    -moz-box-orient: horizontal;
    -o-box-orient: horizontal;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-align: center;
    -moz-box-align: center;
    -o-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    overflow: hidden;
    height: 200px
}
@media screen and (max-width: 768px) {
    #recent-posts>.recent-post-item {
        -webkit-box-orient:vertical;
        -moz-box-orient: vertical;
        -o-box-orient: vertical;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
        height: 300px
    }
}
/* QCQX 首页文章卡片设置 */
#recent-posts > .recent-post-item .post_cover img.post_bg {
    border-radius: 12px;
    transform: none;
}
```
{% endfolding %}