import css from './style/index.css'
import less from './style/index.less'
import pxless from './px.less'
import birds from './images/bird.png'
// import "@babel/polyfill" //这样使用不能按需加载特性，使用插件可以按需引入
import React,{ Component } from 'React'
import ReactDom from 'react-dom'

const div1 = document.getElementById('div1')
div1.className=less.div1
const str = require('./other')
console.log(`加载另一个模块 ${str}`)

const img = new Image()
img.src = birds;

const div1Ele = document.querySelector('#div1')
div1Ele.append(img)

// es6+ 语法 测试转换
const arr = [new Promise(()=>{})]
arr.map(item=>{
    console.log(item)
})

class App extends Component{
    render(){
        return <div>hello jsx</div>
    }
}

ReactDom.render(<App></App>, document.getElementById('react'))