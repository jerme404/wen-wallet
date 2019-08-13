<template>
    <v-layout column v-bind:class="{ 'py-2': !isMobile }">
        <v-layout row wrap class="no-grow" v-bind:class="{ 'px-2': !isMobile }">
            <v-flex xs12 xl10 offset-xl1 d-flex v-bind:class="{ 'pa-2': !isMobile, 'pt-1 px-1': isMobile }">
                <v-layout column shrink class="pa-3 primary elevation-1">
                    <span class="subheading receive-address">{{ walletAddress }}</span>
                </v-layout>
            </v-flex>
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
    </v-layout>
</template>

<script>
import { CoinConfig } from '@/config';
import { mapActions, mapGetters, mapState } from 'vuex';
import store from '@/store';
const TxList = () => import('@/components/TxList');

export default {
    name: 'receive',
    components: {
        'tx-list': TxList
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
            walletAddress: 'wallet/walletAddress',
            transfers: 'wallet/walletHistoryIn'
        }),
        ...mapState({

        }),
        isMobile () {

            return this.$vuetify.breakpoint.smAndDown;
        },
    }
};
</script>

<style scoped>
.receive-address {
    word-break: break-all;
}
</style>
