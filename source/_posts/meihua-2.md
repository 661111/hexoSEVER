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

# 三.首页分类条美化
**效果来源**
{% link 轻笑Chuckle,漫天倾尘 风中轻笑,https://qcqx.cn/ %}
{% link 魔改笔记七：分类条及外链卡片,清羽飞扬,https://blog.liushen.fun/posts/a64defb4/ %}

{% folding cyan, 请查看教程内容 %}
教程基于清羽飞扬的教程和轻笑的样式进行魔改，感兴趣的可以去看。
1.在[BlogRoot]\themes\butterfly\layout\includes中新建categoryBar.pug
``` PUG
.home-catalog-bar#catalog-bar
  i.fa-fw.fas.fa-shapes
  #catalog-list(class=is_home() ? 'home' : '')
    .category-bar-item.catalog-shouye-item(class=is_home() ? 'select' : '', id="home-catalog-item")
      a(href=url_for('/'))= __('博客')
    each item in site.categories.find({ parent: { $exists: false } }).data
      .category-bar-item(class=select ? (select === item.name ? 'select' : '') : '', id=item.name)
        a(href=url_for(item.path))= item.name
  a.category-bar-more(href=url_for('/categories/'))= __('更多分类')
```
2.然后将其添加到不同的位置，比如我这里实现了添加到分类页面等位置，配合上pjax可以做到无刷更新，效果很好，打开分类文件地址：[BlogRoot]\themes\butterfly\layout\category.pug和主页文件地址：[BlogRoot]\themes\butterfly\layout\index.pug，添加其中两行代码，去掉加号即为正常缩进。这个和原教程基本一样
{% tabs 分栏 %}

<!-- tab 分类文件 -->

{% note warning flat %}
注意：修改后需要将配置文件中，分类页面的主题改成index，否则不会显示。
{% endnote %}

``` PUG
extends includes/layout.pug

block content
  if theme.category_ui == 'index'
    include ./includes/mixins/post-ui.pug
    #recent-posts.recent-posts.category_ui
+      #category-bar.category-bar
+        include includes/categoryBar.pug
      +postUI
      include includes/pagination.pug
  else
    include ./includes/mixins/article-sort.pug
    #category
      <div id="categories-chart" data-parent="true" style="height: 300px; padding: 10px;"></div>
      .article-sort-title= _p('page.category') + ' - ' + page.category
      +articleSort(page.posts)
      include includes/pagination.pug
```
<!-- endtab -->

<!-- tab 主页文件 -->
``` PUG
extends includes/layout.pug

block content
  include ./includes/mixins/post-ui.pug
  #recent-posts.recent-posts
+    #category-bar.category-bar
+      include includes/categoryBar.pug
    +postUI
    include includes/pagination.pug
```
<!-- endtab -->
{% endtabs %}
3.在[BlogRoot]\source\css\custom.css自定义样式的文件中引入如下代码（这是我的，你可以自行微调）：
```CSS
/* 首页分类条 */
.layout #recent-posts .home-catalog-bar {
    background: var(--mj-card-bg);
    border: var(--mj-style-border);
    margin-top: 12px;
    border-radius: 11px !important;
    transition: .3s;
    font-size: 15px;
    padding: 5px .8rem;
    animation: slide-in .5s .2s backwards;
    will-change: transform;
    -webkit-animation: slide-in .5s .2s backwards;
}

#catalog-bar {
    padding: .4rem .8rem;
    border-radius: .5rem;
    display: flex;
    border: 1px solid rgba(150, 150, 150, .2);
    justify-content: space-between;
}

#catalog-bar i {
    line-height: inherit;
}

#catalog-list {
    margin: 0 .5rem;
    display: flex;
}

.layout #recent-posts #catalog-bar #home-catalog-item {
    border-radius: .5rem;
}

.layout #recent-posts #catalog-bar .catalog-shouye-item {
    margin-right: 10px;
}

.layout #recent-posts #catalog-bar #home-catalog-item a {
    background: #00c4b6f1;
    color: #fff !important;
    margin: 0 .2em;
    padding: .2em .4em .3em;
    font-weight: 700;
    border-radius: .5rem;
    color: var(--font-color);
    -webkit-transition: all .15s ease-in-out;
    -moz-transition: all .15s ease-in-out;
    -o-transition: all .15s ease-in-out;
    -ms-transition: all .15s ease-in-out;
    transition: all .15s ease-in-out;
}

.catalog-list-item a {
    margin: 0 .2em;
    padding: .2em .4em .3em;
    font-weight: 700;
    border-radius: .5rem;
    color: var(--font-color);
    -webkit-transition: all .15s ease-in-out;
    -moz-transition: all .15s ease-in-out;
    -o-transition: all .15s ease-in-out;
    -ms-transition: all .15s ease-in-out;
    transition: all .15s ease-in-out;
}

.catalog-list-item a {
    margin: 0 .2em;
    padding: .2em .4em .3em;
    font-weight: 700;
    border-radius: .5rem;
    color: var(--font-color);
    -webkit-transition: all .15s ease-in-out;
    -moz-transition: all .15s ease-in-out;
    -o-transition: all .15s ease-in-out;
    -ms-transition: all .15s ease-in-out;
    transition: all .15s ease-in-out;
}
```
{% note warning flat %}
注意：要想实现点击切换后，高亮部分跟随分类页面走的部分，需要修改源码，打开[BlogRoot]\themes\butterfly\source\js\main.js，添加js函数，比如我添加到了778行左右，switchComments函数的上面：
``` JS
/**
   * 切换类别表
   */ 
  const setCategoryBarActive = () => {
    const categoryBar = document.querySelector("#category-bar");
    const currentPath = decodeURIComponent(window.location.pathname);
    const isHomePage = currentPath === GLOBAL_CONFIG.root;

    if (categoryBar) {
        const categoryItems = categoryBar.querySelectorAll(".category-bar-item");
        categoryItems.forEach(item => item.classList.remove("select"));

        const activeItemId = isHomePage ? "category-bar-home" : currentPath.split("/").slice(-2, -1)[0];
        const activeItem = document.getElementById(activeItemId);

        if (activeItem) {
            activeItem.classList.add("select");
        }
    }
};
```
**然后再在引用部分执行这个函数，在同一个文件，找到下面的函数并添加函数的调用，位置看下方注释：**
``` JS
window.refreshFn = function () {
  initAdjust()

  if (GLOBAL_CONFIG_SITE.isPost) {
    GLOBAL_CONFIG.noticeOutdate !== undefined && addPostOutdateNotice()
    GLOBAL_CONFIG.relativeDate.post && relativeDate(document.querySelectorAll('#post-meta time'))
  } else {
    GLOBAL_CONFIG.relativeDate.homepage && relativeDate(document.querySelectorAll('#recent-posts time'))
    GLOBAL_CONFIG.runtime && addRuntime()
    addLastPushDate()
    toggleCardCategory()
    setCategoryBarActive()      // 切换类别栏目
  }

```
{% endnote %}

{% endfolding %}

# 四.底部美化

{% folding cyan, 请查看教程内容 %}

{% tabs 分栏 %}

<!-- tab 插件版 -->

**hexo-butterfly-footer-marcus**
# 1.安装依赖

{% note warning flat %}
注意：随机友链需要删除店长的插件，否则冲突
{% endnote %}

安装插件,在博客根目录[Blogroot]下打开终端，运行以下指令：

``` BASH
npm install hexo-butterfly-footer-marcus --save
```

如果需要随机友联的话,再运行以下指令：
``` BASH
npm i yamljs --save
```

# 2.添加配置信息
在站点配置文件_config.yml或者主题配置文件**_config.butterfly.yml**中添加：
``` YAML
#hexo-butterfly-footer-marcus
#see https://blog.marcus233.top/p/footer.html
footer_beautify:
  enable: true
  priority: 5 #过滤器优先权
  enable_page: all # 应用页面
  layout: # 挂载容器类型
      type: id
      name: footer
      index: 1
  footer_icons:
    enable: true
    left:
      - icon: fa-solid fa-compass
        link: https://www.marcus233.top/
        desrc: 个人主页
        class: out
      - icon: fa-brands fa-qq
        link: https://res.abeim.cn/api/qq/?qq=3105950984
        desrc: 联系QQ
        class: out
      - icon: fa-brands fa-weixin
        link: /wechat/
        desrc: 联系微信
        class: in
      - icon: fa-solid fa-envelope
        link: mailto:marcus@marcus233.top
        desrc: 发送邮件
        class: out
    right:
      - icon: fa-brands fa-github
        link: https://github.com/Marcusyyds
        desrc: Github主页
        class: out
      - icon: fa-brands fa-bilibili
        link: https://space.bilibili.com/1024450661
        desrc: 哔哩哔哩主页
        class: out
      - icon: fa-solid fa-star
        link: /stars/
        desrc: 藏宝阁
        class: in
      - icon: fa-solid fa-comment
        link: /message/
        desrc: 留言
        class: in
  footer_logo:
    enable: true
    url: https://img01.anheyu.com/useruploads/8/2022/12/15/639adf5b8806a.png
  footer_group:
    enable: true
    footer_group_link:
      - group_title: 直达
        footer_links: 
          - text: 藏宝阁
            link: /stars/
            class: in
          - text: 优秀句子
            link: /sentence/
            class: in
          - text: 空间说说
            link: /zone/
            class: in
          - text: 友链订阅
            link: /fcircle/
            class: in
          - text: 切换背景
            link: /bg/
            class: in
      - group_title: 关于
        footer_links: 
          - text: 关于我
            link: /about/
            class: in
          - text: RSS订阅
            link: /atom.xml
            class: in
          - text: 站点监控
            link: https://uptime.marcus233.top/
            class: out
          - text: 更新记录
            link: /timeline/
            class: in
          - text: 我的相册
            link: /picture/
            class: in
      - group_title: 分类
        footer_links: 
          - text: 博客相关
            link: /categories/博客相关
            class: in
          - text: 生活点滴
            link: /categories/生活点滴
            class: in 
          - text: 资源分享
            link: /categories/资源分享
            class: in
          - text: 学习笔记
            link: /categories/学习笔记
            class: in 
          - text: 实用教程
            link: /categories/实用教程
            class: in 
          - text: 查看全部
            link: /categories/
            class: in 
  footer_friend_links:
    enable: true
    number: 5
  footer_bottom:
    copyright:
      enable: true
      author: Marcus
      link: https://marcus233.top/
      time: 2022
    left:
      - text: 雨云
        desrc: 本站CDN支持
        link: https://rainyun.com/
      - text: 网盾星球
        desrc: 本站CDN防护主要提供商:网盾星球
        link: https://www.netdun.net/
      - text: 萌ICP备20230221
        desrc: 萌ICP备20230221
        link: https://icp.gov.moe/?keyword=20230221
      - text: 萌ICP备20236688
        desrc: 萌ICP备20236688
        link: https://icp.gov.moe/?keyword=20236688
      - text: 萌ICP备20230002
        desrc: 萌ICP备20230002
        link: https://icp.gov.moe/?keyword=20230002
    right:
      - text: Hexo
        desrc: 框架
        link: https://hexo.io/zh-cn/
      - text: Butterfly
        desrc: 主题
        link: https://butterfly.js.org/
    runtime:
      enable: true
      time: 2022/08/09 00:00:00
  footer_css: https://cdn1.tianli0.top/npm/hexo-butterfly-footer-marcus/lib/footer.min.css
  footer_js: https://cdn1.tianli0.top/npm/hexo-butterfly-footer-marcus/lib/footer.min.js
```

{% note warning flat %}
注意：请自行下载footer_js修改建站日期
{% endnote %}

# 3.CSS修改
在自己的**custom.css**中插入css：
``` CSS
#footer_content, #footer_icons {
    background: transparent!important;
}
#footer {
    background: transparent!important;
}
#footer-bottom {
    background: transparent!important;
    border-top: none!important;
}
```
# 4.参数释义
## 参数释义
 **参数**                             | **备选值/类型**  | **释义**                                                                                                
------------------------------------|-------------|-------------------------------------------------------------------------------------------------------
 **enable**                         | true/false  | 【必选】控制开关                                                                                              
 **priority**                       | number      | 【可选】过滤器优先级，数值越小，执行越早，默认为10，选填                                                                         
 **enable_page**                    | path/all    | 【可选】填写想要应用的页面的相对路径（即路由地址）,如根目录就填'/',分类页面就填'/categories/'。若要应用于所有页面，就填'all'，默认为all                     
 **exclude**                        | path        | 【可选】填写想要屏蔽的页面，可以多个。仅当enable_page为'all'时生效。写法见示例。原理是将屏蔽项的内容逐个放到当前路径去匹配，若当前路径包含任一屏蔽项，则不会挂载。             
 **layout.type**                    | id/class    | 【可选】挂载容器类型，填写id或class，不填则默认为id                                                                        
 **layout.name**                    | text        | 【必选】挂载容器名称                                                                                            
 **layout.index**                   | 0和正整数       | 【可选】前提是layout.type为class，因为同一页面可能有多个class，此项用来确认究竟排在第几个顺位                                             
 **insertposition**                 | text        | 'beforebegin'：元素自身的前面。'afterbegin'：插入元素内部的第一个子节点之前。'beforeend'：插入元素内部的最后一个子节点之后。'afterend'：插入元素自身的后面。 
 **footer_icons.enable**            | true/false  | 【必选】icon控制开关                                                                                          
 ***.text**                         | text        | 【必选】显示文字                                                                                              
 ***.icon**                         | class       | 【必选】icon(例:fa-solid fa-commet)                                                                        
 ***.desrc**                        | text        | 【必选】a标签内的title选项                                                                                      
 ***.class**                        |  in/out     | 【必选】站内/外链接(站内:in,站外:out)                                                                              
 ***.link**                         | url         | 【必选】链接                                                                                                
 **footer_logo.enable**             | true/false  | 【必选】icon内logo控制开关                                                                                     
 **footer_group.enable**            | true/false  | 【必选】group控制开关                                                                                         
 **footer_friend_links.enable**     |  true/false | 【必选】随机友联开关                                                                                            
 **footer_friend_link.number**      | 正整数         | 【可选】随机友联数量                                                                                            
 **footer_bottom.copyright.enable** |  true/false | 【必选】copyright开关                                                                                       
 **footer_bottom.runtime.enable**   |  true/false | 【必选】网站运行时间开关                                                                                          
 **footer_css**                     | url         | 【必选】css链接                                                                                             
 **footer_js**                      | url         | 【必选】js链接        
<!-- endtab -->

<!-- tab fomal页脚版 -->

{% note warning flat %}
注意：如果有安装店长的hexo-butterfly-footer-beautify插件，建议卸载并删除配置项或者关闭配置项
**卸载插件**：
``` BASH
npm un hexo-butterfly-footer-beautify --save
```
在主题配置文件_config.butterfly.yml或者站点配置文件_config.yml删除插件相关的配置项：
``` YAML
-footer_beautify:
-  enable:
-    timer: true # 计时器开关
-    bdage: true # 徽标开关
-  priority: 5 #过滤器优先权
-  enable_page: all # 应用页面
-  exclude: #屏蔽页面
-    # - /posts/
-    # - /about/
-  layout: # 挂载容器类型
-    type: id
-    name: footer-wrap
-    index: 0
-  runtime_js: https://npm.elemecdn.com/hexo-butterfly-footer-beautify@1.0.0/lib/runtime.js
-  runtime_css: https://npm.elemecdn.com/hexo-butterfly-footer-beautify@1.0.0/lib/runtime.css
-  # 徽标部分配置项
-  swiperpara: 0 #若非0，则开启轮播功能，每行徽标个数
-  bdageitem:
-    - link: https://hexo.io/ #徽标指向网站链接
-      shields: https://img.shields.io/badge/Frame-Hexo-blue?style=flat&logo=hexo #徽标API
-      message: 博客框架为Hexo_v6.2.0 #徽标提示语
-    - link: https://butterfly.js.org/
-      shields: https://img.shields.io/badge/Theme-Butterfly-6513df?style=flat&logo=bitdefender
-      message: 主题版本Butterfly_v4.3.1
-    - link: https://vercel.com/
-      shields: https://img.shields.io/badge/Hosted-Vercel-brightgreen?style=flat&logo=Vercel
-      message: 本站采用多线部署，主线路托管于Vercel
-    - link: https://dashboard.4everland.org/
-    # https://img.shields.io/badge/Hosted-4EVERLAND-3FE2C1?style=flat&logo=IPFS
-      shields: https://img.shields.io/badge/Hosted-4EVERLAND-22DDDD?style=flat&logo=IPFS
-      message: 本站采用多线部署，备用线路托管于4EVERLAND
-    - link: https://github.com/
-      shields: https://img.shields.io/badge/Source-Github-d021d6?style=flat&logo=GitHub
-      message: 本站项目由Github托管
-    - link: http://creativecommons.org/licenses/by-nc-sa/4.0/
-      shields: https://img.shields.io/badge/Copyright-BY--NC--SA%204.0-d42328?style=flat&logo=Claris
-      message: 本站采用知识共享署名-非商业性使用-相同方式共享4.0国际许可协议进行许可
-  swiper_css: https://npm.elemecdn.com/hexo-butterfly-swiper/lib/swiper.min.css
-  swiper_js: https://npm.elemecdn.com/hexo-butterfly-swiper/lib/swiper.min.js
-  swiperbdage_init_js: https://npm.elemecdn.com/hexo-butterfly-footer-beautify/lib/swiperbdage_init.min.js
```
{% endnote %}

1.将[BlogRoot]/themes/butterfly/layout/includes/footer.pug替换成如下代码这块东西分为几个部分，一个是以#ft为块的DOM，其中分为了格言、猜你想看、推荐友链三部分，参考图中的位置结合自己的喜好进行修改即可，图像、文字和链接均替换成你自己的（记住不要用我的链接！！！）；if theme.footer.owner.enable起这一块是主题指定的信息版权信息，我把主题配置项的copyright和custom_text这两项留空了，因此只会显示©2022 By Fomalhaut🥝；再然后就是#workboard这块，这块的信息由js逻辑写入与更新，可以自定义；最后是p#ghbdages这块，是徽标显示，大家可以到shields.io按照自己的信息生成（不要用我的！！！）:

``` PUG
#footer-wrap
  #ft
    .ft-item-1
      .t-top
        .t-t-l
          p.ft-t.t-l-t 格言🧬
          .bg-ad
            div
              | 再看看那个光点，它就在这里，这是家园，这是我们 —— 你所爱的每一个人，你认识的一个人，你听说过的每一个人，曾经有过的每一个人，都在它上面度过他们的一生✨
            .btn-xz-box
              a.btn-xz(href='https://stellarium.org/') 点击开启星辰之旅
        .t-t-r
          p.ft-t.t-l-t 猜你想看💡
          ul.ft-links
            li
              a(href='/posts/eec9786.html') 魔改指南
              a(href='/box/nav/') 网址导航
            li
              a(href='/social/link/') 我的朋友
              a(href='/comments/') 留点什么
            li
              a(href='/personal/about/') 关于作者
              a(href='/archives/') 文章归档
            li
              a(href='/categories/') 文章分类
              a(href='/tags/') 文章标签
            li
              a(href='/box/Gallery/') 我的画廊
              a(href='/personal/bb/') 我的唠叨
            li
              a(href='/site/time/') 建设进程
              a(href='/site/census/') 网站统计
    .ft-item-2
      p.ft-t 推荐友链⌛
      .ft-img-group
        .img-group-item
          a(href='https://www.fomal.cc/' title='Fomalhaut🥝')
            img(src='https://lskypro.acozycotage.net/LightPicture/2022/12/60e5d4e39da7c077.webp' alt='')
        .img-group-item
          a(href='https://tzy1997.com/' title='唐志远の博客')
            img(src='https://lskypro.acozycotage.net/LightPicture/2022/12/4ab83cdce942463b.jpg' alt='')
        .img-group-item
          a(href='https://akilar.top/' title='Akilarの糖果屋')
            img(src='https://lskypro.acozycotage.net/LightPicture/2022/12/6bf1ed05796db59c.jpg' alt='')
        .img-group-item
          a(href='https://butterfly.js.org/' title='Butterfly')
            img(src='https://lskypro.acozycotage.net/LightPicture/2022/12/64cc6a7d508026e1.png' alt='')
        .img-group-item
          a(href='https://anzhiy.cn/' title='安知鱼')
            img(src='https://lskypro.acozycotage.net/LightPicture/2022/12/1b33fef8f5fb7e63.jpg' alt='')
        .img-group-item
          a(href='https://www.acozycotage.net/' title='Acozycotage')
            img(src='https://lskypro.acozycotage.net/LightPicture/2022/12/6a6fe6ebfd19c465.jpg' alt='')
        .img-group-item
          a(href='https://cdn.netdun.net/' title='网盾星球')
            img(src='https://lskypro.acozycotage.net/LightPicture/2022/12/70dee3f9d1ca10f3.webp' alt='')
        .img-group-item
          a(href='javascript:void(0)' title='广告位招租')
            img(src='https://lskypro.acozycotage.net/LightPicture/2022/12/65307a5828af6790.webp' alt='')

  if theme.footer.owner.enable
    - var now = new Date()
    - var nowYear = now.getFullYear()
    if theme.footer.owner.since && theme.footer.owner.since != nowYear
      .copyright
        span!= `<b>&copy;${theme.footer.owner.since} - ${nowYear}</b>`
        span!= `<b>&nbsp;&nbsp;By ${config.author}</b>`
    else
       .copyright
         span!= `<b>&copy;${nowYear}</b>`
         span!= `<b>&nbsp;&nbsp;By ${config.author}</b>`
  if theme.footer.copyright
    .framework-info
      span= _p('footer.framework') + ' '
      a(href='https://hexo.io')= 'Hexo'
      span.footer-separator |
      span= _p('footer.theme') + ' '
      a(href='https://github.com/jerryc127/hexo-theme-butterfly')= 'Butterfly'
  if theme.footer.custom_text
    .footer_custom_text!=`${theme.footer.custom_text}`
    
  #workboard
  
  p#ghbdages
    a.github-badge(target='_blank' href="https://hexo.io/" style='margin-inline:5px' title="博客框架为Hexo_v6.3.0")
      img(src="https://sourcebucket.s3.ladydaily.com/badge/Frame-Hexo-blue.svg" alt='')

    a.github-badge(target='_blank' href="https://butterfly.js.org/" style='margin-inline:5px' title="主题版本Butterfly_v4.3.1")
      img(src="https://sourcebucket.s3.ladydaily.com/badge/Theme-Butterfly-6513df.svg" alt='')

    a.github-badge(target='_blank' href="https://vercel.com/" style='margin-inline:5px' title="本站采用多线部署，主线路托管于Vercel")
      img(src="https://sourcebucket.s3.ladydaily.com/badge/Hosted-Vercel-brightgreen.svg" alt='')

    a.github-badge(target='_blank' href="https://user.51.la/" style='margin-inline:5px' title="本站数据分析得益于51la技术支持")
      img(src="https://sourcebucket.s3.ladydaily.com/badge/Analytics-51la-3db1eb.svg" alt='')

    a.github-badge(target='_blank' href="https://icp.gov.moe/?keyword=20226665" style='margin-inline:5px' title="本站已加入萌ICP豪华套餐，萌ICP备20226665号")
      img(src="https://sourcebucket.s3.ladydaily.com/badge/萌ICP备-20226665-fe1384.svg" alt='')

    a.github-badge(target='_blank' href="https://bitiful.dogecast.com/buckets" style='margin-inline:5px' title="本网站经Service Worker分流至缤纷云对象存储")
      img(src=" https://sourcebucket.s3.ladydaily.com/badge/Bucket-缤纷云-9c62da.svg" alt='')

    a.github-badge(target='_blank' href="https://www.netdun.net/" style='margin-inline:5px' title="本站使用网盾星球提供CDN加速与防护")
      img(src="https://sourcebucket.s3.ladydaily.com/badge/CDN-网盾星球-fff2cc.svg" alt='')

    a.github-badge(target='_blank' href="https://github.com/" style='margin-inline:5px' title="本网站源码由Github提供存储仓库")
      img(src=" https://sourcebucket.s3.ladydaily.com/badge/Source-Github-d021d6.svg" alt='')
```

2.将以下代码复制到自定义的custom.css中，其中颜色、圆角等可以根据你自己的喜好进行修改:
``` CSS
/* tzy页脚样式 */
#ft {
  max-width: 1200px;
  margin: 0 auto 12px;
  display: flex;
  color: rgb(255 255 255 / 80%) !important;
  text-align: left;
  flex-wrap: wrap;
}

.ft-item-1,
.ft-item-2 {
  display: flex;
  height: 100%;
  padding: 2px 14px;
}

.ft-item-1 {
  flex-direction: column;
  flex: 2;
}

.ft-item-2 {
  flex: 1;
  flex-direction: column;
}

.t-top {
  display: flex;
}

.t-top .t-t-l {
  display: flex;
  flex-direction: column;
  flex: 1.4;
  margin-right: 10px;
}

.t-top .t-t-l .bg-ad {
  width: 85%;
  border-radius: 10px;
  padding: 0 10px;
}

.btn-xz-box {
  margin-top: 10px;
}

/* 按钮背景颜色等 */
.btn-xz {
  display: block;
  background-color: var(--btn-bg);
  color: var(--btn-color);
  text-align: center;
  line-height: 2.4;
  margin: 8px 0;
}

.btn-xz:hover {
  text-decoration: none !important;
}
/* 按钮悬浮颜色 */
.btn-xz-box:hover .btn-xz {
  background-color: var(--text-bg-hover);
}

.t-top .t-t-r {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.ft-links {
  padding: 0 14px;
  list-style: none;
  margin-top: 0 !important;
}

.ft-links li a {
  display: inline-block !important;
  width: 50%;
}
/* 链接悬浮颜色 */
.ft-links li a:hover {
  text-decoration: none !important;
  color: var(--theme-color) !important;
}

.ft-item-2 .ft-img-group {
  width: 100%;
}

.ft-t {
  font-size: 1.1rem;
  margin-bottom: 20px;
  line-height: 1;
  font-weight: 600;
}

.t-l-t {
  padding-left: 14px;
}

.ft-item-2 .ft-img-group .img-group-item {
  display: inline-block;
  width: 18.4%;
  margin-right: 14px;
  margin-bottom: 6px;
}

.ft-item-2 .ft-img-group .img-group-item a {
  display: inline-block;
  width: 100%;
  height: 100%;
}

.ft-item-2 .ft-img-group .img-group-item a img {
  width: 100%;
  max-height: 80px;
  border-radius: 10px;
}
/* 头像悬浮颜色框 */
.ft-item-2 .ft-img-group .img-group-item a img:hover {
  border: 2px solid var(--theme-color);
}

@media screen and (max-width: 768px) {
  .ft-item-1 {
    flex-basis: 100% !important;
  }

  .ft-item-2 {
    flex-basis: 100% !important;
  }

  .t-top .t-t-l .bg-ad {
    width: 100%;
  }
}

@media screen and (max-width: 576px) {
  .t-top {
    flex-wrap: wrap;
  }

  .t-top .t-t-l {
    flex-basis: 100% !important;
  }

  .t-top .t-t-r {
    margin-top: 16px;
    flex-basis: 100% !important;
  }
}
#footer-wrap a {
  border-radius: 30px;
}
#footer-wrap {
  padding: 20px 20px;
}

/* 页脚心跳动画 */
#heartbeat {
  color: red;
  animation: iconAnimate 1s ease-in-out infinite;
}
@-moz-keyframes iconAnimate {
  0%,
  100% {
    transform: scale(1);
  }
  10%,
  30% {
    transform: scale(0.9);
  }
  20%,
  40%,
  60%,
  80% {
    transform: scale(1.1);
  }
  50%,
  70% {
    transform: scale(1.1);
  }
}
@-webkit-keyframes iconAnimate {
  0%,
  100% {
    transform: scale(1);
  }
  10%,
  30% {
    transform: scale(0.9);
  }
  20%,
  40%,
  60%,
  80% {
    transform: scale(1.1);
  }
  50%,
  70% {
    transform: scale(1.1);
  }
}
@-o-keyframes iconAnimate {
  0%,
  100% {
    transform: scale(1);
  }
  10%,
  30% {
    transform: scale(0.9);
  }
  20%,
  40%,
  60%,
  80% {
    transform: scale(1.1);
  }
  50%,
  70% {
    transform: scale(1.1);
  }
}
@keyframes iconAnimate {
  0%,
  100% {
    transform: scale(1);
  }
  10%,
  30% {
    transform: scale(0.9);
  }
  20%,
  40%,
  60%,
  80% {
    transform: scale(1.1);
  }
  50%,
  70% {
    transform: scale(1.1);
  }
}

```

3.然后计时器还要往#footer-wrap这块元素上面写入网站运行时间等信息，新建文件[BlogRoot]\source\js\runtime.js，写入如下代码。这里要修改的几块东西是：网站诞生时间、currentTimeHtml这块东西；其中currentTimeHtml分为了两种模式，对应两个不同的图标，自行研究一下就懂！
``` JS
var now = new Date();
function createtime() {
  // 当前时间
  now.setTime(now.getTime() + 1000);
  var start = new Date("08/01/2022 00:00:00"); // 旅行者1号开始计算的时间
  var dis = Math.trunc(23400000000 + ((now - start) / 1000) * 17); // 距离=秒数*速度 记住转换毫秒
  var unit = (dis / 149600000).toFixed(6);  // 天文单位
  var grt = new Date("08/09/2022 00:00:00");	// 网站诞生时间
  var days = (now - grt) / 1e3 / 60 / 60 / 24,
    dnum = Math.floor(days),
    hours = (now - grt) / 1e3 / 60 / 60 - 24 * dnum,
    hnum = Math.floor(hours);
  1 == String(hnum).length && (hnum = "0" + hnum);
  var minutes = (now - grt) / 1e3 / 60 - 1440 * dnum - 60 * hnum,
    mnum = Math.floor(minutes);
  1 == String(mnum).length && (mnum = "0" + mnum);
  var seconds = (now - grt) / 1e3 - 86400 * dnum - 3600 * hnum - 60 * mnum,
    snum = Math.round(seconds);
  1 == String(snum).length && (snum = "0" + snum);
  let currentTimeHtml = "";
  (currentTimeHtml =
    hnum < 18 && hnum >= 9
    ? `<img class='boardsign' src='https://sourcebucket.s3.ladydaily.com/badge/F小屋-科研摸鱼中.svg' title='什么时候能够实现财富自由呀~'><br> <div style="font-size:13px;font-weight:bold">本站居然运行了 ${dnum} 天 ${hnum} 小时 ${mnum} 分 ${snum} 秒 <i id="heartbeat" class='fas fa-heartbeat'></i> <br> 旅行者 1 号当前距离地球 ${dis} 千米，约为 ${unit} 个天文单位 🚀</div>`
    : `<img class='boardsign' src='https://sourcebucket.s3.ladydaily.com/badge/F小屋-下班休息啦.svg' title='下班了就该开开心心地玩耍~'><br> <div style="font-size:13px;font-weight:bold">本站居然运行了 ${dnum} 天 ${hnum} 小时 ${mnum} 分 ${snum} 秒 <i id="heartbeat" class='fas fa-heartbeat'></i> <br> 旅行者 1 号当前距离地球 ${dis} 千米，约为 ${unit} 个天文单位 🚀</div>`),
    document.getElementById("workboard") &&
    (document.getElementById("workboard").innerHTML = currentTimeHtml);
}
// 设置重复执行函数，周期1000ms
setInterval(() => {
  createtime();
}, 1000);
```
4.在主题配置文件_config.butterfly.yml引入该runtime.js文件：
``` YML
inject:
  bottom: 
+    - <script defer src="/js/runtime.js"></script> # 页脚计时器
```

<!-- endtab -->

{% endtabs %}

{% endfolding %}