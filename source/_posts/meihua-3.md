---
title: 博客魔改教程总结(三)
description: 从零开始魔改butterfly
date: '2025-02-08 8:00'
cover: https://jsd.sxiaohe.top/gh/661111/hexoSEVER/source/img/2025/01/meihua-post/cover.avif
category:
  - hexo
  - butterfly
top_img: https://jsd.sxiaohe.top/gh/661111/hexoSEVER/source/img/2025/01/meihua-post/cover.avif
tags:
  - hexo
  - butterfly
abbrlink: 20250208mg3
---
{% note info no-icon flat %}
**魔改前必看（我当你们都懂了，太细节的就不写在教程中了🤣🤣🤣）**
1.博客魔改有风险，如果博客魔改出问题了又没有备份，可通过此项目查看基础源码进行回滚：jerryc127/hexo-theme-butterfly、ccknbc-actions/blog-butterfly.这部分魔改基本上都是大佬们造好的轮子，我按照大佬们的轮子结合自己的喜好进行魔改的，如有侵权请联系删除。
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

# 1.友链朋友圈后端部署
由于这个非常复杂所以我这里会给大家分出两个不同的教程，旧朋友圈目前已经暂停维护了，建议可以选择新朋友圈。

{% link Friend-Circle-Lite:轻量友链朋友圈,liushen,https://blog.liushen.fun/posts/4dc716ec/ %}

## 旧朋友圈
详情看这个[部署文档](https://fcircle-doc.yyyzyyyz.cn/#/backenddeploy)

## 新朋友圈
### 部署前的操作

在根目录下创建一个js，例如link.js，把文件内容写下去：
``` JS
const YML = require('yamljs')
const fs = require('fs')

const blacklist = ["友站名称1", "友站名称2", "友站名称3"]; // 由于某种原因，不想订阅的列表

let friends = [],
    data_f = YML.parse(fs.readFileSync('source/_data/link.yml').toString().replace(/(?<=rss:)\s*\n/g, ' ""\n'));

data_f.forEach((entry, index) => {
    let lastIndex = 2;
    if (index < lastIndex) {
        const filteredLinkList = entry.link_list.filter(linkItem => !blacklist.includes(linkItem.name));
        friends = friends.concat(filteredLinkList);
    }
});

// 根据规定的格式构建 JSON 数据
const friendData = {
    friends: friends.map(item => {
        return [item.name, item.link, item.avatar];
    })
};

// 将 JSON 对象转换为字符串
const friendJSON = JSON.stringify(friendData, null, 2);

// 写入 friend.json 文件
fs.writeFileSync('./source/friend.json', friendJSON);

console.log('friend.json 文件已生成。');
```
在博客根目录下打开终端，输入：
``` BASH
node link.js
```
如果成功，会在source下看到friend.json
打开后可以看到这个格式,这里可以看到：
``` JSON
{
  "friends": [
    [
      "清羽飞扬",
      "https://blog.liushen.fun/",
      "https://cdn.qyliu.top/i/2024/03/21/65fc56832e37d.png"
    ],
    [
      "Akilarの糖果屋",
      "https://akilar.top/",
      "https://cdn.qyliu.top/i/2024/04/06/661170950f7a2.png"
    ]
  ]
}
```
如果是github action，可以在hexo g脚本前添加即可完整构建，注意需要安装yaml包才可解析yml文件，请在执行前额外添加对应npm包下载命令，你可以在安装依赖的地方插入以下代码
``` YML
npm install yamljs --save
node link.js
```
如果一切正常，在你的网站根目录将会出现一个friend.json文件，这个就是我们需要的json啦！
哪怕你不需要轻量友圈，我也推荐你使用json格式生成并填入到友链朋友圈的对应配置中，首先，json文件的读取速度比网站快很多，并且不需要解析页面格式，可以更加快捷的实现爬取，其次，json文件有效文本密度大，比直接爬取友链页面更加节省流量。

### 部署爬取项目

#### 一.前置工作
1.Fork 本仓库:
点击页面右上角的 Fork 按钮，将本仓库复制到你自己的GitHub账号下。

2.配置 Secrets:
在你 Fork 的仓库中，依次进入 Settings -> Secrets -> New repository secret，添加以下 Secrets：

SMTP_PWD: SMTP 服务器的密码，用于发送电子邮件。(如果需要可以设置)

3.配置action权限：

在设置中，点击action，拉到最下面，勾选Read and write permissions选项并保存，确保action有读写权限。

4.启用 GitHub Actions:
GitHub Actions 已经配置好在仓库的 .github/workflows/*.yml 文件中，当到一定时间时将自动执行，也可以手动运行。
其中，每个action功能如下：
**friend_circle_lite.yml**实现核心功能，爬取并发送邮箱；
**deal_subscribe_issue.yml**处理固定格式的issue，打上固定标签，评论，并关闭issue；

5.设置issue格式：
这个我已经设置好了，你只需要进行自定义即可。

#### 二.配置选项

1.如果需要修改爬虫设置或邮件模板等配置，需要修改仓库中的 config.yaml 文件：
> 爬虫相关配置(必选)
> 使用 requests 库实现友链文章的爬取，并将结果存储到根目录下的 all.json 文件中。
``` YAML
spider_settings:
  enable: true
  json_url: "https://blog.liushen.fun/friend.json"
  article_count: 5
  merge_result:
    enable: true
    merge_json_url: "https://fc.liushen.fun"
```

 **参数**                             | **备选值/类型**  | **释义**                                                                                                
------------------------------------|-------------|-------------------------------------------------------------------------------------------------------
 **enable**                         | true/false  | 【必选】控制开关                                                                                              
 **json_url**                       | path | 【必选】友链朋友圈通用爬取格式第一种，填写上面生成的json文件网络地址即可。                                                                         
 **article_count**                    | number | 【可选】每个作者留存文章个数，建议不要太多，五个正好合适。                     
 **marge_result**                        | / | 【可选】是否合并多个json文件，若为true则会合并指定网络地址和本地地址的json文件，建议在自部署部分使用，如果你有多个结果需要合并也可以使用，该部分需要/all.json和/errors.json地址可访问。             
 **marge_result.enable**                    | true/false  | 【可选】是否启用合并功能，该功能提供与自部署的友链合并功能，可以解决服务器部分国外网站，服务器无法访问的问题
 **marge_json_path**                    | path  | 【可选】请填写网络地址的json文件，用于合并，不带最后的斜杠！！！称               
 
> 邮箱推送功能配置(可选)
> 暂未实现，预留用于将每天的友链文章更新推送给指定邮箱。
``` yaml
email_push:
  enable: false
  to_email: recipient@example.com
  subject: "今天的 RSS 订阅更新"
  body_template: "rss_template.html"
```
**暂未实现：该部分暂未实现，由于感觉用处不大，保留接口后期酌情更新。**
> SMTP 配置(可选)
> 使用配置中的相关信息实现邮件发送功能。

```YAML
smtp:
  email: 3162475700@qq.com
  server: smtp.qq.com
  port: 587
  use_tls: true
```
email：发件人邮箱地址
server：SMTP 服务器地址
port：SMTP 端口号
use_tls：是否使用 tls 加密

**这部分讲解起来较为复杂，请自行寻找相关资料进行学习并配置。**

> 特定RSS地址(可选)
``` YAML
specific_RSS:
  - name: "Redish101"
    url: "https://reblog.redish101.top/api/feed"
 # - name: "無名小栈"
 #   url: "https://blog.imsyy.top/rss.xml"
```
name：友链名称，需要严格匹配

url：该友链对应RSS地址

**该部分可以添加多个，如果不需要也可以置空。**


# 2.友链朋友圈前端部署(旧朋友圈)

这个就是前端篇了，前端版本偏多

旧朋友圈：
{% link 友链朋友圈5 - 我的部署历程与主题样式分享,张洪Heo,https://blog.zhheo.com/p/4e18a507.html %}
{% link 鱼塘朋友圈部署前端方案,安知鱼,https://blog.anheyu.com/posts/3753.html %}
## zhheo样式

### 1.添加朋友圈页面
``` CODE
hexo new page fcircle
```
### 2.进入[blogroot]/source/fcircle/index.md，添加以下代码
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
## 安知鱼样式
### 1.安装插件
在博客根目录[Blogroot]下打开终端，运行以下指令（与旧版前端方案不兼容，如有安装旧版请先卸载）：
``` BASH
npm uninstall hexo-butterfly-fcircle --save
npm uninstall hexo-filter-fcircle --save
npm install hexo-filter-fcircle-anzhiyu --save
```
### 2.添加配置信息
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
### 3.插件参数释义:
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

### 4.样式适配
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
### 5.顶部图片样式修改
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

# 3.主流说说部署


# 4.非主流说说部署