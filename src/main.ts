import {createApp, toRaw} from 'vue'
import {createPinia} from 'pinia'
import type {PiniaPluginContext, PiniaPlugin} from 'pinia'

import App from './App.vue'
import router from './router/MainRouter'
import './assets/reset.css'
import 'element-plus/theme-chalk/index.css'   // 自动引入样式会失效？！

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

// pinia数据持久化配置
const setStorage = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value))
}
// 获取本地数据
const getStorage = (key: string) => {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : {};
}

const piniaPlugin = (context: PiniaPluginContext) => {
    const {store} = context;
    // $subscribe state值发生变化时会执行传入的回调
    store.$subscribe(() => {
        // 每次修改值的时候更新localStorage数据
        setStorage(`pinia-${store.$id}`, toRaw(store.$state))
    })
    // 每次构建项目的时候从本地存储取值
    const data = getStorage(`pinia-${store.$id}`)
    return {
        ...data
    }
}
const store = createPinia()
store.use(piniaPlugin)


app.use(store)  // pinia 启用
app.use(router)  // 启用路由组件
app.mount('#app')


