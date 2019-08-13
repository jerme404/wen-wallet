import Vue from 'vue';
import { WalletConfig } from '@/config';

const actions = {
    explorerLoad: ({ commit, dispatch, state }) => {

        dispatch('getExplorerInfo');
        if (!state.explorerUpdateTimer) {

            let updateTimer = setInterval(() => {

                if (!state.explorerLoading) {

                    dispatch('getExplorerInfo');
                }

            }, WalletConfig.updateInterval);
            commit('explorerSetUpdateTimer', updateTimer);
        }
    },
    explorerUnload: ({ commit, state }) => {

        commit('explorerClearUpdateTimer');
        commit('explorerSetInfo', {});
    },
    getExplorerInfo: ({ commit, state }) => {

        return state.explorerService.getInfo().then((response) => {
            
            commit('explorerSetInfo', response);
        }).catch((err) => {

            commit('explorerSetError', err);
        });
    }
};

export default actions;
