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

function whenDOMReady() {
	initEssay();
};

whenDOMReady()
document.addEventListener("pjax:complete", whenDOMReady)

function initEssay() {
  if (document.querySelector('#essay-mini')) {
    let swiper = new Swiper('.swiper-container', {
        direction: 'vertical',
        loop: true,
        autoplay: {
            delay: 3000,
            pauseOnMouseEnter: true
        },
    });
  }
} // Swiper轮播 - 即刻mini