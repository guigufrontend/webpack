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
2. 对内容进行编译

## webpack.config.js 改名
可以对配置文件改名，能够随便起名字

1. 在package.json中配置script，自定义打包命令，使用`webpack --config xxxx` 表示使用xxxx文件作为配置文件来打包
2. 在terminal中执行自定义的打包命令即可