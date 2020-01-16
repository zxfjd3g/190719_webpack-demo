/* 
开发环境的配置
*/
const merge = require('webpack-merge')
const webpack = require('webpack')
const baseConfig = require('./webpack.config.base')

// 当前特别的配置
const config = {
  mode: 'development',

  output: {
    filename: '[name].js'
  },

  module: {
    rules: [
      // 处理css
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ] // 从下往上从右往左    style(css(css文件))
      },
      // 处理less
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      },
      // 处理stylus
      {
        test: /\.(styl|stylus)$/,
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'stylus-loader'
        ]
      },
    ]
  },

  plugins: [
    // HMR插件
    new webpack.HotModuleReplacementPlugin()
  ],

  // 开发服务器
  devServer: {
    open: true, // 自动打开浏览器访问
    hot: true, // 开启HMR
    proxy: {
      // 处理以/api开头路径的请求
      '/api': {
        target: 'http://localhost:4000', // 转发的目标地址
        pathRewrite: {
          '^/api': '' // 转发请求时去除路径前面的/api
        },
        changeOrigin: true, // 支持跨域, 如果协议/主机也不相同, 必须加上
      },
    },
    // historyApiFallback: true,
    historyApiFallback: { // 所有前台404的请求都返回index页面
      rewrites: [
        { from: /.*/, to: '/index.html' }
      ],
    },
    before: function(app, server) {
      app.get('/test/:id', function(req, res) {
        res.json({ code: 0, data: {id: req.params.id, name: 'Tom'} });
      });
    }
  },

  // source-map
  devtool: 'eval-source-map'
}

// 向外暴露合并后的配置
module.exports = merge(baseConfig, config)