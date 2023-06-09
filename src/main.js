import {createApp, provide, ref} from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 导入上面新建的路由文件
import router from './router/index'

//深色模式css
import 'element-plus/theme-chalk/dark/css-vars.css'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import hljs from 'highlight.js';

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(router)
app.use(hljs)

app.directive('highlight', (el) => {
    let blocks = el.querySelectorAll('pre code')
    blocks.forEach((block) => {

        // 创建ol标签元素
        let ol = document.createElement("ol");

        // 为ol标签添加class名
        ol.className = 'pre-numbering';
        block.parentNode.appendChild(ol);

        hljs.highlightBlock(block)
    })
})

app.mount('#app')


import {useDark, useToggle} from "@vueuse/core";

const isDark = useDark();
useToggle(isDark)