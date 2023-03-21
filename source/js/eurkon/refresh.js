eurkon.switchThemeColor(eurkon.getMainColor())
eurkon.switchPageTitle()
eurkon.catalogActive()
eurkon.postAddToc()
eurkon.footerRandomFlink(flinks, 3)
eurkon.listenToPageInputPress()

// 顶部菜单栏 评论按钮
if (document.getElementById('comment-button')) document.getElementById('comment-button').style.display = document.getElementById('post-comment') ? 'block' : 'none'
if (document.getElementById('barrage-btn')) document.getElementById('barrage-btn').style.display = document.getElementById('post-comment') ? 'block' : 'none'

document.addEventListener('keydown', function (event) {
  if (event.keyCode == 27) { // ESC
    try {
      document.getElementById('rightside')?.classList.add('hidden')
      document.getElementById('rightside-mask')?.classList.add('hidden')
      document.getElementById('fc-overlay')?.classList.add('hidden')
      document.getElementById('fc-overshow')?.classList.add('hidden')
      // eurkon.exitFullScreen()
    }
    catch (error) {
      console.log(error)
    }
  }
});

// 页面滚动百分比
// window.addEventListener('scroll', function () {
//   let totalH = document.body.scrollHeight || document.documentElement.scrollHeight // 页面总高
//   let clientH = window.innerHeight || document.documentElement.clientHeight // 可视高
//   document.querySelector('#nav #hotkey #top-button a.site-page i').dataset.percent = ((document.body.scrollTop || document.documentElement.scrollTop) / (totalH - clientH) * 100).toFixed(0)
// })

