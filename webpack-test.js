// 查看、测试webpack的hook执行流程
const webpack = require('webpack')

const config = require('./webpack.config')

const compiler = webpack(config)


Object.keys(compiler.hooks).forEach(h=>{
    compiler.hooks[h].tap('xxx',(compilation)=>{
        console.log(`run----------------->${h}`)
    })
})
compiler.run()