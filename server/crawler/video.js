const puppeteer = require('puppeteer')
const videoUrl = 'https://movie.douban.com/subject/'
const id = 27615874

const sleep = time => new Promise(reslove => {
  setTimeout(reslove, time)
})

;(async () => {
  console.log('Start visit the target page.')
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.goto(`${videoUrl}${id}`, {waitUntil: 'networkidle2'})
  await sleep(1000)

  const cover = await page.evaluate(() => {
    var $ = window.$
    var $cover = $('.related-pic-video')

    if ($cover) {
      var link = $cover.attr('href')
      var bg = $cover.css('backgroundImage')
      var reg = /https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*/gi

      console.log('获取封面图')
      return {
        link,
        cover: bg.match(reg)[0]
      } 
    }

    return {}
  })

  let video
  if (cover.link) {
    await page.goto(cover.link, {waitUntil: 'networkidle2'})
    await sleep(2000)
    console.log('获取预告片')

    video =  await page.evaluate(() => {
      var $ = window.$
      var $source = $('source')

      if ($source) {
        return $source.attr('src')
      }

      return ''
    })
  }

  var data = {
    id: id,
    cover: cover.cover,
    video: video 
  }

  await browser.close()
  process.send(data)
  process.exit(0)
})()