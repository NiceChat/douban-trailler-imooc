const puppeteer = require('puppeteer')
const videoUrl = 'https://movie.douban.com/subject/'

const sleep = time => new Promise(reslove => {
  setTimeout(reslove, time)
})

process.on('message', async movies => {
  console.log('Start visit the target page.')
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  for (let i = 0; i < movies.length; i++) {
    const id = movies[i].doubanId
    await page.goto(`${videoUrl}${id}`, {waitUntil: 'networkidle2'})
    await sleep(1000)

    const cover = await page.evaluate(() => {
      var $ = window.$
      var $cover = $('.related-pic-video')

      if ($cover) {
        var link = $cover.attr('href')
        var bg = $cover.css('backgroundImage')
        var reg = /https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*/gi
        var cover

        if (bg) {
          cover = bg.match(reg)[0]
        } else {
          cover = ''
        }

        console.log('封面图:' + cover)
        return {
          link,
          cover,
        }
      }

      return {}
    })

    let video
    if (cover.link) {
      await page.goto(cover.link, {waitUntil: 'networkidle2'})
      await sleep(1000)
      video =  await page.evaluate(() => {
        var $ = window.$
        var $source = $('source')

        if ($source) {
          return $source.attr('src')
        }

        return ''
      })
    }

    const data = {
      id: id,
      cover: cover.cover,
      video: video
    }

    process.send(data)
  }

  await browser.close()
  process.exit(0)
})