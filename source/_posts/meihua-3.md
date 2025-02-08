---
title: 博客魔改教程总结(三)
description: 从零开始魔改butterfly
date: '2025-02-07 8:00'
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
> 5.[🍚博客魔改教程总结(二)](https://www.sxiaohe.top/posts/4221.html) ⇦当前位置🪂
> 6.[🎋博客魔改教程总结(三)](https://www.sxiaohe.top/posts/4222.html)
> 7.[🥕博客魔改教程总结(四)]()
> 8.[🍊博客魔改教程总结(五)]()

# 1.友链朋友圈部署
由于这个非常复杂所以我这里会给大家分出两个不同的教程，旧朋友圈目前已经暂停维护了，建议可以选择新朋友圈，功能有点
{% folding cyan, 请查看教程内容 %}
{% tabs 部署方式 %}
<!-- tab 旧朋友圈部署 -->
详情看这个[部署文档](https://fcircle-doc.yyyzyyyz.cn/#/backenddeploy)
<!-- endtab -->

<!-- tab 新朋友圈部署(butterfly主题支持) -->
**部署前的操作**

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

**部署爬取项目**

前置工作
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
设置issue格式：
这个我已经设置好了，你只需要进行自定义即可。
<!-- endtab -->

{% endtabs %}

{% endfolding %}