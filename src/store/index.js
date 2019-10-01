import Vue from 'vue';
import Vuex from 'vuex';
import Explorer from './modules/Explorer';
import I18N from './modules/I18N';
import Wallet from './modules/Wallet';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        explorer: Explorer,
        i18n: I18N,
        wallet: Wallet
    },
});
