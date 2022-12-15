'use strict';

function postFolding(args, content) {
  args = args.join(' ').split(',');
  let style = ''
  let title = ''
  if (args.length > 1) {
    style = args[0].trim()
    title = args[1].trim()
  } else if (args.length > 0) {
    title = args[0].trim()
  }
  if (style != undefined) {
    return `<details class="folding-tag" ${style}><summary> ${title} </summary>
              <div class='content tabs'>
              ${hexo.render.renderSync({text: content, engine: 'markdown'}).split('\n').join('')}
              <button type="button" class="tab-to-top" aria-label="scroll to top"><i class="fas fa-arrow-up"></i></button>
              </div>
            </details>`;
  } else {
    return `<details class="folding-tag"><summary> ${title} </summary>
              <div class='content tabs'>
              ${hexo.render.renderSync({text: content, engine: 'markdown'}).split('\n').join('')}
              <button type="button" class="tab-to-top" aria-label="scroll to top"><i class="fas fa-arrow-up"></i></button>
              </div>
            </details>`;
  }

}

hexo.extend.tag.register('folding', postFolding, {ends: true});
