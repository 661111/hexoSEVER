---
title: 友人圈
date: 2023-06-06 17:09:42
type: link
top_img: false
aside: false
---
<script>
    function addStatusTagsWithCache(t) {
        const a = "statusTagsData";
        function e(t) {
            const a = t.link_status;
            document.querySelectorAll(".flink-list-item").forEach((t => {
                if (!t.href)
                    return;
                const e = t.href.replace(/\/$/, "")
                  , s = document.createElement("div");
                s.classList.add("status-tag");
                let i = !1;
                const l = a.find((t => t.link.replace(/\/$/, "") === e));
                if (l) {
                    let t = '<i class="fa-solid fa-signal"></i>ERR'
                      , a = "status-tag-red";
                    if (-1 === l.latency)
                        t = '<i class="fa-solid fa-signal"></i>ERR';
                    else {
                        t = '<i class="fa-solid fa-signal"></i>' + (1e3 * l.latency).toFixed(0) + " MS",
                        l.latency <= 3 ? a = "status-tag-green" : l.latency <= 5 ? a = "status-tag-light-yellow" : l.latency <= 10 && (a = "status-tag-dark-yellow")
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
        addStatusTagsWithCache("https://www.sxiaohe.top/result.json")
    }
    ), 0)
</script>