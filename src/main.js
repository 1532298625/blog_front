import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as icons from '@element-plus/icons-vue' 
import 'element-plus/theme-chalk/display.css'
var mavonEditor = require('mavon-editor')
import 'mavon-editor/dist/css/index.css'
import store from "@/store";


const app =createApp(App)
app.use(ElementPlus,{
    location: 'zh-CN'
})
Object.keys(icons).forEach(key => {
    app.component(key, icons[key])
})
app.use(router)
app.use(store)
app.use(mavonEditor)

app.mount('#app')
