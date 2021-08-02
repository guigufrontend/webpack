module.exports=function(source){
    console.log('11111111111111111111111111111111111111111111111111')
    console.log(source)
    // this.query 获取options对象
    // return source.replace('aaa', this.query.str)
    // this.callback(err, content, sourcemap, meta) 可以同步或者一部调用的可以返回多个结果的函数
    // 同步的使用方式
    // this.callback(null, source.replace('aaa', this.query.str))
    // callback异步的使用方式
    const callback = this.async() // 产生异步的回调
    setTimeout(()=>{
        callback(null, source.replace('aaa', this.query.str))
    },3000)
}