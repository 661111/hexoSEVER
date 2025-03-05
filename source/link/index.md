---
title: 友人圈
date: 2023-06-06 17:09:42
type: link
top_img: false
aside: false
top_page: true
top_bg: https://s11.ax1x.com/2023/06/07/pCiOBKU.jpg
top_title: 封の生活好物
top_tips: 靠谱的日常伙伴 让工作与生活充满期待
top_link: /blog/42#好物推荐页
top_text: 关于本页
---
<style>
    .status-tag {
        position: absolute;
        top: 0px;
        left: 0px;
        padding: 3px 8px;
        border-radius: 12px 0px 12px 0px;
        font-size: 12px;
        color: white;
        font-weight: bold;
        transition: font-size 0.3s ease-out, width 0.3s ease-out, opacity 0.3s ease-out;
    }
    .flink-list-item:hover .status-tag {
        font-size: 0px;
        opacity: 0;
    }
    /* 固态颜色 */
    .status-tag-green {
        background-color: #005E00; /* 绿色 */
    }
    .status-tag-light-yellow {
        background-color: #FED101; /* 浅黄色 */
    }
    .status-tag-dark-yellow {
        background-color: #F0B606; /* 深黄色 */
    }
    .status-tag-red {
        background-color: #B90000; /* 红色 */
    }
</style>
<script>
function addStatusTagsWithCache(jsonUrl) {
    const cacheKey = "statusTagsData";
    const cacheExpirationTime = 30 * 60 * 1000; // 半小时
    function applyStatusTags(data) {
        const linkStatus = data.link_status;
        document.querySelectorAll('.flink-list-item').forEach(card => { // 一定要注意这里的类名，小心匹配不上
            if (!card.href) return;
            const link = card.href.replace(/\/$/, '');
            const statusTag = document.createElement('div');
            statusTag.classList.add('status-tag');
            let matched = false;
            // 查找链接状态
            const status = linkStatus.find(item => item.link.replace(/\/$/, '') === link);
            if (status) {
                let latencyText = '未知';
                let className = 'status-tag-red'; // 默认红色
                if (status.latency === -1) {
                    latencyText = '未知';
                } else {
                    latencyText = status.latency.toFixed(2) + ' s';
                    if (status.latency <= 2) {
                        className = 'status-tag-green';
                    } else if (status.latency <= 5) {
                        className = 'status-tag-light-yellow';
                    } else if (status.latency <= 10) {
                        className = 'status-tag-dark-yellow';
                    }
                }
                statusTag.textContent = latencyText;
                statusTag.classList.add(className);
                matched = true;
            }
            if (matched) {
                card.style.position = 'relative';
                card.appendChild(statusTag);
            }
        });
    }
    function fetchDataAndUpdateUI() {
        fetch(jsonUrl)
            .then(response => response.json())
            .then(data => {
                applyStatusTags(data);
                const cacheData = {
                    data: data,
                    timestamp: Date.now()
                };
                localStorage.setItem(cacheKey, JSON.stringify(cacheData));
            })
            .catch(error => console.error('Error fetching test-flink result.json:', error));
    }
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        if (Date.now() - timestamp < cacheExpirationTime) {
            applyStatusTags(data);
            return;
        }
    }
    fetchDataAndUpdateUI();
}
setTimeout(() => {
    addStatusTagsWithCache('https://link-api.vercel.sxiaohe.top/result.json');
}, 0);
</script>