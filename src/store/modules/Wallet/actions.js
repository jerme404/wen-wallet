import Vue from 'vue';
import { CoinConfig, WalletConfig } from '@/config';

const actions = {
    walletLoad: ({ commit, dispatch, state }) => {

        // Check if existing session is still open.
        commit('walletSetLoading', true);
        return state.walletService.getBalance().then((response) => {

            if (response && response.balance) {

                return dispatch('onWalletOpen');
            } else {

                commit('walletSetLoading', false);
            }
        }).catch((err) => {

            commit('walletSetLoading', false);
        });
    },
    createWallet: ({ commit, dispatch, state }, walletParams) => {

        commit('walletSetLoading', true);
        return state.walletService.createWallet(walletParams).then((response) => {

            commit('walletSetLoading', false);
            return dispatch('onWalletOpen');
        }).catch((err) => {

            commit('walletSetLoading', false);
            Vue.prototype.$notify.error('Error creating wallet');
        });
    },
    importWallet: ({ commit, dispatch, state }, walletParams) => {

        commit('walletSetLoading', true);
        return state.walletService.importWallet(walletParams).then((response) => {

            commit('walletSetLoading', false);
            return dispatch('onWalletOpen');
        }).catch((err) => {

            commit('walletSetLoading', false);
            Vue.prototype.$notify.error('Error importing wallet');
        });
    },
    openWallet: ({ commit, dispatch, state}, walletParams) => {

        commit('walletSetLoading', true);
        return state.walletService.openWallet(walletParams).then((response) => {

            return dispatch('onWalletOpen');
        }).catch((err) => {

            commit('walletSetLoading', false);
            Vue.prototype.$notify.error('Error opening wallet');
        });
    },
    onWalletOpen: ({ commit, dispatch, state }) => {

        dispatch('getAddress');
        dispatch('updateWallet');

        if (!state.walletUpdateTimer) {

            let updateTimer = setInterval(() => {

                if (!state.walletLoading) {

                    dispatch('updateWallet');
                }

            }, WalletConfig.updateInterval);
            commit('walletSetUpdateTimer', updateTimer);
        }
    },
    closeWallet: ({ commit, dispatch, state}) => {

        return state.walletService.closeWallet().then(() => {

            dispatch('onWalletClose');
        }).catch((err) => {

            return Promise.reject(err);
        });
    },
    onWalletClose: ({ commit, dispatch, state }) => {

        commit('walletClearUpdateTimer');
        commit('walletClearWalletInfo');
    },
    updateWallet: ({ commit, dispatch, state }) => {

        commit('walletSetLoading', true);
        let oldBalance = state.walletInfo.balance;

        return Promise.all([
            dispatch('getBalance'),
            dispatch('getHeight')
        ]).then(() => {

            let newBalance = state.walletInfo.balance;
            if (!oldBalance || oldBalance.balance != newBalance.balance) {

                return dispatch('getTransfers');
            }
            return Promise.resolve();
        }).then(() => {

            commit('walletSetLoading', false);
        }).catch((err) => {

            commit('walletSetLoading', false);
            Vue.prototype.$notify.error('Error updating wallet');
        });
    },
    getAddress: ({ commit, state }) => {

        return state.walletService.getAddress().then((address) => {

            commit('walletSetAddress', address);
        }).catch((err) => {

            return Promise.reject(err);
        });
    },
    getBalance: ({ commit, state }) => {

        return state.walletService.getBalance().then((balance) => {

            commit('walletSetBalance', balance);
        }).catch((err) => {

            return Promise.reject(err);
        });
    },
    getHeight: ({ commit, state }) => {

        return state.walletService.getHeight().then((height) => {

            commit('walletSetHeight', height.height);
        }).catch((err) => {

            return Promise.reject(err);
        });
    },
    getTransfers: ({ commit, state }) => {

        return state.walletService.getTransfers({
            in: true,
            out: true
        }).then((transfers) => {

            transfers.in = transfers.in || [];
            transfers.out = transfers.out || [];

            if (state.transfers.in && (transfers.in.length > state.transfers.in.length)) {

                let existingHashes = state.transfers.in.map(tx => tx.txid);
                let amountReceived = transfers.in.filter((tx) => {

                    return existingHashes.indexOf(tx.txid) < 0;
                }).reduce((amt, tx) => amt + tx.amount, 0);

                let unitsReceived = amountReceived / Math.pow(10, CoinConfig.coinUnitPlaces);
                Vue.prototype.$notify.success(`Received ${unitsReceived.toFixed(CoinConfig.coinUnitPlaces)} ${CoinConfig.coinSymbol}`);
            }
            commit('walletSetTransfers', transfers);
        }).catch((err) => {

            return Promise.reject(err);
        });
    },
    sweepAll: ({ dispatch, state }, address) => {

        return state.walletService.sweepAll(address).then((response) => {

            Vue.prototype.$notify.success('Transfer sent');
            dispatch('getBalance');
            return response.tx_hash;
        }).catch((err) => {

            Vue.prototype.$notify.error(err.errorMessage || 'Transfer error');
            return Promise.reject(err);
        });
    },
    transfer: ({ dispatch, state }, txParams) => {

        return state.walletService.transfer(txParams).then((response) => {

            Vue.prototype.$notify.success(`Transfer sent <br/>${response.tx_hash}`);
            dispatch('getBalance');
            return response.tx_hash;
        }).catch((err) => {

            Vue.prototype.$notify.error(err.errorMessage || 'Transfer error');
            return Promise.reject(err);
        });
    },
    getKeys: ({ commit, dispatch, state }) => {

        return state.walletService.getKeys().then((response) => {

            dispatch('showKeys', { address: state.walletInfo.address.address, keys: response });
        }).catch((err) => {

            Vue.prototype.$notify.error(err.errorMessage || 'Wallet seed error');
            return Promise.reject(err);
        });
    },
    showKeys: ({ commit, state }, keyDisplay) => {

        commit('walletSetKeyDisplay', keyDisplay);
    },
    closeKeys: ({ commit, state }) => {

        commit('walletSetKeyDisplay', undefined);
    },
    setTxChartRange: ({ commit }, chartRange) => {

        commit('walletSetTxChartRange', chartRange);
    }
};

export default actions;
