import Vue from 'vue';

const mutations = {
    addressBookSetAccountId: (state, accountId) => {

        Vue.set(state, 'accountId', accountId);
    },
    addressBookSetAddresses: (state, addresses) => {

        Vue.set(state, 'addresses', addresses);
    },
    addressBookAddressAdded: (state, address) => {

        Vue.set(state.addresses, address.addressId, address);
    },
    addressBookAddressRemoved: (state, addressId) => {

        Vue.delete(state.addresses, addressId);
    }
};

export default mutations;
