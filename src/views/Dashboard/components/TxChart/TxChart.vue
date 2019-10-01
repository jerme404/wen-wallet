<template>
    <v-layout
        column
        class="pa-3 no-select">
        <v-layout row>
            <span class="body-2 secondary--text">
                {{ strings.sentReceived || 'Sent/Received' }}
            </span>
            <v-spacer/>
            <v-layout shrink column align-center justify-center>
                <v-layout
                    row
                    shrink
                    class="font-weight-bold align-center secondary--text text--lighten-2 range-select">
                    <span
                        class="cursor-pointer"
                        @click="setChartRange(chartRanges.all)"
                        v-bind:class="{ 'info darken-1': chartRange == chartRanges.all }">
                        ALL
                    </span>
                    <span
                        class="cursor-pointer"
                        @click="setChartRange(chartRanges.month)"
                        v-bind:class="{ 'info darken-1': chartRange == chartRanges.month }">
                        MONTH
                    </span>
                    <span
                        class="cursor-pointer"
                        @click="setChartRange(chartRanges.week)"
                        v-bind:class="{ 'info darken-1': chartRange == chartRanges.week }">
                        WEEK
                    </span>
                </v-layout>
            </v-layout>
        </v-layout>
        <v-spacer/>
        <v-layout row class="mt-1">
            <div id="txChart"></div>
        </v-layout>
    </v-layout>
</template>

<script>
import ApexCharts from 'apexcharts';
import { CoinConfig } from '@/config';
import { mapActions, mapGetters, mapState } from 'vuex';
import store from '@/store';

export default {
    name: 'txChart',
    props: {
    },
    data () {
        return {
            coinConfig: CoinConfig,
            chartOptions: {
                dataLabels: {
                    enabled: false
                },
                tooltip: {
                    enabled: true,
                    theme: 'dark'
                },
                chart: {
                    height: 100,
                    width: '100%',
                    type: 'line',
                    stacked: false,
                    foreColor: '#EDF0F2',
                    sparkline: { enabled: true },
                    animations: { enabled: true },
                    toolbar: { show: false },
                },
                colors:['#11D9A0', '#F2555A'],
                grid: {
                    borderColor: '#3B4047',
                    position: 'back',
                },
                yaxis: [
                    { labels: { show: false } },
                    { labels: { show: false }, opposite: true }
                ],
                xaxis: {
                    type: 'datetime',
                    labels: { show: false },
                    axisTicks: { show: false },
                    tickAmount: 1
                },
                plotOptions: {

                },
                series: [
                    { name: 'Received', data: [] },
                    { name: 'Sent', data: [] }
                ],
                markers: {
                    size: 0,
                    strokeWidth: 0
                },
                stroke: {
                    width: 0,
                    dashArray: 0
                }
            }
        };
    },
    watch: {
        transfers () {

            this.setTxChart();
        },
        chartRange () {

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
            chartRange: state => state.wallet.txChartRange,
            chartRanges: state => state.wallet.txChartRanges
        }),
        isMobile () {

            return this.$vuetify.breakpoint.smAndDown;
        }
    },
    methods: {
        ...mapActions({
            setChartRange: 'wallet/setTxChartRange'
        }),
        setTxChart () {

            if (!this.chart) {

                this.chartOptions.chart.height = this.isMobile ? 100 : 70;
                this.chartOptions.stroke.width = this.isMobile ? 1 : 3;

                this.chart = new ApexCharts(document.getElementById('txChart'), this.chartOptions);
                this.chart.render();
            }

            if (!this.txChartData) {

                return;
            }

            this.chartOptions.yaxis = this.txChartData.yAxis;
            this.chartOptions.series = this.txChartData.series;
            this.chartOptions.xaxis.categories = this.txChartData.xAxis.categories;
            this.chart.updateOptions(this.chartOptions, false);
        }
    },
    mounted () {

        this.setTxChart();
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
#txChart {
    width: 100%;
    max-width: 100%;
    display: inline-block;
    box-sizing: border-box;
}
.range-select {
    /*border-radius: 16px;*/
    font-size: 10px;
}
.range-select span {
    box-shadow: 0px 0px 1px #FEFEFE inset;
    padding: 3px 8px 1px 8px;
}
.range-select span:hover {
    background-color: rgba(255,255,255,0.05);
}
</style>
