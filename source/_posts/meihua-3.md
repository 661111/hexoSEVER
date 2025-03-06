---
title: 博客魔改教程总结(三)
description: 从零开始魔改butterfly
date: '2025-02-08 8:00'
cover: https://jsd.sxiaohe.top/gh/661111/hexoSEVER/source/img/2025/01/meihua-post/cover.avif
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

{% link 友链朋友圈前端部署方案,苏晓河,https://www.sxiaohe.top/posts/2901kf.html %}

# 3.主流说说部署

{% link 即刻短文的三种部署方案,苏晓河,https://www.sxiaohe.top/posts/2900kf.html %}