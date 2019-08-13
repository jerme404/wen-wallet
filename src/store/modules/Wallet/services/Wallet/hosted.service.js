/**
* Wallet service for hosted web wallet.
*/

import axios from 'axios';
import { WalletConfig } from '@/config';

export default class HostedWalletService {

    /**
    * @name constructor
    */
    constructor (connection) {
        
    };

    set walletUrl (walletUrl) {

        this.baseUrl = walletUrl;
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

        return Promise.reject('Not implemented');
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

        return Promise.reject('Import not allowed with hosted wallet');
    };

    /**
    * @name openWallet
    * @description Opens remote wallet.
    * @param {object} walletParams
    * @param {string} walletParams.walletName
    * @param {string} walletParams.password
    */
    openWallet (walletParams) {

        return Promise.reject('Not implemented');
    };

    /**
    * @name openWallet
    * @description Closes remote wallet.
    * @param {string} walletName
    * @param {string} password
    */
    closeWallet (walletName, password) {

        return Promise.reject('Not implemented');
    };

    /**
    * @name getAddress
    * @description Gets address for open wallet.
    */
    getAddress () {

        return Promise.reject('Not implemented');
    };

    /**
    * @name getBalance
    * @description Gets address for open wallet.
    */
    getBalance () {

        return Promise.reject('Not implemented');
    };

    /**
    * @name getHeight
    * @description Gets rpc wallet block height.
    */
    getHeight () {

        return Promise.reject('Not implemented');
    };

    /**
    * @name getKeys
    */
    getKeys () {

        return Promise.reject('Not implemented');
    };

    /**
    * @name getTransfers
    * @description Gets list of wallet transfers.
    * @param {object} options
    * @param {boolean} options.in
    * @param {boolean} options.out
    */
    getTransfers (options) {

        return Promise.reject('Not implemented');
    };

    /**
    * @name transfer
    * @description Initiates a transfer.
    * @param {object} txParams
    */
    transfer (txParams) {

        return Promise.reject('Not implemented');
    };
};
