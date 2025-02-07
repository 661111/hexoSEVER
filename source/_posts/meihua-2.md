---
title: 博客魔改教程总结(二)
description: 从零开始魔改butterfly
date: '2025-02-07 8:00'
cover: /img/2025/01/meihua-post/cover.avif
category:
  - hexo
top_img: /img/2025/01/meihua-post/cover.avif
tags:
  - hexo
  - butterfly
abbrlink: 4221
---
> **魔改前必看（我当你们都懂了，太细节的就不写在教程中了🤣🤣🤣）**
> 1.博客魔改有风险，如果博客魔改出问题了又没有备份，可通过此项目查看基础源码进行回滚：jerryc127/hexo-theme-butterfly、ccknbc-actions/blog-butterfly.这部分魔改基本上都是大佬们造好的轮子，我按照大佬们的轮子结合自己的喜好进行魔改的，具体见我友人帐第一个栏目大佬们的网站，本处仅做一个总结，如有侵权请联系删除。
> 2.鉴于每个人的根目录名称都不一样，本帖博客根目录一律以[BlogRoot]指代。
> 3.本帖涉及魔改源码的内容，会使用diff代码块标识，复制时请不要忘记删除前面的+、-符号。
> 4.因为.pug和.styl以及.yml等对缩进要求较为严格，请尽量不要使用记事本等无法提供语法高亮的文本编辑器进行修改。
> 5.本帖基于Butterfly主题进行魔改方案编写，因此请读者优先掌握Butterfly主题官方文档的内容后再来进行魔改。
> 6.魔改会过程常常引入自定义的css与js文件，方法见Hexo博客添加自定义css和js文件(后续引入)
> **博客搭建与魔改系列教程导航🚥🚥🚥**
> 1.[🥬Hexo博客搭建基础教程(一)]()
> 2.[🍒Hexo博客搭建基础教程(二)]()
> 3.[🥪Hexo博客搭建基础教程(三)]()
> 4.[🍀博客魔改教程总结(一)](https://www.sxiaohe.top/posts/4220.html)
> 5.[🍚博客魔改教程总结(二)](https://www.sxiaohe.top/posts/4221.html) ⇦当前位置🪂
> 6.[🎋博客魔改教程总结(三)]()
> 7.[🥕博客魔改教程总结(四)]()
> 8.[🍊博客魔改教程总结(五)]()

# 一.首页文章隐藏文字
**效果来源**
{% link 轻笑Chuckle,漫天倾尘 风中轻笑,https://qcqx.cn/ %}

{% folding cyan, 请查看教程内容 %}

这种隐藏文字的方式可以给大家展示出来，整个效果是非常可观的。
``` CSS
#recent-posts>.recent-post-item:hover .recent-post-info .content {
    opacity: 1;
    line-height: 1.5;
    transition: all .3s
}

#recent-posts>.recent-post-item:hover .recent-post-info {
    top: 0;
    transition: all .3s
}

#recent-posts>.recent-post-item>.recent-post-info>.content {
    opacity: 0;
    line-height: .7;
    transition: all .3s;
    bottom: 0
}
```
{% endfolding %}

# 二.首页文章卡片美化
**效果来源**
{% link 轻笑Chuckle,漫天倾尘 风中轻笑,https://qcqx.cn/ %}

{% folding cyan, 请查看教程内容 %}
既然已经添加了文章文字隐藏，那么就可以进行美化文章卡片
``` CSS
/* 首页文章卡片颜色 */
#recent-posts>.recent-post-item {
    border: 2px solid rgba(0, 255, 255, .6);
    font-size: 14.5px;
    font-weight: 700;
    background: rgba(255, 255, 255, .67);
}
/* 首页文章卡片的图片样式 */
#recent-posts>.recent-post-item .post_cover img.post_bg:hover {
    transform: none
}
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
/* 首页文章卡片bar */
#recent-posts>.recent-post-item>.recent-post-info {
    padding: 0 40px;
    width: 57%
}

@media screen and (max-width: 768px) {
    #recent-posts>.recent-post-item>.recent-post-info {
        padding:2px 10px;
        width: 100%
    }
}
.recent-posts .recent-post-item .post-card-bar {
    width: 5px;
    height: 60px;
    margin: auto;
    position: absolute;
    border-radius: 30px
}
.recent-posts .recent-post-item .left+.recent-post-info+.post-card-bar {
    background: #00c4b6b6;
    right: 5px
}
.recent-posts .recent-post-item .right+.recent-post-info+.post-card-bar {
    background: #1dbfffb6;
    left: 5px
}
@media screen and (min-width: 768px) {
    #recent-posts>.recent-post-item .post_cover.left {
        padding:7px 0 7px 7px;
    }

    #recent-posts>.recent-post-item .post_cover.right {
        padding: 7px 7px 7px 0
    }
}

@media screen and (max-width: 768px) {
    .recent-posts .recent-post-item .post-card-bar {
        display:none
    }

    .ai-btn-box {
        justify-content: center
    }

    .ai-recommend .ai-recommend-item {
        width: 100%
    }

    #recent-posts>.recent-post-item .post_cover.left,#recent-posts>.recent-post-item .post_cover.right {
        transition: all .3s;
        padding: 5px 5px 0 5px;
        -webkit-transition: all .3s;
        -moz-transition: all .3s;
        -ms-transition: all .3s;
        -o-transition: all .3s
    }

    #recent-posts>.recent-post-item:hover .post_cover.left,#recent-posts>.recent-post-item:hover .post_cover.right {
        padding: 0
    }

    #recent-posts>.recent-post-item .post_cover img.post_bg {
        transition: all .3s;
        -webkit-transition: all .3s;
        -moz-transition: all .3s;
        -ms-transition: all .3s;
        -o-transition: all .3s
    }

    #recent-posts>.recent-post-item:hover .post_cover img.post_bg {
        border-radius: 12px 12px 5px 5px;
        -webkit-border-radius: 12px 12px 5px 5px;
        -moz-border-radius: 12px 12px 5px 5px;
        -ms-border-radius: 12px 12px 5px 5px;
        -o-border-radius: 12px 12px 5px 5px
    }
}
```
{% endfolding %}