hexo.extend.helper.register('catalog_magnet', function () {
  var magnet = hexo.theme.config.catalogMagnet.enable;
  if (magnet) {
    var data_list = []
    var load_more_href = ''
    var categories_list = hexo.locals.get('categories').data;
    var tag_list = hexo.locals.get('tags').data;
    if (hexo.theme.config.catalogMagnet.type === 'categories') {
      data_list = categories_list
      load_more_href = '/categories'
    } else if (hexo.theme.config.catalogMagnet.type === 'tags') {
      data_list = tag_list
      load_more_href = '/tags'
    }
    var categories_new_list = [];
    if (hexo.theme.config.catalogMagnet.devide > 3) {
      br_devide = '<br>'
    } else {
      br_devide = ' '
    }
    var devide = 100 / hexo.theme.config.catalogMagnet.devide;
    var temple_html_item = `<style>#catalog_magnet{flex-wrap: wrap;display: flex;width:100%;justify-content:space-between;padding: 10px 10px 0 10px;align-content: flex-start;}.magnet_item{flex-basis: calc(${devide}% - 5px);background: var(--global-bg);margin-bottom: 10px;border-radius: 8px;transition: all .2s ease-in-out;box-shadow: rgb(0 0 0 / 7%) 0 2px 2px 0, rgb(0 0 0 / 10%) 0 1px 5px 0;}.magnet_item:hover{background: var(--main);box-shadow: var(--main-shadow);}.magnet_link_more{color:var(--font-color);}.magnet_link{color:var(--font-color);}.magnet_link:hover{color: var(--second)}@media screen and (max-width: 600px) {.magnet_item {flex-basis: 100%;}}.magnet_link_context{display:flex;padding: 10px;transition: all .3s ease-in-out;}.magnet_link_context:hover{padding: 10px 20px;}</style>`;
    temple_html_item += '<div id="catalog_magnet">';
    if (hexo.theme.config.catalogMagnet.display) {
      for (j of hexo.theme.config.catalogMagnet.display) {
        for (item of data_list) {
          if (j.name == item.name) {
            var item_group = {}
            item_group[item.name] = item.length
            categories_new_list.push(item_group)
            temple_html_item += `<div class="magnet_item"><a class="magnet_link" href="/${item.path}"><div class="magnet_link_context" style=""><span style="font-weight:500;flex:1">${j.display_name}${br_devide}(${item.length})</span><span style="padding:0px 4px;"><i class="fas fa-arrow-circle-right"></i></span></div></a></div>`;
          }
        }
      }
    }
    else {
      for (item of data_list) {
        var item_group = {}
        item_group[item.name] = item.length
        categories_new_list.push(item_group)
        temple_html_item += `<div class="magnet_item"><div style="display:flex;padding: 20px;"><span style="font-weight:500;flex:1">${item.name} (${item.length})</span><span style="padding:0px 4px;"><i class="fas fa-arrow-circle-right"></i></span></div></div>`;
      }
    }

    if ((categories_new_list.length % hexo.theme.config.catalogMagnet.devide) > 0) {
      for (var i = 0; i < (hexo.theme.config.catalogMagnet.devide - categories_new_list.length % hexo.theme.config.catalogMagnet.devide); i++) {
        temple_html_item += `<div class="magnet_item" style="visibility: hidden"></div>`
      }
    }
    var load_more = `<a class="magnet_link_more" href="${load_more_href}" style="flex:1;text-align: center;margin-bottom: 10px;">查看更多...</a>`
    temple_html_item += load_more
    temple_html_item += '</div>'
    return temple_html_item
  }
})