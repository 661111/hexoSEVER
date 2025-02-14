---
title: 博客魔改教程总结(三)
description: 从零开始魔改butterfly
date: '2025-02-08 8:00'
cover: /img/2025/01/meihua-post/cover.avif
category:
  - hexo
top_img: /img/2025/01/meihua-post/cover.avif
tags:
  - hexo
  - butterfly
abbrlink: 4222
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
> 5.[🍚博客魔改教程总结(二)](https://www.sxiaohe.top/posts/4221.html)
> 6.[🎋博客魔改教程总结(三)](https://www.sxiaohe.top/posts/4222.html) ⇦当前位置🪂
> 7.[🥕博客魔改教程总结(四)]()
> 8.[🍊博客魔改教程总结(五)]()

# 1.友链朋友圈后端部署
由于这个非常复杂所以我这里会给大家分出两个不同的教程，旧朋友圈目前已经暂停维护了，建议可以选择新朋友圈。

{% link Friend-Circle-Lite:轻量友链朋友圈,liushen,https://blog.liushen.fun/posts/4dc716ec/ %}

{% folding cyan, 请查看教程内容 %}
{% tabs 部署方式 %}
<!-- tab 旧朋友圈部署 -->
详情看这个[部署文档](https://fcircle-doc.yyyzyyyz.cn/#/backenddeploy)
<!-- endtab -->

<!-- tab 新朋友圈部署(butterfly主题支持) -->
## 部署前的操作

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

## 部署爬取项目

### 一.前置工作
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

### 二.配置选项

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

<!-- endtab -->

{% endtabs %}

{% endfolding %}

# 2.友链朋友圈前端部署
这个就是前端篇了，前端版本偏多

旧朋友圈：
{% link 友链朋友圈5 - 我的部署历程与主题样式分享,张洪Heo,https://blog.zhheo.com/p/4e18a507.html %}
{% link 鱼塘朋友圈部署前端方案,安知鱼,https://blog.anheyu.com/posts/3753.html %}

新朋友圈：
{% link Friend-Circle-Lite:轻量友链朋友圈,liushen,https://blog.liushen.fun/posts/4dc716ec/ %}

{% folding cyan, 请查看旧朋友圈教程内容 %}
{% tabs 部署方式 %}
<!-- tab zhheo版本 -->
## 1.添加朋友圈页面
``` CODE
hexo new page fcircle
```
## 2.进入[blogroot]/source/fcircle/index.md，添加以下代码
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
<!-- endtab -->

<!-- tab 安知鱼版本-->
## 1.安装插件
在博客根目录[Blogroot]下打开终端，运行以下指令（与旧版前端方案不兼容，如有安装旧版请先卸载）：
``` BASH
npm uninstall hexo-butterfly-fcircle --save
npm uninstall hexo-filter-fcircle --save
npm install hexo-filter-fcircle-anzhiyu --save
```
## 2.添加配置信息
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
## 3.插件参数释义:
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

## 4.样式适配
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
## 5.顶部图片样式修改
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
<!-- endtab -->
{% endtabs %}
{% endfolding %}

{% folding cyan, 请查看新朋友圈教程内容 %}
注意，一定要部署到page分支上！
{% tabs 部署方式 %}
<!-- tab vercel部署 -->
vercel 部署完成后，检查对应页面，如果页面中没有数据，且 /all.json 路径无法访问可能是部署到main分支了，可以通过 setting-git-Production Branch ，填写为page并重新进行部署即可
![VERCEL](\img\2025\01\meihua-post\66d91da0b056b.webp)
<!-- endtab -->
<!-- tab zeabur部署 -->
注意：每个月免费部署只有不到30天，超过这个时间需要升级（不建议使用）
在部署时直接选择分支：
![ZEABUR](\img\2025\01\meihua-post\66d91ddfa64e7.webp)
<!-- endtab -->
<!-- tab cloudflare部署 -->
在构建时即选择对应的分支，即可部署
![ZEABUR](\img\2025\01\meihua-post\66d91e001ba18.webp)
<!-- endtab -->
{% endtabs %}
{% endfolding %}

# 3.主流说说部署

{% link Butterfly的魔改教程：即刻短文页,亦小封,https://meuicat.com/posts/1cdf15f7.html %}
{% link 即刻短文（瀑布流）部署方案,安知鱼,https://blog.anheyu.com/posts/3753.html %}
{% link Heo即刻短文：分享自我与精彩生活,随风起,https://blog.bywind.xyz/posts/10b1d3b5.html %}

{% folding cyan, 请查看教程内容 %}
注意：本章节没有bbtalk，artitalk和ispeak（配置麻烦），因为教程方案有些老需要额外修改配置
{% tabs 部署方式 %}
<!-- tab icat部署（即刻短文和memos） -->
## 一.功能对比

**todolist**  |	**本地yml**     | ***动态JSON**  |	**动态Memos**
--------------|------------|------------|-----------------------------
**瀑布流**	   | ✔️支持支持 |	✔️支持    |	✔️支持
**图片灯箱**	 | ✔️支持支持 |	✔️支持    |	✔️支持
**多图显示**	 | ✔️支持支持 |	✔️支持    |	✔️支持
**外部链接**	 | ✔️支持支持 |	✔️支持    |	✔️支持
**自定标识**	 | ✔️支持     |	✔️支持    |	✔️支持
**快速评论**	 | ✔️支持     |✔️支持    |	✔️支持
**音乐模块**	 | ✔️支持     |✔️支持    |	✔️支持
**视频模块**	 | ✔️支持     |✔️支持    |	✔️支持
**说说置顶**	 | ✔️支持     |✔️支持    |	✔️支持

## 二.部署历程
### 1.创建数据
#### (1).创建页面配置
创建 [blogRoot]/source/essay/index.md 页面，配置以下内容：
``` MARKDOWN
---
title: 即刻短文
date: 2023-01-17 13:38:17
type: essay
top_img: false
aside: false
top_page: true
top_bg: https://img.meuicat.com/banner
top_item: 即刻短文
top_title: 封の碎碎念
top_tips: 使用 即刻短文动态部署版 构建
top_link: /about/
top_text: 关于博主
---
```
#### (2).新建页面内容
##### 新建页面选择（在配置文件中进行设置）
创建 [blogRoot]/themes/butterfly/layout/includes/page/essay.pug 页面文件，并新增以下内容:
``` PUG
#icat-bber
    section.icat-page
        case theme.essay.mode
            when 'local'
                include ./essay/local.pug
            when 'json'
                include ./essay/json.pug
            when 'memos'
                include ./essay/memos.pug
```
##### 新建静态本地
创建 [blogRoot]/themes/butterfly/layout/includes/page/essay/local.pug 页面文件，并新增以下内容
（注意该页面中可能存在部分 fontawesome 图标 需要自行替换）
``` PUG
mixin renderArticle(item)
    .icat-bber-item
        .icat-bber-content
            if item.content
                p.datacont=item.content
            if item.image
                .icat-bber-image
                    each iten, indey in item.image
                        .imgbox
                            - let image = item.image[indey].split('||')
                            img(src=image[0] alt=image[1] ? image[1] : '' title=image[1] ? '' : '即刻短文配图' )
            if item.video
                .icat-bber-video
                    if item.video.bilibili
                        - let autoplay = item.video.autoplay ? '&autoplay=1' : '&autoplay=0'
                        - let biliurl = '//player.bilibili.com/player.html?bvid=' + item.video.bilibili.match(/(BV\w+)/)[1] + autoplay
                        iframe(src=biliurl scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true")
                    else if item.video.player
                        video(src=item.video.player controls="controls" style="object-fit: cover;")
            if item.aplayer
                .icat-bber-music
                    meting-js(id=item.aplayer.id server=item.aplayer.server type="song" preload="none" autoplay="false" mutex="true" theme='var(--icat-blue)')
        hr
        .icat-bber-bottom
            .icat-bber-info
                .icat-bber-info-time
                    i.iconfont.icat-time-fill
                    time.datatime(datetime=item.date)= 'Loading'
                if item.from
                    .icat-bber-info-from
                        span=item.from
                if item.link
                    - let link = item.link.split('||')
                    a.icat-bber-content-link(target="_blank" href=link[0] title=link[1] ? link[1] : '跳转到短文指引的链接')
                        i.iconfont.icat-jump-link
                        | 链接
                if item.top
                    .icat-bber-info-top
                        i.iconfont.icat-thumbtack
                        | 置顶
            if item.content
                .icat-bber-reply(onclick="commentText(" + `'${item.content}'` + ")")
                    i.iconfont.icat-message

#waterfall.list
    if theme.essay.strip === -1
        - var limitedList = site.data.essay.essay_list
    else
        - var limitedList = site.data.essay.essay_list.slice(0, theme.essay.strip)

    - var topArticles = site.data.essay.essay_list.filter(item => item.top === true)
    each item in topArticles
        +renderArticle(item)

    each item in limitedList.filter(item => !item.top)
        +renderArticle(item)

#icat-bber-tips
    if theme.essay.strip === -1 || Math.abs(theme.essay.strip) >= site.data.essay.essay_list.length
        | - 已展开所有短文 -
    else
        | - 只展示最近 #{theme.essay.strip} 条短文 -
```
##### 新建动态JSON
新建 [blogRoot]/themes/butterfly/layout/includes/page/essay/json.pug 页面文件，并新增以下内容
（注意该页面中可能存在部分 fontawesome 图标 需要自行替换）
``` PUG
#waterfall.list
    .icat-bber-loading
        img(src="https://img.meuicat.com/blog/loading.svg")
    script.
        (async function () {
            const response = await fetch('!{url_for(theme.essay.mode_link)}');
            const data = await response.json();
            const strip = !{theme.essay.strip};
            let items = [],
                topitem = [],
                essayTips = '';

            const processedData = await Promise.all(data[0].essay_list.map(async (item) => {
                const formatdata = await essayFormat(item);
                if (!formatdata) return null;
                if (item.top) {
                    topitem.push(formatdata);
                } else {
                    items.push(formatdata);
                }
                return formatdata;
            }));

            essayTips = strip === -1 || strip >= items.length ? `<div id="icat-bber-tips">- 已展开所有短文 -</div>` : (items = items.slice(0, strip), `<div id="icat-bber-tips">- 只展示最近 ${strip} 条短文 -</div>`);

            document.getElementsByClassName('list')[0].innerHTML = topitem.concat(items).filter(item => item !== null).join('');
            document.querySelector(".icat-page").insertAdjacentHTML("beforeend", essayTips);
        })();
        async function essayFormat(item) {
            let image = '',
                video = '',
                type = '';

            if (item.image) item.image.map(e => image += `<div class="imgbox"><img src="${e.split(' || ')[0]}" ${e.split(' || ').length > 1 ? `alt='${e.split(' || ')[1]}'` : `title="即刻短文配图"`} /></div>`).join('');
            let aplayer = item.aplayer ? `<div class="icat-bber-music"><meting-js server="${item.aplayer.server}" type="song" id="${item.aplayer.id}" mutex="true" preload="none" theme="var(--icat-blue)" data-lrctype="0"></meting-js></div>` : '';
            if (item.video) video = item.video.player ? `<div class="icat-bber-video"><video src="${item.video.player}" controls="controls" style="object-fit: cover;"></video></div>` : item.video.bilibili ? `<div class="icat-bber-video"><iframe src="//player.bilibili.com/player.html?bvid=${item.video.bilibili.match(/(BV\w+)/)[1]}${item.video.autoplay ? '&autoplay=1' : '&autoplay=0'}" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe></div>` : '';
            let link = item.link ? ((type = item.link.split(' || ')), `<a class="icat-bber-content-link" href='${type[0].startsWith('/') ? type[0] : (type[0].startsWith('http') ? type[0] : 'https://' + type[0])}' title="${type.length > 1 ? type[1] : '跳转到短文指引的链接' }" target="_blank"><i class="iconfont icat-jump-link"></i>链接</a>`) : '';
            
            return `
                <div class="icat-bber-item">
                    <div class="icat-bber-content">
                        ${item.content ? `<p class="datacont">${item.content}</p>` : ''}
                        ${image ? `<div class="icat-bber-image">${image}</div>` : ''}
                        ${aplayer}
                        ${video}
                    </div>
                    <hr>
                    <div class="icat-bber-bottom">
                        <div class="icat-bber-info">
                            <div class="icat-bber-info-time">
                                <i class="iconfont icat-time-fill"></i>
                                <time class="datatime" datetime="${item.date}"></time>
                            </div>
                            ${link}
                            ${item.from ? `<div class="icat-bber-info-from"><span>${item.from}</span></div>` : ''}
                            ${item.top ? `<div class="icat-bber-info-top"><i class="iconfont icat-thumbtack"></i>置顶</div>` : ''}
                        </div>
                        ${item.content ? `<div class="icat-bber-reply" onclick="commentText('${item.content}')"><i class="iconfont icat-message"></i></div>` : ''}
                    </div>
                </div>`;
        }
```
##### 新建MEMOS页面
创建 [blogRoot]/themes/butterfly/layout/includes/page/essay/memos.pug 页面文件，并新增以下内容
（注意该页面中可能存在部分 fontawesome 图标 需要自行替换）
``` PUG
#waterfall.list
    .icat-bber-loading
        img(src="https://img.meuicat.com/blog/loading.svg")
    script.
        (async function () {
            let url = '!{url_for(theme.essay.mode_link)}';
            const baseUrl = url.substring(0, url.indexOf("/", url.indexOf("//") + 2));
            const response = await fetch(url);
            const data = await response.json();
            const strip = !{theme.essay.strip};
            let items = [],
                topitem = [],
                essayTips = '';

            const processedData = await Promise.all(data.map(async (item) => {
                const formatdata = await essayFormat(item,baseUrl);
                if (!formatdata) return null;
                if (item.content.includes('#top')) {
                    topitem.push(formatdata);
                } else {
                    items.push(formatdata);
                }
                return formatdata;
            }));

            essayTips = strip === -1 || strip >= items.length ? `<div id="icat-bber-tips">- 已展开所有短文 -</div>` : (items = items.slice(0, strip), `<div id="icat-bber-tips">- 只展示最近 ${strip} 条短文 -</div>`);

            document.getElementsByClassName('list')[0].innerHTML = topitem.concat(items).filter(item => item !== null).join('');
            document.querySelector(".icat-page").insertAdjacentHTML("beforeend", essayTips);
        })();
        async function essayFormat(item,baseUrl) {
            const contentRegex = /#(.*?)\s|\n/g,
                imageRegex = /\!\[(.*?)\]\((.*?)\)/g,
                playerRegex = /{\s*player\s*(.*)\s*}/g,
                linkRegex = /(?<!\!)\[(.*?)\]\((.*?)\)/g,
                topRegex = /#top/g,
                fromRegex = /(?<![\w\/])(?<!\{)\{([^{}\s]+)\}(?!\})(?![\w\/])/g;
            let time = new Date((item.createdTs - (new Date().getTimezoneOffset() * 60)) * 1000).toISOString(),
                content = item.content,
                image = '',
                img = content.match(imageRegex);
                aplayer = content.match(/{\s*music\s*(.*?)\s*(.*?)\s*}/g),
                video = content.match(playerRegex),
                link = content.match(linkRegex),
                type = '',
                from = content.match(fromRegex);
            
            if (item.resourceList.length) {
                if (!img) img = [];  
                item.resourceList.forEach(e => {
                    if (e.externalLink) img.push(e.externalLink);
                    else img.push(`${baseUrl}/o/r/${e.uid}`);
                });
            }
            if (img) image += img.map(e => `<div class="imgbox"><img src="${e.replace(imageRegex, '$2')}" ${e.replace(imageRegex, '$1') ? `alt="${e.replace(imageRegex, '$1')}"` : `title="即刻短文配图"`} /></div>`).join('');
            aplayer = aplayer ? `<div class="icat-bber-music"><meting-js server="${aplayer[0].match(/\{\s*music\s*(.*?)\s*\d+\s*\}/)[1]}" type="song" id="${aplayer[0].match(/\d+/)[0]}" mutex="true" preload="none" theme="var(--icat-blue)" data-lrctype="0"></meting-js></div>` : '';
            video = video ? `<div class="icat-bber-video"><video src="${video[0].replace(playerRegex, '$1').trim()}" controls="controls" style="object-fit: cover;"></video></div>` : content.match(/{\s*bilibili\s*(.*?)\s*}/g);
            video = Array.isArray(video) ? `<div class="icat-bber-video"><iframe src="//player.bilibili.com/player.html?bvid=${video[0].match(/(BV\w+)/)[1]}${video[0].match(/{\s*bilibili\s*(.*?)\s*true\s*}/g) ? '&autoplay=1' : '&autoplay=0'}" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"></iframe></div>` : '';
            link = link ? ((type = link[0].replace(linkRegex, '$2')), `<a class="icat-bber-content-link" href='${type.startsWith('/') ? type : (type.startsWith('http') ? type : 'https://' + type)}' title="${link[0].replace(linkRegex, '$1') ? link[0].replace(linkRegex, '$1') : '跳转到短文指引的链接' }" target="_blank"><i class="iconfont icat-jump-link"></i>链接</a>`) : '';
            from = from ? `<div class="icat-bber-info-from"><span>${from[0].replace(fromRegex, '$1')}</span></div>` : '';
            content = content.replace(contentRegex, '').replace(imageRegex, '').replace(/\{(.*?)\}/g, '').replace(linkRegex, '').trim();

            return `
                <div class="icat-bber-item">
                    <div class="icat-bber-content">
                        ${content ? `<p class="datacont">${content}</p>` : ''}
                        ${image ? `<div class="icat-bber-image">${image}</div>` : ''}
                        ${aplayer}
                        ${video}
                    </div>
                    <hr>
                    <div class="icat-bber-bottom">
                        <div class="icat-bber-info">
                            <div class="icat-bber-info-time">
                                <i class="iconfont icat-time-fill"></i>
                                <time class="datatime" datetime="${time}"></time>
                            </div>
                            ${link}
                            ${from}
                            ${item.content.includes('#top') ? `<div class="icat-bber-info-top"><i class="iconfont icat-thumbtack"></i>置顶</div>` : ''}
                        </div>
                        ${content ? `<div class="icat-bber-reply" onclick="commentText('${content}')"><i class="iconfont icat-message"></i></div>` : ''}
                    </div>
                </div>`;
        }
```
##### 修改页面文件（页面匹配markdown的type）
修改 [blogRoot]/themes/butterfly/layout/page.pug 来使页面匹配
（ + 号直接删除 即是正常缩进）
``` PUG
      when 'categories'
        include includes/page/categories.pug
+      when 'essay'
+        include includes/page/essay.pug
      default
        include includes/page/default-page.pug
```
##### 开启PJAX设置（可选）
【可选】在 _config.butterfly.yml 主题配置文件中开启站点的 pjax
``` YML
# Pjax
# https://github.com/MoOx/pjax
# 当用户点击链接，通过ajax更新页面需要变化的部分，然后使用HTML5的pushState修改浏览器的URL地址；这样可以不用重复加载相同的资源（css/js）， 从而提升网页的加载速度
# 使用pjax后，一些自己DIY的js可能会无效，跳转页面时需要重新调用；使用pjax后，一些个别页面加载的js/css，将会改为所有页面都加载
# --------------------------------------
pjax:
  enable: true
  exclude:
    # - xxxx
    # - xxxx
```
##### 设置样式（styl或者css）
新建 [blogRoot]/themes/butterfly/source/css/_page/essay.styl 样式文件，并新增以下内容:
``` STYL
#icat-bber
    margin-top: 1.5rem
    width: 100%

    .icat-page
        #waterfall
            opacity: 0
            transition: .3s

            &.list
                display: flex
                flex-flow: row wrap
                justify-content: space-between

            &.show
                opacity: 1

            .icat-bber-item
                position: relative
                width: 32%
                border: var(--style-border)
                border-radius: 12px
                padding: 1rem 1rem 0.9rem
                transition: all 0.3s ease 0s
                display: flex
                flex-flow: column nowrap
                justify-content: space-between
                align-items: flex-start
                background: var(--icat-card-bg)
                box-shadow: var(--icat-shadow-border)
                margin-right: 2%
                margin-bottom: 1rem
                animation: slide-in .6s .4s backwards

                +maxWidth1024()
                    width: 49%
                    margin-right: 1%

                +maxWidth768()
                    width: 100%
                    margin-right: 0px
                    
                &:hover
                    border-color: var(--icat-blue)

                .icat-bber-content
                    display: flex
                    flex-flow: wrap
                    border-radius: 12px
                    width: 100%
                    height: 100%

                    p
                        margin: 0px

                    .datacont
                        order: 0
                        font-size: 0.8rem
                        font-weight: 700
                        color: var(--icat-fontcolor)
                        width: 100%
                        line-height: 1.38
                        border-radius: 12px
                        margin-bottom: 0.8rem
                        display: flex
                        flex-direction: column
                        text-align: justify
                        padding: 0px 8px

                    .icat-bber-image
                        display: flex
                        gap: 8px
                        width: 100%
                        flex-wrap: wrap
                        margin-bottom: 10px
                        padding-left: 8px

                        .imgbox
                            width: calc(100% / 4 - 8px)
                            aspect-ratio: 1 / 1
                            overflow: hidden
                            border-radius: 6px

                            a
                                height: 100px
                                display: flex
                                position: relative

                                img
                                    object-fit: cover
                                    width: 100%
                                    max-height: 100%
                                    border-radius: 6px
                                    animation: slide-in .6s .4s backwards

                    .icat-bber-video
                        position: relative
                        padding: 30% 50%
                        margin-bottom: 10px

                        video,
                        iframe
                            position: absolute
                            width: 100%
                            height: 100%
                            left: 0
                            top: 0
                            margin: 0
                            border-radius: 6px
                            border: var(--style-border)

                    .icat-bber-music
                        width: 100%
                        height: 90px
                        margin: 0 0 0.5rem
                        border-radius: 8px
                        overflow: hidden
                        border: var(--style-border)
                        background: var(--icat-secondbg)

                hr
                    display: flex
                    position: relative
                    margin: 8px 0px
                    border: 1px dashed var(--icat-blue)
                    width: 100%
                    opacity: 0.4

                .icat-bber-bottom
                    display: flex
                    justify-content: space-between
                    width: 100%
                    margin-top: 10px
                    user-select: none

                    .icat-bber-info
                        display: flex

                        .icat-bber-info-time
                            color: var(--icat-fontcolor)
                            font-size: 0.7rem
                            background-color: var(--icat-gray-op)
                            padding: 8px
                            border-radius: 20px
                            cursor: default
                            display: flex
                            align-items: center
                            padding-right: 12px
                            line-height: 1

                            i
                                padding-right: 4px

                        .icat-bber-info-from
                            @extend .icat-bber-info-time
                            margin-left: 0.5rem

                            span
                                margin-left: 0.35rem

                        .icat-bber-content-link
                            display: flex
                            margin-left: 0.5rem
                            font-size: 0.7rem
                            align-items: center
                            background-color: rgba(103, 194, 58, 0.13)
                            color: rgb(103, 194, 58)
                            padding: 0px 8px
                            border-radius: 20px
                            padding-right: 10px
                            line-height: 1

                            i
                                margin-right: 4px

                            &:hover
                                background-color: var(--icat-blue)
                                color: var(--icat-white)

                        .icat-bber-info-top
                            background-color: rgba(245, 108, 108, 0.13)
                            color: rgb(245, 108, 108)
                            display: flex
                            margin-left: 0.5rem
                            font-size: 0.7rem
                            align-items: center
                            padding: 0px 8px
                            border-radius: 20px
                            padding-right: 10px
                            line-height: 1

                            i
                                margin-right: 4px
                                font-size: 14px
                                transform: rotateZ(35deg)

                    .icat-bber-reply
                        cursor: pointer
                        transition: .6s

                        &:hover
                            color: var(--icat-blue)

        #icat-bber-tips
            font-size: 14px
            display: flex
            justify-content: center
            margin-bottom: 2rem
            color: var(--icat-secondtext)
    
    .icat-bber-loading
        position: revert !important
        margin: 0 auto

    .aplayer
        margin: 0

        &.aplayer-withlrc
            .aplayer-pic
                height: 82px
                width: 82px
                margin: 3px
                border-radius: 4px

            .aplayer-info
                margin-left: 84px
                padding: 5px 7px 0

                .aplayer-music
                    height: 23px
                    text-align: center

                    .aplayer-title
                        font-size: 0.8rem
                        font-weight: 700
                        margin: 0
                        color: var(--icat-fontcolor)

                .aplayer-controller
                    align-items: center

                    .aplayer-bar-wrap
                        padding: 0

                        .aplayer-bar
                            background: var(--icat-gray)
                            height: 8px
                            border-radius: 12px
                            transition: 0.3s
                            overflow: hidden

                            .aplayer-loaded
                                height: 100%
                                border-radius: 12px

                            .aplayer-played
                                height: 100%
                                border-radius: 12px

                                .aplayer-thumb
                                    display: none

                    .aplayer-time
                        position: initial

        .aplayer-lrc
            height: 36px
            margin: -12px 0 3px

            &::after
                height: 20%
            &::before
                height: 4%

            p
                color: var(--icat-fontcolor)

[data-theme='dark']
    #icat-bber
        .icat-page
            #waterfall
                .icat-bber-item
                    hr
                        opacity: 0.2
            
            .icat-bber-music .aplayer,
            .aplayer .aplayer-lrc:before,
            .aplayer .aplayer-lrc:after
                background: var(--icat-card-bg)
                color: var(--icat-fontcolor)
```
{% folding cyan, 可选CSS样式 %}
新建 [blogRoot]/source/css/essay.css 样式文件，并新增以下内容
（也可以在自建的css文件里新增内容）
``` CSS
#icat-bber {
  margin-top: 1.5rem;
  width: 100%;
}
#icat-bber .icat-page #waterfall {
  opacity: 0;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";
  filter: alpha(opacity=0);
  -webkit-transition: 0.3s;
  -moz-transition: 0.3s;
  -o-transition: 0.3s;
  -ms-transition: 0.3s;
  transition: 0.3s;
}
#icat-bber .icat-page #waterfall.list {
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  -webkit-box-orient: horizontal;
  -moz-box-orient: horizontal;
  -o-box-orient: horizontal;
  -webkit-box-lines: multiple;
  -moz-box-lines: multiple;
  -o-box-lines: multiple;
  -webkit-flex-flow: row wrap;
  -ms-flex-flow: row wrap;
  flex-flow: row wrap;
  -webkit-box-pack: justify;
  -moz-box-pack: justify;
  -o-box-pack: justify;
  -ms-flex-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
}
#icat-bber .icat-page #waterfall.show {
  opacity: 1;
  -ms-filter: none;
  filter: none;
}
#icat-bber .icat-page #waterfall .icat-bber-item {
  position: relative;
  width: 32%;
  border: var(--style-border);
  border-radius: 12px;
  padding: 1rem 1rem 0.9rem;
  -webkit-transition: all 0.3s ease 0s;
  -moz-transition: all 0.3s ease 0s;
  -o-transition: all 0.3s ease 0s;
  -ms-transition: all 0.3s ease 0s;
  transition: all 0.3s ease 0s;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  -webkit-box-orient: vertical;
  -moz-box-orient: vertical;
  -o-box-orient: vertical;
  -webkit-box-lines: single;
  -moz-box-lines: single;
  -o-box-lines: single;
  -webkit-flex-flow: column nowrap;
  -ms-flex-flow: column nowrap;
  flex-flow: column nowrap;
  -webkit-box-pack: justify;
  -moz-box-pack: justify;
  -o-box-pack: justify;
  -ms-flex-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  -webkit-box-align: start;
  -moz-box-align: start;
  -o-box-align: start;
  -ms-flex-align: start;
  -webkit-align-items: flex-start;
  align-items: flex-start;
  background: var(--icat-card-bg);
  -webkit-box-shadow: var(--icat-shadow-border);
  box-shadow: var(--icat-shadow-border);
  margin-right: 2%;
  margin-bottom: 1rem;
  -webkit-animation: slide-in 0.6s 0.4s backwards;
  -moz-animation: slide-in 0.6s 0.4s backwards;
  -o-animation: slide-in 0.6s 0.4s backwards;
  -ms-animation: slide-in 0.6s 0.4s backwards;
  animation: slide-in 0.6s 0.4s backwards;
}
@media screen and (max-width: 1024px) {
  #icat-bber .icat-page #waterfall .icat-bber-item {
    width: 49%;
    margin-right: 1%;
  }
}
@media screen and (max-width: 768px) {
  #icat-bber .icat-page #waterfall .icat-bber-item {
    width: 100%;
    margin-right: 0px;
  }
}
#icat-bber .icat-page #waterfall .icat-bber-item:hover {
  border-color: var(--icat-blue);
}
#icat-bber .icat-page #waterfall .icat-bber-item .icat-bber-content {
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  -webkit-box-lines: multiple;
  -moz-box-lines: multiple;
  -o-box-lines: multiple;
  -webkit-flex-flow: wrap;
  -ms-flex-flow: wrap;
  flex-flow: wrap;
  border-radius: 12px;
  width: 100%;
  height: 100%;
}
#icat-bber .icat-page #waterfall .icat-bber-item .icat-bber-content p {
  margin: 0px;
}
#icat-bber .icat-page #waterfall .icat-bber-item .icat-bber-content .datacont {
  -webkit-box-ordinal-group: 0;
  -moz-box-ordinal-group: 0;
  -o-box-ordinal-group: 0;
  -ms-flex-order: 0;
  -webkit-order: 0;
  order: 0;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--icat-fontcolor);
  width: 100%;
  line-height: 1.38;
  border-radius: 12px;
  margin-bottom: 0.8rem;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  -webkit-box-orient: vertical;
  -moz-box-orient: vertical;
  -o-box-orient: vertical;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
  text-align: justify;
  padding: 0px 8px;
}
#icat-bber .icat-page #waterfall .icat-bber-item .icat-bber-content .icat-bber-image {
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  gap: 8px;
  width: 100%;
  -webkit-box-lines: multiple;
  -moz-box-lines: multiple;
  -o-box-lines: multiple;
  -webkit-flex-wrap: wrap;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  margin-bottom: 10px;
  padding-left: 8px;
}
#icat-bber .icat-page #waterfall .icat-bber-item .icat-bber-content .icat-bber-image .imgbox {
  width: calc(100% / 4 - 8px);
  aspect-ratio: 1/1;
  overflow: hidden;
  border-radius: 6px;
}
#icat-bber .icat-page #waterfall .icat-bber-item .icat-bber-content .icat-bber-image .imgbox a {
  height: 100px;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  position: relative;
}
#icat-bber .icat-page #waterfall .icat-bber-item .icat-bber-content .icat-bber-image .imgbox a img {
  object-fit: cover;
  width: 100%;
  max-height: 100%;
  border-radius: 6px;
  -webkit-animation: slide-in 0.6s 0.4s backwards;
  -moz-animation: slide-in 0.6s 0.4s backwards;
  -o-animation: slide-in 0.6s 0.4s backwards;
  -ms-animation: slide-in 0.6s 0.4s backwards;
  animation: slide-in 0.6s 0.4s backwards;
}
#icat-bber .icat-page #waterfall .icat-bber-item .icat-bber-content .icat-bber-video {
  position: relative;
  padding: 30% 50%;
  margin-bottom: 10px;
}
#icat-bber .icat-page #waterfall .icat-bber-item .icat-bber-content .icat-bber-video video,
#icat-bber .icat-page #waterfall .icat-bber-item .icat-bber-content .icat-bber-video iframe {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  margin: 0;
  border-radius: 6px;
  border: var(--style-border);
}
#icat-bber .icat-page #waterfall .icat-bber-item .icat-bber-content .icat-bber-music {
  width: 100%;
  height: 90px;
  margin: 0 0 0.5rem;
  border-radius: 8px;
  overflow: hidden;
  border: var(--style-border);
  background: var(--icat-secondbg);
}
#icat-bber .icat-page #waterfall .icat-bber-item hr {
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  position: relative;
  margin: 8px 0px;
  border: 1px dashed var(--icat-blue);
  width: 100%;
  opacity: 0.4;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=40)";
  filter: alpha(opacity=40);
}
#icat-bber .icat-page #waterfall .icat-bber-item .icat-bber-bottom {
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  -webkit-box-pack: justify;
  -moz-box-pack: justify;
  -o-box-pack: justify;
  -ms-flex-pack: justify;
  -webkit-justify-content: space-between;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
#icat-bber .icat-page #waterfall .icat-bber-item .icat-bber-bottom .icat-bber-info {
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
}
#icat-bber .icat-page #waterfall .icat-bber-item .icat-bber-bottom .icat-bber-info .icat-bber-info-time,
#icat-bber .icat-page #waterfall .icat-bber-item .icat-bber-bottom .icat-bber-info .icat-bber-info-from {
  color: var(--icat-fontcolor);
  font-size: 0.7rem;
  background-color: var(--icat-gray-op);
  padding: 8px;
  border-radius: 20px;
  cursor: default;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  -webkit-box-align: center;
  -moz-box-align: center;
  -o-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  padding-right: 12px;
  line-height: 1;
}
#icat-bber .icat-page #waterfall .icat-bber-item .icat-bber-bottom .icat-bber-info .icat-bber-info-time i,
#icat-bber .icat-page #waterfall .icat-bber-item .icat-bber-bottom .icat-bber-info .icat-bber-info-from i {
  padding-right: 4px;
}
#icat-bber .icat-page #waterfall .icat-bber-item .icat-bber-bottom .icat-bber-info .icat-bber-info-from {
  margin-left: 0.5rem;
}
#icat-bber .icat-page #waterfall .icat-bber-item .icat-bber-bottom .icat-bber-info .icat-bber-info-from span {
  margin-left: 0.35rem;
}
#icat-bber .icat-page #waterfall .icat-bber-item .icat-bber-bottom .icat-bber-info .icat-bber-content-link {
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  margin-left: 0.5rem;
  font-size: 0.7rem;
  -webkit-box-align: center;
  -moz-box-align: center;
  -o-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  background-color: rgba(103,194,58,0.13);
  color: #67c23a;
  padding: 0px 8px;
  border-radius: 20px;
  padding-right: 10px;
  line-height: 1;
}
#icat-bber .icat-page #waterfall .icat-bber-item .icat-bber-bottom .icat-bber-info .icat-bber-content-link i {
  margin-right: 4px;
}
#icat-bber .icat-page #waterfall .icat-bber-item .icat-bber-bottom .icat-bber-info .icat-bber-content-link:hover {
  background-color: var(--icat-blue);
  color: var(--icat-white);
}
#icat-bber .icat-page #waterfall .icat-bber-item .icat-bber-bottom .icat-bber-info .icat-bber-info-top {
  background-color: rgba(245,108,108,0.13);
  color: #f56c6c;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  margin-left: 0.5rem;
  font-size: 0.7rem;
  -webkit-box-align: center;
  -moz-box-align: center;
  -o-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  padding: 0px 8px;
  border-radius: 20px;
  padding-right: 10px;
  line-height: 1;
}
#icat-bber .icat-page #waterfall .icat-bber-item .icat-bber-bottom .icat-bber-info .icat-bber-info-top i {
  margin-right: 4px;
  font-size: 14px;
  -webkit-transform: rotateZ(35deg);
  -moz-transform: rotateZ(35deg);
  -o-transform: rotateZ(35deg);
  -ms-transform: rotateZ(35deg);
  transform: rotateZ(35deg);
}
#icat-bber .icat-page #waterfall .icat-bber-item .icat-bber-bottom .icat-bber-reply {
  cursor: pointer;
  -webkit-transition: 0.6s;
  -moz-transition: 0.6s;
  -o-transition: 0.6s;
  -ms-transition: 0.6s;
  transition: 0.6s;
}
#icat-bber .icat-page #waterfall .icat-bber-item .icat-bber-bottom .icat-bber-reply:hover {
  color: var(--icat-blue);
}
#icat-bber .icat-page #icat-bber-tips {
  font-size: 14px;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  -webkit-box-pack: center;
  -moz-box-pack: center;
  -o-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  margin-bottom: 2rem;
  color: var(--icat-secondtext);
}
#icat-bber .icat-bber-loading {
  position: revert !important;
  margin: 0 auto;
}
#icat-bber .aplayer {
  margin: 0;
}
#icat-bber .aplayer.aplayer-withlrc .aplayer-pic {
  height: 82px;
  width: 82px;
  margin: 3px;
  border-radius: 4px;
}
#icat-bber .aplayer.aplayer-withlrc .aplayer-info {
  margin-left: 84px;
  padding: 5px 7px 0;
}
#icat-bber .aplayer.aplayer-withlrc .aplayer-info .aplayer-music {
  height: 23px;
  text-align: center;
}
#icat-bber .aplayer.aplayer-withlrc .aplayer-info .aplayer-music .aplayer-title {
  font-size: 0.8rem;
  font-weight: 700;
  margin: 0;
  color: var(--icat-fontcolor);
}
#icat-bber .aplayer.aplayer-withlrc .aplayer-info .aplayer-controller {
  -webkit-box-align: center;
  -moz-box-align: center;
  -o-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
#icat-bber .aplayer.aplayer-withlrc .aplayer-info .aplayer-controller .aplayer-bar-wrap {
  padding: 0;
}
#icat-bber .aplayer.aplayer-withlrc .aplayer-info .aplayer-controller .aplayer-bar-wrap .aplayer-bar {
  background: var(--icat-gray);
  height: 8px;
  border-radius: 12px;
  -webkit-transition: 0.3s;
  -moz-transition: 0.3s;
  -o-transition: 0.3s;
  -ms-transition: 0.3s;
  transition: 0.3s;
  overflow: hidden;
}
#icat-bber .aplayer.aplayer-withlrc .aplayer-info .aplayer-controller .aplayer-bar-wrap .aplayer-bar .aplayer-loaded {
  height: 100%;
  border-radius: 12px;
}
#icat-bber .aplayer.aplayer-withlrc .aplayer-info .aplayer-controller .aplayer-bar-wrap .aplayer-bar .aplayer-played {
  height: 100%;
  border-radius: 12px;
}
#icat-bber .aplayer.aplayer-withlrc .aplayer-info .aplayer-controller .aplayer-bar-wrap .aplayer-bar .aplayer-played .aplayer-thumb {
  display: none;
}
#icat-bber .aplayer.aplayer-withlrc .aplayer-info .aplayer-controller .aplayer-time {
  position: initial;
}
#icat-bber .aplayer .aplayer-lrc {
  height: 36px;
  margin: -12px 0 3px;
}
#icat-bber .aplayer .aplayer-lrc::after {
  height: 20%;
}
#icat-bber .aplayer .aplayer-lrc::before {
  height: 4%;
}
#icat-bber .aplayer .aplayer-lrc p {
  color: var(--icat-fontcolor);
}
[data-theme='dark'] #icat-bber .icat-page #waterfall .icat-bber-item hr {
  opacity: 0.2;
  -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=20)";
  filter: alpha(opacity=20);
}
[data-theme='dark'] #icat-bber .icat-page .icat-bber-music .aplayer,
[data-theme='dark'] #icat-bber .icat-page .aplayer .aplayer-lrc:before,
[data-theme='dark'] #icat-bber .icat-page .aplayer .aplayer-lrc:after {
  background: var(--icat-card-bg);
  color: var(--icat-fontcolor);
}

/* 即刻短文样式 */
```
##### 添加css样式到配置文件
在 _config.butterfly.yml 主题配置文件中 inject 下的 head 引入 essay.css 样式文件:
``` YML
  ···

inject:
  head:
    - <link rel="stylesheet" href="/css/essay.css"> # 即刻短文样式
  bottom:
    - ···

  ···
```
{% endfolding %}

##### 新建js文件
创建 [blogRoot]/source/js/essay.js 文件，并新增以下内容，用来处理即刻短文的逻辑
（或写在自建的公共 js 中也可以）
``` JS
function whenDOMReady() {
  if (location.pathname == '/essay/') document.addEventListener('DOMContentLoaded', function () {setTimeout(() => { changeTime(), btf.loadLightbox(document.querySelectorAll('#icat-bber img')), window.lazyLoadInstance && window.lazyLoadInstance.update(), reflashWaterFall();}, 300)})
}
whenDOMReady()
document.addEventListener("pjax:complete", whenDOMReady)

// 适配pjax

window.onresize = () => {
  waterfall('#waterfall');
};

// 自适应

function timeDiff(timeObj, today) => {
  const timeObjUTC = Date.UTC(timeObj.getFullYear(), timeObj.getMonth(), timeObj.getDate());
  const todayUTC = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());

  const timeDiff = todayUTC - timeObjUTC;
  return Math.floor(timeDiff / (1000 * 3600 * 24));
}
function changeTime() {
  const timeElements = Array.from(document.getElementsByTagName("time"));
  const currentDate = new Date();

  timeElements.forEach(timeElement => {
    const datetime = timeElement.getAttribute("datetime");
    const timeObj = new Date(datetime);
    const daysDiff = timeDiff(timeObj, currentDate);

    let timeString;
    if (daysDiff === 0) {
      timeString = `最近`;
    } else if (daysDiff === 1) {
      timeString = `昨天`;
    } else if (daysDiff === 2) {
      timeString = `前天`;
    } else if (daysDiff <= 7) {
      timeString = `${daysDiff}天前`;
    } else {
      if (timeObj.getFullYear() !== currentDate.getFullYear()) {
        timeString = `${timeObj.getFullYear()}/${timeObj.getMonth() + 1}/${timeObj.getDate()}`;
      } else {
        timeString = `${timeObj.getMonth() + 1}/${timeObj.getDate()}`;
      }
    }
    timeElement.textContent = timeString;
  });
}
function reflashWaterFall() {
  document.querySelector("#waterfall") &&
    setTimeout(function() {
      waterfall("#waterfall");
      document.getElementById("waterfall")
        .classList.add("show");
    }, 500);
} // 加载显示 - 即刻短文
function commentText(txt) {
  const inputs = ["#wl-edit", ".el-textarea__inner"];
  for (let i = 0; i < inputs.length; i++) {
    let el = document.querySelector(inputs[i]);
    if (el != null) {
      el.dispatchEvent(new Event('input', { bubble: true, cancelable: true }));
      el.value = '> ' + txt.replace(/\n/g, '\n> ') + '\n\n';
      el.focus();
      el.setSelectionRange(-1, -1);
    }
  }
} // 引用评论跳转 - 即刻短文
```
创建 [blogRoot]/source/js/waterfall.js 文件，并新增以下内容，用于处理瀑布流
（或写在公共 js 中也可以）
``` JS
function waterfall(a) {
  function b(a, b) {
    var c = window.getComputedStyle(b);
    return parseFloat(c["margin" + a]) || 0;
  }
  function c(a) {
    return a + "px";
  }
  function d(a) {
    return parseFloat(a.style.top);
  }
  function e(a) {
    return parseFloat(a.style.left);
  }
  function f(a) {
    return a.clientWidth;
  }
  function g(a) {
    return a.clientHeight;
  }
  function h(a) {
    return d(a) + g(a) + b("Bottom", a);
  }
  function i(a) {
    return e(a) + f(a) + b("Right", a);
  }
  function j(a) {
    a = a.sort(function (a, b) {
      return h(a) === h(b) ? e(b) - e(a) : h(b) - h(a);
    });
  }
  function k(b) {
    f(a) != t && (b.target.removeEventListener(b.type, arguments.callee), waterfall(a));
  }
  "string" == typeof a && (a = document.querySelector(a));
  var l = [].map.call(a.children, function (a) {
    return (a.style.position = "absolute"), a;
  });
  a.style.position = "relative";
  var m = [];
  l.length && ((l[0].style.top = "0px"), (l[0].style.left = c(b("Left", l[0]))), m.push(l[0]));
  for (var n = 1; n < l.length; n++) {
    var o = l[n - 1],
      p = l[n],
      q = i(o) + f(p) <= f(a);
    if (!q) break;
    (p.style.top = o.style.top), (p.style.left = c(i(o) + b("Left", p))), m.push(p);
  }
  for (; n < l.length; n++) {
    j(m);
    var p = l[n],
      r = m.pop();
    (p.style.top = c(h(r) + b("Top", p))), (p.style.left = c(e(r))), m.push(p);
  }
  j(m);
  var s = m[0];
  a.style.height = c(h(s) + b("Bottom", s));
  var t = f(a);
  window.addEventListener ? window.addEventListener("resize", k) : (document.body.onresize = k);
}
```
##### 引入js文件
在 _config.butterfly.yml 主题配置文件中 inject 下的 bottom 引入 essay.js 和 waterfall.js
``` YML
  ···

inject:
  head:
    - ···
  bottom:
    - <script async src="/js/waterfall.js"></script> # 瀑布流JS
    - <script defer src="/js/essay.js"></script> # 即刻逻辑文件

  ···
```
##### 添加以下配置
在 _config.butterfly.yml 主题配置文件中，新增以下配置项
``` YML
# essay 即刻短文
# MeuiCat设计
# https://meuicat.com/blog/67/
# --------------------------------------

essay:
  enable: true
  # 即刻短文仅展示前n条
  # Jike short text only shows the first n
  strip: 50
  mode: memos # local：本地静态 / json：动态json / memos：动态Memos
  mode_link: https://memos.meuicat.com/api/v1/memo?creatorId=1&tag=说说 #动态模式地址
```
### 2.创建数据内容

{% tabs 数据模式 %}

<!-- tab 本地静态 -->
创建 [blogRoot]/source/_data/essay.yml 文件，并新增以下内容
``` YML
essay_list:
  - content: 即刻短文测试
    date: 2023/07/31 15:30:50
    from: iPhone XR
    video: 
      player: /video/1.mp4

  - content: 测试bilibili视频
    date: 2023/07/31 15:30:50
    video: 
      bilibili: //player.bilibili.com/player.html?aid=913951276&bvid=BV1RM4y1p75T&cid=1211165267&page=1

  - content: bilibili网页链接
    date: 2023/07/31 15:30:50
    video: 
      bilibili: https://www.bilibili.com/video/BV17T4y1A7eW/?spm_id_from=333.1007.tianma.1-3-3.click

  - content: bilibili单bv号
    date: 2023/07/31 15:30:50
    video: 
      bilibili: BV17T4y1A7eW
      autoplay: true

  - content: 完噜 还剩一天让我咋准备 😭
    date: 2023/05/11 20:35:42
    from: iPhone XR
    image: 
      - https://s11.ax1x.com/2023/05/11/p9sKEh8.jpg

  - content: 如果要定义 那就是下班后的日落和在家等我下班的她~
    date: 2023/05/10 16:16:15
    aplayer:
      server: netease
      id: 1949516216
    top: true

  - content: Melancholia - 欭 | 一款纯记录写作类Hexo主题 ✍️
    date: 2023/04/23 22:27:22
    from: Macbook Pro
    link: https://github.com/yife68/Hexo-Theme-Melancholia || Melancholia

  - content: 爱看 但还是得吃我一拳
    date: 2023/04/22 15:10:30
    from: iPhone XR
    image: 
      - https://s11.ax1x.com/2023/05/03/p9JqGXd.jpg
      - https://s11.ax1x.com/2023/05/03/p9Jq86H.jpg

  - content: iCat 新启程
    date: 2023/03/24 16:54:25
    from: iPhone XR
    link: https://meuicat.com/blog/14/
    image: 
      - https://s11.ax1x.com/2023/05/02/p9GosYQ.jpg

  - content: 各种观影史集于一体！人生足迹页诞生咯~
    date: 2023/02/19 14:50:17
    from: Macbook Pro
    link: /collect/ || 链接描述
```
<!-- endtab -->

<!-- tab 动态json -->
JSON文件可参照以下格式
``` JSON
[
   {
      "class_name": "即刻短文",
      "essay_list": [
          {
            "content": "园长新造型！爱死",
            "date": "2023/08/01 17:12:30",
            "video": {
                "bilibili": "//player.bilibili.com/player.html?aid=701381935&bvid=BV1dm4y1L7vj&cid=1212026428&page=1",
                "autoplay": true
            }
         },
         {
            "content": "这辈子都不想完善项目了 😭 两点了 一看才搓完三分之一..",
            "date": "2023/08/01 02:02:44",
            "video": {
                "player": "https://meuicat.com/video/1.mp4"
            }
         },
         {
            "content": "让我看看是谁在路上都还在敲键盘 噢 原来是我自己啊..",
            "date": "2023/07/31 15:54:26",
            "from": "iPhone XR"
         },
         {
            "content": "落班 烧个排骨778~",
            "date": "2023/07/26 17:55:36",
            "from": "iPhone XR",
            "image": [
               "https://s11.ax1x.com/2023/07/26/pCjWbY4.jpg || 图片描述",
               "https://s11.ax1x.com/2023/07/26/pCjWqfJ.jpg"
            ]
         },
         {
            "content": "嘘..听歌..睡觉...",
            "date": "2023/07/20 00:38:41",
            "aplayer": {
               "server": "netease",
               "id": "1430702919"
            },
            "top": true
         },
         {
            "content": "人生应该是一个轴对称的形状，最后失去的，也就是最开始拥有的。现在没人记得你的生日，有好处也有坏处，至少我是这么理解的。但无论是好还是坏，忍一忍，都会很快过去的",
            "date": "2023/07/19 01:48:36",
            "from": "iPhone XR",
            "link": "/blog/64 || 链接描述"
         },
         {
            "content": "用堆AI重绘一下我最爱的头像（图一 👉 图二）",
            "date": "2023/07/06 16:30:32",
            "from": "iPhone XR",
            "link": "/blog/61",
            "image": [
               "https://img.meuicat.com/posts/2023/7/10.webp",
               "https://img.meuicat.com/posts/2023/7/11.webp"
            ]
         },
         {
            "content": "",
            "date": "2023/06/30 08:26:22",
            "aplayer": {
               "server": "netease",
               "id": "2009974513"
            }
         }
      ]
   }
]
```

<!-- endtab -->

<!-- tab 动态memos -->
Memos用法：
``` MARKDOWN
#说说 {标识符} 我是内容 [我是链接](https://meuicat.com) ![](https://img.meuicat.cn/blog/8.png)
<!-- 常规写法 -->

#说说 网易云音乐 {music netease 29947420 }
#说说 腾讯音乐 {music tencent 330977131 }
<!-- 音乐写法 -->

#说说 普通视频 { player https://v.meuicat.com/video/1.mp4 }
#说说 哔哩哔哩手机视频 { bilibili https://m.bilibili.com/video/BV17T4y1A7eW }
#说说 哔哩哔哩网页视频 { bilibili https://www.bilibili.com/video/BV17T4y1A7eW/?spm_id_from=333.1007.tianma.1-3-3.click }
<!-- 视频写法 -->

#说说 #top
我是内容 ![我是图片描述](https://img.meuicat.cn/blog/8.png)![](https://img.meuicat.cn/blog/8.png)
<!-- 置顶写法 -->
```
<!-- endtab -->

{% endtabs %}

### 3.即刻Mini
#### (1)创建页面内容
新增 [blogRoot]/themes/butterfly/layout/includes/mixins/post-ui.pug 页面内容
（ + 号直接删除 即是正常缩进）
``` PUG
mixin postUI(posts)
  - let newTitle= newPost()
+  if theme.essay.enable && theme.essay.home_mini
+    include ./essay_mini.pug
  each article , index in page.posts.data
    .recent-post-item
  
  ···
```
创建 [blogRoot]/themes/butterfly/layout/includes/mixins/essay_mini.pug 页面，并新增以下内容
（注意该内容中 fontawesome 图标 需要自行替换）
``` PUG
.essay-mini
    i.iconfont.icat-essay-mini(onclick=`pjax.loadUrl('${theme.essay.home_mini_link}')` title="即刻短文" style="font-size: 2.25rem; margin-right: 1rem")
    .swiper-container.swiper-no-swiping#Essay(tabindex="-1" onclick=`pjax.loadUrl('${theme.essay.home_mini_link}')`)
        .swiper-wrapper#essay-mini
.essay-mini.wow.animation-slide-in(data-wow-duration="1s" data-wow-delay="200ms" data-wow-offset="100" data-wow-iteration="1")
    i.iconfont.icat-essay-mini(onclick=`pjax.loadUrl('${theme.essay.home_mini_link}')` title="即刻短文" style="font-size: 2.25rem; margin-right: 1rem")
    .swiper-container.swiper-no-swiping#Essay(tabindex="-1" onclick=`pjax.loadUrl('${theme.essay.home_mini_link}')`)
        .swiper-wrapper#essay-mini
            case theme.essay.mode
                when 'local'
                    each item, i in site.data.essay.essay_list.slice(0, 10)
                        .li-style.swiper-slide
                            | #{item.content}
                            if item.image
                                | 【图片】
                            else if item.aplayer
                                | 【音乐】
                            else if item.video || item.bilibili
                                | 【视频】
                when 'json'
                    .li-style.essay-loading(style="text-align: center") 正在加载...
                    script.
                        (async function () {
                            const response = await fetch('!{url_for(theme.essay.mode_link)}');
                            const data = await response.json();
                            const list = data[0].essay_list.slice(0, 10).map(item => {
                                let type = item.image ? '【图片】' : item.aplayer ? '【音乐】' : item.video ? '【视频】' : '';
                                return `<div class="li-style swiper-slide">${item.content + type}</div>`
                            });
                            document.querySelector('#essay-mini').innerHTML = list.join(' ');
                        })()
                when 'memos'
                    .li-style.essay-loading(style="text-align: center") 正在加载...
                    script.
                        (async function () {
                            const response = await fetch('!{url_for(theme.essay.mode_link)}');
                            const data = await response.json();
                            const list = data.slice(0, 10).map(item => {
                                let data = item.content,
                                    content = data.replace(/#(.*?)\s|\n/g, '').replace(/\!\[(.*?)\]\((.*?)\)/g, '').replace(/\{(.*?)\}/g, '').replace(/(?<!\!)\[(.*?)\]\((.*?)\)/g, '').trim();
                                    type = data.match(/\!\[(.*?)\]\((.*?)\)/g) ? '【图片】' : data.match(/{\s*music\s*(.*?)\s*(.*?)\s*}/g) ? '【音乐】' : data.match(/{\s*player\s*(.*)\s*}/g) || data.match(/{\s*bilibili\s*(.*?)\s*}/g) ? '【视频】' : '';
                                return `<div class="li-style swiper-slide">${content + type}</div>`
                            });
                            document.querySelector('#essay-mini').innerHTML = list.join(' ');
                        })()
    i.iconfont.icat-right-btn(title="查看全文" onclick=`pjax.loadUrl('${theme.essay.home_mini_link}')` style="margin-left: 1rem")
```
#### (2).新建样式文件

新建 [blogRoot]/themes/butterfly/source/css/_page/homepage.styl 样式文件内容
（ + 号直接删除 即是正常缩进）
``` STYL
+if hexo-config('essay.enable') && hexo-config('essay.home_mini')
+  .essay-mini
+    background: var(--card-bg)
+    color: var(--font-color)
+    padding: 0.5rem 1rem
+    border-radius: 8px
+    box-shadow: var(--icat-shadow-border)
+    display: flex
+    border: var(--style-border)
+    align-items: center
+    height: 50px
+    animation: slide-in 0.6s 0.4s backwards
+    will-change: transform
+    transition: .6s
+
+    &:hover
+      border: var(--style-border-hover-always)
+
+    #Essay
+      overflow: hidden
+      width: 100%
+      overflow: hidden
+      text-overflow: ellipsis
+      white-space: nowrap
+
+      #essay-mini
+        width: 100%
+        height: 25px
+        line-height: 25px
+        display: flex
+        flex-direction: column
+
+      .li-style
+        width: auto
+        max-width: 100%
+        height: 25px
+        text-align: center
+        overflow: hidden
+        text-overflow: ellipsis
+        font-weight: 700
+        margin: auto
+        cursor: pointer
+        white-space: nowrap
+        user-select: none
+
+    i, .li-style
+      transition: .6s
+      cursor: pointer
+
+      &:hover
+        color: var(--icat-blue)

#recent-posts
  & > .recent-post-item:not(:first-child)

  ···
```
{% folding cyan, 可选CSS样式 %}

新增 [blogRoot]/source/css/essay.css 样式文件内容
（也可以在自建的css文件里新增内容）
``` CSS
.essay-mini {
  background: var(--card-bg);
  color: var(--font-color);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  -webkit-box-shadow: var(--icat-shadow-border);
  box-shadow: var(--icat-shadow-border);
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  border: var(--style-border);
  -webkit-box-align: center;
  -moz-box-align: center;
  -o-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  height: 50px;
  -webkit-animation: slide-in 0.6s 0.4s backwards;
  -moz-animation: slide-in 0.6s 0.4s backwards;
  -o-animation: slide-in 0.6s 0.4s backwards;
  -ms-animation: slide-in 0.6s 0.4s backwards;
  animation: slide-in 0.6s 0.4s backwards;
  will-change: transform;
  -webkit-transition: 0.6s;
  -moz-transition: 0.6s;
  -o-transition: 0.6s;
  -ms-transition: 0.6s;
  transition: 0.6s;
}
.essay-mini:hover {
  border: var(--style-border-hover-always);
}
.essay-mini #Essay {
  overflow: hidden;
  width: 100%;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.essay-mini #Essay #essay-mini {
  width: 100%;
  height: 25px;
  line-height: 25px;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: box;
  display: flex;
  -webkit-box-orient: vertical;
  -moz-box-orient: vertical;
  -o-box-orient: vertical;
  -webkit-flex-direction: column;
  -ms-flex-direction: column;
  flex-direction: column;
}
.essay-mini #Essay .li-style {
  width: auto;
  max-width: 100%;
  height: 25px;
  text-align: center;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  font-weight: 700;
  margin: auto;
  cursor: pointer;
  white-space: nowrap;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.essay-mini i,
.essay-mini .li-style {
  -webkit-transition: 0.6s;
  -moz-transition: 0.6s;
  -o-transition: 0.6s;
  -ms-transition: 0.6s;
  transition: 0.6s;
  cursor: pointer;
}
.essay-mini i:hover,
.essay-mini .li-style:hover {
  color: var(--icat-blue);
}

/* 即刻mini样式 */
```
{% endfolding %}
#### (3).新建js文件

新增 [blogRoot]/source/js/essay.js 文件内容
（或写在自建的公共 js 中也可以）
``` JS
function whenDOMReady() {
	initEssay();
};

whenDOMReady()
document.addEventListener("pjax:complete", whenDOMReady)

function initEssay() {
  if (document.querySelector('#essay-mini')) {
    let swiper = new Swiper('.swiper-container', {
        direction: 'vertical',
        loop: true,
        autoplay: {
            delay: 3000,
            pauseOnMouseEnter: true
        },
    });
  }
} // Swiper轮播 - 即刻mini
```
在 _config.butterfly.yml 主题配置文件中 inject 下的 bottom 引入 essay.js 和 waterfall.js
``` YML
  ···

inject:
  head:
    - ···
  bottom:
    - <script src="https://cdn.staticfile.net/Swiper/10.3.1/swiper-bundle.min.js"></script> # Swiper - 轮播动画库

  ···
```
<!-- endtab -->

<!-- tab 随风起（即刻短文） -->
## 1.支持类型

**列表**	     | **是否支持**
---------------|----------------
**图片**       |	✅
**链接**       |	✅
**音乐**       |	✅
**瀑布流**     |	✅
**首页滚动**   |	✅
**位置信息**   |	✅

## 2.创建数据

在source/_data目录下创建essay.yml：
``` YML
- class_name: 即刻短文
  essay_list:
    - content: 文章推荐卡片教程推出
      image: https://cdn.bywind.xyz/img/cover/image-20221221154442479.png
      link: https://blog.bywind.xyz/posts/ab6e072d.html
      location: 山西
      date: 2022-12-21
    - content: 关于本站
      link: https://blog.bywind.xyz/about/
      location: 天津
      date: 2022-12-20
    - content: 即刻短文头图换成视频，更显动态感
      date: 2022-12-19 23:07:23
    - content: 李荣浩的歌还是那么好听，两人配合太棒了！
      music:
        server: tencent
        id: 001wG84E4bOj3V
      date: 2022-12-19 08:07:23
```
## 3.配置参数介绍

**参数**                                     |	**含义**
---------------------------------------------|---------------------------------------------
**content**                                  |	即刻短文内容
**image**                                    |	图片
**link**                                     |	链接
**music.server**                             |	音乐服务商（tencentQQ，netease网易云，,kugou酷狗, xiami虾米）
**music.id**                                 |	音乐id
**location**                                 |	位置信息
**date**                                     |	日期

## 4.创建md页面
创建md页面，在控制台输入hexo new page essay，生成文件在source/essay/index.md
``` MARKDOWN
---
title: 即刻短文
date: 2022-12-20 22:06:17
comments: true
aside: false
top_img: false
type: essay
---
```

## 5.创建页面文件

在themes/butterfly/layout/includes/page目录下创建essay.pug
``` PUG
.author-content.author-content-item.essayPage.single.essayVideo
    .card-content
        .author-content-item-tips 即刻短文
        span.author-content-item-title 分享生活的小确幸
        .content-bottom
            .tips 使用 即刻短文静态部署版 构建
        .banner-button-group
            a.banner-button(onclick='pjax.loadUrl("/about/")', data-pjax-state)
                i.fas.fa-circle-chevron-right
                span.banner-button-text 部署项目
#bber
    section.timeline.page-1
        ul#waterfall.list.show
            each i in site.data.essay
                each item, index in i.essay_list
                    if index < 30
                        li.item
                            .bber-content
                                p.datacont= item.content
                                    if item.image
                                        .bber-content-img
                                            a.fancybox(target='_blank', rel='noopener', href=item.image, data-fancybox='gallery', data-caption)
                                                img.bber-content-image-self(src=item.image)
                            if item.music
                                .bber-music
                                    meting-js(server=item.music.server, type='song', id=item.music.id, mutex='true', preload='none', theme='var(--bywind-main)', data-lrctype='0')
                            hr
                            .bber-bottom
                                .bber-info
                                    .bber-info-time
                                        i.fa-solid.fa-calendar-days
                                        - var datedata = new Date(item.date).toISOString()

                                        time.datatime(datetime= item.date)= datedata
                                    if item.link
                                        a.bber-content-link(href=item.link, target="_blank", rel="external nofollow", title="跳转到短文指引的链接")
                                            i.fas.fa-link
                                            | 链接
                                    - let location = item.location ? item.location : 山西
                                    .bber-info-address
                                        i.hnfont.icon-location-fill
                                        span=location
                                a.bber-reply(onclick=`rm.rightMenuCommentText('${item.content}')`)
                                    i.fa-solid.fa-message

#bber-tips(style='color: var(--bywind-secondtext);')
    | - 只展示最近30条短文 -
```

## 6.修改Page文件

修改themes/butterfly/layout/page.pug

```PUG
    case page.type
      when 'tags'
        include includes/page/tags.pug
      when 'link'
        include includes/page/flink.pug
+      when 'essay'
+        include includes/page/essay.pug
```

##7.首页即刻（可选）

新建themes/butterfly/layout/includes/bbTimeList.pug
``` PUG
#bbTimeList.bbTimeList.container
    i.bber-logo.iconfont.icon-bblogo(onclick=`pjax.loadUrl("/essay/")`,title="即刻短文",style="font-size: 2rem;")
    #bbtalk.swiper-container.swiper-no-swiping(tabindex="-1")
        #bber-talk.swiper-wrapper(onclick=`pjax.loadUrl("/essay/")`)
            each i in site.data.essay
                each item, index in i.essay_list
                    if index < 10
                        - var contentText = item.content
                        if item.image
                            - contentText= item.content + ' [图片]'
                        else if item.music
                            - contentText= item.content + ' [音乐]'
                        .li-style.swiper-slide= contentText

    i.bber-gotobb.fas.fa-arrow-circle-right(onclick=`pjax.loadUrl("/essay/")`,title="查看全文")
script(src='https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.js',data-pjax='')

```

## 8.首页即刻（可选）

### (1).新建首页轮播内容

新建themes/butterfly/layout/includes/bbTimeList.pug

``` PUG
#bbTimeList.bbTimeList.container
    i.bber-logo.iconfont.icon-bblogo(onclick=`pjax.loadUrl("/essay/")`,title="即刻短文",style="font-size: 2rem;")
    #bbtalk.swiper-container.swiper-no-swiping(tabindex="-1")
        #bber-talk.swiper-wrapper(onclick=`pjax.loadUrl("/essay/")`)
            each i in site.data.essay
                each item, index in i.essay_list
                    if index < 10
                        - var contentText = item.content
                        if item.image
                            - contentText= item.content + ' [图片]'
                        else if item.music
                            - contentText= item.content + ' [音乐]'
                        .li-style.swiper-slide= contentText

    i.bber-gotobb.fas.fa-arrow-circle-right(onclick=`pjax.loadUrl("/essay/")`,title="查看全文")
script(src='https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.js',data-pjax='')
```
### (2).引入到主页

``` PUG
block content
  include ./includes/mixins/post-ui.pug
  #recent-posts.recent-posts
    include includes/categoryList.pug
+    include includes/bbTimeList.pug
    +postUI
    include includes/pagination.pug
```

### (3).引入样式文件
``` YML
inject:
  head:
		- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.css">
		- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/js-heo@1.0.11/bb/showbb_in_index.css">
		- <script src="https://cdn.staticaly.com/gh/haonan15/CDN@main/source/waterfall.min.js"></script> # 瀑布流
```

### (4).添加自定义js
``` JS
if (document.querySelector('#bber-talk')) {
      var swiper = new Swiper('.swiper-container', {
        direction: 'vertical', 
        loop: true,
        autoplay: {
        delay: 3000,
        pauseOnMouseEnter: true
      },
      });
    }
```

### (5).添加CSS文件
``` CSS
#bber>section>ul>li>div .bber-info-time ,
#bber > section > ul > li > div .bber-info-address{
    color: var(--bywind-fontcolor);
    font-size: 0.7rem;
    background-color: var(--bywind-gray-op);
    padding: 0 8px;
    border-radius: 20px;
    cursor: default;
    display: flex;
    align-items: center;
}

#bber>section>ul>li>div .bber-info-time i ,
#bber > section > ul > li > div .bber-info-address i{
    margin-right: 8px;
    font-size: 16px;
}
#bber > section > ul > li > div .bber-info-address {
    margin-left: 0.5rem;
}
```
<!-- endtab -->

<!-- tab 安知鱼（即刻短文） -->
## 一.功能对比

**todolist**              |	**支持度**
--------------------------|--------------------------
**图片灯箱**              |   ✅
**多图片多行显示**        |	  ✅
**外部链接**              |  ✅
**瀑布流**                |	 ✅
**首页滚动**              |	 ✅
**快速评论**              |	 ✅
**本地修改yml发布**       |	 ✅
**aplayer**               |	✅ 
**单曲音乐**              |  ✅
**插件版本**	            |  ❌

## 二.添加颜色内容
详情可以前往这个文章查看[颜色样式](https://www.sxiaohe.top/posts/2013454d.html)

## 三.创建数据

创建 source/_data/essay.yml

``` YML
- class_name: 即刻短文
  essay_list:
    - content: 终于把相册集搞定了, 耶✌️, 瀑布流在滑动滚动条一个视口范围上下100的情况执行一次, 到底部停止监听让性能高了好多，再也不会布局混乱🤪了
      date: 2022/10/25
      link: https://blog.anheyu.com/album/
    - content: 搜索🔍支持缩略图显示啦（默认获取文章内容的第一张图片）
      date: 2022/10/23 08:00:00
      from: 安知鱼
    - content: 遇见彩虹🌈吃定彩虹
      date: 2022/10/23 10:00:00
      image:
        - https://img02.anheyu.com/adminuploads/1/2022/10/23/6354ea92960ef.webp
    - content: ThreeJs API真多丫
      date: 2022/10/19
    - content: 歌曲推荐
      date: 2022/09/25
      aplayer:
        server: tencent
        id: 001FGQba3i10mw
```

## 四.数据参数释义
**参数** 	                       | **备选值/类型**             |	**释义**
---------------------------------|----------------------------|---------------------------------------------------------------
**class_name**                   |	String	                  |  【可选】标识符，无实际意义，选填
**essay_list**                   |	Array		                  |  【必选】即刻短文数据列表
**essay_list.content**           |	String	                  |	 【必选】短文 文字内容
**essay_list.date**              |	Time		                  |  【必选】短文发布时间 格式建议为 2022/10/26 08:00:00
**essay_list.image**             |	Array		                  |  【可选】短文图片内容, 可填写多张图片
**essay_list.from**              |	String	                  |	 【可选】短文 来自何处, 当然也可以填任何你想填写的标识
**essay_list.link**              |  String	                  |	 【可选】外部链接
**essay_list.aplayer**           |	Array		                  |  【可选】aplayer 播放器的单曲音乐, 需 aplayer 支持
**essay_list.aplayer.server**    |	String	                  |	 【essay_list.aplayer 后必选】aplayer 服务商
**essay_list.aplayer.id**        |	String	                  |  【essay_list.aplayer 后必选】单曲 id

## 五.创建 md 页面文件
创建source/essay/index.md 来生成页面 page

``` MARKDOWN
---
title: 即刻短文
date: 2020-07-22 22:06:17
comments: true
aside: false
top_img: false
type: essay
---
```

## 六.创建 dom 文件
创建themes/butterfly/layout/includes/page/essay.pug, 页面内容, 注意该页面中可能存在部分fontawesome 图标需要自行替换。
``` PUG
#essay_page
  .author-content.author-content-item.essayPage.single
    .card-content
      .author-content-item-tips 即刻短文
      span.author-content-item-title 咸鱼的日常生活。
      .content-bottom
        .tips 使用 即刻短文静态部署版 构建
      .banner-button-group
        a.banner-button(onclick='pjax.loadUrl("/about/")', data-pjax-state)
          i.fas.fa-circle-right(style='font-size: 1.5rem')
          span.banner-button-text 关于我
  #bber
    section.timeline.page-1
      ul#waterfall.list
        each i in site.data.essay
          each item, index in i.essay_list
            if index < 30
              li.bber-item
                .bber-content
                  p.datacont= item.content
                    if item.image
                      .bber-container-img
                        each iten, indey in item.image
                          a.bber-content-img(href=item.image[indey], target="_blank", data-fancybox="gallery", data-caption="")
                            img(src=item.image[indey])
                        .bber-content-noimg
                        .bber-content-noimg
                        .bber-content-noimg
                    if item.aplayer
                      .bber-music
                        .aplayer.no-destroy(data-id=item.aplayer.id data-server=item.aplayer.server data-type="song"  data-order="list" data-preload="none" data-autoplay="false" data-mutex="true" data-theme='var(--anzhiyu-main)')
                hr
                .bber-bottom
                  .bber-info
                    .bber-info-time
                      - var datedata = new Date(item.date).toISOString()
                      i.far.fa-clock
                      time.datatime(datetime= item.date)= datedata
                    if item.link
                      a.bber-content-link(target="_blank", title="跳转到短文指引的链接", href=item.link, rel="external nofollow")
                        i.fas.fa-link
                        | 链接
                    if item.from
                      .bber-info-from
                        i.fas.fa-fire
                        span=item.from
                  .bber-reply(onclick="anzhiyu.commentText(" + `'${item.content}'` + ")")
                    i.fa-solid.fa-message
  #bber-tips(style='color: var(--anzhiyu-secondtext);')
    | - 只展示最近30条短文 -
```

## 七.修改 Page 文件
修改themes/butterfly/layout/page.pug 来使页面内容匹配
在 case page.type 子项里面添加, 注意缩进
``` pug
    case page.type
+     when 'essay'
+       include includes/page/essay.pug
      when 'tags'
        include includes/page/tags.pug
      when 'link'
        include includes/page/flink.pug
      when 'categories'
        include includes/page/categories.pug
```

## 八.加入 css
创建source/css/essay_page/essay_page.css, 然后在_config.butterfly.yml中的inject下的head引入, 注意缩进
``` YML
inject:
  head:
    - <link rel="stylesheet" href="/css/essay_page/essay_page.css">
```
``` CSS
#page:has(#essay_page) {
  border: 0;
  box-shadow: none !important;
  padding: 0 !important;
  background: transparent !important;
}
#page:has(#essay_page) .page-title {
  display: none;
}
#web_bg ~ .page:has(#essay_page) {
  background: var(--anzhiyu-background);
}
#bber .bber-container-img {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  flex-wrap: wrap;
  margin-bottom: 0.3rem;
}
#bber .bber-container-img .bber-content-noimg {
  width: calc(100% / 4 - 5px);
}

#bber .bber-content-img img {
  object-fit: cover;
  max-height: 100%;
  border-radius: 12px;
}

#bber .bber-content-img {
  height: 100px;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  position: relative;
  width: calc(100% / 4 - 5px);
  margin-bottom: 10px;
}

#bber .bber-content .datacont {
  order: 0;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--anzhiyu-fontcolor);
  width: 100%;
  line-height: 1.38;
  border-radius: 12px;
  margin-bottom: 0.5rem;
  display: flex;
  flex-direction: column;
  text-align: justify;
}
#bber p {
  margin: 0px;
}
#bber div.bber-content {
  display: flex;
  flex-flow: wrap;
  border-radius: 12px;
  width: 100%;
  height: 100%;
}
#bber .timeline ul li.bber-item {
  position: relative;
  width: 32%;
  border: var(--style-border-always);
  border-radius: 12px;
  padding: 1rem 1rem 0.5rem;
  transition: all 0.3s ease 0s;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: flex-start;
  background: var(--anzhiyu-card-bg);
  box-shadow: var(--anzhiyu-shadow-border);
  margin-right: 2%;
}
#bber .timeline #waterfall.show {
  opacity: 1;
}
#bber .timeline #waterfall {
  opacity: 0;
  transition: all 0.3s ease 0s;
}
#bber ul.list {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
}
#bber {
  margin-top: 1rem;
  width: 100%;
}
#bber > section > ul > li.bber-item {
  margin-bottom: 1rem;
}

#bber-tips {
  font-size: 14px;
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

#bber .timeline ul li.bber-item hr {
  display: flex;
  position: relative;
  margin: 8px 0px;
  border: 1px dashed var(--anzhiyu-theme-op);
  width: 100%;
}

#bber .bber-info {
  display: flex;
  align-items: center;
}

#bber > section > ul > li > div .bber-info-time,
#bber > section > ul > li > div .bber-info-from {
  color: var(--anzhiyu-fontcolor);
  font-size: 0.7rem;
  background-color: var(--anzhiyu-gray-op);
  padding: 0px 8px;
  border-radius: 20px;
  cursor: default;
  display: flex;
  align-items: center;
}

#bber .bber-info .far.fa-clock {
  margin-right: 4px;
}
#bber > section > ul > li > div .bber-info-from span,
#bber > section > ul > li > div .bber-info-from {
  margin-left: 4px;
}

#bber .bber-bottom {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 10px;
}

#bber .bber-bottom .bber-reply {
  cursor: pointer;
}

#bber .timeline ul li.bber-item:hover {
  border: var(--style-border-hover);
}

#bber .bber-content-link {
  display: flex;
  margin-left: 0.5rem;
  font-size: 0.7rem;
  align-items: center;
  background-color: rgba(245, 108, 108, 0.13);
  color: rgb(245, 108, 108);
  padding: 0px 8px;
  border-radius: 20px;
}
#bber .bber-content-link i {
  margin-right: 3px;
}
#bber .bber-content-link:hover {
  background-color: var(--anzhiyu-main);
  color: var(--anzhiyu-white);
}
#bber .bber-music {
  width: 100%;
  height: 90px;
  margin: 0.5rem 0;
  border-radius: 8px;
  overflow: hidden;
  border: var(--style-border-always);
  background: var(--anzhiyu-secondbg);
}
#bber .aplayer {
  margin: 0;
}

#bber .aplayer.aplayer-withlrc .aplayer-pic {
  height: 82px;
  width: 82px;
  margin: 4px;
  border-radius: 4px;
}
.bber-music .aplayer.aplayer-withlrc .aplayer-info {
  padding: 5px 7px 0;
}
#bber .aplayer .aplayer-info .aplayer-music {
  height: 23px;
}
#bber .aplayer .aplayer-info .aplayer-music .aplayer-title {
  font-size: 0.8rem;
  font-weight: 700;
  margin: 0;
  color: var(--anzhiyu-fontcolor);
}

#bber .aplayer .aplayer-info .aplayer-controller {
  align-items: center;
}
#bber .aplayer .aplayer-info .aplayer-controller .aplayer-bar-wrap {
  padding: 0;
}
#bber .aplayer .aplayer-info .aplayer-controller .aplayer-time {
  position: initial;
}
#bber .aplayer .aplayer-info .aplayer-controller .aplayer-bar-wrap .aplayer-bar {
  background: var(--anzhiyu-gray);
  height: 8px;
  border-radius: 12px;
  transition: 0.3s;
  overflow: hidden;
}
#bber .aplayer .aplayer-info .aplayer-controller .aplayer-bar-wrap .aplayer-bar .aplayer-loaded {
  height: 100%;
  border-radius: 12px;
}
#bber .aplayer .aplayer-info .aplayer-controller .aplayer-bar-wrap .aplayer-bar .aplayer-played {
  height: 100%;
  border-radius: 12px;
}
#bber .aplayer .aplayer-info .aplayer-controller .aplayer-bar-wrap .aplayer-bar .aplayer-played .aplayer-thumb {
  display: none;
}
#bber .aplayer .aplayer-info .aplayer-controller .aplayer-time {
  position: initial;
}

/* 顶部样式 */
.author-content.author-content-item.essayPage {
  height: 19rem;
  background: url(https://img02.anheyu.com/adminuploads/1/2022/08/21/630249e2df20f.jpg) left 28% / cover no-repeat;
  color: var(--anzhiyu-white);
  overflow: hidden;
  margin-top: 0px;
}
#page:has(#essay_page) .author-content-item .card-content .banner-button-group .banner-button:hover {
  color: var(--anzhiyu-white);
  border-radius: 20px !important;
}

/* 响应式 */
@media screen and (max-width: 1300px) {
  #bber .timeline ul li.bber-item {
    width: 49%;
    margin-right: 1%;
  }
}
@media screen and (max-width: 768px) {
  #bber .timeline ul li.bber-item {
    width: 100%;
    margin-right: 0px;
  }
}
[data-theme="dark"] #bber .bber-music .aplayer,
[data-theme="dark"] #bber .aplayer .aplayer-lrc:before,
[data-theme="dark"] #bber .aplayer .aplayer-lrc:after {
  background: var(--anzhiyu-card-bg);
  color: var(--anzhiyu-fontcolor);
}
#bber .aplayer .aplayer-lrc p {
  color: var(--anzhiyu-fontcolor);
}
```
## 九.js 处理
新建一个 js 文件用来处理即刻短文的逻辑, 或者写在公共 js 中也可以, 博主写在公共 js 中, 即custom.js, 该 js 在_config.butterfly.yml中的inject使用如下方式引入, 加入了data-pjax, 并且开启了站点的pjax, 然后再引入waterfall.js用于处理瀑布流。
``` YML
inject:
  bottom:
    - <script async data-pjax src="/js/custom.js"></script>
    # 即刻依赖waterfall
    - <script async data-pjax src="/js/waterfall/waterfall.js"></script>
```
``` YML
# Pjax
# It may contain bugs and unstable, give feedback when you find the bugs.
# https://github.com/MoOx/pjax
pjax:
  enable: true
  exclude:
```
新建 source/js/waterfall/waterfall.js 内容如下
``` JS
function waterfall(a) {
  function b(a, b) {
    var c = window.getComputedStyle(b);
    return parseFloat(c["margin" + a]) || 0;
  }
  function c(a) {
    return a + "px";
  }
  function d(a) {
    return parseFloat(a.style.top);
  }
  function e(a) {
    return parseFloat(a.style.left);
  }
  function f(a) {
    return a.clientWidth;
  }
  function g(a) {
    return a.clientHeight;
  }
  function h(a) {
    return d(a) + g(a) + b("Bottom", a);
  }
  function i(a) {
    return e(a) + f(a) + b("Right", a);
  }
  function j(a) {
    a = a.sort(function (a, b) {
      return h(a) === h(b) ? e(b) - e(a) : h(b) - h(a);
    });
  }
  function k(b) {
    f(a) != t && (b.target.removeEventListener(b.type, arguments.callee), waterfall(a));
  }
  "string" == typeof a && (a = document.querySelector(a));
  var l = [].map.call(a.children, function (a) {
    return (a.style.position = "absolute"), a;
  });
  a.style.position = "relative";
  var m = [];
  l.length && ((l[0].style.top = "0px"), (l[0].style.left = c(b("Left", l[0]))), m.push(l[0]));
  for (var n = 1; n < l.length; n++) {
    var o = l[n - 1],
      p = l[n],
      q = i(o) + f(p) <= f(a);
    if (!q) break;
    (p.style.top = o.style.top), (p.style.left = c(i(o) + b("Left", p))), m.push(p);
  }
  for (; n < l.length; n++) {
    j(m);
    var p = l[n],
      r = m.pop();
    (p.style.top = c(h(r) + b("Top", p))), (p.style.left = c(e(r))), m.push(p);
  }
  j(m);
  var s = m[0];
  a.style.height = c(h(s) + b("Bottom", s));
  var t = f(a);
  window.addEventListener ? window.addEventListener("resize", k) : (document.body.onresize = k);
}
```
custom.js内容如下
``` JS
var percentFlag = false; // 节流阀
function essayScroll() {
  let a = document.documentElement.scrollTop || window.pageYOffset; // 卷去高度
  const waterfallResult = a % document.documentElement.clientHeight; // 卷去一个视口
  result <= 99 || (result = 99);

  if (
    !percentFlag &&
    waterfallResult + 100 >= document.documentElement.clientHeight &&
    document.querySelector("#waterfall")
  ) {
    // console.info(waterfallResult, document.documentElement.clientHeight);
    setTimeout(() => {
      waterfall("#waterfall");
    }, 500);
  } else {
    setTimeout(() => {
      document.querySelector("#waterfall") && waterfall("#waterfall");
    }, 500);
  }

  const r = window.scrollY + document.documentElement.clientHeight;

  let p = document.getElementById("post-comment") || document.getElementById("footer");

  (p.offsetTop + p.offsetHeight / 2 < r || 90 < result) && (percentFlag = true);
}
function replaceAll(e, n, t) {
  return e.split(n).join(t);
}
var anzhiyu = {
  diffDate: function (d, more = false) {
    const dateNow = new Date();
    const datePost = new Date(d);
    const dateDiff = dateNow.getTime() - datePost.getTime();
    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const month = day * 30;

    let result;
    if (more) {
      const monthCount = dateDiff / month;
      const dayCount = dateDiff / day;
      const hourCount = dateDiff / hour;
      const minuteCount = dateDiff / minute;

      if (monthCount >= 1) {
        result = datePost.toLocaleDateString().replace(/\//g, "-");
      } else if (dayCount >= 1) {
        result = parseInt(dayCount) + " " + GLOBAL_CONFIG.date_suffix.day;
      } else if (hourCount >= 1) {
        result = parseInt(hourCount) + " " + GLOBAL_CONFIG.date_suffix.hour;
      } else if (minuteCount >= 1) {
        result = parseInt(minuteCount) + " " + GLOBAL_CONFIG.date_suffix.min;
      } else {
        result = GLOBAL_CONFIG.date_suffix.just;
      }
    } else {
      result = parseInt(dateDiff / day);
    }
    return result;
  },
  changeTimeInEssay: function () {
    document.querySelector("#bber") &&
      document.querySelectorAll("#bber time").forEach(function (e) {
        var t = e,
          datetime = t.getAttribute("datetime");
        (t.innerText = anzhiyu.diffDate(datetime, true)), (t.style.display = "inline");
      });
  },
  reflashEssayWaterFall: function () {
    document.querySelector("#waterfall") &&
      setTimeout(function () {
        waterfall("#waterfall");
        document.getElementById("waterfall").classList.add("show");
      }, 500);
  },
  commentText: function (e) {
    if (e == "undefined" || e == "null") e = "好棒！";
    var n = document.getElementsByClassName("el-textarea__inner")[0],
      t = document.createEvent("HTMLEvents");
    if (!n) return;
    t.initEvent("input", !0, !0);
    var o = replaceAll(e, "\n", "\n> ");
    (n.value = "> " + o + "\n\n"), n.dispatchEvent(t);
    var i = document.querySelector("#post-comment").offsetTop;
    window.scrollTo(0, i - 80),
      n.focus(),
      n.setSelectionRange(-1, -1),
      document.getElementById("comment-tips") && document.getElementById("comment-tips").classList.add("show");
  },
};

anzhiyu.changeTimeInEssay();
anzhiyu.reflashEssayWaterFall();
```
其中anzhiyu变量中存储的四个方法
**变量**                     | **变量特点**
-----------------------------|---------------------------------------------------------------------------
**diffDate**                 |  为处理时间的方法,其实 btf 中也有,只是不太喜欢那个的显示方式,就改成现在这个了。
**changeTimeInEssay**        |  初始化即刻时间
**reflashEssayWaterFall**    |  处理瀑布流显示
**commentText**              |  处理点击跳转评论并添加评论

方法essayScroll为检查滚动条卷去一个视口高度的 100 范围内执行一次, 滑动到底部或评论区取消监听执行。此处博主未做 else 处理取消监听, 如果有写percent函数监听滑动可以一起写在同一个方法里面。（博主就是写在同一个方法里面）, 如果即刻文章很少的话其实是可以不监听滑动的, 即只显示近 30 条, 因为进入页面后会执行一次瀑布流, 页面不会乱, 但是如果您把 essay.pug 中 17 行左右修改后可以达到无限的效果就会出现 dom 结构还没渲染瀑布流就已经执行完了的情况就需要监听滚动来再次执行瀑布流以完成布局。

## 十.首页滚动显示即刻(可选)
创建 themes/butterfly/layout/includes/bbTimeList.pug, 部分fontawesome图标可能需要您自行修改。
``` PUG
#bbTimeList.bbTimeList.container
    svg.icon.bber-logo.iconfont.icon-chrome(onclick=`pjax.loadUrl("/essay/")`,title="即刻短文",aria-hidden="true")
      use(xlink:href="#icon-chrome")
    #bbtalk.swiper-container.swiper-no-swiping.essay_bar_swiper_container(tabindex="-1")
      #bber-talk.swiper-wrapper(onclick=`pjax.loadUrl("/essay/")`)
        each i in site.data.essay
          each item, index in i.essay_list
            if index < 10
              - var contentText = item.image ? item.content + ' [图片]' : item.content
              .li-style.swiper-slide= contentText

    i.bber-gotobb.fas.fa-arrow-circle-right(onclick=`pjax.loadUrl("/essay/")`,title="查看全文")
```

## 十一.引入到主页
修改themes/butterfly/layout/index.pug, 注意缩进
``` PUG
block content
  include ./includes/mixins/post-ui.pug
  #recent-posts.recent-posts
    include includes/categoryList.pug
+   include includes/bbTimeList.pug
    +postUI
    include includes/pagination.pug
```
如果需要像本站一样在整个顶部引入的话可以参考下面的代码，修改themes/butterfly/layout/includes/layout.pug
``` PUG
if page.type !== '404'
  #body-wrap(class=pageType)
    include ./header/index.pug
+   if (is_home())
+     include ./bbTimeList.pug
```

## 十二.引入 swiper 依赖
在_config.butterfly.yml引入依赖, 如果有使用轮播图插件的话此处无需引入
``` YML
inject:
  head:
    - <link rel="stylesheet" href="https://npm.elemecdn.com/hexo-butterfly-swiper-anzhiyu@1.0.4/lib/swiper.min.css">
  bottom:
    - <script data-pjax src="https://npm.elemecdn.com/anzhiyu-blog@1.1.6/js/swiper.min.js"></script>
```
## 十三.添加自定义 css
创建source/css/essay_page/home_essay_bar.css, 然后在_config.butterfly.yml中的inject下的head引入, 注意缩进
``` YML
inject:
  head:
    - <link rel="stylesheet" href="/css/essay_page/home_essay_bar.css">
```
``` CSS
#bbTimeList {
  background: var(--anzhiyu-white);
  color: var(--anzhiyu-fontcolor);
  padding: 0.5rem 1rem;
  border-radius: 30px;
  box-shadow: var(--anzhiyu-shadow-lightblack);
  display: flex;
  transition: all 0.3s ease 0s;
  margin: 1rem auto 0;
  border: var(--style-border);
  align-items: center;
  height: 50px;
  width: 100%;
}
[data-theme="dark"] #bbTimeList {
  background: #000 !important;
}
#bbtalk {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
#bber-talk {
  width: 100%;
  height: 25px;
  line-height: 25px;
  display: flex;
  flex-direction: column;
}
.bber-logo {
  font-size: 1.5rem;
  line-height: 22px;
  margin-right: 1rem;
  transition: all 0.3s ease 0s;
  cursor: pointer;
}

.bber-gotobb {
  line-height: 25px;
  margin-left: 1rem;
  transition: all 0.3s ease 0s;
  cursor: pointer;
}

#bber-talk .li-style {
  width: 100%;
  max-width: 100%;
  height: 25px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: 0.3s;
  font-weight: 700;
  margin: auto;
  cursor: pointer;
  white-space: nowrap;
}

#bbTimeList:hover {
  border: var(--style-border-hover);
  box-shadow: var(--anzhiyu-shadow-main);
}

/* 文章页H1-H6图标样式效果 */
.bbTimeList .bber-logo {
  -webkit-animation: rotate 1.6s linear infinite;
  animation: rotate 1.6s linear infinite;
}
@-webkit-keyframes rotate {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(-1turn);
    transform: rotate(-1turn);
  }
}
@keyframes rotate {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(-1turn);
    transform: rotate(-1turn);
  }
}
```

## 十四.修改自定义 js
修改custom.js
``` JS
var percentFlag = false; // 节流阀
function essayScroll() {
  let a = document.documentElement.scrollTop || window.pageYOffset; // 卷去高度
  const waterfallResult = a % document.documentElement.clientHeight; // 卷去一个视口
  result <= 99 || (result = 99);

  if (
    !percentFlag &&
    waterfallResult + 100 >= document.documentElement.clientHeight &&
    document.querySelector("#waterfall")
  ) {
    // console.info(waterfallResult, document.documentElement.clientHeight);
    setTimeout(() => {
      waterfall("#waterfall");
    }, 500);
  } else {
    setTimeout(() => {
      document.querySelector("#waterfall") && waterfall("#waterfall");
    }, 500);
  }

  const r = window.scrollY + document.documentElement.clientHeight;

  let p = document.getElementById("post-comment") || document.getElementById("footer");

  (p.offsetTop + p.offsetHeight / 2 < r || 90 < result) && (percentFlag = true);
}
function replaceAll(e, n, t) {
  return e.split(n).join(t);
}
var anzhiyu = {
  diffDate: function (d, more = false) {
    const dateNow = new Date();
    const datePost = new Date(d);
    const dateDiff = dateNow.getTime() - datePost.getTime();
    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const month = day * 30;

    let result;
    if (more) {
      const monthCount = dateDiff / month;
      const dayCount = dateDiff / day;
      const hourCount = dateDiff / hour;
      const minuteCount = dateDiff / minute;

      if (monthCount >= 1) {
        result = datePost.toLocaleDateString().replace(/\//g, "-");
      } else if (dayCount >= 1) {
        result = parseInt(dayCount) + " " + GLOBAL_CONFIG.date_suffix.day;
      } else if (hourCount >= 1) {
        result = parseInt(hourCount) + " " + GLOBAL_CONFIG.date_suffix.hour;
      } else if (minuteCount >= 1) {
        result = parseInt(minuteCount) + " " + GLOBAL_CONFIG.date_suffix.min;
      } else {
        result = GLOBAL_CONFIG.date_suffix.just;
      }
    } else {
      result = parseInt(dateDiff / day);
    }
    return result;
  },
  changeTimeInEssay: function () {
    document.querySelector("#bber") &&
      document.querySelectorAll("#bber time").forEach(function (e) {
        var t = e,
          datetime = t.getAttribute("datetime");
        (t.innerText = anzhiyu.diffDate(datetime, true)), (t.style.display = "inline");
      });
  },
  reflashEssayWaterFall: function () {
    document.querySelector("#waterfall") &&
      setTimeout(function () {
        waterfall("#waterfall");
        document.getElementById("waterfall").classList.add("show");
      }, 500);
  },
  commentText: function (txt) {
    const postCommentDom = document.querySelector("#post-comment");
    var domTop = postCommentDom.offsetTop;
    window.scrollTo(0, domTop - 80);
    if (txt == "undefined" || txt == "null") txt = "好棒！";
    function setText() {
      setTimeout(() => {
        var input = document.getElementsByClassName("el-textarea__inner")[0];
        if (!input) setText();
        let evt = document.createEvent("HTMLEvents");
        evt.initEvent("input", true, true);
        let inputValue = replaceAll(txt, "\n", "\n> ");
        input.value = "> " + inputValue + "\n\n";
        input.dispatchEvent(evt);
        input.focus();
        input.setSelectionRange(-1, -1);
        if (document.getElementById("comment-tips")) {
          document.getElementById("comment-tips").classList.add("show");
        }
      }, 100);
    }
    setText();
  },
  initIndexEssay: function () {
    setTimeout(() => {
      let essay_bar_swiper = new Swiper(".essay_bar_swiper_container", {
        passiveListeners: true,
        direction: "vertical",
        loop: true,
        autoplay: {
          disableOnInteraction: true,
          delay: 3000,
        },
        mousewheel: true,
      });

      let essay_bar_comtainer = document.getElementById("bbtalk");
      if (essay_bar_comtainer !== null) {
        essay_bar_comtainer.onmouseenter = function () {
          essay_bar_swiper.autoplay.stop();
        };
        essay_bar_comtainer.onmouseleave = function () {
          essay_bar_swiper.autoplay.start();
        };
      }
    }, 100);
  },
};

anzhiyu.initIndexEssay();
anzhiyu.changeTimeInEssay();
anzhiyu.reflashEssayWaterFall();
```
<!-- endtab -->
{% endtabs %}
{% endfolding %}
