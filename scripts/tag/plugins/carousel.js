'use strict'

function carousel (args, content) {
  args = args.join(' ').split(',')
  let carouselId = args[0]
  let carouselname = args[1]?args[1]:'carousel'
  return `<div id='${carouselId}' class='carousel'><div id="${carouselId}-drag-container" class="drag-container"><div id="${carouselId}-spin-container" class="spin-container">${hexo.render.renderSync({ text: content, engine: 'markdown' }).replace(/^(\s|<p>)+|(\s|<\/p>)+$/g, '')}<p>${carouselname}</p></div><div id="${carouselId}-carousel-ground" class="carousel-ground"></div></div></div><script type="text/javascript">carouselinit('${carouselId}');</script>`
}

hexo.extend.tag.register('carousel',carousel,{ ends: true });
/*
{% carousel Id,name %}
![](/img/1.jpg)
![](/img/2.jpg)
{% endcarousel %}
*/
