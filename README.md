# webpack
 webpack基础设置，手写loader和plugin

 ## webpack 安装

 推荐局部安装

* webpack 3.x
npm install webpack

* webpack 4.x
// 2020-8-1
npm install webpack@4.43.0
npm install webpack-cli@3.3.12

* webpack 5.x
npm install webpack
npm install webpack-cli

* 现在npm i webpack 默认是5.x
安装3.x和4.x需要指定版本

## webpackde4.x 零配置
不需要配置就能构建打包功能，有一个默认配置
但是不实用，大部分情况下还是需要自定义配置

但是配置门槛低了，简单了

0配置执行打包
npx webpack

可以看到dist文件夹下有main.js，手动添加html文件之后可以在浏览器打开

main.js文件中可以看到就算是一行代码，打包内容也很长，也就是webpack给出了很多兼容性代码

## webpack手动配置
webpack.config.js

mode development production none

development模式能够看到打包出来得代码
production之后会被uglify

## webpack 打包过程
1. 分析依赖以及依赖的路径
2. 对内容进行编译，生成代码片段，处理成一个chunk
3. 对收集的依赖进行编辑，生成代码片段， 处理成一个chunk，每一个依赖就是一个module
4. 把所有依赖处理成一个对象，即依赖图谱

## webpack.config.js 改名
可以对配置文件改名，能够随便起名字

1. 在package.json中配置script，自定义打包命令，使用`webpack --config xxxx` 表示使用xxxx文件作为配置文件来打包
2. 在terminal中执行自定义的打包命令即可

## webpack占位符
[name] 名称

## chunks
打包后生成的文件中，作为参数的对象包含
```json
    {
        "xxx.js":(function(module, exports, __webpack_require__) {
        eval("const str = __webpack_require__(/*! ./other */ \"xxxxxxx)\n\n//# sourceURL=webpack:///./src/index.js?");
        })
    }
```

这种结构就叫做依赖图谱

eval中执行的string就叫代码片段

bundle chunk chunks module
bundle 构建后产生的资源文件， bundle至少对应一个chunk
chunks  一个chunks对应至少一个module
module 一个module对应至少一个chunk

## 插件
plugins

* html-webpack-plugin  默认安装5.x @4安装4.x
  作用：自动生产html文件，引入bundle文件，压缩html、、、、
* clean-webpack-plugin 每次打包之前自动清理dist文件夹
    ```const {CleanWebpackPlugin}  = require('clean-webpack-plugin')```

## 设置npm源

* 方法1. termail中使用命令npm config set registry https://registry.npm.taobao.org
* 方法2. 添加.npmrc配置文件,写入 `registry=https://registry.npm.taobao.org`

## css端处理

webpack只支持js、json其他类型的文件需要loader处理
loader对文件进行预处理
**注意多个loader作用于一个模块时，有执行顺序，按照自右向左的方向执行，一个loader的结果作为另一个loader的输入**
一个loader建议只做一件事
安装css相关loader，以下默认安装的是5.x，4.x需要指定版本

**lerna？？？**
**模块联邦？？**

1. css-loader@5.2.6
* 对css代码进行序列化，把css代码放入chunk中
但是它没有吧代码放入style标签中，此时css代码不生效
* options可以支持css-module
2. style-loader@2.0.0 
把css代码放到html文件的style标签中
3. less-loader@7.3.0
注意使用less需要安装less
处理less语法，生成css
4. postcss-loader@4.2.0
使用postcss需要先安装postcss
postcss是200多个处理css的工具集
可以在根目录下建立postcss.config.js进行相关配置
* autoprefixer给样式添加前缀
* browserslist制定目标浏览器集合
   - 在package.json中使用 "browserslist":[ "> 1%", "last 3 versions"]  市场占有率>1%的浏览器,兼容浏览器最近的两个大版本
   - 根目录下定制.browserslistrc配置文件
   - 查询符合配置的浏览器有哪些？`npx browserslist ">1%,last 2 versions"`
* cssnano css压缩器

5. mini-css-extract-plugin@1.6.2
把css抽离成文件，不直接使用style标签的方式
- 下载mini-css-extract-plugin，const minicssextractplugin = require('mini-css-extract-plugin')在plugin中new minicssextractplugin({filename:'xxx.css'})，指定生成css的名称
- 使用mini-css-extract-plugin自带的loader,minicssextractplugin.loader替换掉style-loader
- 结合html-webpack-plugin可以直接吧生成的css文件使用link标签在html文件中使用

## 自定义实现loader
loader路径使用resolveLoader：告知webpack如何匹配loader

## 静态资源

### 图片
1. file-loader 5版本的webpack使用其他方案，所有webpack4不用制定版本
    文件放入输出路径中，在代码中拿到资源路径

2. url-loader 是file-loader的pro版本，可以直接替换file-loader
增加了图片转base64的功能，减少文件请求。需要做限制，小文件转base64合适，大文件会导致包太大
依赖file-loader

3. image-webpack-loader 图片压缩loader
此loader有坑，直接使用npm安装虽然提示安装成功，但是实际上它的依赖安装未成功导致打包失败，且错误提示位置也不对
解决：使用cnpm安装此loader，配置淘宝源或者yarn也不能解决这个问题

### 第三方字体文件 icon
file-loader  或者 url-loader

### webpack5.x对静态资源的处理
asset //通用资源 》8kb使用file-loader  《8kb使用url-loader
asset/resource //文件资源 相当于file-loader
asset/inline //内联base64 相当于url-loader
```
module:{
    rules:[
        {
            test:'/\.png$/',
            type:'asset', //asset/resource  asset/inline 
            generator:{
                filename:'xxx/[name][ext]'
            },
            parser:{
                dataUrlCondition:{
                    maxSize:'',   //用于限制多大的图片使用asset自动转base64，也是使用asset/inline,他是用来修改默认的8kb大小
            }
        }
    ]
}
```

## 多页面打包解决方案