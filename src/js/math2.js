function add2(a, b) {
  console.log('add2()+++++')
  return a + b
}
exports.add2 = add2

function reduce2(a, b) {
  console.log('reduce2()+++++')
  return a - b
}
exports.reduce2 = reduce2

// 在commonjs模块中, 不能使用class
// class B {}