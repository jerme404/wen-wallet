import Vue from 'vue';

const mutations = {
    explorerSetLoading: (state, isLoading) => {

        state.explorerLoading = isLoading;
    },
    explorerSetUpdateTimer: (state, updateTimer) => {

        state.explorerUpdateTimer = updateTimer;
    },
    explorerClearUpdateTimer: (state) => {

        if (state.explorerUpdateTimer) {

            clearInterval(state.explorerUpdateTimer);
            state.explorerUpdateTimer = null;
        }
    },
    explorerSetInfo: (state, info) => {

        state.explorerInfo = info;
    },
    explorerSetError: (state, err) => {

        state.explorerError = err;
    }
};

export default mutations;
