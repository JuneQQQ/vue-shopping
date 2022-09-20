import {createRouter, createWebHistory} from 'vue-router'
import {useUserStore} from "@/stores/UserStore";

const router = createRouter({
    scrollBehavior(to, from, savedPosition) {
        return {top: 0}
    },
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/userHome",
            name: "UserHome", // 用于编程式导航
            component: () => import('@/views/UserHome.vue'),
            meta: {
                headerShow: true,
                footerShow: true,
            },
            children: [
                {
                    path: "getAddressInfo",
                    name: "UserAddressInfo", // 用于编程式导航
                    component: () => import('@/components/user/UserAddressInfo.vue'),
                    meta: {
                        headerShow: true,
                        footerShow: false,
                    },
                },
                {
                    path: "getOrderInfo",
                    name: "UserOrderInfo", // 用于编程式导航
                    component: () => import('@/components/user/UserOrderInfo.vue'),
                    meta: {
                        headerShow: true,
                        footerShow: false,
                    },
                },

            ]
        },
        {
            path: "/feedback",
            name: "Feedback", // 用于编程式导航
            component: () => import('@/views/Feedback.vue'),
            meta: {
                headerShow: true,
                // footerShow: false,
            },
        },
        {
            path: "/register",
            name: "Register", // 用于编程式导航
            component: () => import('@/views/ShoppingCartInfo.vue'),
            meta: {
                headerShow: true,
                footerShow: false,
            },
        },
        {
            path: "/shoppingCartInfo",
            name: "ShoppingCartInfo", // 用于编程式导航
            component: () => import('@/views/ShoppingCartInfo.vue'),
            meta: {
                headerShow: true,
                footerShow: true,
            },
        },
        {
            path: "/successAddToShoppingCart",
            name: "SuccessAddToShoppingCart", // 用于编程式导航
            component: () => import('@/views/SuccessAddToShoppingCart.vue'),
            meta: {
                headerShow: true,
                footerShow: true,
            },
        },
        {
            path: "/orderConfirm",
            name: "OrderConfirm", // 用于编程式导航
            component: () => import('@/views/OrderConfirm.vue'),
            meta: {
                headerShow: true,
                footerShow: true,
            },
        },
        {
            path: "/detail",
            name: "Detail", // 用于编程式导航
            component: () => import('@/views/Detail.vue'),
            meta: {
                headerShow: true,
                footerShow: true,
            }
        },
        {
            path: "/",
            alias: "/index", // 额外匹配的路径
            name: "Index", // 用于编程式导航
            component: () => import('@/views/Index.vue'),
            meta: {
                headerShow: true,
                footerShow: true,
            },
        },
        {
            path: "/search",
            name: "Search", // 用于编程式导航
            component: () => import('@/views/Search.vue'),
            meta: {
                headerShow: true,
                footerShow: true,
            },
        },
        {
            path: "/login",
            name: "Login", // 用于编程式导航
            component: () => import('@/views/Login.vue'),
            meta: {
                headerShow: true,
                footerShow: true,
            },
        },
        {
            path: "/register",
            name: "Register", // 用于编程式导航
            component: () => import('@/views/Register.vue'),
            meta: {
                headerShow: true,
                footerShow: true,
            },
        }
        // {
        //   path: '/',
        //   name: 'index',
        //   component: HomeView
        // },
        // {
        //   path: '/about',
        //   name: 'about',
        //   // route level code-splitting
        //   // this generates a separate chunk (About.[hash].js) for this route
        //   // which is lazy-loaded when the route is visited.
        //   component: () => import('../views/AboutView.vue')
        // }
    ]
})

router.beforeEach((to, from) => {
    if (
        // 检查用户是否已登录
        !useUserStore().userInfo.token &&
        // ❗️ 避免无限重定向
        to.name !== 'Login' &&
        // 以下为指定放行组件
        to.name !== 'Index' &&
        to.name !== 'Search' &&
        to.name !== 'Feedback' &&
        to.name !== 'Detail' &&
        to.name !== 'Register'
    ) {
        // 将用户重定向到登录页面
        return {name: 'Login'}
    }
})
export default router
