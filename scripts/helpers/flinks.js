hexo.extend.helper.register('flink_list', function () {
  let html = ''
  let error_img = hexo.theme.config.error_img.flink
  let flink_list = []
  hexo.locals.get('data').link.map(function (list) {
    list.link_list.map(function (flink) {
      flink_list.push(flink)
    })
  })

  let flink_length = flink_list.length
  for (i = 0; i < flink_length; i++)
    html +=
      `<div class="flink-icon-pair">
        <div class="flink-icon">
          <a href="${flink_list[i].link}" title="${flink_list[i].name}" rel="external nofollow noreferrer" target="_blank">
            <img class="no-lightbox" src="${flink_list[i].avatar}" onerror="this.onerror=null;this.src='${error_img}'" alt="${flink_list[i].name}">
          </a>
        </div>
        <div class="flink-icon">
          <a href="${flink_list[flink_length - 1 - i].link}" title="${flink_list[flink_length - 1 - i].name}" rel="external nofollow noreferrer" target="_blank">
            <img class="no-lightbox" src="${flink_list[flink_length - 1 - i].avatar}" onerror="this.onerror=null;this.src='${error_img}'" alt="${flink_list[flink_length - 1 - i].name}">
          </a>
        </div>
      </div>`
  return html
});