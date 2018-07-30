import { resolve } from 'path'
const symbolTest = Symbol('test')
const a = [1]
const b = [2, ...a]
console.log(resolve, symbolTest)
console.log(b)
console.log('证明babel可以用了了')