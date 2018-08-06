// const symbolPrefix = Symbol()
// const speak = lang => target => { target.lang = lang }

class Boy {
  @speak('中文')
  run () {
    console.log('I can run.')
  }
}

function speak(lang) {
  return function (target, key, descriptor) {
    console.log(target)
    console.log(key)
    console.log(descriptor)
  }
}
const nicechat = new Boy()

nicechat.run()