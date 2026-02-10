hexo.extend.filter.register('after_render:html', function (data) {
  try {
    const posts = []
    hexo.locals.get('posts').forEach(function (post) {
      if (post.random !== false) {
        posts.push({
          'title': post.title,
          'path': '/' + post.path,
          'categories': post.categories.data.map(function (item) { return { 'name': item.name, 'path': '/' + item.path } }),
          'tags': post.tags.data.map(function (item) { return { 'name': item.name, 'path': '/' + item.path } }),
          'cover': post.cover,
          // 'description': post.description,
          // 'wordCount': post.content.replace(/<(?:.|\s)*?>/g, '').length,
          // 'content': strip_html(post.content),
          'date': post.date,
          'updated': post.updated
        })
      }
    })
    data += `<script>var posts=${JSON.stringify(posts)};function toRandomPost(){ window.pjax ? pjax.loadUrl(posts[Math.floor(Math.random()*posts.length)].path) : window.open(posts[Math.floor(Math.random()*posts.length)].path, "_self"); };</script>`
  } catch (e) { } finally { return data }
})

hexo.extend.filter.register('after_render:html', function (data) {
  try {
    const flinks = []
    hexo.locals.get('data').link.forEach(function (list) {
      list.link_list.map(function (flink) {
        flinks.push(flink)
      })
    })
    data += `<script>var flinks=${JSON.stringify(flinks)};function toRandomFlink(){ let to_flink = flinks[Math.floor(Math.random()*flinks.length)]; btf.snackbarShow('正在前往「 '+ to_flink.name +' 」友链，请稍后...', false, 3000); setTimeout(function() { window.open(to_flink.link); }, 3000); }</script>`
  } catch (e) { } finally { return data }
})