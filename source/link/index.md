---
title: 友人圈
date: 2023-06-06 17:09:42
type: link
top_img: false
aside: false
---
<div class="addBtn"><button onclick="leonus.linkCom()"><i class="fa-solid fa-circle-plus"></i>快速申请 (默认样式)</button> <button onclick="leonus.linkCom(&quot;bf&quot;)"><i class="fa-solid fa-circle-plus"></i>快速申请 (Butterfly)</button></div>
<link rel="stylesheet" href="/link/css/klink.css">
<script src="/link/js/klink.js"></script>
{% note primary simple %}1.建议原创文章大于6篇，且有一定的质量；2.一般需要拥有自己的域名而非github.io、eu.org、vercel.app等；{% endnote %}
```
- name: 莫言小筑
  link: https://www.myxz.top/
  siteshot: https://www.myxz.top/img/link/苏晓河.avif
  avatar: https://www.myxz.top/img/avatar.avif
  descr: 随风飘起 如同浮云
```
<script>
    function addStatusTagsWithCache(t) {
        const a = "statusTagsData";
        function e(t) {
            const a = t.link_status;
            document.querySelectorAll(".site-card").forEach((t => {
                if (!t.href)
                    return;
                const e = t.href.replace(/\/$/, "")
                  , s = document.createElement("div");
                s.classList.add("state");
                let i = !1;
                const l = a.find((t => t.link.replace(/\/$/, "") === e));
                if (l) {
                    let t = 'ERR'
                      , a = "error";
                    if (-1 === l.latency)
                        t = 'ERR';
                    else {
                        t = '' + (1e3 * l.latency).toFixed(0) + " ms",
                        l.latency <= 3 ? a = "success" : l.latency <= 5 ? a = "success" : l.latency <= 10 && (a = "success")
                    }
                    s.innerHTML = t,
                    s.classList.add(a),
                    i = !0
                }
                i && (t.style.position = "relative",
                t.appendChild(s))
            }
            ))
        }
        const s = localStorage.getItem(a);
        if (s) {
            const {data: t, timestamp: a} = JSON.parse(s);
            if (Date.now() - a < 18e5)
                return void e(t)
        }
        fetch(t).then((t => t.json())).then((t => {
            e(t);
            const s = {
                data: t,
                timestamp: Date.now()
            };
            localStorage.setItem(a, JSON.stringify(s))
        }
        )).catch((t => console.error("Error fetching test-flink result.json:", t)))
    }
    setTimeout(( () => {
        addStatusTagsWithCache("https://link-api.vercel.sxiaohe.top/result.json")
    }
    ), 0)
</script>