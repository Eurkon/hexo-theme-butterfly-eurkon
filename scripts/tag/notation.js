'use strict';

function Nota(args) {
  args = args.join(' ').split(',')
  let p0 = args[0].trim()
  let p1 = args[1].trim()
  return `<span class='nota' data-nota='${p1}'>${p0}</span>`;
}

hexo.extend.tag.register('nota', Nota);
// {% nota 注释词汇 ,'注释内容，使用逗号间隔开了即可' %}
