eurkon.switchThemeColor(eurkon.getMainColor())
eurkon.switchPageTitle()
eurkon.catalogActive()

// 顶部菜单栏 评论按钮
if (document.getElementById('comment-button')) document.getElementById('comment-button').style.display = document.getElementById('post-comment') ? 'block' : 'none'
if (document.getElementById('barrage-btn')) document.getElementById('barrage-btn').style.display = document.getElementById('post-comment') ? 'block' : 'none'
if (document.getElementById('setting-button') && document.getElementById('rightside')) document.getElementById('setting-button').onclick = function () { document.getElementById('rightside').classList.remove('hidden') }
if (document.getElementById('rightside')) document.getElementById('rightside').onclick = function () { document.getElementById('rightside').classList.add('hidden') }