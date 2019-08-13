<template>
    <v-layout column v-bind:class="{ 'py-2': !isMobile }">
        <v-layout row wrap class="no-grow" v-bind:class="{ 'px-2': !isMobile }">
            <v-flex xs12 md4 xl3 offset-xl1 d-flex v-bind:class="{ 'pa-2': !isMobile, 'pt-1 px-1': isMobile }">
                <v-layout
                    column
                    shrink
                    class="px-3 py-2 no-select primary elevation-1"
                    v-if="balance">
                    <v-layout row shrink>
                        <span class="body-2 secondary--text text--darken-1">
                            {{ strings.balance || 'Balance' }}
                        </span>
                        <v-spacer></v-spacer>
                    </v-layout>
                    <v-layout row shrink class="py-2">
                        <span class="title">
                            {{ `${balance.total.toFixed(coinConfig.coinUnitPlaces)} ${coinConfig.coinSymbol}` }}
                        </span>
                    </v-layout>
                    <v-spacer></v-spacer>
                    <v-layout column shrink class="py-2">
                        <v-layout row shrink>
                            <span class="caption">
                                {{ strings.unlocked || 'Unlocked' }}
                            </span>
                            <v-spacer></v-spacer>
                            <span class="caption">
                                {{ strings.locked || 'Locked' }}{{ balance.unlockBlocks ? ` (${balance.unlockBlocks} blocks)` : '' }}
                            </span>
                        </v-layout>
                        <v-layout row shrink>
                            <span class="body-2">
                                {{ balance.unlocked.toFixed(coinConfig.coinUnitPlaces) }}
                            </span>
                            <v-spacer></v-spacer>
                            <span class="body-2">
                                {{ balance.locked.toFixed(coinConfig.coinUnitPlaces) }}
                            </span>
                        </v-layout>
                        <v-layout row shrink class="secondary" style="height: 4px;">
                            <v-layout
                                shrink
                                class="success darken-1"
                                :style="unlockedBalanceStyle">
                            </v-layout>
                            <v-spacer class="error darken-1"></v-spacer>
                        </v-layout>
                    </v-layout>
                </v-layout>
            </v-flex>
            <v-flex
                xs12
                md4
                xl3
                d-flex
                v-bind:class="{ 'pa-2': !isMobile, 'pt-1 px-1': isMobile }">
                <v-layout
                    column
                    shrink
                    class="px-3 py-2 no-select primary elevation-1">
                    <v-layout row>
                        <span class="body-2 secondary--text text--darken-1">
                            {{ strings.walletStatus || 'Wallet Status' }}
                        </span>
                        <v-spacer></v-spacer>
                    </v-layout>
                    <v-layout row shrink class="pb-2">
                        <v-layout column shrink align-start justify-end>
                            <span class="caption">
                                {{ strings.walletHeight || 'Wallet Height' }}
                            </span>
                            <span class="title">
                                {{ walletHeight || '-' }}
                            </span>
                        </v-layout>
                        <v-spacer></v-spacer>
                        <v-progress-circular
                            :rotate="360"
                            :size="80"
                            :width="8"
                            :value="walletSyncPercent"
                            color="success darken-1">
                            {{ walletSyncPercent }}%
                        </v-progress-circular>
                        <v-spacer></v-spacer>
                        <v-layout column shrink align-end justify-end>
                            <span class="caption">
                                {{ strings.explorerHeight || 'Explorer Height' }}
                            </span>
                            <span class="title">
                                {{ explorerHeight || '-' }}
                            </span>
                        </v-layout>
                    </v-layout>
                </v-layout>
            </v-flex>
            <v-flex
                xs12
                md4
                xl4
                d-flex
                v-bind:class="{ 'pa-2': !isMobile, 'pt-1 px-1': isMobile }">
                <v-layout
                    column
                    shrink
                    class="px-3 py-2 no-select primary elevation-1">
                    <v-layout row>
                        <span class="body-2 secondary--text text--darken-1">
                            {{ strings.sentReceived || 'Sent/Received' }}
                        </span>
                        <v-spacer></v-spacer>
                    </v-layout>
                    <v-layout column justify-center style="height: 100px;">
                        <canvas :ref="'txChart'" height="100"></canvas>
                    </v-layout>
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
    </v-layout>
</template>

<script>
import Chart from 'chart.js';
import { CoinConfig } from '@/config';
import { mapActions, mapGetters, mapState } from 'vuex';
import store from '@/store';
const TxList = () => import('@/components/TxList');

export default {
    name: 'dashboard',
    components: {
        'tx-list': TxList
    },
    props: {},
    data () {
        return {
            coinConfig: CoinConfig,
            txChart: undefined
        };
    },
    watch: {
        transfers () {

            this.setTxChart();
        }
    },
    computed: {
        ...mapGetters({
            strings: 'i18n/strings',
            balance: 'wallet/walletBalance',
            transfers: 'wallet/walletHistory',
            txChartData: 'wallet/txChart'
        }),
        ...mapState({
            explorerInfo: state => state.explorer.explorerInfo,
            walletInfo: state => state.wallet.walletInfo
        }),
        unlockedBalanceStyle () {

            let percentUnlocked = Math.floor((this.balance.unlocked / this.balance.total) * 100);

            return {
                'width': `${percentUnlocked}%`
            };
        },
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
    },
    methods: {
        setTxChart () {

            if (!this.txChartData) {

                return;
            }

            if (!this.txChart) {

                let txChart = this.$refs.txChart;
                let txCtx = txChart.getContext('2d');

                this.txChart = new Chart(txCtx, {
                    type: 'line',
                    data: this.txChartData,
                    options: {
                        legend: {
                            display: false
                        },
                        tooltips: {
                            mode: 'index',
                            xPadding: 8
                        },
                        responsive: false,
                        scales: {
                            xAxes: [{
                                gridLines: {
                                    display: false
                                }
                            }],
                            yAxes: [{
                                gridLines: {
                                    display: false
                                },
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }
                });
            } else {

                this.txChart.data = this.txChartData;
                this.txChart.update();
            }
        }
    },
    mounted () {

        this.setTxChart();
    }
};
</script>

<style>

</style>
