// const symbolPrefix = Symbol()
// const speak = lang => target => { target.lang = lang }

@humman()
class Boy {
  @simple
  @speak('中文')
  run () {
    console.log('I can run.')
  }
}

// function speak(lang) {
//   return function (target, key, descriptor) {
//     console.log('speak')
//     console.log(target)
//     console.log(key)
//     console.log(descriptor)
//   }
// }


function convert(middleware) {
  return (target, key, descriptor) => {
  }
}

function simple(target, key, descriptor) {
  console.log(target)
  console.log(key)
  console.log(descriptor)
}

function speak(lang) {
  return convert(() =>{
    console.log(lang)
  })
}

function humman() {
  return function(target, key, descriptor) {
    console.log('humman')
    console.log(target)
    console.log(key)
    console.log(descriptor)
  }
}

const nicechat = new Boy()

nicechat.run()