const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

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
    path: resolve('dist'), // 所有打包文件根目录
    filename: 'bundle.js',
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
      },

      // 处理css
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader, 
          'css-loader', 
          'postcss-loader'
        ] // 从下往上从右往左    style(css(css文件))
      },
      // 处理less
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader, 
          'css-loader', 
          'postcss-loader', 
          'less-loader'
        ]
      },
      // 处理stylus
      {
        test: /\.(styl|stylus)$/,
        use: [
          MiniCssExtractPlugin.loader,  // 代替stlye-loader
          'css-loader', 
          'postcss-loader', 
          'stylus-loader'
        ] 
      },

    ]
  },
  // 插件
  plugins: [
    // 向页面中插入引入打包的js/css的代码
    new HtmlWebpackPlugin({
      template: 'public/index.html'
    }),
    // 清除打包文件夹dist
    new CleanWebpackPlugin(['dist']),
    // 从js抽取css单独打包
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
  ],

  // 开发服务器
  devServer: {
    open: true, // 自动打开浏览器访问
  },

  // 优化配置
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin()]
  }
}