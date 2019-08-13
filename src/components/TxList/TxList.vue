<template>
    <v-flex xs12>
        <span v-if="transfers.length === 0" class="headline text-sm-left no-select">
            {{ strings.noTransactionsYet }}
        </span>
        <v-layout column v-else>
            <!-- Column headers -->
            <v-layout
                row
                wrap
                align-center
                class="py-2 table-row row-divider"
                v-if="$vuetify.breakpoint.lgAndUp">
                <v-flex xs6 md2 lg2 d-flex order-xs1 order-md1>
                    <span class="caption text-xs-left no-select font-weight-medium">
                        Date/Time
                    </span>
                </v-flex>
                <v-flex xs12 md8 lg7 d-flex order-xs3 order-md2>
                    <span class="caption no-select font-weight-medium">
                        Tx Hash
                    </span>
                </v-flex>
                <v-flex lg1 d-flex order-lg3 v-if="$vuetify.breakpoint.lgAndUp">
                    <span class="caption text-xs-left text-md-center no-select font-weight-medium">
                        Height
                    </span>
                </v-flex>
                <v-flex xs6 md2 lg2 d-flex order-xs2 order-md3 order-lg4>
                    <span class="caption no-select text-xs-right font-weight-medium">
                        Amount
                    </span>
                </v-flex>
            </v-layout>
            <!-- Data rows -->
            <v-layout
                row
                wrap
                align-center
                class="py-2 table-row"
                v-for="(tx, index) in transfers"
                :key="tx.txHash"
                v-bind:class="{ 'row-divider': index != transfers.length - 1 }">
                <v-flex xs6 md2 lg2 d-flex order-xs1 order-md1>
                    <span class="body-2 py-1 text-xs-left no-select">
                        {{ tx.timeStamp }}
                    </span>
                </v-flex>
                <v-flex xs12 md8 lg7 d-flex order-xs3 order-md2>

                    <v-layout
                        row
                        class="justify-start"
                        v-bind:class="{ 'justify-center': $vuetify.breakpoint.mdAndUp}">
                        <a
                            v-bind:href="tx.txHashLink"
                            rel="nofollow"
                            target="_blank"
                            class="tx-link py-1 body-1 text-xs-left text-md-center text-truncate font-mono">
                            {{ tx.txid }}
                        </a>
                    </v-layout>

                </v-flex>
                <v-flex lg1 d-flex order-lg3 v-if="$vuetify.breakpoint.lgAndUp">
                    <span class="body-2 py-1 text-xs-left text-md-center text-truncate no-select">
                        {{ tx.height }}
                    </span>
                </v-flex>
                <v-flex xs6 md2 lg2 d-flex order-xs2 order-md3 order-lg4>
                    <span
                        class="body-2 py-1 no-select text-xs-right"
                        v-bind:class="{
                            'success--text': tx.direction == 'in',
                            'error--text': tx.direction == 'out'
                        }">
                        {{ tx.direction == 'in' ? '+' : '-' }}{{ tx.txAmount.toFixed(coinConfig.coinUnitPlaces) }}
                    </span>
                </v-flex>
            </v-layout>
        </v-layout>
    </v-flex>
</template>

<script>
import { CoinConfig } from '@/config';
import { mapGetters } from 'vuex';
import store from '@/store';

export default {
    name: 'txList',
    props: {
        transfers: Array
    },
    data () {
        return {
            coinConfig: CoinConfig
        };
    },
    computed: {
        ...mapGetters({
            strings: 'i18n/strings'
        }),
        isMobile () {

            return this.$vuetify.breakpoint.smAndDown;
        },
    }
};
</script>

<style scoped>
.tx-link {
    color: #E7E8E9;
    text-decoration: none;
}
.tx-link:hover {
    color: #C1C2C3 !important;
}
</style>
