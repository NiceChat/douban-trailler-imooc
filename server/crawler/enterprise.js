// 爬去电影列表
const puppeteer = require('puppeteer')
// const url = `http://www.gsxt.gov.cn/index.html`
const url = `https://movie.douban.com/tag/#/?sort=R&range=0,10&tags=`

const sleep = time => new Promise(reslove => {
  setTimeout(reslove, time)
})

;(async () => {
  console.log('Start visit the target page.')
  const browser = await puppeteer.launch({
   args: ['--disable-dev-shm-usage']
  })
  const page = await browser.newPage()

  try { 
   await page.goto(url, {waitUntil: 'networkidle0'})
  } catch(err) {
    console.log(err)
  }

  sleep(5000)

  const result = await page.evaluate(() => {
    var $ = window.$
    var items = $(".list-wp a")
    var str = $('html').html() 
    return str
  })

  console.log('End visit the target page.')
  await browser.close()
  process.send({result})
  process.exit(0)
})()