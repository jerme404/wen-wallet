const ADDR_BOOK_KEY = 'addressBook';

export default class AddressBookService {

    /**
    * @name addAddress
    * @description Gets addresses from local storage.
    */
    getAddresses (accountId) {

        return new Promise((resolve, reject) => {

            let addresses = {};
            try {

                let addressJson = localStorage.getItem(ADDR_BOOK_KEY);
                if (!addressJson) {

                    return resolve(addresses);
                }
                addresses = JSON.parse(addressJson);
                resolve(addresses.filter(a => a.accountId == accountId));
            } catch (err) {

                reject(err);
            }
        });
    };

    /**
    * @name saveAddresses
    * @description Saves addresses to local storage.
    * @param {object} addresses
    */
    saveAddresses (addresses) {

        return new Promise((resolve, reject) => {

            let addrJson = JSON.stringify(Object.values(addresses));
            try {

                localStorage.setItem(ADDR_BOOK_KEY, addrJson);
                resolve(addresses);
            } catch (err) {

                reject(err);
            }
        });
    };
};
