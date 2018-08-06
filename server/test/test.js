import { resolve } from 'path'
const symbolTest = Symbol('test')
let a={x:1,y:2}
let b={z:3}
let ab={...a,...b}

console.log(ab)