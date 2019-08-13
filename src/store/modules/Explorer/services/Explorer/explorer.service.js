import Axios from 'axios';
import { WalletConfig } from '@/config';

const endpoints = {
    getInfo: 'get_info'
};

export default class ExplorerService {

    constructor () {

        this.httpClient = Axios.create({
            baseURL: WalletConfig.explorer.api
        });
    };

    /**
    * @name getInfo
    */
    getInfo () {

        return this.apiRequest(endpoints.getInfo);
    };

    /**
    * @name apiRequest
    * @description Calls nerva's php API at the specified endpoint.
    * @param {string} endpoint
    */
    apiRequest (endpoint) {

        return this.httpClient({
            params: { endpoint: endpoint }
        }).then((response) => {

            if (!response.data) {

                return Promise.reject({ errorMessage: 'No data returned in response' });
            }

            if (response.data.error) {

                return Promise.reject(response.data.error);
            }

            return Promise.resolve(response.data);
        }).catch((err) => {

            return Promise.reject(err);
        });
    };
};
