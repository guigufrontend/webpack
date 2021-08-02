// 添加style标签并引入css
module.exports=function(source){
    return `const ele = document.createElement('style');
        ele.innerHTML = ${source};
        document.head.appendChild(ele);
    `;
}