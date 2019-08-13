export default class Address {

    constructor (address) {

        this.addressId = address.addressId || Date.now().toString();
        this.accountId = address.accountId;
        this.address = address.address;
        this.name = address.name;
        this.paymentId = address.paymentId != '' ? address.paymentId : undefined;
    }
};
