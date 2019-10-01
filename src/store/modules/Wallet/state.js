import WalletService from './services/Wallet';

const txChartRanges = {
    all: 'All',
    month: 'Month',
    week: 'Week'
};

const state = {
    walletUpdateTimer: undefined,
    walletLoading: false,
    walletService: undefined,
    walletInfo: {
        address: undefined,
        balance: undefined,
        height: 0,
        transfers: {}
    },
    transfers: {},
    walletKeyDisplay: undefined,
    txChartRanges: txChartRanges,
    txChartRange: txChartRanges.week
};

state.walletService = new WalletService();
export default state;
