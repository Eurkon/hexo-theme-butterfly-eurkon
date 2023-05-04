/**
 * Butterfly
 * Related Posts
 * According the tag
 */

'use strict'

hexo.extend.helper.register('related_posts', function (currentPost, allPosts) {
  let relatedPosts = []
  currentPost.tags.forEach(function (tag) {
    allPosts.forEach(function (post) {
      if (isTagRelated(tag.name, post.tags)) {
        const relatedPost = {
          title: post.title,
          path: post.path,
          cover: post.cover,
          cover_type: post.cover_type,
          weight: 1,
          updated: post.updated,
          created: post.date,
          // 魔改代码START
          description: post.description,
          content: post.content,
          // 魔改代码END
        }
        const index = findItem(relatedPosts, 'path', post.path)
        if (index !== -1) {
          relatedPosts[index].weight += 1
        } else {
          if (currentPost.path !== post.path) {
            relatedPosts.push(relatedPost)
          }
        }
      }
    })
  })
  if (relatedPosts.length === 0) {
    return ''
  }
  let result = ''
  const hexoConfig = hexo.config
  const config = hexo.theme.config

  const limitNum = config.related_post.limit || 6
  const dateType = config.related_post.date_type || 'created'
  const headlineLang = this._p('post.recommend')

  relatedPosts = relatedPosts.sort(compare('weight'))

  if (relatedPosts.length > 0) {
    result += '<div class="relatedPosts">'
    result += `<div class="headline"><i class="fas fa-thumbs-up fa-fw"></i><span>${headlineLang}</span></div>`
    result += '<div class="relatedPosts-list">'

    for (let i = 0; i < Math.min(relatedPosts.length, limitNum); i++) {
      const cover = relatedPosts[i].cover || 'var(--default-bg-color)'
      const title = this.escape_html(relatedPosts[i].title)
      // 魔改代码START
      const description = this.strip_html(relatedPosts[i].description)
      const content = this.strip_html(relatedPosts[i].content)
      // 魔改代码END
      result += `<div><a href="${this.url_for(relatedPosts[i].path)}" title="${title}">`
      if (relatedPosts[i].cover_type === 'img') {
        result += `<img class="cover" src="${this.url_for(cover)}" alt="cover">`
      } else {
        result += `<div class="cover" style="background: ${cover}"></div>`
      }
      if (dateType === 'created') {
        result += `<div class="content is-center"><div class="date"><i class="far fa-calendar-alt fa-fw"></i> ${this.date(relatedPosts[i].created, hexoConfig.date_format)}</div>`
      } else {
        result += `<div class="content is-center"><div class="date"><i class="fas fa-history fa-fw"></i> ${this.date(relatedPosts[i].updated, hexoConfig.date_format)}</div>`
      }
      result += `<div class="title">${title}</div>`
      // 魔改代码START
      //- Display the article introduction on homepage
      switch (config.index_post_content.method) {
        case false:
          break
        case 1:
          result += `<div class="info">${description}</div>`
          break
        case 2:
          if (description) {
            result += `<div class="info">${description}</div>`
          }
          else {
            let expert = content.substring(0, config.index_post_content.length)
            content.length > config.index_post_content.length ? expert += ' ...' : ''
            result += `<div class="info">${expert}</div>`
          }
          break
        default:
          let expert = content.substring(0, config.index_post_content.length)
          content.length > config.index_post_content.length ? expert += ' ...' : ''
          result += `<div class="info">${expert}</div>`
          break
      }
      // 魔改代码END
      result += '</div></a></div>'
    }

    result += '</div></div>'
    return result
  }
})

function isTagRelated (tagName, TBDtags) {
  let result = false
  TBDtags.forEach(function (tag) {
    if (tagName === tag.name) {
      result = true
    }
  })
  return result
}

function findItem (arrayToSearch, attr, val) {
  for (let i = 0; i < arrayToSearch.length; i++) {
    if (arrayToSearch[i][attr] === val) {
      return i
    }
  }
  return -1
}

function compare (attr) {
  return function (a, b) {
    const val1 = a[attr]
    const val2 = b[attr]
    return val2 - val1
  }
}
