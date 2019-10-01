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
                md4
                xl3
                class="px-2"
                v-bind:class="{ 'pa-2': !isMobile }">
                <v-layout
                    column
                    fill-height
                    class="primary lighten-1 elevation-2">
                    <wallet-status></wallet-status>
                </v-layout>
            </v-flex>
            <v-flex
                xs12
                md4
                class="pa-2">
                <v-layout
                    column
                    fill-height
                    class="primary lighten-1 elevation-2">
                    <tx-chart></tx-chart>
                </v-layout>
            </v-flex>
        </v-layout>
        <v-layout row wrap class="no-grow" v-bind:class="{ 'px-2': !isMobile }">
            <v-flex xs12 xl10 offset-xl1 class="px-2">
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
    </v-layout>
</template>

<script>
import { CoinConfig } from '@/config';
import { mapActions, mapGetters, mapState } from 'vuex';
import store from '@/store';
const Balance = () => import('@/components/Balance');
const TxChart = () => import('./components/TxChart');
const TxList = () => import('@/components/TxList');
const WalletStatus = () => import('./components/WalletStatus');

export default {
    name: 'dashboard',
    components: {
        'balance': Balance,
        'tx-chart': TxChart,
        'tx-list': TxList,
        'wallet-status': WalletStatus
    },
    props: {},
    data () {
        return {
            coinConfig: CoinConfig
        };
    },
    computed: {
        ...mapGetters({
            strings: 'i18n/strings',
            balance: 'wallet/walletBalance',
            transfers: 'wallet/walletHistory'
        }),
        ...mapState({
            explorerInfo: state => state.explorer.explorerInfo,
            walletInfo: state => state.wallet.walletInfo
        }),
        explorerHeight () {

            return this.explorerInfo ? this.explorerInfo.height : undefined;
        },
        walletHeight () {

            return this.walletInfo ? this.walletInfo.height : undefined;
        },
        walletSyncPercent () {

            if (!this.explorerHeight || !this.walletHeight) {

                return 0;
            }

            return Math.floor((this.walletHeight / this.explorerHeight) * 100);
        },
        isMobile () {

            return this.$vuetify.breakpoint.smAndDown;
        },
    }
};
</script>

<style>

</style>
