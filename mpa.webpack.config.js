// webpack 配置
// webpack基于nodejs 核心mok的API都可以使用
// 配置文件是一个对象

const path  =  require('path')
const htmlwebpackplugin = require('html-webpack-plugin')
const minicssextractplugin = require('mini-css-extract-plugin')
const {CleanWebpackPlugin}  = require('clean-webpack-plugin')


// glob 包
const glob = require('glob')
const setMpa = ()=>{
    const entry = {}
    const htmlwebpackplugins = []

    const entryFiles = glob.sync(path.join(__dirname,"./src/*/index.js"))
    console.log(entryFiles)
    entryFiles.forEach(f=>{
        const matchInfo = f.match(/src\/(.*)\/index\.js$/)
        console.log(matchInfo)
        const pageName = matchInfo[1]
        entry[pageName] = f;
        const pageHtmlWebpack = new htmlwebpackplugin({
            template:`./src/${pageName}/index.html`,
            filename:`${pageName}.html`,
            chunks:[pageName]
        })
        htmlwebpackplugins.push(pageHtmlWebpack)
    })
    return{
        entry,
        htmlwebpackplugins
    }
}

const {entry, htmlwebpackplugins} = setMpa()

module.exports={
    // 打包的入口位置
    // 支持单页面入口spa 多页面入口mpa
    // entry:'./src/index.js', // string array object
    // entry:{
        // index:'./src/index.js', //等价于 entry:'./src/index.js'
        // list:'./src/list.js',
        // login:'./src/login.js', // 多入口打包，结合占位符打包， 适用于多页面项目
    // },
    entry,
    //输出资源文件的信息（存储位置，文件名称）
    output:{
        path:path.resolve(__dirname,'./mpa'),// 存储位置, 要求绝对路径
        filename:'[name].js'//打包后的文件名称
    },
    //打包模式
    mode:'development',// development production none
    plugins:[//插件
        // new htmlwebpackplugin({
        //     // 模板匹配
        //     template:'./src/index.html',
        //     filename:'index.html',
        //     chunks:["index"] // 匹配js chunks
        // }),  //使用插件
        // new htmlwebpackplugin({ // 多入口，产生多html
        //     // 模板匹配
        //     template:'./src/login.html',
        //     filename:'login.html',
        //     chunks:["login"]

        // }),  
        // new htmlwebpackplugin({
        //     // 模板匹配
        //     template:'./src/list.html',
        //     filename:'list.html',
        //     chunks:["list"]

        // }),
        ...htmlwebpackplugins,
        // css抽离成独立的文件，不用style的内联方式  
        new minicssextractplugin({
            filename:"index.css"
        }),
        new CleanWebpackPlugin(),
    ], 
    module:{
        rules:[
            {
                test:/\.css$/,//css后缀的使用use那些loader
                use:['style-loader','css-loader'],
            },
            {
                test:/\.less$/,//less-loader生成css再交由cssloader处理
                use:[
                    minicssextractplugin.loader,
                    // 'style-loader',
                    {
                        loader:'css-loader',
                        options:{
                            modules:true
                        }
                    },
                    'postcss-loader',
                    'less-loader'
                ],
            },
            {
                // test:/\.png$/,
                test:/\.(png|jp?g|git|webp)$/,
                use:[
                    {
                        // loader:'file-loader',
                        loader:'url-loader', // 依赖于file-loader， 图片会转换成base64
                        options:{
                            name:"[name].[ext]",// 生成的文件名词
                            outputPath:"images", // 文件的输出位置
                            publicPath:'./images', //文件的使用位置， publickPath+ name 生成css中图片的使用路径
                            limit: 31 * 1024, // 限制多少字节以内的文件转base64
                        }
                    },
                    {
                        loader:"image-webpack-loader",
                        options:{

                        }
                    }
                ]
            },
            {
                test:/\.(eot|woff|woff2|svg|ttf)$/,
                use:[
                    {
                        loader:'file-loader',
                        options:{
                            name:"[name].[ext]",
                            outputPath:'font',
                            publicPath:"./font" // 注意路径
                        }
                    }
                ]
            }
        ]
    }
}