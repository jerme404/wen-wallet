<template>
    <v-layout column class="pb-3 primary">
        <v-layout row wrap shrink v-bind:class="{ 'pa-2': !isMobile }">
            <v-flex
                xs12
                xl10
                offset-xl1
                class="pa-2">
                <v-layout
                    column
                    fill-height
                    class="primary lighten-1 elevation-2">
                    <v-layout row align-center justify-center class="pa-3">
                        <span class="subheading font-weight-medium receive-address">{{ walletAddress }}</span>
                    </v-layout>
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
