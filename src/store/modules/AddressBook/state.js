import AddressBookService from './services/AddressBook';
import Vue from 'vue';

const state = {
    addresses: {},
    addressBookService: new AddressBookService(),
    accountId: ''
};

export default state;
