// webpack 配置
// webpack基于nodejs 核心mok的API都可以使用
// 配置文件是一个对象

const path  =  require('path')

module.exports={
    // 打包的入口位置
    // 支持单页面入口spa 多页面入口mpa
    // entry:'./src/index.js', // string array object
    entry:{
        main:'./src/index.js', //等价于 entry:'./src/index.js'
        list:'./src/list.js',
        login:'./src/login.js', // 多入口打包，结合占位符打包， 适用于多页面项目
    },
    //输出资源文件的信息（存储位置，文件名称）
    output:{
        path:path.resolve(__dirname,'./dist'),// 存储位置, 要求绝对路径
        filename:'[name].js'//打包后的文件名称
    },
    //打包模式
    mode:'development',// development production none
}