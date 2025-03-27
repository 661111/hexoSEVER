---
title: Xterminal内网穿透到服务器
description: 在windows上的服务内网穿透到云服务器
date: '2025-03-25 20:00'
ipdate: '2025-03-26 20:00'
cover: 'https://sourceimage.s3.bitiful.net/img/default_cover_43.avif'
category:
  - hexo
  - butterfly
top_img: false
tags:
  - hexo
  - butterfly
abbrlink: 16506
---
## 前言
由于我本人使用云服务器给自己搭建一些服务（比如：我的世界java版）的时候，总是被一些人恶意炸毁。导致存档频繁受损，而且服务器的负载高，所以我在想怎么根绝这种情况。在开启服务的时候可以正常游玩，且数据存放在本地。后来用上电脑后，以及游玩宝可梦整合包（其实没多少时间玩）后，发现重新启动后ip地址会变换（后来使用网线没有出现这种情况），而且端口会随机变换。在经过网上一些视频知道了内网穿透，将本机的localhost（127.0.0.1）及端口切换到云服务器（内网穿透的共享服务器）上解决。一个云服务器最高不超过65500个端口。大部分在网上公益的内网穿透工具都是基于他们自己的云服务器，可能你想要在里面新建一个内网穿透的话（可能很难找到一些靠近自己的地区），那么自己从零开始搭建内网穿透云服务器吧。
如果想要知道原理的可以在这两篇文章中去知道，后续也会更新这个方向的：

[内网穿透详解](https://www.cnblogs.com/cyrus0w/p/13123504.html)
[也许你也用得上的技术，从零开始了解内网穿透](https://sspai.com/post/88937)

## 操作环境
1.服务器地区：香港地区
2.服务器版本：CentOS Stream 8 x86_64(Py3.7.9)
3.服务器管理系统：宝塔面板企业版（开心版本）
4.内网穿透软件：Xterminal的SSH隧道

## 实操

1. 下载Xterminal软件
打开以下链接：[更好用的开发工具，但不止于Terminal](https://www.xterminal.cn/)，按照一步一步的去安装，安装路径不要在C盘（防止存储爆满导致的系统卡顿）

2. 服务器选择
推荐在一些比较有售后的云服务器发售平台，比如：[雨云](https://app.rainyun.com/)、[林柚云](https://www.youvps.cn/)等等······
如果就想要低价格的话可以去[林柚云](https://www.youvps.cn/)里的一些特惠机器。

3. 链接云服务器
1.打开ssh页面
点击左上角的SSH图标，进入SSH页面：
![1](https://cdn.nlark.com/yuque/0/2024/png/181068/1717647325841-b21b71dd-aa2c-49ab-bb46-41c372814fb7.png?x-oss-process=image%2Fformat%2Cwebp)
2.新建服务器
点击SSH列表右侧的“+”按钮新建服务器并按照内容进行填写：
![1](https://sourceimage.s3.bitiful.net/post%2Fimg%2F16506%2F1.png)

4. 添加内网穿透
1.打开内网穿透页面
点击左上角的SSH隧道图标，进入SSH隧道：
![1](https://sourceimage.s3.bitiful.net/post%2Fimg%2F16506%2F2.png)

2.新建SSH隧道
点击SSH隧道列表右侧的“+”按钮新建服务器并按照内容进行填写
![1](https://sourceimage.s3.bitiful.net/post/img/16506/3.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=X8fla5EwxMzIjQ0aDNQLjk44%2F20250326%2F%2Fs3%2Faws4_request&X-Amz-Date=20250326T132314Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&x-id=GetObject&X-Amz-Signature=06b84117ea4e8abf5b888658255b26acc1f66554911b82a4b3a94a15803f8702)

3.服务器Nginx反向代理
- 新建一个网站（需要域名已经解析到云服务器）
![新建网站](add.png)

- 开启SSL选项
打开SSL申请页面，按照以下过程进行如果正常的话则会成功
![](https://sourceimage.s3.bitiful.net/post%2Fimg%2F16506%2F4.png)

- 开启反向代理

我这里安装好了一个网盘服务端，在终端输入以下代码：
``` BASH
alist start
```
终端输出：
``` BASH
INFO[2025-03-27 15:01:16] reading config file: data\config.json
INFO[2025-03-27 15:01:16] load config from env with prefix: ALIST_
INFO[2025-03-27 15:01:16] init logrus...
INFO[2025-03-27 15:01:16] init tool SimpleHttp success: ok
INFO[2025-03-27 15:01:16] init tool PikPak success: ok
WARN[2025-03-27 15:01:16] init tool qBittorrent failed: Post "http://localhost:8080/api/v2/auth/login": dial tcp 127.0.0.1:8080: connectex: No connection could be made because the target machine actively refused it.
INFO[2025-03-27 15:01:16] init tool Thunder success: ok
WARN[2025-03-27 15:01:16] init tool Transmission failed: failed get transmission version: can't get session values: 'session-get' rpc method failed: failed to execute HTTP request: Post "http://localhost:9091/transmission/rpc": dial tcp 127.0.0.1:9091: connectex: No connection could be made because the target machine actively refused it.
INFO[2025-03-27 15:01:16] init tool 115 Cloud success: ok
WARN[2025-03-27 15:01:16] init tool aria2 failed: failed get aria2 version: Post "http://localhost:6800/jsonrpc": dial tcp 127.0.0.1:6800: connectex: No connection could be made because the target machine actively refused it.
INFO[2025-03-27 15:01:16] start HTTP server @ 0.0.0.0:5244
FATA[2025-03-27 15:01:16] failed to start http: listen tcp 0.0.0.0:5244: bind: Only one usage of each socket address (protocol/network address/port) is normally permitted.
```

打开反向代理进行新建，这个目标URL替换为你自己的反代服务器的本地地址：

![](https://sourceimage.s3.bitiful.net/post%2Fimg%2F16506%2F5.png)

5. 打开你自己的域名，比如我自己的地址：[https://test.myxz.top](https://test.myxz.top)
对于我本人来说，看到以下页面就说明正常：

![](https://sourceimage.s3.bitiful.net/post%2Fimg%2F16506%2F6.png)