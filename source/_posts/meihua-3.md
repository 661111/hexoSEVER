---
title: 博客魔改教程总结(三)
description: 从零开始魔改butterfly
date: '2025-02-08 8:00'
cover: https://sourceimage.s3.bitiful.net/img/default_cover_43.webp
category:
  - hexo
  - butterfly
top_img: false
tags:
  - hexo
  - butterfly
abbrlink: 20250208mg3
---
{% note info no-icon flat %}
**魔改前必看（我当你们都懂了，太细节的就不写在教程中了🤣🤣🤣）**
1.博客魔改有风险，如果博客魔改出问题了又没有备份，可通过此项目查看基础源码进行回滚：[jerryc127/hexo-theme-butterfly](https://github.com/jerryc127/hexo-theme-butterfly)、[ccknbc-actions/blog-butterfly](https://github.com/ccknbc-actions/blog-butterfly).这部分魔改基本上都是大佬们造好的轮子，我按照大佬们的轮子结合自己的喜好进行魔改的，如有侵权请联系删除。。
2.鉴于每个人的根目录名称都不一样，本帖博客根目录一律以[BlogRoot]指代。
3.本帖涉及魔改源码的内容，会使用diff代码块标识，复制时请不要忘记删除前面的+、-符号。
4.因为.pug和.styl以及.yml等对缩进要求较为严格，请尽量不要使用记事本等无法提供语法高亮的文本编辑器进行修改。
5.本帖基于Butterfly主题进行魔改方案编写，因此请读者优先掌握Butterfly主题官方文档的内容后再来进行魔改。
6.魔改会过程常常引入自定义的css与js文件，方法见Hexo博客添加自定义css和js文件(后续引入)
**博客搭建与魔改系列教程导航🚥🚥🚥**
1.[🥬Hexo博客搭建基础教程(一)](https://www.sxiaohe.top/posts/20250205jc1.html)
2.[🍒Hexo博客搭建基础教程(二)](https://www.sxiaohe.top/posts/20250205jc2.html)
3.[🥪Hexo博客搭建基础教程(三)](https://www.sxiaohe.top/posts/20250205jc3.html)
4.[🍀博客魔改教程总结(一)](https://www.sxiaohe.top/posts/20250205mg1.html)
5.[🍚博客魔改教程总结(二)](https://www.sxiaohe.top/posts/20250207mg2.html)
6.[🎋博客魔改教程总结(三)](https://www.sxiaohe.top/posts/20250208mg3.html) ⇦当前位置🪂
7.[🥕博客魔改教程总结(四)](https://www.sxiaohe.top/posts/20250205mg4.html)
8.[🍊博客魔改教程总结(五)](https://www.sxiaohe.top/posts/20250205mg5.html)
{% endnote %}

## 友链朋友圈后端部署

{% link Friend-Circle-Lite:轻量友链朋友圈,liushen,https://blog.liushen.fun/posts/4dc716ec/ %}

{% link 友链朋友圈部署文档,友链朋友圈,https://fcircle-doc.yyyzyyyz.cn/#/backenddeploy %}

# 2.友链朋友圈前端部署(旧朋友圈)

{% link 友链朋友圈前端部署方案,苏晓河,https://www.sxiaohe.top/posts/2901kf.html %}

# 3.主流说说部署

{% link 即刻短文的三种部署方案,苏晓河,https://www.sxiaohe.top/posts/2900kf.html %}