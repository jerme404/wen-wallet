import WalletService from './services/Wallet';

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
    walletKeyDisplay: undefined
};

state.walletService = new WalletService();
export default state;
