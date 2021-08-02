import css from './index.css'
import less from './index.less'
import pxless from './px.less'
const div1 = document.getElementById('div1')
div1.className=less.div1
const str = require('./other')
console.log(`加载另一个模块 ${str}`)