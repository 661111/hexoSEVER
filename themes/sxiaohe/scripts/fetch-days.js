const axios = require('axios');
const fs = require('fs');
const path = require('path');
const moment = require('moment');

// 设置 moment 的语言环境为中文
moment.locale('zh-cn');

hexo.on('ready', () => {
    const apiUrl = 'https://v2.alapi.cn/api/zaobao';
    const token = 'xxxxxxxxxxx'; // 替换为你的token

    axios.get(apiUrl, {
        params: {
            token: token
        }
    })
        .then(response => {
            const data = response.data;
            if (data.code === 200) {
                let newsData = data.data;


                // 执行历史数据 Start

                // const oldDataFileName = "daily_news_2024-06-20.json"  // 修改需要执行的数据文件名称
                // const oldDataPath = path.join(__dirname, '../../../source/_data/'+oldDataFileName);
                // console.log("Daily news oldDataPath is :",oldDataPath);
                // const oldData = JSON.parse(fs.readFileSync(oldDataPath, 'utf8'));
                // newsData = oldData;

                // 执行历史数据 End


                // 使用 newsData.date 转换为星期几
                const postDate = newsData.date;
                const postDayOfWeek = moment(postDate).format('dddd');
            
                const filePath = path.join(__dirname, '../../../source/_data/daily_news_'+postDate+'.json');
                console.log('Daily news save data filePath is :', filePath);

                // 生成json文件
                fs.writeFileSync(filePath, JSON.stringify(newsData, null, 2));
                

                // 生成 Markdown 文件
                // const postDayOfWeek = moment().format('dddd'); // 获取中文的星期几
                const postTitle = `【每日早报】-${postDate} - ${postDayOfWeek}`;
                const postContent = `---
title: ${postTitle}
date: ${postDate} 00:00:00
tags:
  - 每日早报
categories:
  - 每日早报
series: 每日早报
cover: ${newsData.head_image}
---

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>每日早报</title>
</head>

<body>
    <div style="text-align: center;"> <img src="`+newsData.image+`"
            alt="每日早报" width="100%"> </div>
</body>

</html>`;

                const postFilePath = path.join(__dirname, '../../../source/_posts', `${postTitle}.md`);
                fs.writeFileSync(postFilePath, postContent);

                
                console.log('Daily news post generated successfully:', postFilePath);
            } else {
                console.error('Failed to fetch daily news:', data.msg);
            }
        })
        .catch(error => {
            console.error('Error fetching daily news:', error);
        });
});
