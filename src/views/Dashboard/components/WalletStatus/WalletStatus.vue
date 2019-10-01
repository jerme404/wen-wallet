<template>
    <v-layout
        column
        fill-height
        class="pa-3 no-select">
        <v-layout row>

            <v-layout column grow align-start>
                <span class="body-2 secondary--text">
                    {{ strings.walletStatus || 'Wallet Status' }}
                </span>
                <v-spacer/>
                <span class="caption">{{ strings.walletHeight || 'Wallet Height' }}</span>
                <span>{{ walletHeight || '-' }}</span>
            </v-layout>

            <v-layout column shrink>
                <v-spacer/>
                <div id="syncDial"></div>
            </v-layout>

            <v-layout column grow align-end>
                <v-spacer/>
                <span class="caption">{{ strings.explorerHeight || 'Explorer Height' }}</span>
                <span>{{ explorerHeight || '-' }}</span>
            </v-layout>
        </v-layout>

    </v-layout>
</template>

<script>
import ApexCharts from 'apexcharts';
import { CoinConfig } from '@/config';
import { mapGetters, mapState } from 'vuex';
import store from '@/store';

export default {
    name: 'walletStatus',
    data () {
        return {
            coinConfig: CoinConfig,
            chartOptions: {
                chart: {
                    height: 200,
                    type: 'radialBar',
                },
                plotOptions: {
                    radialBar: {
                        startAngle: -90,
                        endAngle: 90,
                        dataLabels: {
                            name: {
                                show: false
                            },
                            value: {
                                offsetY: 0,
                                fontSize: '20px',
                                color: '#35A7FF',
                                formatter: function (val) {
                                    return `${val}%`;
                                }
                            }
                        },
                        track: {
                            show: false
                        },
                    }
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shade: 'dark',
                        type: 'horizontal',
                        gradientToColors: ['#13F2B3'],
                        shadeIntensity: 0.5,
                        inverseColors: false,
                        opacityFrom: 1,
                        opacityTo: 1,
                        stops: [0, 100]
                    },
                },
                stroke: {
                    dashArray: 2
                },
                series: [0],
                labels: ['Sync'],
            }
        };
    },
    watch: {
        walletSyncPercent () {

            this.setSyncDial();
        }
    },
    computed: {
        ...mapGetters({
            strings: 'i18n/strings'
        }),
        ...mapState({
            explorerInfo: state => state.explorer.explorerInfo,
            walletInfo: state => state.wallet.walletInfo
        }),
        isMobile () {

            return this.$vuetify.breakpoint.smAndDown;
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
    },
    methods: {
        setSyncDial () {

            if (!this.chart) {

                this.chartOptions.chart.height = this.isMobile ? 180 : 200;
                //this.chartOptions.stroke.width = this.isMobile ? 1 : 3;

                this.chart = new ApexCharts(document.getElementById('syncDial'), this.chartOptions);
                this.chart.render();
            }

            if (!this.walletSyncPercent) {

                return;
            }

            this.chart.updateSeries([this.walletSyncPercent], true);
        }
    },
    mounted () {

        this.setSyncDial();
    },
    beforeDestroy () {

        if (this.chart) {

            this.chart.destroy();
            this.chart = undefined;
        }
    }
};
</script>

<style scoped>
#syncDial {
    width: 100%;
    max-width: 100%;
    display: inline-block;
    box-sizing: border-box;
}
</style>
