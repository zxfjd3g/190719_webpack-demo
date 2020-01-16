/* 
工具模块
*/
const path = require('path')

function resolve(dir) {
  return path.resolve(__dirname, '..', dir)
}
exports.resolve = resolve