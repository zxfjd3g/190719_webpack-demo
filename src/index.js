/* 测试: webpack自身能打包esm和commonjs */
import { add } from './js/math'
const {add2} = require('./js/math2')


console.log(add(1, 2), add2(3, 4))
console.log('hello webpack44444!')