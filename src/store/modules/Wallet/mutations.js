import Vue from 'vue';

const mutations = {
    walletSetLoading: (state, isLoading) => {

        state.walletLoading = isLoading;
    },
    walletSetWalletService: (state, walletService) => {

        state.walletService = walletService;
    },
    walletSetUpdateTimer: (state, updateTimer) => {

        state.walletUpdateTimer = updateTimer;
    },
    walletClearUpdateTimer: (state) => {

        if (state.walletUpdateTimer) {

            clearInterval(state.walletUpdateTimer);
            state.walletUpdateTimer = null;
        }
    },
    walletClearWalletInfo: (state) => {

        state.walletInfo = {
            address: undefined,
            balance: undefined,
            height: 0
        };
        state.transfers = {};
    },
    walletSetName: (state, walletName) => {

        Vue.set(state.walletInfo, 'walletName', walletName);
    },
    walletSetAddress: (state, address) => {

        Vue.set(state.walletInfo, 'address', address);
    },
    walletSetBalance: (state, balance) => {

        Vue.set(state.walletInfo, 'balance', balance);
    },
    walletSetHeight: (state, height) => {

        Vue.set(state.walletInfo, 'height', height);
    },
    walletSetTransfers: (state, transfers) => {

        state.transfers = transfers;
    },
    walletSetKeyDisplay: (state, keyDisplay) => {

        state.walletKeyDisplay = keyDisplay;
    },
    walletSetTxChartRange: (state, chartRange) => {

        state.txChartRange = chartRange;
    }
};

export default mutations;
