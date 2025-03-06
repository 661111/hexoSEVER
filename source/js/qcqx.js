document.addEventListener('DOMContentLoaded', function () {
    const posts = document.querySelectorAll('#post-info');
    posts.forEach(function (post) {
        const cover = post.getAttribute('data-cover');
        if (cover) {
            post.style.backgroundImage = `url(${cover})`;
        }
    });
});
/*  1.backgroud */
try {
    let e = loadData("blogbg", 1440);
    e ? changeBg(e, 1) : localStorage.removeItem("blogbg")
} catch (e) {
    localStorage.removeItem("blogbg")
}
function changeBg(e, t) {
    let n = document.getElementById("web_bg");
    document.getElementById("svg_bg").style.backgroundImage = "none",
    "#" == e.charAt(0) ? (n.style.backgroundColor = e,
    n.style.backgroundImage = "none") : n.style.backgroundImage = e,
    t || (saveData("blogbg", e),
    btf.snackbarShow("切换背景成功"))
}
var winbox = "";
function resizeWinbox() {
    document.querySelector(".winbox").classList.contains("focus") && winResize()
}
function createWinbox() {
    winbox = WinBox({
        id: "changeBgBox",
        index: 2e3,
        title: "切换背景",
        x: "center",
        y: "center",
        minwidth: "300px",
        height: "60%",
        background: "var(--leonus-blue)"
    }),
    winResize(),
    window.addEventListener("resize", window.winBoxResize),
    winbox.body.innerHTML = '\n    <div id="article-container" style="padding:10px;">\n    \n    <p><button onclick="localStorage.removeItem(\'blogbg\');location.reload();" style="background:#5FCDFFC8;display:block;width:100%;padding: 15px 0;border-radius:6px;color:white;"><i class="fa-solid fa-arrows-rotate"></i> 点我恢复默认背景</button></p>\n    <h2 id="图片（电脑）"><a href="#图片（电脑）" class="headerlink" title="图片（电脑）"></a>图片（电脑）</h2>\n    <div class="bgbox">\n    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://jsd.sxiaohe.top/gh/661111/661111.github.io/img/toggleWinbox/img1.webp)" class="imgbox" onclick="changeBg(\'url(https://jsd.sxiaohe.top/gh/661111/661111.github.io/img/toggleWinbox/img1.webp)\')"></a>\n    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://jsd.sxiaohe.top/gh/661111/661111.github.io/img/toggleWinbox/img2.webp)" class="imgbox" onclick="changeBg(\'url(https://jsd.sxiaohe.top/gh/661111/661111.github.io/img/toggleWinbox/img2.webp)\')"></a>\n    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://jsd.sxiaohe.top/gh/661111/661111.github.io/img/toggleWinbox/img3.webp)" class="imgbox" onclick="changeBg(\'url(https://jsd.sxiaohe.top/gh/661111/661111.github.io/img/toggleWinbox/img3.webp)\')"></a>\n    <a href="javascript:;" rel="noopener external nofollow" style="background-image:url(https://jsd.sxiaohe.top/gh/661111/661111.github.io/img/toggleWinbox/img4.webp)" class="imgbox" onclick="changeBg(\'url(https://jsd.sxiaohe.top/gh/661111/661111.github.io/img/toggleWinbox/img4.webp)\')"></a>\n    </div>\n     \n    <h2 id="渐变色"><a href="#渐变色" class="headerlink" title="渐变色"></a>渐变色</h2>\n    <div class="bgbox">\n    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(55deg, #0095c2 21%, #64E1C8 100%)" onclick="changeBg(\'linear-gradient(55deg, #0095c2 21%, #64E1C8 100%)\')"></a>\n    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(90deg, #ffd7e4 0%, #c8f1ff 100%)" onclick="changeBg(\'linear-gradient(90deg, #ffd7e4 0%, #c8f1ff 100%)\')"></a>\n    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(45deg, #e5737b, #c6999e, #96b9c2, #00d6e8)" onclick="changeBg(\'linear-gradient(45deg, #e5737b, #c6999e, #96b9c2, #00d6e8)\')"></a>\n    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(25deg, #31354b, #38536c, #3b738e, #3995b2)" onclick="changeBg(\'linear-gradient(25deg, #31354b, #38536c, #3b738e, #3995b2)\')"></a>\n    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(26deg, #0e6183, #387ea6, #599dcb, #7abdf1)" onclick="changeBg(\'linear-gradient(26deg, #0e6183, #387ea6, #599dcb, #7abdf1)\')"></a>\n    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(25deg, #0583bf, #159bc5, #16b4cb, #0aced0)" onclick="changeBg(\'linear-gradient(25deg, #0583bf, #159bc5, #16b4cb, #0aced0)\')"></a>\n    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(25deg, #3e47d1, #8b5fb8, #ba7b9d, #df9980)" onclick="changeBg(\'linear-gradient(25deg, #3e47d1, #8b5fb8, #ba7b9d, #df9980)\')"></a>\n    <a href="javascript:;" rel="noopener external nofollow" class="box" style="background: linear-gradient(25deg, #0e5c71, #15828f, #19a9ae, #1ad3ce)" onclick="changeBg(\'linear-gradient(25deg, #0e5c71, #15828f, #19a9ae, #1ad3ce)\')"></a>\n    </div>\n    \n    <h2 id="纯色"><a href="#纯色" class="headerlink" title="纯色"></a>纯色</h2>\n    <div class="bgbox">\n    <a href="javascript:;" title = "白" rel="noopener external nofollow" class="box" style="background: #f7f9fe" onclick="changeBg(\'#f7f9fe\')"></a> \n    <a href="javascript:;" title = "黑" rel="noopener external nofollow" class="box" style="background: #30303c" onclick="changeBg(\'#30303c\')"></a> \n    <a href="javascript:;" title = "锌灰" rel="noopener external nofollow" class="box" style="background: #7a7374" onclick="changeBg(\'#7a7374\')"></a> \n    <a href="javascript:;" title = "晶红" rel="noopener external nofollow" class="box" style="background: #eea6b7" onclick="changeBg(\'#eea6b7\')"></a> \n    <a href="javascript:;" title = "银灰" rel="noopener external nofollow" class="box" style="background: #918072" onclick="changeBg(\'#918072\')"></a> \n    <a href="javascript:;" title = "荷花白" rel="noopener external nofollow" class="box" style="background: #fbecde" onclick="changeBg(\'#fbecde\')"></a> \n    <a href="javascript:;" title = "冰山蓝" rel="noopener external nofollow" class="box" style="background: #a4aca7" onclick="changeBg(\'#a4aca7\')"></a> \n    <a href="javascript:;" title = "玉簪绿" rel="noopener external nofollow" class="box" style="background: #a4cab6" onclick="changeBg(\'#a4cab6\')"></a> \n    <a href="javascript:;" title = "松霜绿" rel="noopener external nofollow" class="box" style="background: #83a78d" onclick="changeBg(\'#83a78d\')"></a> \n    <a href="javascript:;" title = "淡绿灰" rel="noopener external nofollow" class="box" style="background: #70887d" onclick="changeBg(\'#70887d\')"></a> \n    <a href="javascript:;" title = "石绿" rel="noopener external nofollow" class="box" style="background: #57c3c2" onclick="changeBg(\'#57c3c2\')"></a> \n    <a href="javascript:;" title = "甸子蓝" rel="noopener external nofollow" class="box" style="background: #10aec2" onclick="changeBg(\'#10aec2\')"></a> \n    <a href="javascript:;" title = "清水蓝" rel="noopener external nofollow" class="box" style="background: #93d5dc" onclick="changeBg(\'#93d5dc\')"></a> \n    <a href="javascript:;" title = "蜻蜓蓝" rel="noopener external nofollow" class="box" style="background: #3b818c" onclick="changeBg(\'#3b818c\')"></a> \n    <a href="javascript:;" title = "碧青" rel="noopener external nofollow" class="box" style="background: #5cb3cc" onclick="changeBg(\'#5cb3cc\')"></a> \n    <a href="javascript:;" title = "星蓝" rel="noopener external nofollow" class="box" style="background: #93b5cf" onclick="changeBg(\'#93b5cf\')"></a> \n    </div>\n'
}
function winResize() {
    var e = document.documentElement.clientWidth;
    e <= 768 ? winbox.resize(.95 * e + "px", "70%").move("center", "center") : winbox.resize(.6 * e + "px", "70%").move("center", "center")
}
function toggleWinbox() {
    document.querySelector("#changeBgBox") ? winbox.toggleClass("hide") : createWinbox()
}
function catalogActive() {
    let e = document.getElementById("catalog-list");
    if (e) {
        e.addEventListener("mousewheel", (function(t) {
            e.scrollLeft -= t.wheelDelta / 2,
            t.preventDefault()
        }
        ), !1);
        let t = document.getElementById(decodeURIComponent(window.location.pathname));
        t && (t.classList.add("selected"),
        e.scrollLeft = t.offsetLeft - e.offsetLeft - (e.offsetWidth - t.offsetWidth) / 2)
    }
}
window.removeEventListener("resize", window.winBoxResize),
window.winBoxResize = btf.throttle(resizeWinbox, 50),
catalogActive();
const aplayer = document.querySelector(".aplayer.no-destroy");
function removelrc() {
    const e = document.querySelector(".contact-info");
    return e && "none" !== window.getComputedStyle(e).getPropertyValue("display") && document.querySelector(".aplayer-icon-lrc") ? (observer.disconnect(),
    document.querySelector(".aplayer-icon-lrc").click(),
    void (observer = null)) : void 0
}
let observer = new MutationObserver((function(e) {
    for (let t of e)
        "childList" === t.type && removelrc()
}
));
observer.observe(aplayer, {
    childList: !0
});
