---
title: 即刻短文的三种部署方案
description: 本篇转载三种不同方案（已经放好原文章链接）
date: '2025-03-10 12:45'
updated: '2025-03-10 14:09'
cover: /img/2025/01/daohanglan/cover.avif
category:
  - hexo
  - butterfly
top_img: false
tags:
  - hexo
  - butterfly
  - 美化
abbrlink: 2900kf
---
## 前言
看过前几篇文章应该知道，魔改偏向于[轻笑](https://qcqx.cn)博客，那么这应该是规模较大的文章，涉及到该post-info.pug和添加生成封面图的js文件。
## 修改文章信息
在文章信息中添加：
``` MARKDOWN
top_img: false
```
例如：
``` MARKDOWN
---
title: 即刻短文的三种部署方案
description: 本篇转载三种不同方案（已经放好原文章链接）
date: '2025-03-10 12:45'
updated: '2025-03-10 14:09'
cover: /img/2025/01/daohanglan/cover.avif
category:
  - hexo
  - butterfly
top_img: false #添加的地方
tags:
  - hexo
  - butterfly
  - 美化
abbrlink: 2900kf
---
```
## 修改pug代码
打开[BlogRoot]\themes\butterfly\layout\includes\header\post-info.pug
删除文件的28行到37行（不同版本的代码行不同，这里的主题版本为4.5.0）并在h1.post-title= page.title || _p('no_title')上添加：
``` PUG
  #post-meta-top
    if (theme.post_meta.post.categories && page.categories.data.length > 0)
      each item, index in page.categories.data
        span.post-categories
          i.iconfont.icon-fenlei.fa-fw.post-meta-icon
          a(href=url_for(item.path)).post-meta-categories #[=item.name]
          if (index < page.categories.data.length - 1)
    if (theme.post_meta.post.tags && page.categories.data.length > 0)
      each item, index in page.tags.data
        span.post-meta-tags
          a(href=url_for(item.path)).post-meta-tags #[=item.name]
          if (index < page.tags.data.length - 1)
```
改完后应该大概能看出来，但是没有样式。如果想要跟本站一样，可以参考一下代码，如果版本一致可以覆盖:
``` PUG
- let comments = theme.comments
#post-info(data-cover=url_for(page.cover))

  #post-meta-top
    if (theme.post_meta.post.categories && page.categories.data.length > 0)
      each item, index in page.categories.data
        span.post-categories
          i.iconfont.icon-fenlei.fa-fw.post-meta-icon
          a(href=url_for(item.path)).post-meta-categories #[=item.name]
          if (index < page.categories.data.length - 1)
    if (theme.post_meta.post.tags && page.categories.data.length > 0)
      each item, index in page.tags.data
        span.post-meta-tags
          a(href=url_for(item.path)).post-meta-tags #[=item.name]
          if (index < page.tags.data.length - 1)
  h1.post-title= page.title || _p('no_title')
    if theme.post_edit.enable
      a.post-edit-link(href=theme.post_edit.url + page.source title=_p('post.edit') target="_blank")
        i.fas.fa-pencil-alt
        
  #post-meta
    .meta-firstline
      if (theme.post_meta.post.date_type)
        if (theme.post_meta.post.date_type === 'both')
          span.post-meta-date
            i.iconfont.icon-shalou.fa-fw.post-meta-icon
            span.post-meta-label= _p('post.created')
            time.post-meta-date-created(datetime=date_xml(page.date) title=_p('post.created') + ' ' + full_date(page.date))=date(page.date, config.date_format)
          span.post-meta-date
            i.iconfont.icon-gengxin.fa-fw.post-meta-icon
            span.post-meta-label= _p('post.updated')
            time.post-meta-date-updated(datetime=date_xml(page.updated) title=_p('post.updated') + ' ' + full_date(page.updated))=date(page.updated, config.date_format)
        else
          - let data_type_update = theme.post_meta.post.date_type === 'updated'
          - let date_type = data_type_update ? 'updated' : 'date'
          - let date_icon = data_type_update ? 'fas fa-history' :'far fa-calendar-alt'
          - let date_title = data_type_update ? _p('post.updated') : _p('post.created')
          i.fa-fw.post-meta-icon(class=date_icon)
          span.post-meta-label= date_title
          time(datetime=date_xml(page[date_type]) title=date_title + ' ' + full_date(page[date_type]))=date(page[date_type], config.date_format)

    .meta-secondline
      - let postWordcount = theme.wordcount.enable && (theme.wordcount.post_wordcount || theme.wordcount.min2read)
      if (postWordcount)
        span.post-meta-wordcount
          if theme.wordcount.post_wordcount
            i.iconfont.icon-tongji1.fa-fw.post-meta-icon
            span.post-meta-label= _p('post.wordcount') + ':'
            span.word-count= wordcount(page.content)
        span.post-meta-wordcount
          if theme.wordcount.min2read
            i.iconfont.icon-tubiaozhizuomoban-.fa-fw.post-meta-icon
            span.post-meta-label= _p('post.min2read') + ':'
            span= min2read(page.content, {cn: 350, en: 160}) + _p('post.min2read_unit')
    
      //- for pv and count
      mixin pvBlock(parent_id,parent_class,parent_title)
        span(class=parent_class id=parent_id data-flag-title=page.title)
          i.iconfont.icon-yanjing.fa-fw.post-meta-icon
          span.post-meta-label=_p('post.page_pv') + ':'
          if block
            block

      - const commentUse = comments.use
      if page.comments !== false && commentUse && !comments.lazyload
        if commentUse[0] === 'Valine' && theme.valine.visitor
          +pvBlock(url_for(page.path),'leancloud_visitors',page.title)
            span.leancloud-visitors-count
              i.fa-solid.fa-spinner.fa-spin
        else if commentUse[0] === 'Waline' && theme.waline.pageview
          +pvBlock('','','')
            span.waline-pageview-count(data-path=url_for(page.path))
              i.fa-solid.fa-spinner.fa-spin
        else if commentUse[0] === 'Twikoo' && theme.twikoo.visitor
          +pvBlock('','','')
            span#twikoo_visitors
              i.fa-solid.fa-spinner.fa-spin
        else if commentUse[0] === 'Artalk' && theme.artalk.visitor
          +pvBlock('','','')
            span#ArtalkPV
              i.fa-solid.fa-spinner.fa-spin
        else if theme.busuanzi.page_pv
          +pvBlock('','post-meta-pv-cv','')
            span#busuanzi_value_page_pv
              i.fa-solid.fa-spinner.fa-spin
      else if theme.busuanzi.page_pv
        +pvBlock('','post-meta-pv-cv','')
          span#busuanzi_value_page_pv
            i.fa-solid.fa-spinner.fa-spin

      if comments.count && !comments.lazyload && page.comments !== false && comments.use
        - var whichCount = comments.use[0]

        mixin countBlock
          span.post-meta-commentcount
            i.iconfont.icon-pinglun.fa-fw.post-meta-icon
            span.post-meta-label= _p('post.comments') + ':'
            if block
              block
        
        case whichCount
          when 'Disqus'
            +countBlock
              span.disqus-comment-count
                a(href=full_url_for(page.path) + '#disqus_thread')
                  i.fa-solid.fa-spinner.fa-spin
          when 'Disqusjs'
            +countBlock
              a(href=full_url_for(page.path) + '#disqusjs')
                span.disqus-comment-count(data-disqus-url=full_url_for(page.path))
                  i.fa-solid.fa-spinner.fa-spin
          when 'Valine'
            +countBlock
              a(href=url_for(page.path) + '#post-comment' itemprop="discussionUrl")
                span.valine-comment-count(data-xid=url_for(page.path) itemprop="commentCount")
                  i.fa-solid.fa-spinner.fa-spin
          when 'Waline'
            +countBlock
              a(href=url_for(page.path) + '#post-comment')
                span.waline-comment-count(data-path=url_for(page.path))
                  i.fa-solid.fa-spinner.fa-spin
          when 'Gitalk'
            +countBlock
              a(href=url_for(page.path) + '#post-comment')
                span.gitalk-comment-count
                  i.fa-solid.fa-spinner.fa-spin
          when 'Twikoo'
            +countBlock
              a(href=url_for(page.path) + '#post-comment')
                span#twikoo-count
                  i.fa-solid.fa-spinner.fa-spin
          when 'Facebook Comments'
            +countBlock
              a(href=url_for(page.path) + '#post-comment')
                span.fb-comments-count(data-href=urlNoIndex())
          when 'Remark42'
            +countBlock
              a(href=url_for(page.path) + '#post-comment')
                span.remark42__counter(data-url=urlNoIndex())
                  i.fa-solid.fa-spinner.fa-spin
          when 'Artalk'
            +countBlock
              a(href=url_for(page.path) + '#post-comment')
                span.artalk-count
                  i.fa-solid.fa-spinner.fa-spin
```
## 添加css内容
在自定义css文件中添加:
``` CSS
/* 文章详情信息模块美化 */
/* 由苏晓河进行编写以及调整 */
/* 时间：2025年3月7日 */
#post>#post-info {
    text-align: left;
    border-radius: 18px;
}
#post-info {
    position: relative;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    height: 310px;
    padding: 0 3rem;
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: box;
    display: flex;
    margin-bottom: 10px !important;
    border-radius: 8px;
    -webkit-box-pack: center;
    -moz-box-pack: center;
    -o-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-orient: vertical;
    -moz-box-orient: vertical;
    -o-box-orient: vertical;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    margin-bottom: 30px;
    background-position-y: 30%;
}
#post-info::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    border-radius: 8px;
    background: rgba(0, 0, 0, .32);
    border-radius: 18px;
}
#post #post-info>#post-meta-top {
    font-size: 105%;
}

#post-info #post-meta, #post-meta-top {
    z-index: 1;
}
#post-info #post-meta-top .post-categories {
    padding: 0 10px;
    display: inline-block;
    background: rgba(58, 58, 58, .36);
    color: #fff !important;
    border-radius: 6px;
    -webkit-transition: .25s;
    -moz-transition: .25s;
    -o-transition: .25s;
    -ms-transition: .25s;
    transition: .25s;
}
#post-info #post-meta-top .post-categories i {
    color: #fff;
    margin-right: 4px;
    font-size: 13px;
}
#post-info #post-meta-top .post-meta-categories, #post-info #post-meta-top .post-meta-tags {
    color: #fff;
    text-decoration: none !important;
    font-size: 17px;
}
#post-info #post-meta-top .post-meta-tags {
    margin-left: 10px;
}

#post-info #post-meta-top .post-meta-categories, #post-info #post-meta-top .post-meta-tags {
    color: #fff;
    text-decoration: none !important;
    font-size: 17px;
}
#post>#post-info .post-title {
    color: #fff;
    margin: 3px 0 10px 0 !important;
    font-weight: 600 !important;
    font-size: 40px !important;
    border-bottom: none;
    line-height: 1.5;
    -webkit-line-clamp: 3;
}
[data-theme=dark] a {
    color: rgba(255, 255, 255, .9);
}
#share-post i.fa.fa-share-alt {
    font-size: 25px;
    color: #0fd9e7;
    padding-left: 8px;
    text-shadow: -.5px .5px 0 #fff, .5px .5px 0 #fff, .5px -.5px 0 #fff, -.5px -.5px 0 #fff;
}
#post>#post-info #post-meta, #post>#post-info #post-meta a {
    color: rgba(255, 255, 255, .9);
}

#post>#post-info #post-meta, #post>#post-info #post-meta a {
    color: #78818a;
}
#post-info #post-meta, #post-meta-top {
    z-index: 1;
}
#post-info #post-meta {
    color: var(--light-grey);
    font-size: 105%;
}
#post-info #post-meta>.meta-firstline, #post-info #post-meta>.meta-secondline {
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: box;
    display: flex;
    -webkit-box-lines: multiple;
    -moz-box-lines: multiple;
    -o-box-lines: multiple;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
}
#post-info #post-meta>.meta-firstline>span, #post-info #post-meta>.meta-secondline>span {
    margin: 5px 10px 5px 0;
    padding: 0 10px;
    display: inline-block;
    background: rgba(58, 58, 58, .36);
    color: #fff !important;
    border-radius: 6px;
}
#post-info #post-meta .post-meta-icon, #post-info #post-meta .post-meta-label {
    margin-right: 4px;
}

#post-info {
    background-image: attr(data-cover url);
}
```

## 添加js内容
这个代码是通过ai进行生成，经过我的测试基本上正常使用，但是如果在页面中引用js链接会额外请求，所以有两种方式：js内容和pug内嵌内容
### 添加js内容
在自定义js文件中添加以下代码：
``` JS
document.addEventListener('DOMContentLoaded', function () {
  const posts = document.querySelectorAll('#post-info');
  posts.forEach(function (post) {
      const cover = post.getAttribute('data-cover');
      if (cover) {
          post.style.backgroundImage = `url(${cover})`;
      }
  });
});
```
### pug内嵌js
在[BlogRoot]\themes\butterfly\layout\includes中添加hexo-js.pug：
``` PUG
script(type='text/javascript')
  | document.addEventListener('DOMContentLoaded', function () {
  |   const posts = document.querySelectorAll('#post-info');
  |   posts.forEach(function (post) {
  |       const cover = post.getAttribute('data-cover');
  |       if (cover) {
  |           post.style.backgroundImage = `url(${cover})`;
  |       }
  |   });
  | });
```
在[BlogRoot]\themes\butterfly\layout\includes\layout.pug中添加：
``` PUG
include ./hexo-js.pug
```
## 查看效果
``` BASH
hexo cl
hexo g
hexo s
```