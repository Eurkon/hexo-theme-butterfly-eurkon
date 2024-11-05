'use strict'

const { truncateContent, postDesc } = require('../common/postDesc')
const { prettyUrls } = require('hexo-util')
const crypto = require('crypto')

hexo.extend.helper.register('truncate', truncateContent)

hexo.extend.helper.register('postDesc', data => {
  return postDesc(data, hexo)
})

hexo.extend.helper.register('cloudTags', function (options = {}) {
  const env = this
  let { source, minfontsize, maxfontsize, limit, unit = 'px', orderby, order } = options

  if (limit > 0) {
    source = source.limit(limit)
  }

  const sizes = [...new Set(source.map(tag => tag.length).sort((a, b) => a - b))]

  const getRandomColor = () => {
    const randomColor = () => Math.floor(Math.random() * 201)
    const r = randomColor()
    const g = randomColor()
    const b = randomColor()
    return `rgb(${Math.max(r, 50)}, ${Math.max(g, 50)}, ${Math.max(b, 50)})`
  }

  const generateStyle = (size, unit) =>
    `font-size: ${parseFloat(size.toFixed(2)) + unit}; color: ${getRandomColor()};`

  const length = sizes.length - 1
  const result = source.sort(orderby, order).map(tag => {
    const ratio = length ? sizes.indexOf(tag.length) / length : 0
    const size = minfontsize + ((maxfontsize - minfontsize) * ratio)
    const style = generateStyle(size, unit)
    return `<a id="${tag.path}" href="${env.url_for(tag.path)}" style="${style}">${(hexo.config.emoji && hexo.config.emoji.tags && hexo.config.emoji.tags[tag.name] || '') + tag.name}<sup>${tag.length}</sup></a>`
  }).join('')

  return result
})

hexo.extend.helper.register('urlNoIndex', function (url = null, trailingIndex = false, trailingHtml = false) {
  return prettyUrls(url || this.url, { trailing_index: trailingIndex, trailing_html: trailingHtml })
})

hexo.extend.helper.register('md5', function (path) {
  return crypto.createHash('md5').update(decodeURI(this.url_for(path))).digest('hex')
})

hexo.extend.helper.register('injectHtml', data => {
  return data ? data.join('') : ''
})

hexo.extend.helper.register('findArchivesTitle', function (page, menu, date) {
  if (page.year) {
    const dateStr = page.month ? `${page.year}-${page.month}` : `${page.year}`
    const dateFormat = page.month ? hexo.theme.config.aside.card_archives.format : 'YYYY'
    return date(dateStr, dateFormat)
  }

  const defaultTitle = this._p('page.archives')
  if (!menu) return defaultTitle

  const loop = (m) => {
    for (const key in m) {
      if (typeof m[key] === 'object') {
        const result = loop(m[key])
        if (result) return result
      }

      if (/\/archives\//.test(m[key])) {
        return key
      }
    }
  }

  return loop(menu) || defaultTitle
})

hexo.extend.helper.register('getBgPath', path => {
  if (!path) return ''

  const absoluteUrlPattern = /^(?:[a-z][a-z\d+.-]*:)?\/\//i
  const relativeUrlPattern = /^(\.\/|\.\.\/|\/|[^/]+\/).*$/
  const colorPattern = /^(#|rgb|rgba|hsl|hsla)/i

  if (colorPattern.test(path)) {
    return `background-color: ${path};`
  } else if (absoluteUrlPattern.test(path) || relativeUrlPattern.test(path)) {
    return `background-image: url(${path});`
  } else {
    return `background: ${path};`
  }
})
