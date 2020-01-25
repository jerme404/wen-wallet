<template>
    <v-layout column class="pb-3 primary">
        <v-layout row wrap shrink v-bind:class="{ 'pa-2': !isMobile }">
            <v-flex
                xs12
                md4
                xl3
                offset-xl1
                class="pa-2">
                <v-layout
                    column
                    fill-height
                    class="primary lighten-1 elevation-2">
                    <balance></balance>
                </v-layout>
            </v-flex>
            <v-flex
                xs12
                md8
                xl7
                class="px-2"
                v-bind:class="{ 'pa-2': !isMobile }">
                <v-layout
                    column
                    fill-height
                    class="primary lighten-1 elevation-2">
                    <v-layout column class="pa-3">
                        <v-layout row>
                            <v-flex xs12 md6>
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
                            </v-flex>
                            <v-layout row grow align-end justify-end v-if="!isMobile">
                                <v-btn
                                    flat
                                    color="success"
                                    class="ma-0"
                                    :disabled="sendButtonDisabled"
                                    @click="sendTx">
                                    SEND
                                </v-btn>
                            </v-layout>
                        </v-layout>
                        <v-layout row align-center>
                            <v-text-field
                                v-model="newTx.address"
                                class="px-1"
                                dark
                                hide-details
                                clearable
                                clear-icon="fas fa-times-circle"
                                color="#FAFAFA"
                                :label="strings.address || 'Address'">
                            </v-text-field>
                        </v-layout>
                        <v-btn
                            outline
                            color="success"
                            class="mt-4"
                            :disabled="sendButtonDisabled"
                            v-if="isMobile"
                            @click="sendTx">
                            SEND
                        </v-btn>
                    </v-layout>
                </v-layout>
            </v-flex>
        </v-layout>

        <v-layout row wrap class="no-grow" v-bind:class="{ 'px-2': !isMobile }">
            <v-flex xs12 xl10 offset-xl1 class="px-2" v-bind:class="{ 'pa-2': isMobile }">
                <v-layout column class="pa-3 primary lighten-1 elevation-2">
                    <v-layout row>
                        <span class="body-2 no-select secondary--text text--darken-1">
                            {{ `${strings.recentTransactions || 'Recent Transactions'} (${transfers.length})` }}
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
const Balance = () => import('@/components/Balance');
const TxList = () => import('@/components/TxList');

export default {
    name: 'send',
    components: {
        'balance': Balance,
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
                priority: 0
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
        },
        sendButtonDisabled () {

            return !this.newTx.address || !this.newTx.amount;
        }
    },
    methods: {
        ...mapActions({
            sweepAll: 'wallet/sweepAll',
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
            } else if (amount <= 0) {

                this.$notify.error('Invalid amount');
                return;
            }

            this.txConfirmDialog = true;
        },
        cancelSend () {

            this.txConfirmDialog = false;
        },
        confirmSend () {

            let amount = Number(this.newTx.amount) * Math.pow(10, CoinConfig.coinUnitPlaces),
                address = this.newTx.address,
                priority = this.newTx.priority;


            this.txSending = true;
            this.transfer({ amount, address, priority }).then(() => {

                this.txConfirmDialog = false;
                this.txSending = false;
                this.newTx = {
                    amount: '',
                    address: '',
                    priority: 0
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
