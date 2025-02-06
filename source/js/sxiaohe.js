/* switchDarkMode JS */
function switchDarkMode() { // Switch Between Light And Dark Mode
    const nowMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
    if (nowMode === 'light') {
      activateDarkMode()
      saveToLocal.set('theme', 'dark', 2)
      GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night)
    } else {
      activateLightMode()
      saveToLocal.set('theme', 'light', 2)
      GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day)
    }
    // handle some cases
    typeof utterancesTheme === 'function' && utterancesTheme()
    typeof FB === 'object' && window.loadFBComment()
    window.DISQUS && document.getElementById('disqus_thread').children.length && setTimeout(() => window.disqusReset(), 200)
  }
/* hometop JS */
var bywind = {
    hideTodayCard: function() {
        document.getElementById("todayCard") && document.getElementById("todayCard").classList.add("hide")
    }
}
$(".topGroup").hover((function() {}
), (function() {
        document.getElementById("todayCard").classList.remove("hide"),
        document.getElementById("todayCard").style.zIndex = 1
    }
))
/* hometop滚动 JS */
// 封装获取元素的函数，增强代码复用性
const getElement = (selector) => document.querySelector(selector);
const getElementById = (id) => document.getElementById(id);

// 获取必要的 DOM 元素
const leftArrowTip = getElement(".left-arrow-tip");
const rightArrowTip = getElement(".right-arrow-tip");
const xscroll = getElementById("homeTopGroup");

// 处理左箭头点击事件，滚动到最左边
const handleLeftArrowClick = () => {
    if (xscroll) {
        xscroll.scrollTo({ left: 0, behavior: "smooth" });
    }
};

// 处理右箭头点击事件，滚动到最右边
const handleRightArrowClick = () => {
    if (xscroll) {
        xscroll.scrollTo({ left: xscroll.scrollWidth, behavior: "smooth" });
    }
};

// 绑定点击事件
if (leftArrowTip) {
    leftArrowTip.addEventListener("click", handleLeftArrowClick);
}
if (rightArrowTip) {
    rightArrowTip.addEventListener("click", handleRightArrowClick);
}

// 切换箭头可见性的函数
const toggleArrowVisibility = () => {
    if (!xscroll) return;

    const scrollDiff = xscroll.scrollWidth - xscroll.scrollLeft - xscroll.clientWidth;
    const showLeft = xscroll.scrollLeft > 0;
    const showRight = scrollDiff > 1;

    const setArrowStyles = (arrow, visible) => {
        arrow.style.opacity = visible ? "1" : "0";
        arrow.style.zIndex = visible ? "1" : "-1";
    };

    if (leftArrowTip) {
        setArrowStyles(leftArrowTip, showLeft);
    }
    if (rightArrowTip) {
        setArrowStyles(rightArrowTip, showRight);
    }
};

// 处理鼠标滚轮滚动事件
const handleMouseWheel = (e) => {
    if (xscroll) {
        const v = -e.wheelDelta / 2;
        xscroll.scrollLeft += v;
        e.preventDefault();
    }
};

// 处理滚动事件，节流调用 toggleArrowVisibility
const throttle = (func, delay) => {
    let timer = null;
    return function () {
        if (!timer) {
            func.apply(this, arguments);
            timer = setTimeout(() => {
                timer = null;
            }, delay);
        }
    };
};

const throttledToggleArrowVisibility = throttle(toggleArrowVisibility, 100);

const handleScroll = () => {
    throttledToggleArrowVisibility();
};

// 初始化滚动相关事件
const initScroll = () => {
    if (xscroll) {
        xscroll.addEventListener("mousewheel", handleMouseWheel);
        xscroll.addEventListener("scroll", handleScroll);
    }
};

// 初始化箭头可见性
toggleArrowVisibility();
// 初始化滚动功能
initScroll();

// 处理 pjax:complete 事件
try {
    document.removeEventListener('pjax:complete', catalogActive);
    document.addEventListener('pjax:complete', catalogActive);
} catch (e) {
    console.error('Error handling pjax:complete event:', e);
}