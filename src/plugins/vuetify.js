import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import theme from '@/theme';

Vue.use(Vuetify, {
    theme: theme,
    options: {
        customProperties: true
    },
    iconfont: 'fa',
});
