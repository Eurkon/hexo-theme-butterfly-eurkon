
hexo.extend.filter.register('after_generate', function () {
  var swiper = hexo.theme.config.swiperPost.enable;
  if (swiper) {
    var temple_html_item = ''
    var posts_list = hexo.locals.get('posts').data;
    var new_posts_list = []
    for (item of posts_list) {
      if (item.swiper_index && item.swiper_desc) {
        new_posts_list.push(item)
      }
    }
    function sortNumber (a, b) {
      return b.swiper_index - a.swiper_index
    }
    new_posts_list = new_posts_list.sort(sortNumber);
    for (item of new_posts_list) {
      if (item.swiper_index && item.swiper_desc) {
        temple_html_item += `<div class="blog-slider__item swiper-slide" style="width: 750px; opacity: 1; transform: translate3d(0px, 0px, 0px); transition-duration: 0ms"><div class="blog-slider__img"><img src="${item.swiper_cover || item.cover}" alt="${item.swiper_cover || item.cover}"/></div><div class="blog-slider__content"><span class="blog-slider__code">${item.date.format('YYYY-MM-DD')}</span><a class="blog-slider__title" href="${item.path}">${item.title}</a><div class="blog-slider__text">${item.swiper_desc}</div><a class="blog-slider__button" href="${item.path}">详情</a></div></div>`;
      }
    }
    var temple_html = `<div class="blog-slider__wrp swiper-wrapper" style="transition-duration: 0ms">${temple_html_item}</div><div class="blog-slider__pagination swiper-pagination-clickable swiper-pagination-bullets"></div>`;
    var script_text = `
      <script data-pjax>
        if(document.getElementById('swiper_container')){
          document.getElementById('swiper_container').innerHTML = '${temple_html}'
        }
        </script>
      <script data-pjax src="https://cdn.bootcdn.net/ajax/libs/Swiper/4.1.6/js/swiper.min.js"></script>
      <script data-pjax>
        var swiper = new Swiper('.blog-slider', {
          passiveListeners: true,
          spaceBetween: 30,
          effect: 'fade',
          loop: true,
          autoplay: {
            disableOnInteraction: true,
            delay: 3000
          },
          observer: true,//修改swiper自己或子元素时，自动初始化swiper
          observeParents: true,//修改swiper的父元素时，自动初始化swiper
          mousewheel: false,
          // autoHeight: true,
          pagination: {
            el: '.blog-slider__pagination',
            clickable: true,
          }
        });
        
        if (document.getElementById('swiper_container')) {
          var comtainer = document.getElementById('swiper_container');
          comtainer.onmouseenter = function () {
            swiper.autoplay.stop();
          };
          comtainer.onmouseleave = function () {
            swiper.autoplay.start();
          }
        }
      </script>`;
    hexo.extend.injector.register('head_end', `<link rel="stylesheet" href="https://cdn.bootcdn.net/ajax/libs/Swiper/4.1.6/css/swiper.min.css"><style>@import url("https://fonts.googleapis.com/css?family=Fira+Sans:400,500,600,700,800");*{box-sizing:border-box}.blog-slider{width:100%;position:relative;border-radius:12px 8px 8px 12px;margin:auto;background:var(--global-bg) padding:10px;transition:all .3s}@media screen and (max-width:768px){.blog-slider{min-height:350px;height:auto;margin-top:110px;margin-bottom:10px}}@media screen and (max-height:500px) and (min-width:992px){.blog-slider{height:350px}}.blog-slider__item{display:flex;align-items:center}@media screen and (max-width:768px){.blog-slider__item{flex-direction:column}}.blog-slider__item.swiper-slide-active .blog-slider__img img{opacity:1;transition-delay:.3s}.blog-slider__item.swiper-slide-active .blog-slider__content>*{opacity:1;transform:none}.blog-slider__item.swiper-slide-active .blog-slider__content>*:nth-child(1){transition-delay:.3s}.blog-slider__item.swiper-slide-active .blog-slider__content>*:nth-child(2){transition-delay:.4s}.blog-slider__item.swiper-slide-active .blog-slider__content>*:nth-child(3){transition-delay:.5s}.blog-slider__item.swiper-slide-active .blog-slider__content>*:nth-child(4){transition-delay:.6s}.blog-slider__item.swiper-slide-active .blog-slider__content>*:nth-child(5){transition-delay:.7s}.blog-slider__item.swiper-slide-active .blog-slider__content>*:nth-child(6){transition-delay:.8s}.blog-slider__item.swiper-slide-active .blog-slider__content>*:nth-child(7){transition-delay:.9s}.blog-slider__item.swiper-slide-active .blog-slider__content>*:nth-child(8){transition-delay:1s}.blog-slider__item.swiper-slide-active .blog-slider__content>*:nth-child(9){transition-delay:1.1s}.blog-slider__item.swiper-slide-active .blog-slider__content>*:nth-child(10){transition-delay:1.2s}.blog-slider__item.swiper-slide-active .blog-slider__content>*:nth-child(11){transition-delay:1.3s}.blog-slider__item.swiper-slide-active .blog-slider__content>*:nth-child(12){transition-delay:1.4s}.blog-slider__item.swiper-slide-active .blog-slider__content>*:nth-child(13){transition-delay:1.5s}.blog-slider__item.swiper-slide-active .blog-slider__content>*:nth-child(14){transition-delay:1.6s}.blog-slider__item.swiper-slide-active .blog-slider__content>*:nth-child(15){transition-delay:1.7s}.blog-slider__img{width:200px;flex-shrink:0;height:200px;padding:10px;border-radius:5px;transform:translateX(0px);overflow:hidden}.blog-slider__img:after{content:'';position:absolute;top:0;left:0;width:100%;height:100%;border-radius:5px;opacity:.8}.blog-slider__img img{width:100%;height:100%;object-fit:cover;display:block;opacity:0;border-radius:5px;transition:all .3s}@media screen and (max-width:768px){.blog-slider__img{transform:translateY(-50%);width:90%}}@media screen and (max-width:576px){.blog-slider__img{width:95%}}@media screen and (max-height:500px) and (min-width:992px){.blog-slider__img{height:270px}}.blog-slider__content{padding-right:50px;padding-left:50px}@media screen and (max-width:768px){.blog-slider__content{margin-top:-80px;text-align:center;padding:0 30px}}@media screen and (max-width:576px){.blog-slider__content{padding-left:10px;padding-right:10px}}.blog-slider__content>*{opacity:0;transform:translateY(25px);transition:all .4s}.blog-slider__code{color:var(--font-color);margin-bottom:0;display:block;font-weight:500}.blog-slider__title{font-size:18px;font-weight:700;color:var(--font-color);margin-bottom:15px;-webkit-line-clamp:1;display:-webkit-box;overflow:hidden;-webkit-box-orient:vertical}.blog-slider__text{color:var(--font-color);-webkit-line-clamp:1;display:-webkit-box;overflow:hidden;-webkit-box-orient:vertical;margin-bottom:15px;line-height:1.5em}.blog-slider__button{display:inline-flex;background-color:var(--btn-bg);padding:4px 14px;border-radius:8px;color:var(--btn-color);text-decoration:none;font-weight:500;justify-content:center;text-align:center;letter-spacing:1px}.blog-slider__button:hover{background-color:var(--btn-hover-color);color:var(--btn-color)}@media screen and (max-width:576px){.blog-slider__button{width:100%;width:100%}}.blog-slider .swiper-container-horizontal>.swiper-pagination-bullets,.blog-slider .swiper-pagination-custom,.blog-slider .swiper-pagination-fraction{bottom:10px;left:0;width:100%}.blog-slider__pagination{position:absolute;z-index:21;right:20px;width:11px!important;text-align:center;left:auto!important;top:50%;bottom:auto!important;transform:translateY(-50%)}@media screen and (max-width:768px){.blog-slider__pagination{transform:translateX(-50%);left:50%!important;top:320px;width:100%!important;display:flex;justify-content:center;align-items:center}}.blog-slider__pagination.swiper-pagination-bullets .swiper-pagination-bullet{margin:8px 0 !important}@media screen and (max-width:768px){.blog-slider__pagination.swiper-pagination-bullets .swiper-pagination-bullet{margin:0 5px}}.blog-slider__pagination .swiper-pagination-bullet{width:11px;height:11px;display:block;border-radius:10px;background:#858585;opacity:.2;transition:all .3s}.blog-slider__pagination .swiper-pagination-bullet-active{opacity:1;background:var(--btn-bg);height:30px} @media screen and (max-width:768px){.blog-slider__pagination .swiper-pagination-bullet-active{height:11px;width:30px}}.blog-slider__button{display:none}@media screen and (max-width:768px){.blog-slider__button{display:inline-flex}.blog-slider__text{margin-bottom:40px}}</style>`, "default");
    hexo.extend.injector.register('body_end', script_text, "default");
  }
})

