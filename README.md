## 1. 基本使用
  0). 相关依赖包
      webpack
      webpack-cli
      webpack-dev-server
      html-webpack-plugin
      clean-webpack-plugin@1.0.1
  1). 能打包多个遵循ESM或CommonJS的JS文件
  2). 将打包生成的JS/CSS在页面中自动引入
  3). 能启动服务器运行访问项目, 并实现live-reload
  4). 自动清除打包文件夹

## 2. 打包JS
  0). 相关依赖包
      babel-loader
      @babel/core
      @babel/preset-env
      @babel/polyfill
          core-js2
          regenerator-runtime
      @babel/plugin-transform-runtime & @babel/runtime
  1). 编译ES6代码兼容低版本浏览器
      问题1: webpack本身不能编译ES6语法 ==> 借助babel来处理 
      问题2: babel本身也是不能编译ES6语法 ==> babel有很多用于编译ES6语法的插件包, 可以都下载并配置上
      问题3: 如果直接通过babel插件来处理太麻烦了  ==> 使用babel封装的包含常用插件包的大包: preset-env
      问题4: preset-env只能编译ES6的语法部分, 一些新的API(Promise/Set/Map等)都没有处理  ==> 引入polyfill
  2). 减小JS打包文件
      问题5: 直接引入polyfill会导致应用打包文件会变大很多(几百k) ==> 配置useBuiltIns:'entry'只打包浏览器未实现的部分
      问题6: 当前还是打包了一些没有使用的API定义代码  ==> 配置useBuiltIns:'usage'只打包使用的新API部分
      问题7: 默认新API的引入辅助函数有重复定义的问题  ===> 配置plugin-transform-runtime引入专门的辅助函数, 避免重复定义
  3). 单独打包第三方模块JS & 压缩JS

## 3. 打包样式
  0). 相关依赖包
      css-loader
      style-loader
      less-loader
      less
      stylus-loader
      stylus
      sass-loader
      node-sass
      postcss-loader
      autoprefixer
      postcss-px2rem
  1). 打包css
  2). 打包css预编译器: less/stylus/sass
  3). 利用postcss处理css
      给c3样式自动添加浏览器厂商前缀
      移动端适配: 将px自动转换为rem
  4). 抽取css单独打包 & 压缩css

## webpack-dev-server深入使用
    1). 基本功能: live-reload
    2). hot-reald / HMR
    3). proxy server
    4). history路由/Browser路由刷新404问题
    5). mock API

## devtool配置深入理解
    1). sourceMap的理解
    2). 各组成单元理解
        source-map
        inline
        eval
        cheap
        module
    3). 最佳实践
        开发环境------devtool: 'cheap-module-eval-source-map'
        测试环境-----devtool: 'cheap-module-source-map'
        生产环境-----devtool: 'none'

## 打包文件优化
    1). 拆分打包
        单独打包第三方模块JS & 压缩JS
        抽取css单独打包 & 压缩css
    2). 异步/懒加载
        import()动态引入模块
        在特定条件下才执行import()
    3). 预加载
        针对异步模块包: 魔法注释
            /* webpackChunkName: "xxx" */
            /* webpackPreload: true */
            /* webpackPrefetch: true */
        针对所有包进行预加载处理:
            使用: preload-webpack-plugin@next
            对异步模块包使用: prefetch
            对同步模块包使用: preload
    4). 缓存
        打包文件hash化
        用于生成hash值的标识名称
            hash
            chunkhash
            contenthash
        module,chunk与bundle的关系
            
    5). tree-shaking(摇树)
        删除模块中向外暴露但未被使用的代码
        条件1: ES6的export暴露
        条件2: 生产环境打包压缩
    6). Scope Hoisting(作用域提升)
        针对目标: ES6模块
        以前: 每个模块都包在一个独立的函数定义中
        现在: 所有模块包在同个函数定义中
        好处: 代码少了, 函数减少很多, 运行更快
    7). 打包文件分析

## 打包优化
    加快打包速度
        1). loader增加include匹配特定条件
        2). 合理配置extensions扩展名
        3). 设置resolve.alias字段
        4). dll预打包
        5). 加快loader处理
    提升开发调试体验
        1). eslint代码规范检查
        2). eslint代码规范检查
        3). sourcemap 源码映射
        4). live-reload / hot-reload
        5). proxy解决ajax跨域
        6). mock后台接口
        7). postcss
