import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
import path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(),
        AutoImport({
            // Auto import functions from Vue, e.g. ref, reactive, toRef...
            // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
            imports: ['vue'],

            // Auto import functions from Element Plus, e.g. ElMessage, ElMessageBox... (with style)
            // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
            resolvers: [
                ElementPlusResolver(),

                // Auto import icon components
                // 自动导入图标组件
            ],

        }),

        Components({
            resolvers: [
                // Auto register Element Plus components
                // 自动导入 Element Plus 组件
                ElementPlusResolver(),
            ],

        }),],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },

    // 仅开发环境生效？
    server: {
        port: 3000,  // 本机启动vue项目端口
        proxy: {
            // '/': {
            //     target: 'https://mock.apifox.cn/m1/1590358-0-default',  // 请求服务器地址
            //     changeOrigin: true,
            // },
            '/api': {   // 表示代理 api 开头的路径
                target: 'https://mock.apifox.cn/m1/1590358-0-default/',  // 请求服务器地址
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '') // 干掉api前缀
            }
        }
    },

})

