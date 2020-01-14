const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

function resolve(dir) {
  return path.resolve(__dirname, dir)
}

module.exports = {
  // 模式
  // mode: 'production',
  // 入口
  entry: {
    app: resolve('src/index.js')
  },
  // 出口
  output: {
    path: resolve('dist'),
    filename: 'bundle.js'
  },
  // 模块加载器
  module: {
    rules: [

    ]
  },
  // 插件
  plugins: [
    // 向页面中插入引入打包的js/css的代码
    new HtmlWebpackPlugin({
      template: 'public/index.html'
    }),
    // 清除打包文件夹dist
    new CleanWebpackPlugin(['dist'])
  ],

  // 开发服务器
  devServer: {
    open: true, // 自动打开浏览器访问
  }
}