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
// 封装获取元素的函数，提高代码复用性
function getElement(selector) {
  return document.querySelector(selector);
}

function getElementById(id) {
  return document.getElementById(id);
}

// 主函数，用于初始化整个功能
function initScrollFeature() {
  // 获取所需的 DOM 元素
  const leftArrow = getElement('.left-arrow-tip');
  const rightArrow = getElement('.right-arrow-tip');
  const scrollContainer = getElementById('homeTopGroup');

  // 如果元素未找到，提前返回
  if (!leftArrow || !rightArrow || !scrollContainer) {
      console.warn('Some required elements are not found.');
      return;
  }

  // 处理左箭头点击事件，滚动到最左边
  function handleLeftArrowClick() {
      scrollContainer.scrollTo({
          left: 0,
          behavior: 'smooth'
      });
  }

  // 处理右箭头点击事件，滚动到最右边
  function handleRightArrowClick() {
      scrollContainer.scrollTo({
          left: scrollContainer.scrollWidth,
          behavior: 'smooth'
      });
  }

  // 绑定箭头点击事件
  leftArrow.addEventListener('click', handleLeftArrowClick);
  rightArrow.addEventListener('click', handleRightArrowClick);

  // 切换箭头可见性的函数
  function updateArrowVisibility() {
      const scrollDiff = scrollContainer.scrollWidth - scrollContainer.scrollLeft - scrollContainer.clientWidth;
      const isAtLeft = scrollContainer.scrollLeft === 0;
      const isAtRight = scrollDiff <= 1;

      // 设置箭头样式的辅助函数
      function setArrowStyle(arrow, isVisible) {
          arrow.style.opacity = isVisible ? '1' : '0';
          arrow.style.zIndex = isVisible ? '1' : '-1';
      }

      setArrowStyle(leftArrow, !isAtLeft);
      setArrowStyle(rightArrow, !isAtRight);
  }

  // 节流函数，避免滚动事件频繁触发
  function throttle(func, delay) {
      let timer = null;
      return function () {
          if (!timer) {
              func.apply(this, arguments);
              timer = setTimeout(() => {
                  timer = null;
              }, delay);
          }
      };
  }

  // 处理鼠标滚轮滚动事件
  function handleMouseWheel(e) {
      const scrollStep = -e.wheelDelta / 2;
      scrollContainer.scrollLeft += scrollStep;
      e.preventDefault();
  }

  // 初始化滚动事件处理
  function setupScrollEvents() {
      scrollContainer.addEventListener('mousewheel', handleMouseWheel);
      const throttledUpdate = throttle(updateArrowVisibility, 100);
      scrollContainer.addEventListener('scroll', throttledUpdate);
  }

  // 初始更新箭头可见性
  updateArrowVisibility();
  // 初始化滚动事件
  setupScrollEvents();
}

// 调用主函数进行初始化
initScrollFeature();

// 处理 pjax:complete 事件
try {
  document.removeEventListener('pjax:complete', catalogActive);
  document.addEventListener('pjax:complete', catalogActive);
} catch (error) {
  console.error('Error handling pjax:complete event:', error);
}