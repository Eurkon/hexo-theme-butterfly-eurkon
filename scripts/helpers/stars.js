hexo.extend.helper.register('numToStars', function (num, max = 5) {
  let tmp = ''
  for (let i = 0; i < Math.min(Math.floor(num), max); i++) { tmp += '<i class="fa-solid fa-star"></i>' } // 整数部分加实心星星
  if (Math.min(num, max) - Math.min(Math.floor(num), max) !== 0) tmp += '<i class="fa-solid fa-star-half-alt"></i>' // 小数部分转成半星
  for (let i = 0; i < max - Math.ceil(num); i++) { tmp += '<i class="fa-regular fa-star"></i>' } // 不够5个补空心星星
  return tmp
});