const symbolPrefix = Symbol()
const speak = lang => target => { target.lang = lang }

class Boy {
  @speak('中文')
  run () {
    console.log('I can run and I speak ' + this.lang)
  }
}

// function speak(lang) {
//   return function (target, key, descriptor) {
//     target.lang = lang
//     console.log(lang)
//     return descriptor
//   }
// }

const nicechat = new Boy()

nicechat.run()