const less = require('less')

module.exports=function(source){
    // less 转css
    less.render(source,(err, output)=>{
        const css = output.css
        this.callback(err, css)
    })
}