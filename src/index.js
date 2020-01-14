// import '@babel/polyfill' // 会自动打包使用的语法(且浏览器没有实现)
import $ from 'jquery'
import bg from './assets/image/bg.jpg'
import logo from './assets/image/logo.png'
import './assets/css/test1.css'
import './assets/css/test2.less'
import './assets/css/test3.styl'

/* 测试: webpack自身能打包esm和commonjs */
import { add } from './js/math'
// const {add2} = require('./js/math2')


// console.log(add(1, 2), add2(3, 4))
console.log('hello webpack44444!')

/* 测试: ES6==>ES5 */
const fn = () => {
  console.log('fn()')
}
fn()
new Promise(() => {})
Array.from(new Set([1, 2]))
class A {}

/* 测试: 打包图片 */
console.log('image', logo, bg)
const $logo = $('<img>').attr('src', logo)
const $bg = $('<img>').attr('src', bg)
$('body').append($logo).append($bg)