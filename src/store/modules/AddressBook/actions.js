import Address from './models/Address';

const actions = {
    addressBookLoad: ({ commit, state }, accountId) => {

        commit('addressBookSetAccountId', accountId);
        state.addressBookService.getAddresses(accountId).then((addresses) => {

            let addrs = addresses.reduce((addrs, address) => {

                addrs[address.addressId] = new Address(address);
                return addrs;
            }, {});
            commit('addressBookSetAddresses', addrs);
        }).catch((err) => {

            // Error notification.
        });
    },
    addressBookUnload: ({ commit, state }) => {

        commit('addressBookSetAccountId', '');
        commit('addressBookSetAddresses', {});
    },
    addressBookAddAddress: ({ commit, state }, newAddress) => {

        newAddress.accountId = state.accountId;
        let address = new Address(newAddress);
        let addresses = Object.assign({}, state.addresses);
        addresses[address.addressId] = address;

        state.addressBookService.saveAddresses(addresses).then(() => {

            commit('addressBookAddressAdded', address);
        }).catch((err) => {

            // Error notification.
        });
    },
    addressBookRemoveAddress: ({ commit, state }, addressId) => {

        let addresses = Object.assign({}, state.addresses);
        delete addresses[addressId];

        state.addressBookService.saveAddresses(addresses).then(() => {

            commit('addressBookAddressRemoved', addressId);
        }).catch((err) => {

            // Error notification.
        });
    }
};

export default actions;
