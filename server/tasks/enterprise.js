const cp = require('child_process')
const { resolve } = require('path')

;(async () => {
  const script = resolve(__dirname, '../crawler/enterprise')
  const child = cp.fork(script, []) 
  let invoked = false

  child.on('error', error => {
    if (invoked) return

    invoked = true
    console.log('错误')
    console.log(error)
  })

  child.on('exit', code => {
    if (invoked) return
    invoked = true 
    let error = code === 0 ? null : new Error('exit code:' + code)
    error && (console.log(error))
  })

  child.on('message', data => {
    console.log(data)
  })
})()