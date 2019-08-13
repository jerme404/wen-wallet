<template>
    <v-layout column>
        <!-- Contacts list -->
        <v-layout
            row
            wrap
            class="no-grow primary"
            v-bind:class="{ 'px-3': !isMobile }">
            <!-- New contact -->
            <v-flex
                xs12
                lg10
                offset-lg1
                v-bind:class="{ 'pb-2': isMobile, 'pa-2': !isMobile }">
                <v-layout column class="pa-3 page-section primary lighten-1">
                    <v-layout row align-center>
                        <span class="section-title subheading">{{ strings.addresses || 'Addresses' }}</span>
                        <v-spacer></v-spacer>
                        <v-icon
                            v-if="!showNewAddress"
                            color="success"
                            size="16"
                            class="no-select cursor-pointer"
                            @click="openNewAddress">
                            fas fa-fw fa-plus
                        </v-icon>
                    </v-layout>
                    <v-expand-transition>
                        <v-layout
                            column
                            v-show="showNewAddress"
                            class="px-3 py-1 my-3 primary new-address">
                            <v-layout row align-center>
                                <v-flex xs11 md4 lg3>
                                    <v-text-field
                                        v-model="newAddress.name"
                                        class="px-1"
                                        dark
                                        color="#FAFAFA"
                                        :label="strings.name || 'Name'">
                                    </v-text-field>
                                </v-flex>
                                <v-spacer></v-spacer>
                                <v-icon
                                    color="success"
                                    size="18"
                                    class="mx-3 no-select cursor-pointer"
                                    @click="saveNewAddress">
                                    fas fa-check
                                </v-icon>
                                <v-icon
                                    color="error"
                                    size="18"
                                    class="no-select cursor-pointer"
                                    @click="cancelNewAddress">
                                    fas fa-times
                                </v-icon>
                            </v-layout>
                            <v-text-field
                                style="width: 100%;"
                                v-model="newAddress.address"
                                class="px-1"
                                dark
                                color="#FAFAFA"
                                :label="strings.address || 'Address'">
                            </v-text-field>
                            <!--<v-text-field
                                v-model="newAddress.paymentId"
                                class="px-1"
                                dark
                                color="#FAFAFA"
                                :label="strings.paymentId || 'Payment ID'">
                            </v-text-field>-->
                        </v-layout>
                    </v-expand-transition>
                    <v-layout
                        column
                        v-for="(address, index) in addresses"
                        :key="address.addressId"
                        class="py-2"
                        v-bind:class="{ 'row-divider': index != addresses.length - 1 }">
                        <v-layout row>
                            <span class="pb-1 list-address-name">{{ address.name }}</span>
                            <v-spacer></v-spacer>
                            <v-icon color="error" size="16" @click="deleteAddress(address.addressId)">fas fa-fw fa-times</v-icon>
                        </v-layout>
                        <span class="pb-1 address-wrap list-address">{{ address.address }}</span>
                        <span class="address-wrap list-paymentid">{{ address.paymentId }}</span>
                    </v-layout>
                </v-layout>
            </v-flex>
            <!-- Contacts list -->
        </v-layout>
    </v-layout>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import store from '@/store';

export default {
    name: 'addressBook',
    props: {},
    data () {
        return {
            newAddress: {
                name: '',
                address: '',
                paymentId: ''
            },
            showNewAddress: false
        };
    },
    watch: {
        addresses () {

            this.cancelNewAddress();
        }
    },
    computed: {
        ...mapGetters({
            strings: 'i18n/strings',
            addresses: 'addressBook/addressList'
        }),
        ...mapState({
        }),
        isMobile () {

            return this.$vuetify.breakpoint.smAndDown;
        },
        newAddressValid () {

            return this.newAddress.name != '' && this.newAddress.address != '';
        }
    },
    methods: {
        ...mapActions({
            addAddress: 'addressBook/addressBookAddAddress',
            removeAddress: 'addressBook/addressBookRemoveAddress'
        }),
        deleteAddress (addressId) {

            this.removeAddress(addressId);
        },
        openNewAddress () {

            this.showNewAddress = true;
        },
        cancelNewAddress () {

            this.newAddress = {
                address: '',
                name: '',
                paymentId: ''
            };
            this.showNewAddress = false;
        },
        saveNewAddress () {

            if (!this.newAddressValid) {

                return;
            }
            this.addAddress(this.newAddress);
        }
    }
};
</script>

<style scoped>
.list-address-name {
    font-size: 16px;
    font-weight: 700;
}
.address-wrap {
    word-break: break-all;
    text-align: left;
}
.list-address {
    font-size: 14px;
    font-weight: 500;
}
.list-paymentid {
    font-size: 14px;
}
.new-address {
    border-radius: 8px;
}
</style>
