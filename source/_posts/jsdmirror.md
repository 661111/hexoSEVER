---
title: jsd镜像搭建以及公益服务提供
description: 从零开始搭建镜像服务
date: '2025-03-22 10:00'
updated: '2025-03-22 5:03'
cover: https://sourceimage.s3.bitiful.net/img/default_cover_21.avif
category:
  - 搭建
  - 折腾
top_img: false
tags:
  - 网站内容加速
abbrlink: jsdmirror
---
{% note info flat %}
提示：本篇文章部分内容通过ai生成和内容润色
{%endnote%}

## 参考文章

## 前言
最近网站的静态资源加载太慢，打开控制台后发现了大部分第三方资源加载过慢，查看链接原来是[jsdelivr](https://cdn.jsdelivr.net/)这个网站加载慢，来到网上查找后发现
![jsdelivr无法加载](https://sourceimage.s3.bitiful.net/post%2Fimg%2Fjsdmirror%2F1.avif)

## 教程开始
{% note info flat %}
注意：本篇文章的服务器管理系统为宝塔面板
{%endnote%}

### 新建网站
打开宝塔面板的网站然后点击新建网站按钮：
[新建网站](https://sourceimage.s3.bitiful.net/post/img/jsdmirror/2.avif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=X8fla5EwxMzIjQ0aDNQLjk44%2F20250322%2F%2Fs3%2Faws4_request&X-Amz-Date=20250322T084155Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&x-id=GetObject&X-Amz-Signature=ac02a670652fde214e6c463e5f396f51b5f2567886e708aa8e93ca7d41b288ae)

[网站域名](https://sourceimage.s3.bitiful.net/post/img/jsdmirror/6.avif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=X8fla5EwxMzIjQ0aDNQLjk44%2F20250322%2F%2Fs3%2Faws4_request&X-Amz-Date=20250322T084815Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&x-id=GetObject&X-Amz-Signature=a8f25b71a37a639ee5956b2c89dbe30d9b4e8b49e181d029d24fe6a68e7311c4)

### 反向代理jsdelivr
按下网站里的反向代理，按照步骤操作：
[反向代理步骤](https://sourceimage.s3.bitiful.net/post/img/jsdmirror/3.avif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=X8fla5EwxMzIjQ0aDNQLjk44%2F20250322%2F%2Fs3%2Faws4_request&X-Amz-Date=20250322T085010Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&x-id=GetObject&X-Amz-Signature=27744451bd370b05134def3d2efed86f0e6fb14d8697094cd8cd8fc823831556)

按照以下图片进行反向代理的内容：
[反向代理jsd中的gh资源](https://sourceimage.s3.bitiful.net/post/img/jsdmirror/4.avif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=X8fla5EwxMzIjQ0aDNQLjk44%2F20250322%2F%2Fs3%2Faws4_request&X-Amz-Date=20250322T085212Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&x-id=GetObject&X-Amz-Signature=ffb231879e50f054b0e24d5fea7249785f9662d2f44a2398a5b21c09a6d2a806)
[反向代理jsd中的npm资源](https://sourceimage.s3.bitiful.net/post/img/jsdmirror/5.avif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=X8fla5EwxMzIjQ0aDNQLjk44%2F20250322%2F%2Fs3%2Faws4_request&X-Amz-Date=20250322T085228Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&x-id=GetObject&X-Amz-Signature=ec251f3d33e34507224af587860957121cc8faa79217752ebb0f9f9130afca03)

如果不想要一个个手打可以复制以下链接：
``` gh
https://fastly.jsdelivr.net/gh
```
``` npm
https://fastly.jsdelivr.net/npm
```

### 查看结果
打开 https://[自己的域名]/gh，例如[https://jsd.test.com/gh](https://jsd.test.com/gh)；https://[自己的域名]/npm，例如[https://jsd.test.com/gh](https://jsd.test.com/npm)

### 替换原jsdelivr链接
在自己的主题文件搜索**custom_format**，添加链接https://[自己的域名]/npm/${name}@${version}/${min_file}

## 公益地址
本人搭建的公益地址为：[https://jsd.sxiaohe.top](https://jsd.sxiaohe.top)
如果想要更快的可以去网上自己查找或者自己搭建