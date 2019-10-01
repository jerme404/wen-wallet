//import '@babel/polyfill';
import Vue from 'vue';
import '@fortawesome/fontawesome-free/css/all.css';
import 'typeface-b612-mono';
import '@/plugins/vuetify';
import '@/plugins/Notify';
import App from './App.vue';
import router from '@/router';
import store from '@/store';

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
