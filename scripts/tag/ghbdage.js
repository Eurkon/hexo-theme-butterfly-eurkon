/*{% bdage right,left,[logo]||[color],[link],[title]||option %}*/

function bdage (args) {

  args = args.join(' ').split('||')

  let base= args[0]?args[0].split(','):''
  let right = base[0]?encodeURI(base[0].trim()):''
  let left = base[1]?encodeURI(base[1].trim()):''
  let logo = base[2]?base[2].trim():''

  let message = args[1]?args[1].split(','):''
  let color = message[0]?message[0].trim():'orange'
  let link = message[1]?message[1].trim():''
  let title = message[2]?message[2].trim():''

  let option = args[2]?args[2].trim():''

  return `<object class="ghbdage" style="margin-inline:5px" title="${title}" standby="loading..." data="https://img.shields.io/badge/${left}-${right}-orange?logo=${logo}&color=${color}&link=${link}&${option}"></object>`
}
hexo.extend.tag.register('bdage',bdage);
