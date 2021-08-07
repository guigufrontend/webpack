import css from './style/index.css'
import less from './style/index.less'
import pxless from './px.less'
import birds from './images/bird.png'

const div1 = document.getElementById('div1')
div1.className=less.div1
const str = require('./other')
console.log(`加载另一个模块 ${str}`)

const img = new Image()
img.src = birds;

const div1Ele = document.querySelector('#div1')
div1Ele.append(img)