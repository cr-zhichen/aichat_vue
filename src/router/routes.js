const routes = [
    {
        path: '/',
        name: 'home',
        title: '首页',
        component: () => import('@/page/IndexPage.vue'), //.vue不能省略
    },
    {
        path: '/chat/:id?',
        name: 'chat',
        title: '聊天',
        component: () => import('@/page/ChatPage.vue'),
    },
    {
        path: '/user',
        name: 'user',
        title: '用户',
        component: () => import('@/page/UserPage.vue'),
    },
    {
        path: '/login',
        name: 'login',
        title: '登录',
        component: () => import('@/page/LoginPage.vue'),
    },
    {
        path: '/register',
        name: 'register',
        title: '注册',
        component: () => import('@/page/RegisterPage.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        title: '404',
        component: () => import('@/page/NotFoundPage.vue'),
    }
]
export default routes
