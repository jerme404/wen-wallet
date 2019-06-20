import Vue from 'vue';
import Router from 'vue-router';
const Dashboard = () => import('@/views/Dashboard');
const Receive = () => import('@/views/Receive');
const Send = () => import('@/views/Send');
const Settings = () => import('@/views/Settings');

Vue.use(Router);

const router = new Router({
    mode: (window.cordova) ? 'hash' : 'history',
    base: process.env.CORDOVA_PLATFORM ? '' : '/',
    routes: [
        {
            path: '/',
            name: 'dashboard',
            component: Dashboard,
            meta: {
                showNav: true,
                title: 'Dashboard'
            }
        },
        {
            path: '/receive',
            name: 'receive',
            component: Receive,
            meta: {
                showNav: true,
                title: 'Receive'
            }
        },
        {
            path: '/send',
            name: 'send',
            component: Send,
            meta: {
                showNav: true,
                title: 'Send'
            }
        },
        {
            path: '/settings',
            name: 'settings',
            component: Settings,
            meta: {
                showNav: true,
                title: 'Settings'
            }
        }
    ]
});

export default router;
