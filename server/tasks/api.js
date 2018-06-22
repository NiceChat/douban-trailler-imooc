const rq = require('request-promise-native')

const fetch = async (id) => {
  const url = `https://api.douban.com/v2/movie/subject/${id}`
  const result = await rq(url)
  return result
}

;(async () => {
  const moives = [
    { id: 30177763,
      title: '同一堂课',
      rate: '8.6',
      pic: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2517132506.jpg' },
    { id: 30219672,
      title: '放开我北鼻 第三季',
      rate: '7.7',
      pic: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2522451880.jpg' },
  ]

  moives.map(async moive => {
    const { id } = moive
    let moiveData = await fetch(id) 

    try {
      moiveData = JSON.parse(moiveData)
      console.log(`【${moiveData.title}】${moiveData.summary}`)
    } catch(e) {
      console.log(e)
    }
  })
})()