var friend_link_list = [{"name":"清羽飞扬","link":"https://blog.liushen.fun/","avatar":"https://blog.liushen.fun/info/avatar.ico","descr":"柳影曳曳，清酒孤灯，扬笔撒墨，心境如霜","siteshot":"https://blog.liushen.fun/info/siteshot.jpg","atom(options)":"https://blog.liushen.fun/atom.xml"},{"name":"轻笑Chuckle","link":"https://www.qcqx.cn","avatar":"https://www.qcqx.cn/head.webp","descr":"漫天倾尘风中轻笑"},{"name":"贰猹的小窝","link":"https://noionion.top/","avatar":"https://pub-noionion.oss-cn-hangzhou.aliyuncs.com/head.jpg","descr":"用这生命中的每一秒，给自己一个不后悔的未来：","siteshot":"https://pub-noionion.oss-cn-hangzhou.aliyuncs.com/noionion.top.png"},{"name":"安知鱼","link":"https://blog.anheyu.com/","avatar":"https://npm.elemecdn.com/anzhiyu-blog-static@1.0.4/img/avatar.jpg","descr":"生活明朗，万物可爱","siteshot":"https://npm.elemecdn.com/anzhiyu-theme-static@1.1.6/img/blog.anheyu.com.jpg"},{"name":"随风起","link":"https://blog.bywind.xyz/","avatar":"https://blog.bywind.xyz/img/avatar.png","descr":"爱意随风起，风止意难平"},{"name":"王先森","link":"https://www.boysec.cn","avatar":"https://images.boysec.cn/medias/avatar.jpg","descr":"运维与安全从业者！","siteshot":"https://cdn.jsdelivr.net/gh/5279314/ScreenShot@gh-pages/www.boysec.cn.jpg"},{"name":"安小歪","link":"https://blog.anxy.top/","avatar":"https://imgse.koxiuqiu.cc/imgse/u/19/2025/02/20/67b737d854192.webp","descr":"记住你！自己！","siteshot":"https://imgse.koxiuqiu.cc/imgse/u/19/2025/02/20/67b739bef3f9c.png"},{"name":"七七小栈","link":"https://blog.zsrooj.site/","avatar":"https://blog.zsrooj.site/img/%E7%BD%91%E7%AB%99%E6%88%AA%E5%9B%BE.png","descr":"一个个人博客，记录生活与技术","siteshot":"https://blog.zsrooj.site/favicon5.ico"},{"name":"Leonus","link":"https://blog.leonus.cn/","avatar":"https://q1.qlogo.cn/g?b=qq&nk=990320751&s=5","descr":"进一寸有进一寸的欢喜。","rss":"/atom.xml"},{"name":"Ariasakaの小窝","link":"https://blog.yaria.top","avatar":"https://bu.dusays.com/2024/12/05/67517bcf104da.png","descr":"人有悲欢离合 月有阴晴圆缺","siteshot":"https://bu.dusays.com/2024/09/19/66ec130ad1de0.png","theme_color":"#ed709b"},{"name":"别亦难","link":"https://lazyingman.cn","avatar":"https://bu.dusays.com/2023/06/23/64959cf745a4d.png","descr":"准时不定期更新","siteshot":"https://bu.dusays.com/2023/06/28/649c105e00a4f.png"},{"name":"小吉崽汁の窝","link":"https://wuxingzzz.top","avatar":"https://www.wuxingzzz.top/hexo/1716691173759791105.jpg","siteshot":"https://www.wuxingzzz.top/article/1592180893591904258.jpg","descr":"A programmer of vegetable chicken"},{"name":"前尘小筑","link":"https://mnchen.cn/","avatar":"https://image.mnchen.cn/2023/12/mnochen.jpg","descr":"虽多尘色染，犹见墨痕浓"},{"name":"唐志远","link":"https://fe32.top/","avatar":"https://bu.dusays.com/2022/05/02/626f92e193879.jpg","desc":"古今之成大事者，不惟有超世之才，亦必有坚忍不拔之志","screenshot":"https://bu.dusays.com/2023/07/16/64b400bf8e546.jpg"},{"name":"葱苓小筑","link":"https://blog.ciraos.top","avatar":"https://blog.ciraos.top/avatar.avif","desc":"Don't worry, be happy","screenshot":"https://blog.ciraos.top/siteshot.avif"}], refreshNum = 1;
function friendChainRandomTransmission() {
    var a = Math.floor(Math.random() * friend_link_list.length)
      , a = friend_link_list.splice(a, 1)[0]
      , t = a.name
      , n = a.link;
    Snackbar.show({
        text: "点击前往按钮进入随机一个友链，不保证跳转网站的安全性和可用性。本次随机到的是本站友链：「" + t + "」",
        duration: 8e3,
        pos: "top-center",
        actionText: "前往",
        onActionClick: function(a) {
            a.style.opacity = 0,
            window.open(n, "_blank")
        }
    })
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
