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
function getRandomElementsFromArray(arr, num) {
  const totalElements = arr.length;
  const selectedElements = new Set();
  while (selectedElements.size < num) {
    const randomIndex = Math.floor(Math.random() * totalElements);
    selectedElements.add(arr[randomIndex]);
  }
  return Array.from(selectedElements);
}
function renderingPosts(data){
  const randomElements = getRandomElementsFromArray(data, 6);
  const postsHtml = randomElements.map((i) => `
    <div class="top_post_item">
      <div class="post_cover">
        <a href="/article/${i.abbrlink}.html" title="${i.title}">
          <img class="post_bg entered loaded" src="${i.cover}" alt="${i.title}" data-no-lazy>
          <div class="post_cover_info">
            <p class="post_cover_text">${i.description}</p>
          </div>
        </a>
      </div>
      <div class="post_info" onclick="window.open('/article/${i.abbrlink}.html', '_self')">
        <a class="article-title" href="/article/${i.abbrlink}.html" title="${i.title}">${i.title}</a>
      </div>
    </div>`).join('');
  document.querySelector("#homeTopGroup>.top_post_group").innerHTML = postsHtml
}
if(!sessionStorage.getItem("postsInfo")){
  fetch("/random.json")
  .then(res=>res.json())
  .then(data=>{
    console.log(1);
    sessionStorage.setItem("postsInfo", JSON.stringify(data));
    renderingPosts(data);
  })
}else{
  renderingPosts(JSON.parse(sessionStorage.getItem("postsInfo")));
}
/* hometop滚动 JS */
if(true){
  const leftArrowTip = document.querySelector(".left-arrow-tip");
  const rightArrowTip = document.querySelector(".right-arrow-tip");
  const xscroll = document.getElementById("homeTopGroup");
  leftArrowTip.addEventListener("click", function () {
    xscroll.scrollTo({ left: 0, behavior: "smooth" }); // 回到最左边
  });
  rightArrowTip.addEventListener("click", function () {
    xscroll.scrollTo({ left: xscroll.scrollWidth, behavior: "smooth" }); // 回到最右边
  });
  function toggleArrowVisibility() {
    // 计算滚动位置与容器宽度的差值
    const scrollDiff = xscroll.scrollWidth - xscroll.scrollLeft - xscroll.clientWidth;
    if (xscroll.scrollLeft === 0) {
      // 在最左边，隐藏左箭头，显示右箭头
      leftArrowTip.style.opacity = "0";
      rightArrowTip.style.opacity = "1";
      rightArrowTip.style.zIndex = "1";
      leftArrowTip.style.zIndex = "-1";
    } else if (scrollDiff <= 1) {
      // 在最右边，隐藏右箭头，显示左箭头
      rightArrowTip.style.opacity = "0";
      leftArrowTip.style.opacity = "1";
      leftArrowTip.style.zIndex = "1";
      rightArrowTip.style.zIndex = "-1";
    } else {
      // 既不在最右边又不在最左边，显示两个箭头
      leftArrowTip.style.opacity = "1";
      rightArrowTip.style.opacity = "1";
      leftArrowTip.style.zIndex = "1";
      rightArrowTip.style.zIndex = "1";
    }
  }
  function topPostScroll() {
    if (document.getElementById("homeTopGroup")) {
      xscroll.addEventListener("mousewheel", function (e) {
        let v = -e.wheelDelta / 2;
        xscroll.scrollLeft += v;
        e.preventDefault();
      }, false);
      let isScrolling = false;
      xscroll.addEventListener("scroll", function scrollHandler() {
        if (!isScrolling) {
          isScrolling = true;
          setTimeout(function () {
            isScrolling = false;
            toggleArrowVisibility();
          }, 100);
        }
      });
    }
  }
  toggleArrowVisibility();
  topPostScroll();
}
try{
  document.removeEventListener('pjax:complete', catalogActive);
  document.addEventListener('pjax:complete', catalogActive);
}catch(e){}