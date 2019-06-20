//import '@babel/polyfill';
import Vue from 'vue';
import '@/plugins/vuetify';
import App from './App.vue';
import router from '@/router';
import store from '@/store';
import '@fortawesome/fontawesome-free/css/all.css';

const startApp = () => {

    Vue.config.productionTip = false;

    new Vue({
        router,
        store,
        render: h => h(App)
    }).$mount('#app');
};

// Wait for deviceready if running in a cordova app.
if (window.cordova || process.env.CORDOVA_PLATFORM) {

    document.addEventListener('deviceready', startApp, false);
} else {

    startApp();
}
