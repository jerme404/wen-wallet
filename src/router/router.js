import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
    mode: (window.cordova) ? 'hash' : 'history',
    base: process.env.BASE_URL,
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 };
    },
    routes: [
        {
            path: '/',
            name: 'dashboard',
            component: () => import('@/views/Dashboard'),
            meta: {
                showNav: true,
                title: 'dashboard'
            }
        },
        {
            path: '/receive',
            name: 'receive',
            component: () => import('@/views/Receive'),
            meta: {
                showNav: true,
                title: 'receive'
            }
        },
        {
            path: '/send',
            name: 'send',
            component: () => import('@/views/Send'),
            meta: {
                showNav: true,
                title: 'send'
            }
        },
        {
            path: '/settings',
            name: 'settings',
            component: () => import('@/views/Settings'),
            meta: {
                showNav: true,
                title: 'settings'
            }
        },
        {
            path: '/launcher',
            name: 'launcher',
            component: () => import('@/views/Launcher'),
            meta: {
                showNav: false,
                title: 'Launcher'
            }
        }
    ]
});

export default router;
