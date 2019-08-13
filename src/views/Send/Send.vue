<template>
    <v-layout column v-bind:class="{ 'py-2': !isMobile }">
        <v-layout row wrap class="no-grow" v-bind:class="{ 'px-2': !isMobile }">
            <v-flex xs12 md4 offset-xl1 d-flex v-bind:class="{ 'pa-2': !isMobile, 'pt-1 px-1': isMobile }">
                <v-layout
                    column
                    class="px-3 py-2 primary elevation-1 no-select"
                    v-if="balance">
                    <v-layout row shrink>
                        <span class="body-2 secondary--text text--darken-1">
                            {{ strings.available || 'Available' }}
                        </span>
                        <v-spacer></v-spacer>
                    </v-layout>
                    <v-layout row shrink>
                        <span class="title pb-2 success--text font-weight-medium">
                            {{ balance.unlocked.toFixed(coinConfig.coinUnitPlaces) }} {{ coinConfig.coinSymbol }}
                        </span>
                        <v-spacer></v-spacer>
                    </v-layout>
                    <v-spacer></v-spacer>
                    <v-layout row shrink>
                        <v-layout column shrink align-start>
                            <span class="body-2 secondary--text text--darken-1">
                                {{ strings.total || 'Total' }}
                            </span>
                            <span class="subheading pb-2 font-weight-medium">
                                {{ balance.total.toFixed(coinConfig.coinUnitPlaces) }}
                            </span>
                        </v-layout>
                        <v-spacer></v-spacer>
                        <v-layout column shrink align-start>
                            <span class="body-2 secondary--text text--darken-1">
                                {{ strings.locked || 'Locked' }}
                            </span>
                            <span class="subheading pb-2 error--text font-weight-medium">
                                {{ balance.locked.toFixed(coinConfig.coinUnitPlaces) }}
                            </span>
                        </v-layout>
                    </v-layout>
                </v-layout>
            </v-flex>
            <v-flex xs12 md8 xl6 d-flex v-bind:class="{ 'pa-2': !isMobile, 'pt-1 px-1': isMobile }">
                <v-layout
                    column
                    class="px-3 pb-3 primary elevation-1">
                    <v-layout row align-center>
                        <v-text-field
                            v-model="newTx.amount"
                            class="px-1"
                            dark
                            hide-details
                            color="#FAFAFA"
                            @input="onAmountChange"
                            :suffix="coinConfig.coinSymbol"
                            :label="strings.amount || 'Amount'">
                        </v-text-field>
                        <v-spacer></v-spacer>
                        <span
                            class="mt-2 ml-3 send-button font-weight-bold no-select cursor-pointer"
                            v-bind:class="{ 'pt-3': !isMobile }"
                            @click="sendTx">
                            SEND
                        </span>
                    </v-layout>
                    <v-layout row align-center>
                        <v-text-field
                            v-model="newTx.address"
                            class="px-1"
                            dark
                            hide-details
                            color="#FAFAFA"
                            :label="strings.address || 'Address'">
                        </v-text-field>
                    </v-layout>
                    <v-spacer></v-spacer>
                </v-layout>
            </v-flex>
        </v-layout>
        <v-layout row wrap class="no-grow" v-bind:class="{ 'px-2': !isMobile }">
            <v-flex xs12 xl10 offset-xl1 v-bind:class="{ 'pa-2': !isMobile, 'pt-1 px-1': isMobile }">
                <v-layout column class="px-3 py-2 primary elevation-1">
                    <v-layout row>
                        <span class="body-2 no-select secondary--text text--darken-1">
                            {{ strings.recentTransactions || 'Recent Transactions' }}
                        </span>
                        <v-spacer></v-spacer>
                    </v-layout>
                    <tx-list :transfers="transfers"></tx-list>
                </v-layout>
            </v-flex>
        </v-layout>

        <v-dialog v-model="txConfirmDialog" lazy persistent scrollable width="600px">
            <v-card v-if="txConfirmDialog" class="primary lighten-1 no-select">
                <v-card-title class="primary lighten-1">
                    <span class="title secondary--text">Confirm Transfer</span>
                </v-card-title>
                <v-card-text class="secondary--text">
                    <v-layout column align-start>
                        <span class="caption">Amount</span>
                        <span class="pb-3 body-2">{{ newTx.amount }} {{ coinConfig.coinSymbol}}</span>
                        <span class="caption">Address</span>
                        <span class="body-2" style="text-align: left; word-break: break-all;">{{ newTx.address }}</span>
                    </v-layout>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                        flat
                        color="error"
                        @click="cancelSend"
                        :disabled="txSending">
                        Cancel
                    </v-btn>
                    <v-btn
                        flat
                        color="success"
                        @click="confirmSend"
                        :loading="txSending"
                        :disabled="txSending">
                        Transfer
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
import { CoinConfig } from '@/config';
import { mapActions, mapGetters, mapState } from 'vuex';
import store from '@/store';
const TxList = () => import('@/components/TxList');

export default {
    name: 'send',
    components: {
        'tx-list': TxList
    },
    props: {},
    data () {
        return {
            txConfirmDialog: false,
            txSending: false,
            newTx: {
                amount: '',
                address: '',
                paymentId: ''
            },
            coinConfig: CoinConfig
        };
    },
    computed: {
        ...mapGetters({
            strings: 'i18n/strings',
            balance: 'wallet/walletBalance',
            transfers: 'wallet/walletHistoryOut'
        }),
        ...mapState({
            walletAddress: state => state.wallet.walletAddress
        }),
        isMobile () {

            return this.$vuetify.breakpoint.smAndDown;
        }
    },
    methods: {
        ...mapActions({
            transfer: 'wallet/transfer'
        }),
        onAmountChange (newAmount) {

            let amount = this.newTx.amount;

            let reg = /^\d*\.?\d*$/;
            if (!reg.test(amount)) {

                this.$nextTick(() => {
                    this.$set(this.newTx, 'amount', amount.slice(0, -1));
                });
            }
        },
        sendTx () {

            if (!this.newTx.address || !this.newTx.amount) {

                this.$notify.error('Amount and address are required');
                return;
            }

            let amount = Number(this.newTx.amount);

            this.$nextTick(() => {

                this.$set(this.newTx, 'amount', amount.toFixed(CoinConfig.coinUnitPlaces));
            });

            if (amount > this.balance.unlocked) {

                this.$notify.error('Not enough funds');
                return;
            }

            this.txConfirmDialog = true;
        },
        cancelSend () {

            this.txConfirmDialog = false;
        },
        confirmSend () {

            let amount = Number(this.newTx.amount) * Math.pow(10, CoinConfig.coinUnitPlaces);
            let address = this.newTx.address;
            //let paymentId = this.newTx.paymentId;

            this.txSending = true;
            this.transfer({ amount, address }).then(() => {

                this.txConfirmDialog = false;
                this.txSending = false;
                this.newTx = {
                    amount: '',
                    address: '',
                    paymentId: ''
                };
            }).catch((err) => {

                this.txConfirmDialog = false;
                this.txSending = false;
            });
        }
    }
};
</script>

<style scoped>

</style>
