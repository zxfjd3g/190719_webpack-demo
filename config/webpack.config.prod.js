/* 
生产环境的配置
*/
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const { resolve } = require('./utils')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')


// 当前特别的配置
const config = {
  mode: 'production',
  // mode: 'development',

  output: {
    filename: 'js/[name].[chunkhash:8].js'
  },

  module: {
    rules: [
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

  plugins: [
    // 清除打包文件夹dist
    new CleanWebpackPlugin(['dist'], {
      root: resolve('')  // D:\work\190719\workspace\webpak_demo
    }),
    // 从js抽取css单独打包
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css'
    }),
    // 压缩css
    new OptimizeCSSAssetsPlugin(),
    // 问题: chunk与bundle内容: 代码内容 + 模块的ID值
    // 模块的ID默认用的下标, 只要添加/删除一个模块, 会导致其它所有模块ID都发生改变
    // 用模块的hash值作为它的标识ID (只与代码内容有关系)
    new webpack.HashedModuleIdsPlugin(),
  ],

  // 优化配置
  // 优化
  optimization: {
    // 拆分打包文件
    splitChunks: { 
      // chunks: 'async' // 默认值, 只对异步加载的模块单独打包
      chunks: 'all', // 将从node_modules引入的模块和异步加载的模块都拆分单独打包
    },
    // 将webpack的模块引导代码单独打包
    runtimeChunk: { 
      name: 'runtime'
    },
    concatenateModules: true, // 打开/关闭模块合并/作用域提升
  },

  // source-map
  devtool: 'cheap-module-source-map'
}

// 如果指定了--report配置, 就添加打包文件分析的插件
if (process.env.npm_config_report) {
  config.plugins.push(new BundleAnalyzerPlugin())
}

// 向外暴露合并后的配置
module.exports = merge(baseConfig, config)

