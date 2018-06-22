const cp = require('child_process')
const { resolve } = require('path')

;(async () => {
  const script = resolve(__dirname, '../crawler/crawlerVideo')
  const child = cp.fork(script, []) 
  let invoked = false

  child.on('error', error => {
    if (invoked) return

    invoked = true
    console.log(error)
  })

  child.on('exit', code => {
    if (invoked) return
    invoked = false
    let error = code === 0 ? null : new Error('exit code:' + code)
    console.log(error)
  })

  child.on('message', data => {
    let result = data

    console.log(result)
  })
})()