// import '@babel/polyfill' // 会自动打包使用的语法(且浏览器没有实现)
import $ from 'jquery'
import axios from 'axios'
// import moment from 'moment'
import { format } from 'date-fns'
import {min} from 'lodash-es'
import logo from './assets/image/logo.png'
import './assets/css/test1.css'
import './assets/css/test2.less'
import './assets/css/test3.styl'

/* 测试: webpack自身能打包esm和commonjs */
import { add } from './js/math'
const {add2} = require('./js/math2')


console.log(add(1, 2), add2(3, 4))
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
console.log('image', logo)
const $img2 = $('<img>').attr('src', logo).addClass('avatar2')
const $img3 = $('<img>').attr('src', logo).addClass('avatar3')
$('body').append($img2).append($img3)

/* eslint-disable no-undef */
// console.log(a)
// var b = 2

axios.get('/test/3').then(response => {
  console.log(response.data.data)
})

/* 
  测试: 异步/懒加载
      拆分单独打包: code spliting 代码分割
      不立即执行import(), 而是在一定条件下执行
*/
// import {study} from './js/asyncModule'
$img2.click(() => {
  import(/* webpackChunkName: "xxx" */ './js/asyncModule').then(asyncModule => {
    asyncModule.study()
  })
})
$img3.click(() => {
  import(/* webpackChunkName: "yyy" */ './js/asyncModule2').then(asyncModule => {
    asyncModule.study2()
  })
})


// console.log(moment().format('YYYY-HH-DD HH:mm:ss'))
console.log(format(new Date(2014, 1, 11), 'yyyy-MM-dd'))
console.log(min([2, 1, 3]))