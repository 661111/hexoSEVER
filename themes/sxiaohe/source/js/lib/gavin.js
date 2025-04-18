// ************************************************ 函数部分 **************************************************************
const marqueeContainer1 = document.getElementById('console-music-title');
const marqueeContent1 = document.getElementById('console-music-title-text');
const marqueeContainer2 = document.getElementById('console-music-author');
const marqueeContent2 = document.getElementById('console-music-author-text');
var userInfo;
var ipAddress = '';
var frameCount = 0;
var startTime = performance.now();
let animationId;
var winbox = '';

window.onload = function () {
    var set_music = document.querySelector("#set-switch-music input");
    function dodododoooAdd() {
        var link = document.createElement('link');
        link.id = 'dodododooocss';
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = 'https://dodododooo.com/mplayer2/remote/css/app-mplayer.css';
        var head = document.head || document.getElementsByTagName('head')[0];
        head.appendChild(link);
        var script = document.createElement('script');
        script.id = 'dodododooojs';
        script.type = 'text/javascript';
        script.src = 'https://dodododooo.com/mplayer2/remote/js/app-mplayer.js';
        document.body.appendChild(script);
    }
    function dodododoooDel() {
        var link = document.getElementById('dodododooocss');
        if (link) document.head.removeChild(link);
        var script1 = document.getElementById('dodododooojs');
        if (script1) document.body.removeChild(script1);
        var script2 = document.getElementById('mplayer');
        if (script2) document.body.removeChild(script2);
    }
    if (set_music.checked) dodododoooAdd();
    set_music.addEventListener('change', () => {
        set_music.checked ? dodododoooAdd() : dodododoooDel();
    });
    if (localStorage.getItem('notice_state') != null) {
        set_notice.checked = localStorage.getItem('notice_state') == 'true' ? true : false;
    }
    if (localStorage.getItem('fps_state') != null) {
        set_fps.checked = localStorage.getItem('fps_state') == 'true' ? true : false;
    }
    if (localStorage.getItem('scroll_state') != null) {
        set_scroll.checked = localStorage.getItem('scroll_state') == 'true' ? true : false;
    }
    if (localStorage.getItem('lrc_state') != null) {
        localStorage.getItem('lrc_state') == 'true' ? document.getElementById("lrcSwitchBtn").click() : null;
    }
    if (localStorage.getItem('system_theme_state') != null) {
        set_sys_theme.checked = localStorage.getItem('system_theme_state') == 'true' ? true : false;
    }
    if (localStorage.getItem('theme-color') != null) {
        ctrl.changeThemeColor(localStorage.getItem('theme-color'))
    }
    if (localStorage.getItem('aside-direction') != null) {
        if (localStorage.getItem('aside-direction') == 'right') ctrl.asideContentDirection()
    }
    if (saveToLocal.get('theme') != null) {
        saveToLocal.get('theme') == 'light' ? document.querySelector("#set-theme-light input").checked = true : document.querySelector("#set-theme-dark input").checked = true;
    }
    // new Vue().$mount('#aside-system')
    // if (set_notice.checked) tools.showNote("欢迎来到参星阁！", "success", 5);
    // console.clear();
    console.log("\n %c GC音频控制器 v1.3.2 参星阁出品 %c https://blog.cancin.cn \n", "color: #fadfa3; background: #030307; padding:5px 0;", "background: #fadfa3; padding:5px 0;")
    console.log(`Welcome to:\n%c参星阁:%c https://blog.cancin.cn%c\nThis site has been running stably for %c${Math.round(((new Date).getTime() - new Date("2023/01/04 20:53:58").getTime()) / 864e5)} %c days`, "border:1px #888 solid;border-right:0;border-radius:5px 0 0 5px;padding: 5px 10px;color:white;background:#4976f5;margin:10px 0", "border:1px #888 solid;border-left:0;border-radius:0 5px 5px 0;padding: 5px 10px;", "", "color:#4976f5", "")
}

// *************************************************** 控制模块 ***************************************************************

var ctrl = {

    GlobalTheme(e) {
        console.log(`changed to ${e.matches ? "dark" : "light"} mode`);
        if (e.matches) {
            activateDarkMode();
            document.querySelector("#set-theme-dark input").checked = true;
            saveToLocal.set('theme', 'dark', 2);
        } else {
            activateLightMode();
            document.querySelector("#set-theme-light input").checked = true;
            saveToLocal.set('theme', 'light', 2);
        }
    },

    // 深色模式
    switchDarkMode() {
        const nowMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        if (nowMode === 'light') {
            document.getElementById("set-theme-dark").click();
        } else {
            document.getElementById("set-theme-light").click();
        }
        typeof utterancesTheme === 'function' && utterancesTheme();
        typeof changeGiscusTheme === 'function' && changeGiscusTheme();
        typeof FB === 'object' && window.loadFBComment();
        typeof runMermaid === 'function' && window.runMermaid();
    },

    // 菜单返回
    consoleBackBtn() {
        var top_item = document.querySelectorAll(".item-show");
        if (top_item.length > 0) {
            if (top_item.length == 1) {
                switch (top_item[0].id) {
                    case 'console-music-item-mini': break;
                    case 'console-music-item-main': ctrl.hideConsole(); break;
                    case 'console-music-item-list':
                        top_item[0].classList.remove("item-show");
                        document.getElementById("console-music-item-main").classList.add("item-show");
                        break;
                    case 'console-songsheet-item-list':
                        top_item[0].classList.remove("item-show");
                        document.getElementById("console-music-item-list").classList.add("item-show");
                        break;
                    default: console.log("异常情况");
                }
            } else {
                top_item[top_item.length - 1].classList.remove("item-show");
                // if (top_item.length == 2) {
                //     document.querySelector("#console .console-btn-group").style.opacity = 1;
                //     document.querySelector("#console .console-btn-group").style.pointerEvents = 'all';            
                // }
            }
        }
    },

    // 桌面歌词
    lrcShowHide() {
        var a = document.querySelector(".global-music .aplayer-lrc");
        var b = document.getElementById("lrcItem");
        if (a && b) {
            if (!a.classList.contains("aplayer-lrc-hide")) {
                a.classList.add("aplayer-lrc-hide");
                b.classList.remove("on");
                localStorage.setItem('lrc_state', false);
                if (set_notice.checked) tools.showMessage("桌面歌词已关闭", "success", 2);
            } else {
                a.classList.remove("aplayer-lrc-hide");
                b.classList.add("on");
                localStorage.setItem('lrc_state', true);
                if (set_notice.checked) tools.showMessage("桌面歌词已打开", "success", 2);
            }
        }
    },

    // 单栏显示
    hideAsideBtn() {
        const $htmlDom = document.documentElement.classList;
        if ($htmlDom.contains('hide-aside')) {
            saveToLocal.set('aside-status', 'show', 2);
            document.getElementById("asideItem").classList.remove("on");
            if (set_notice.checked) tools.showMessage("侧边栏已启用", "success", 2);
        } else {
            saveToLocal.set('aside-status', 'hide', 2);
            document.getElementById("asideItem").classList.add("on");
            if (set_notice.checked) tools.showMessage("侧边栏已隐藏", "success", 2);
        }
        $htmlDom.toggle('hide-aside');
    },

    settingsOpen() {
        alert("开发中...敬请期待！");
    },

    // 导航栏音乐
    musicSwitch() {
        var music_state = document.querySelector(".global-music").aplayer.audio.paused;
        var a = document.querySelector("#music-Switch i");
        var b = document.querySelector("#music-ctrl-btn-center i");
        if (music_state) {
            a.classList.remove("icon-play");
            a.classList.add("icon-pause");
            b.classList.remove("icon-play");
            b.classList.add("icon-pause");
        } else {
            a.classList.remove("icon-pause");
            a.classList.add("icon-play");
            b.classList.remove("icon-pause");
            b.classList.add("icon-play");
        }
        document.querySelector(".global-music").aplayer.toggle();
    },

    musicForward() {
        document.querySelector(".global-music").aplayer.skipForward();
        ctrl.getMusicInfo();
    },

    musicBackward() {
        document.querySelector(".global-music").aplayer.skipBack();
        ctrl.getMusicInfo();
    },

    // 获取歌曲信息
    getMusicInfo() {
        var music_id = document.querySelector(".global-music").aplayer.list.index; // 当前曲目的id
        var music_cover = document.querySelector(".global-music").aplayer.list.audios[music_id].cover;
        var music_author = document.querySelector(".global-music").aplayer.list.audios[music_id].author;
        // var music_author = document.querySelector(".global-music").aplayer.list.audios[music_id].artist;
        var music_title = document.querySelector(".global-music").aplayer.list.audios[music_id].title;
        // var music_title = document.querySelector(".global-music").aplayer.list.audios[music_id].name;
        document.getElementById("console-music-cover").innerHTML = "<img src='" + music_cover + "'>";// 歌曲信息
        document.querySelector("#console-music-item-main .cover-shadow").style.background =  "url('" + music_cover + "') center center / 100% 100% no-repeat";
        document.getElementById("console-music-title-text").innerHTML = music_title;
        document.getElementById("console-music-author-text").innerHTML = music_author;
        ctrl.marqueeMusicInfo();
    },

    refreshProgress() {
        var nowTime = document.querySelector(".global-music").aplayer.audio.currentTime;// 当前时间
        if (isNaN(nowTime)) nowTime = 0;
        var nowTimeString = tools.secToTime(nowTime);
        var allTime = document.querySelector(".global-music").aplayer.audio.duration;// 总时间
        if (isNaN(allTime)) allTime = 0; // 无歌曲时会返回NaN
        var allTimeString = tools.secToTime(allTime);
        document.getElementById("progress-low-btn").innerHTML = nowTimeString;// 进度条时间
        document.getElementById("progress-high-btn").innerHTML = allTimeString;
        document.getElementById("p_bar").style.transform = "translateX(-" + (1 - (nowTime / allTime)) * 100 + "%)";// 进度条进度
    },

    // 导入歌单
    importMusicList() {
        var audios = document.querySelector(".global-music").aplayer.list.audios;
        var list_html;
        for (let i = 0; i < audios.length; i++) {
            list_html = document.getElementById("console-music-list").innerHTML;
            // document.getElementById("console-music-list").innerHTML = list_html + "<li class='music-list-item'><div class='list-music-info1'><a class='list-music-id' data-pjax-state=''>" + (i + 1) + "</a><a class='list-music-state' data-pjax-state=''><i class='iconfont icon-waveform'></i></a></div><div class='list-music-info2'><a class='list-music-title' data-pjax-state=''>" + audios[i].title + "</a><a class='list-music-author' data-pjax-state=''>&nbsp;-&nbsp;" + audios[i].author + "</a></div></li>";
            document.getElementById("console-music-list").innerHTML = list_html + "<li class='music-list-item'><div class='list-music-info1'><a class='list-music-id' data-pjax-state=''>" + (i + 1) + "</a><a class='list-music-state' data-pjax-state=''><i class='blogfont icon-waveform'></i></a></div><div class='list-music-info2'><a class='list-music-title' data-pjax-state=''>" + audios[i].name + "</a><a class='list-music-author' data-pjax-state=''>&nbsp;-&nbsp;" + audios[i].artist + "</a></div></li>";
        }
    },

    // 歌单切换
    changeMusicList(Music_id, Music_server) {
        var ap = document.querySelector(".global-music").aplayer;
        var music_list_url_str = "https://metingjs.cancin.cn/api?server=" + Music_server + "&type=playlist" + "&id=" + Music_id;
        ap.list.clear();
        fetch(music_list_url_str).then(response => response.json()).then(data => {
            // 在这里使用返回的JSON数据
            newSongsheetLen = data.length;
            console.log("本专辑有" + newSongsheetLen + "首歌曲");
            ap.list.add(data);
        })
            .catch(error => console.error(error));
    },

    JayMusicList() {
        var ap = document.querySelector(".global-music").aplayer;
        ap.list.clear();
        console.log("本专辑有" + JaySongsheet.length + "首歌曲");
        ap.list.add(JaySongsheet);
    },

    JokerMusicList() {
        var ap = document.querySelector(".global-music").aplayer;
        ap.list.clear();
        console.log("本专辑有" + QianSongsheet.length + "首歌曲");
        ap.list.add(QianSongsheet);
    },

    // 音乐状态检测（已添加事件监听器，修复点击aplayer后导航栏和控制中心不同步的问题）
    musicState() {
        var music_state = document.querySelector(".global-music").aplayer.audio.paused;
        var a = document.querySelector("#music-Switch i");
        var b = document.querySelector("#music-ctrl-btn-center i");
        if (music_state) {
            a.classList.remove("icon-pause");
            a.classList.add("icon-play");
            b.classList.remove("icon-pause");
            b.classList.add("icon-play");
        } else {
            a.classList.remove("icon-play");
            a.classList.add("icon-pause");
            b.classList.remove("icon-play");
            b.classList.add("icon-pause");
        }
    },

    clearConsoleMusicList() {
        document.getElementById("console-music-list").innerHTML = ''
    },

    addMusicToList(title, author, url, pic, lrc) {
        var ap = document.querySelector(".global-music").aplayer;
        ctrl.clearConsoleMusicList();
        // ap.list.clear();
        ap.list.add([{title: title, author: author, url: url, pic: pic, lrc: lrc}]);
        ap.list.switch(ap.list.audios.length - 1)
    },

    mcToggleMusic(id, url) {
        const mc = document.getElementById(id)
        if (mc) {
            const c = mc.querySelector(".content")
            if (!c.classList.contains("canplay")) {
                const a = mc.querySelector(".audio")
                a.src = url
                a.addEventListener('loadeddata', function f() {
                    c.classList.add("canplay")
                    a.removeEventListener('loadeddata', f)
                });
            }
            const mc_audio = mc.querySelector(".audio")
            if (mc_audio.paused) {
                mc_audio.play()
            } else {
                mc_audio.pause()
            }
        }
    },

    mcRefreshTime(id) {
        var mc = document.getElementById(id)
        if (mc) {
            var mc_audio = mc.querySelector(".audio")
            var t0 = mc_audio.currentTime + 0.5
            var t1 = mc_audio.duration
            var _t0 = tools.secToTime(t0)
            var _t1 = tools.secToTime(t1)
            mc.querySelector(".time").innerHTML = `${_t0}&nbsp;/&nbsp;${_t1}`
            mc.querySelector(".mc-progressbar").style.transform = "translateX(-" + ((1 - (t0 / t1)) * 100) + "%)"
        }
    },

    // 刷新 Media Session 元数据
    setMediaMetadata: function (aplayerObj, isSongPlaying) {
        const audio = aplayerObj.list.audios[aplayerObj.list.index]
        const coverUrl = audio.cover || './img/avatar.webp';
        const currentLrcContent = document.querySelector(".global-music").querySelector(".aplayer-lrc-current").textContent;
        let songName, songArtist;
        if ('mediaSession' in navigator) {
            if (isSongPlaying && currentLrcContent) {
                songName = currentLrcContent;
                songArtist = `${audio.artist} | ${audio.name}`;
            } else {
                songName = audio.name;
                songArtist = audio.artist;
            }
            navigator.mediaSession.metadata = new MediaMetadata({
                title: songName,
                artist: songArtist,
                album: audio.album,
                artwork: [
                    { src: coverUrl, sizes: '96x96', type: 'image/jpeg' },
                    { src: coverUrl, sizes: '128x128', type: 'image/jpeg' },
                    { src: coverUrl, sizes: '192x192', type: 'image/jpeg' },
                    { src: coverUrl, sizes: '256x256', type: 'image/jpeg' },
                    { src: coverUrl, sizes: '384x384', type: 'image/jpeg' },
                    { src: coverUrl, sizes: '512x512', type: 'image/jpeg' }
                ]
            });
        } else {
            console.log('当前浏览器不支持 Media Session API');
            document.title = `${audio.name} - ${audio.artist}`;
        }
    },

    // 响应 Media Session 标准媒体交互
    setupMediaSessionHandlers: function (aplayer) {
        if ('mediaSession' in navigator) {
            navigator.mediaSession.setActionHandler('play', () => {
                aplayer.play();
            });
            navigator.mediaSession.setActionHandler('pause', () => {
                aplayer.pause();
            });
            navigator.mediaSession.setActionHandler('seekbackward', null);// 移除快进快退按钮
            navigator.mediaSession.setActionHandler('seekforward', null);
            navigator.mediaSession.setActionHandler('previoustrack', () => {// 设置上一曲下一曲按钮
                aplayer.skipBack();
            });
            navigator.mediaSession.setActionHandler('nexttrack', () => {
                aplayer.skipForward();
            });
            navigator.mediaSession.setActionHandler('seekto', (details) => {// 响应进度条拖动
                if (details.fastSeek && 'fastSeek' in aplayer.audio) {
                    aplayer.audio.fastSeek(details.seekTime);
                } else {
                    aplayer.audio.currentTime = details.seekTime;
                }
            });
            aplayer.on('loadeddata', () => {// 更新 Media Session 元数据
                ctrl.setMediaMetadata(aplayer, false);
            });
            aplayer.on('play', () => {// 更新播放状态
                if ('mediaSession' in navigator) {
                    navigator.mediaSession.playbackState = 'playing';
                    ctrl.setMediaMetadata(aplayer, true);
                }
            });
            aplayer.on('pause', () => {
                if ('mediaSession' in navigator) {
                    navigator.mediaSession.playbackState = 'paused';
                    ctrl.setMediaMetadata(aplayer, false);
                }
            });
            aplayer.on('timeupdate', () => {// 监听时间更新事件
                ctrl.setMediaMetadata(aplayer, true);
            });
        }
    },

    marqueeMusicInfo() {
        if (marqueeContent1.offsetWidth > marqueeContainer1.offsetWidth) {
            // marqueeContent1.style.animation = 'marquee-1 10s linear infinite'
            var speed = marqueeContent1.offsetWidth / marqueeContainer1.offsetWidth * 6
            marqueeContent1.style.animation = 'marquee-1 ' + speed + 's linear infinite'
        } else {
            marqueeContent1.style.animation = ''
        }
        if (marqueeContent2.offsetWidth > marqueeContainer2.offsetWidth) {
            // marqueeContent2.style.animation = 'marquee-1 10s linear infinite'
            var speed = marqueeContent2.offsetWidth / marqueeContainer2.offsetWidth * 6
            marqueeContent2.style.animation = 'marquee-1 ' + speed + 's linear infinite'
        } else {
            marqueeContent2.style.animation = ''
        }
    },

    // 初始化console图标
    initConsoleState() {
        var lrc = document.querySelector(".aplayer > .aplayer-lrc-hide");
        var aplayer = document.querySelector(".aplayer > .aplayer-lrc");
        lrc === null && aplayer != null
            ? document.getElementById("lrcItem").classList.add("on")
            : document.getElementById("lrcItem").classList.remove("on");
        saveToLocal.get('aside-status') === 'hide'
            ? document.getElementById("asideItem").classList.add("on")
            : document.getElementById("asideItem").classList.remove("on");
        // var console_musicBody = document.querySelector("#console .console-mainbox"); // 更新控制中心尺寸
        // var console_musicCover = document.getElementById("console-music-cover");
        // console_musicCover.style.height = console_musicCover.offsetWidth + "px";
        // console_musicBody.style.height = (console_musicCover.offsetWidth + 236) + "px"; //(12rem + 1.3rem + 1.3rem) * 16 = 233.6px
        ctrl.getMusicInfo();
        var nowVolume = document.querySelector(".global-music").aplayer.audio.volume;// 当前音量
        document.getElementById("v_bar").style.transform = "translateX(-" + (1 - nowVolume) * 100 + "%)";// 音量条进度
        saveToLocal.get('theme') == 'light' ? document.querySelector("#set-theme-light input").checked = true : document.querySelector("#set-theme-dark input").checked = true;
    }
}