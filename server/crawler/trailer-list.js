// 爬去电影列表
const puppeteer = require('puppeteer')
const url = `https://movie.douban.com/tag/#/?sort=R&range=0,10&tags=`

const sleep = time => new Promise(reslove => {
  setTimeout(reslove, time)
})

;(async () => {
  console.log('Start visit the target page.')
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url, {waitUntil: 'networkidle2'})
  await sleep(3000)

  await page.waitForSelector('.more')

  for(let i = 0; i <= 1; i++) {
    await sleep(1000)
    await page.click('.more')
  }

  const result = await page.evaluate(() => {
    var $ = window.$
    var items = $(".list-wp a")
    var links = []

    items.each((index, item) => {
      let it = $(item)
      let id = it.find('.cover-wp').data('id')
      let title = it.find('.title').html()
      let rate = it.find('.rate').html()
      let pic = it.find('.pic img').attr('src').replace('s_ratio', 'l_ratio')

      links.push({
        doubanId: id,
        title,
        rate,
        poster: pic
      })
    })

    return links
  })
  await browser.close()
  process.send({result})
  process.exit(0)
})()