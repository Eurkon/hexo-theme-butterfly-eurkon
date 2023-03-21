const eurkon = {
  // CSS 主颜色变量
  switchThemeColor: function ([r, g, b]) {
    document.documentElement.style.setProperty('--r', r)
    document.documentElement.style.setProperty('--g', g)
    document.documentElement.style.setProperty('--b', b)
    document.documentElement.style.setProperty('--second', r * 0.299 + g * 0.587 + b * 0.114 >= 192 ? '#000' : '#FFF')
    document.documentElement.style.setProperty('--cover-text', r * 0.299 + g * 0.587 + b * 0.114 >= 192 ? '#4C4948' : '#EEE')
  },

  // ColorThief 获取主颜色
  getMainColor: function (theme = '#1677B3') {
    let rgb = [parseInt('0x' + theme.slice(1, 3)), parseInt('0x' + theme.slice(3, 5)), parseInt('0x' + theme.slice(5, 7))]
    if (document.getElementById('post-cover-img')) {
      try { rgb = new ColorThief().getColor(document.getElementById('post-cover-img')) } catch (err) { console.log(err) }
    }
    return rgb
  },

  // RGBaster 切换主颜色
  switchMainColor: function () {
    let exclude_list = []
    for (let i = 0; i <= 20; i++) {
      for (let j = 0; j <= 20; j++) {
        for (let k = 0; k <= 20; k++) {
          exclude_list.push(`rgb(${i},${j},${k})`)
          exclude_list.push(`rgb(${255 - i},${255 - j},${255 - k})`)
        }
      }
    }
    if (document.getElementById('post-cover-img')) {
      RGBaster.colors(document.getElementById('post-cover-img'), {
        paletteSize: 30,
        exclude: exclude_list,
        success: function (payload) {
          let [r, g, b] = payload.dominant.match(/\d+/g)
          document.documentElement.style.setProperty('--r', r)
          document.documentElement.style.setProperty('--g', g)
          document.documentElement.style.setProperty('--b', b)
          document.documentElement.style.setProperty('--second', r * 0.299 + g * 0.587 + b * 0.114 >= 192 ? '#000' : '#FFF')
          document.documentElement.style.setProperty('--cover-text', r * 0.299 + g * 0.587 + b * 0.114 >= 192 ? '#4C4948' : '#EEE')
        }
      })
    }
    else {
      let theme = '#1677B3'
      let [r, g, b] = [parseInt('0x' + theme.slice(1, 3)), parseInt('0x' + theme.slice(3, 5)), parseInt('0x' + theme.slice(5, 7))]
      document.documentElement.style.setProperty('--r', r)
      document.documentElement.style.setProperty('--g', g)
      document.documentElement.style.setProperty('--b', b)
      document.documentElement.style.setProperty('--second', r * 0.299 + g * 0.587 + b * 0.114 >= 192 ? '#000' : '#FFF')
      document.documentElement.style.setProperty('--cover-text', r * 0.299 + g * 0.587 + b * 0.114 >= 192 ? '#4C4948' : '#EEE')
    }
  },

  // 页面标题
  switchPageTitle: function () {
    document.getElementById('page-title').style.display = window.location.pathname === '/' || /^\/page\/[0-9]+\//.test(window.location.pathname) ? 'none' : 'flex'
    document.querySelector('#page-title>span').innerHTML = GLOBAL_CONFIG_SITE.title
  },

  // 页脚随机友链
  footerRandomFlink: function (flinks, num = 3) {
    let flinkList = document.querySelectorAll('#footer-group-flink .footer-group-item')
    if (flinks && flinkList.length > 0) {
      let flinkArray = flinks
      if (flinks.length > num) {
        let flinkSet = new Set()
        while (flinkSet.size < num) {
          flinkSet.add(flinks[Math.floor(Math.random() * flinks.length)])
        }
        flinkArray = Array.from(flinkSet)
      }
      for (let i = 0; i < flinkArray.length; i++) {
        flinkList[i].href = flinkArray[i].link
        flinkList[i].innerText = flinkArray[i].name
      }
    }
  },

  // 文章段落
  postAddToc: function () {
    let postContent = document.querySelector('#post>#article-container.post-content')
    let cardToc = document.getElementById('card-toc')
    if (postContent && cardToc) {
      let tocNumber = cardToc.getElementsByClassName('toc-number')
      let tocLink = cardToc.getElementsByClassName('toc-link')
      for (let i = 0; i < tocLink.length; i++) {
        document.getElementById(decodeURIComponent(tocLink[i].attributes.href.value).slice(1)).dataset.toc = tocNumber[i].innerText
      }
    }
  },

  // 分类|标签 导航栏
  catalogActive: function () {
    let $list = document.getElementById('catalog-list')
    if ($list) {
      // 鼠标滚轮滚动
      $list.addEventListener('mousewheel', function (e) {
        // 计算鼠标滚轮滚动的距离
        $list.scrollLeft -= e.wheelDelta / 2
        // 阻止浏览器默认方法
        e.preventDefault()
      }, false)

      // 高亮当前页面对应的分类或标签
      let path = decodeURIComponent(window.location.pathname).replace(/page\/[0-9]+\//g, '')
      let $catalog = document.getElementById(path)
      $catalog?.classList.add('selected')
      document.getElementById(path.slice(1))?.classList.add('selected')

      // 滚动当前页面对应的分类或标签到中部
      $list.scrollLeft = ($catalog.offsetLeft - $list.offsetLeft) - ($list.offsetWidth - $catalog.offsetWidth) / 2
    }
  },

  // 热评
  switchCommentBarrage: function () {
    let flag = window.localStorage.getItem('commentBarrageDisplay') // undefined || false
    document.getElementById('comment-barrage').style.bottom = flag === 'false' ? '1rem' : '-1000px'
    window.localStorage.setItem('commentBarrageDisplay', flag === 'false' ? 'undefined' : 'false', 86400000)
    if (document.getElementById('menu-barrage')) document.querySelector('#menu-barrage>span').innerHTML = flag === 'false' ? '隐藏热评' : '显示热评'
    if (document.getElementById('barrage-btn')) {
      if (flag === 'false') { document.getElementById('barrage-btn').classList.add('on') }
      else { document.getElementById('barrage-btn').classList.remove('on') }
    }
  },

  // RightSide设置
  switchRightSide: function () {
    document.getElementById('rightside')?.classList.toggle('hidden')
    document.getElementById('rightside-mask')?.classList.toggle('hidden')
  },

  fullScreen: function () {
    try {
      let de = document.documentElement
      if (de.requestFullscreen) { de.requestFullscreen() }
      else if (de.mozRequestFullScreen) { de.mozRequestFullScreen() }
      else if (de.webkitRequestFullScreen) { de.webkitRequestFullScreen() }
      else if (document.webkitExitFullscreen) { document.webkitExitFullscreen() }
    }
    catch (error) {
      console.log(error)
    }
  },

  exitFullScreen: function () {
    try {
      if (document.exitFullscreen) { document.exitFullscreen() }
      else if (document.mozCancelFullScreen) { document.mozCancelFullScreen() }
      else if (document.webkitExitFullscreen) { document.webkitExitFullscreen() }
    }
    catch (error) {
      console.log(error)
    }
  },

  //跳转到指定页面
  toPage: function () {
    let allPage = document.querySelectorAll(".page-number")
    let page = Math.min(Math.max(1, Number(document.getElementById("toPageText").value)), Number(allPage[allPage.length - 1].innerHTML))
    let href = window.location.href.replace(/page\/[0-9]+\//g, '') + (page === 1 ? '' : ('page/' + page + '/'))
    // console.log(href)
    window.pjax ? pjax.loadUrl(href) : window.open(href, "_self")
  },

  //监听跳转页面输入框是否按下回车
  listenToPageInputPress: function () {
    let input = document.getElementById("toPageText");
    let button = document.getElementById("toPageButton");
    let allPage = document.querySelectorAll(".page-number")
    if (input) {
      input.addEventListener("keydown", (event) => {
        if (event.keyCode === 13) {
          // 如果按下的是回车键，则执行特定的函数
          eurkon.toPage()
        }
      });

      // 监听输入框变化
      input.addEventListener("input", function () {
        // 检查输入框是否为空
        if (input.value && Number(input.value) !== 0) {
          button.classList.add("haveValue")
          input.value = Math.min(Math.max(1, Number(document.getElementById("toPageText").value)), Number(allPage[allPage.length - 1].innerHTML))
        } else {
          button.classList.remove("haveValue")
        }
      });
    }
  }
}