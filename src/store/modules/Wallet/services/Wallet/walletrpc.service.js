/**
* Wallet service for remote wallet-rpc.
*/

import axios from 'axios';
import { WalletConfig } from '@/config';

/**
* rpcBase is merged with all rpc request bodies.
* Not needed if your middleware takes care of this.
*/
const rpcBase = {
    jsonrpc: '2.0',
};

const rpcMethods = {
    createWallet: 'create_wallet',
    closeWallet: 'close_wallet',
    importWallet: 'restore_wallet_from_seed',
    openWallet: 'open_wallet',
    getAddress: 'get_address',
    getBalance: 'get_balance',
    getHeight: 'get_height',
    getKeys: 'query_key',
    getTransfers: 'get_transfers',
    sweepAll: 'sweep_all',
    transfer: 'transfer'
};

const localStorageRpc = 'wenRpc';

let _rpcLogin = new WeakMap();
let _walletName = new WeakMap();

export default class WalletRpcService {

    /**
    * @name constructor
    */
    constructor () {

        let walletUrl = WalletConfig.remoteWallet.rpcAddress;

        if (WalletConfig.remoteWallet.rpcLogin) {

            _rpcLogin.set(this, {
                username: WalletConfig.remoteWallet.rpcLogin.rpcUser,
                password: WalletConfig.remoteWallet.rpcLogin.rpcPassword
            });
        }

        let savedRpc = localStorage.getItem(localStorageRpc);
        if (savedRpc) {

            try {

                let rpcConn = JSON.parse(atob(savedRpc));
                walletUrl = rpcConn.rpcAddress;
                _rpcLogin.set(this, {
                    username: rpcConn.rpcUser,
                    password: rpcConn.rpcPassword
                });
            } catch (err) {

            }
        }

        if (!walletUrl) {

            throw 'Missing wallet URL.';
        }

        this.baseUrl = walletUrl;
        this.jsonRpcApi = WalletConfig.remoteWallet.jsonRpc || 'json_rpc';
    };

    set rpcConnection (connection) {

        this.baseUrl = connection.rpcAddress || this.baseUrl;
        _rpcLogin.set(this, {
            username: connection.rpcUser,
            password: connection.rpcPassword
        });
        let rpcConnStr = btoa(JSON.stringify(connection));
        localStorage.setItem(localStorageRpc, rpcConnStr);
    };

    /**
    * @name createWallet
    * @description Creates a new wallet.
    * @param {object} walletParams
    * @param {string} walletParams.walletName
    * @param {string} walletParams.password
    * @param {object} options Optional wallet params.
    * @param {string} options.language
    */
    createWallet (walletParams, options) {

        let language = options && options.language ? options.language : WalletConfig.defaultLanguage;

        let params = {
            filename: walletParams.walletName,
            password: walletParams.password,
            language: language
        };

        return this.jsonRpc(rpcMethods.createWallet, params).then((result) => {

            if (!result || !result.address || !result.seed) {

                return Promise.reject('Missing wallet response');
            }

            _walletName.set(this, params.filename);
            return Object.assign(result);
        }).catch((err) => {

            console.log('Error creating wallet', err);
            return Promise.reject(err);
        });
    };

    /**
    * @name importWallet
    * @description Creates a new wallet from seed.
    * @param {object} walletParams
    * @param {string} walletParams.walletName
    * @param {string} walletParams.password
    * @param {string} walletParams.seedPhrase
    * @param {object} options
    */
    importWallet (walletParams, options) {

        let language = options && options.language ? options.language : WalletConfig.defaultLanguage;

        let params = {
            filename: walletParams.walletName,
            password: walletParams.password,
            seed: walletParams.seed,
            language: language
        };

        return this.jsonRpc(rpcMethods.importWallet, params).then((result) => {

            if (!result || !result.address || !result.seed) {

                return Promise.reject('Missing wallet response');
            }

            _walletName.set(this, params.filename);
            return Object.assign(result);
        }).catch((err) => {

            console.log('Error creating wallet', err);
            return Promise.reject(err);
        });
    };

    /**
    * @name openWallet
    * @description Opens remote wallet.
    * @param {object} walletParams
    * @param {string} walletParams.walletName
    * @param {string} walletParams.password
    */
    openWallet (walletParams) {

        let params = {
            filename: walletParams.walletName,
            password: walletParams.password
        };

        return this.jsonRpc(rpcMethods.openWallet, params).then((response) => {

            _walletName.set(this, params.filename);
            return response;
        }).catch((err) => {

            console.log('Error opening wallet', err);
            return Promise.reject(err);
        });
    };

    /**
    * @name openWallet
    * @description Closes remote wallet.
    * @param {string} walletName
    * @param {string} password
    */
    closeWallet (walletName, password) {

        _walletName.set(this, '');
        return this.jsonRpc(rpcMethods.closeWallet);
    };

    /**
    * @name getAddress
    * @description Gets address for open wallet.
    */
    getAddress () {

        return this.jsonRpc(rpcMethods.getAddress);
    };

    /**
    * @name getBalance
    * @description Gets address for open wallet.
    */
    getBalance () {

        return this.jsonRpc(rpcMethods.getBalance);
    };

    /**
    * @name getHeight
    * @description Gets rpc wallet block height.
    */
    getHeight () {

        return this.jsonRpc(rpcMethods.getHeight);
    };

    /**
    * @name getKeys
    */
    getKeys () {

        return Promise.all([
            this.jsonRpc(rpcMethods.getKeys, { key_type: 'mnemonic' }),
            this.jsonRpc(rpcMethods.getKeys, { key_type: 'all_keys' })
        ]).then((responses) => {

            responses[1].mnemonic = responses[0].mnemonic;
            return responses[1];
        }).catch((err) => {

            return Promise.reject(err);
        });
    };

    /**
    * @name getTransfers
    * @description Gets list of wallet transfers.
    * @param {object} options
    * @param {boolean} options.in
    * @param {boolean} options.out
    */
    getTransfers (options) {

        let params = {
            in: options && options.in,
            out: options && options.out
        };
        return this.jsonRpc(rpcMethods.getTransfers, params);
    };

    /**
    * @name sweepAll
    * @description Sends all unlocked balance to an address.
    * @param {string} address
    */
    sweepAll (address) {

        return this.jsonRpc(rpcMethods.sweepAll, { address: address });
    };

    /**
    * @name transfer
    * @description Initiates a transfer.
    * @param {object} txParams
    */
    transfer (txParams) {

        let params = {
            destinations: [{
                amount: txParams.amount,
                address: txParams.address
            }],
            payment_id: txParams.paymentId || undefined,
            priority: txParams.priority || 0
        };

        return this.jsonRpc(rpcMethods.transfer, params);
    };

    jsonRpc (method, params) {

        let rpcMethod = method,
            rpcParams = params;

        let requestBody = Object.assign({
            method: rpcMethod,
            id: Date.now().toString(),
            params: rpcParams || {}
        }, rpcBase);

        return axios({
            baseURL: this.baseUrl,
            url: this.jsonRpcApi,
            method: 'post',
            data: requestBody,
            auth: _rpcLogin.get(this) || {}
        }).then((response) => {

            if (!response.data) {

                return Promise.reject({ errorMessage: 'Wallet RPC error'});
            }

            if (response.data && response.data.error) {

                let rpcError = response.data.error.message ?
                    response.data.error.message.replace(/_/g, ' ') : 'Wallet RPC error';

                return Promise.reject({ errorMessage: rpcError });
            }
            return response.data.result;
        }).catch((err) => {

            return Promise.reject(err);
        });
    };
};
