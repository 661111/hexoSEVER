function whenDOMReady() {
	initEssay();
};

whenDOMReady()
document.addEventListener("pjax:complete", whenDOMReady)

if (document.querySelector('#bber-talk')) {
  var swiper = new Swiper('.swiper-container', {
    direction: 'vertical', 
    loop: true,
    autoplay: {
    delay: 3000,
    pauseOnMouseEnter: true
  },
  });
} // Swiper轮播 - 即刻mini