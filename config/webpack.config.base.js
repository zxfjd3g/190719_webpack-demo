/* 
开发环境与生产环境的公用配置
*/
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const {resolve} = require('./utils')


module.exports = {
  // 入口
  entry: {
    app: resolve('src/index.js')
  },
  // 出口
  output: {
    path: resolve('dist'), // 所有打包文件根目录
    publicPath: '/', // 所有生成url链接左侧以/开头
  },
  // 模块加载器
  module: {
    rules: [
      {
        enforce: "pre", // 前置loader, 最先执行
        test: /\.js$/,
        // exclude: /node_modules/,
        include: resolve('src'),
        loader: "eslint-loader",
        options: {
          formatter: require("eslint-friendly-formatter")
        }
      },
      // 处理ES6==>ES5
      {
        test: /\.js/,
        // exclude: '',
        include: [resolve('src')],
        use: 'babel-loader'
      },

      // 处理图片
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1024*5, //把小于 5kb 的文件转成 Base64 的格式
            name: 'img/[name].[ext]', // 内变化hash变化
          }
        }
      },

      // 处理字体
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/, // 字体
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              name: 'fonts/[name].[hash:8].[ext]'
            }
          }
        ]
      },

      // 处理音视频
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10240,
            name: 'static/media/[name].[hash:8].[ext]'
          }
        }
      }
    ]
  },
  // 插件
  plugins: [
    new CopyWebpackPlugin([
      {
        from: resolve('public/css'), // 拷贝的指定文件夹
        to: 'css', // dist下目标文件夹
        ignore: ['.*']
      }
    ]),
    // 向页面中插入引入打包的js/css的代码
    new HtmlWebpackPlugin({
      minify: {
        // 压缩 HTML 文件
        removeComments: true, // 移除 HTML 中的注释
        collapseWhitespace: true, // 删除空白符与换行符
        minifyCSS: true // 压缩内联 css
      },
      template: 'public/index.html',
      filename: 'index.html'
    }),
  ],
}