 class PxPlugin{
    constructor(props){
        console.log('props', props)
    }
    apply(compiler){
        console.log('my plugins', compiler)
        // 同步钩子使用tap注册
        // 异步钩子使用tabAsync注册
        compiler.hooks.emit.tapAsync('pxPlugin', (compilation, cb)=>{
            // compilation是源码处理到此处时的结果，进一步处理后交由cb
            console.log('------------------------compilation', compilation.assets)
            const content = '这一个string， 往pxpxtxt中放入'
            compilation.assets["pxpx.txt"] = {
                source:function(){
                    return content
                },
                size:function(){
                    return content.length
                }
            }
            cb(); // 需要使用cb返回webpack中去
        })
    }
}


module.exports =PxPlugin