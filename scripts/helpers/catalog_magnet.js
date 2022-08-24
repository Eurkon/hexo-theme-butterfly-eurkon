hexo.extend.helper.register('catalog_magnet', function () {
  var magnet = hexo.config.catalogMagnet.enable;
  if (magnet) {
    var load_more_href = '/' + hexo.config.catalogMagnet.type || 'categories'
    var data_list = hexo.locals.get(hexo.config.catalogMagnet.type || 'categories').data;
    var data_new_list = [];
    var br_devide = hexo.config.catalogMagnet.devide > 3 ? '<br>' : ' '
    var temple_html_item = `
      <style>
        #catalog_magnet{flex-wrap:wrap;display:flex;padding:.5rem .5rem 0 .5rem;width:100%;justify-content:space-between;align-content:flex-start;}
        .magnet_item{flex-basis:calc(${100 / hexo.config.catalogMagnet.devide}% - .25rem);background:var(--global-bg);margin-bottom:.5rem; border-radius:var(--border-radius);-webkit-transition:all .3s ease-in-out;-moz-transition:all .3s ease-in-out;-o-transition:all .3s ease-in-out;transition:all .3s ease-in-out;-ms-transition:all .3s ease-in-out}
        .magnet_item:hover{background:var(--main);box-shadow:var(--main-shadow)}
        .magnet_link_more{color:var(--font-color)!important;width:40%;border-radius:var(--border-radius);background:var(--global-bg);text-align:center;margin:0 auto .5rem;}
        .magnet_link_more:hover{width:60%}
        .magnet_link{color:var(--font-color)}
        .magnet_item:hover .magnet_link{color:var(--second)}
        @media screen and (max-width:600px){.magnet_item{flex-basis:100%}}
        .magnet_link_context{display:flex;padding:.5rem;-webkit-transition:all .3s ease-in-out;-moz-transition:all .3s ease-in-out;-o-transition:all .3s ease-in-out;transition:all .3s ease-in-out;-ms-transition:all .3s ease-in-out;}
        .magnet_item:hover .magnet_link_context{padding:.5rem 1rem}
      </style>`;
    temple_html_item += '<div id="catalog_magnet">';
    if (hexo.config.catalogMagnet.display) {
      for (j of hexo.config.catalogMagnet.display) {
        for (item of data_list) {
          if (j.name == item.name) {
            var item_group = {}
            item_group[item.name] = item.length
            data_new_list.push(item_group)
            temple_html_item += `<div class="magnet_item"><a class="magnet_link" href="/${item.path}"><div class="magnet_link_context" style=""><span style="font-weight:500;flex:1">${j.display_name}${br_devide}(${item.length})</span><span style="padding:0 .25rem;"><i class="fas fa-arrow-circle-right"></i></span></div></a></div>`;
          }
        }
      }
    }
    else {
      for (item of data_list) {
        var item_group = {}
        item_group[item.name] = item.length
        data_new_list.push(item_group)
        temple_html_item += `<div class="magnet_item"><div style="display:flex;padding: 1rem;"><span style="font-weight:500;flex:1">${item.name} (${item.length})</span><span style="padding:0 .25rem;"><i class="fas fa-arrow-circle-right"></i></span></div></div>`;
      }
    }

    if ((data_new_list.length % hexo.config.catalogMagnet.devide) > 0) {
      for (var i = 0; i < (hexo.config.catalogMagnet.devide - data_new_list.length % hexo.config.catalogMagnet.devide); i++) {
        temple_html_item += `<div class="magnet_item" style="visibility: hidden"></div>`
      }
    }
    var load_more = `<a class="magnet_link_more" href="${load_more_href}">查看更多</a>`
    temple_html_item += load_more
    temple_html_item += '</div>'
    return temple_html_item
  }
})