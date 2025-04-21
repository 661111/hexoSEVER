function travelling() {
    fetch("https://moments.myxz.top/randomfriend").then((e=>e.json())).then((e=>{
            var t = e.link
                , o = "点击前往按钮进入随机一个友链，不保证跳转网站的安全性和可用性。本次随机到的是本站友链：「" + e.name + "」";
            // document.styleSheets[0].addRule(":root", "--bywind-snackbar-time:8000ms!important"),
            Snackbar.show({
                text: o,
                duration: 6000,
                pos: "top-center",
                actionText: "前往",
                onActionClick: function(e) {
                    $(e).css("opacity", 0),
                    window.open(t, "_blank")
                }
            })
        }
    ))
}
function addFriendLinksInFooter() {
    var a = document.getElementById("footer-random-friends-btn");
    if (a) {
        a.style.opacity = "0.2",
        a.style.transitionDuration = "0.3s",
        a.style.transform = "rotate(" + 360 * refreshNum++ + "deg)";
        for (var t = [], n = 0; friend_link_list.length && n < 3; ) {
            var s = Math.floor(Math.random() * friend_link_list.length)
              , s = friend_link_list.splice(s, 1)[0]
              , e = s.name
              , i = s.link
              , s = s.avatar;
            t.push({
                name: e,
                link: i,
                avatar: s
            }),
            n++
        }
        var m = t.map(function(a) {
            var t = a.name;
            return "<a class='footer-item' href='" + a.link + "' target='_blank' rel='noopener nofollow'>" + t + "</a>"
        }).join("");
        m += "<a class='footer-item' href='/link/'>更多</a>",
        document.getElementById("friend-links-in-footer").innerHTML = m,
        setTimeout(function() {
            a.style.opacity = "1"
        }, 300)
    }
}
