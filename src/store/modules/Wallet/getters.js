import { CoinConfig, WalletConfig } from '@/config';
import moment from 'moment';

const getters = {
    walletAddress: (state) => {

        if (!state.walletInfo.address || !state.walletInfo.address.address) {

            return;
        }
        return state.walletInfo.address.address;
    },
    walletBalance: (state) => {

        if (!state.walletInfo.balance) {

            return {
                total: 0,
                unlocked: 0,
                locked: 0
            };
        }
        let balance = state.walletInfo.balance;

        return {
            total: decimalUnits(balance.balance),
            unlocked: decimalUnits(balance.unlocked_balance),
            locked: decimalUnits(balance.balance - balance.unlocked_balance),
            unlockBlocks: balance.blocks_to_unlock
        };
    },
    walletHistory: (state) => {

        if (!state.transfers) {

            return [];
        }

        let transfers = Object.keys(state.transfers).reduce((txes, direction) => {

            state.transfers[direction].forEach((tx) => {

                txes.push(txModel(tx, direction));
            });
            return txes;
        }, []);
        transfers.sort((a, b) => {

            return b.timestamp - a.timestamp;
        });
        return transfers;
    },
    walletHistoryIn: (state) => {

        if (!state.transfers || !state.transfers.in) {

            return [];
        }
        let transfers = [...state.transfers.in].map(tx => txModel(tx, 'in'));
        transfers.sort((a, b) => {

            return b.timestamp - a.timestamp;
        });
        return transfers;
    },
    walletHistoryOut: (state) => {

        if (!state.transfers || !state.transfers.out) {

            return [];
        }
        let transfers = [...state.transfers.out].map(tx => txModel(tx, 'out'));
        transfers.sort((a, b) => {

            return b.timestamp - a.timestamp;
        });
        return transfers;
    },
    txChart: (state) => {

        let transfers = state.transfers ? {
            in: state.transfers.in || [],
            out: state.transfers.out || []
        } : {
            in: [],
            out: []
        };

        let pastDays = 6;
        if (state.txChartRange == state.txChartRanges.month) {

            pastDays = 30;
        } else if (state.txChartRange == state.txChartRanges.all) {

            let allTxTimes = transfers.in.concat(transfers.out).map(tx => tx.timestamp);
            if (allTxTimes.length > 0) {

                let firstTx = moment.unix(Math.min(...allTxTimes));
                pastDays = moment().diff(firstTx, 'd') + 1;
            }
        }

        let dateFormat = 'YYYY-MM-DD',
            date = moment().subtract(pastDays, 'd');

        let dateTotals = {};

        // Generate 7 days of dates.
        for (let i = 0; i <= pastDays; i++) {

            dateTotals[date.format(dateFormat)] = {
                dayName: date.format('L'),
                in: 0,
                out: 0
            };
            date.add(1, 'd');
        }

        Object.keys(state.transfers).forEach((direction) => {

            state.transfers[direction].forEach((tx) => {

                let txDate = moment.unix(tx.timestamp).format(dateFormat);
                if (dateTotals[txDate]) {

                    dateTotals[txDate][direction] += decimalUnits(tx.amount);
                }
            });
        });

        let chartData = Object.values(dateTotals).reduce((chart, dateTotal) => {

            chart.dates.push(dateTotal.dayName);
            chart.in.push(dateTotal.in);
            chart.out.push(dateTotal.out);
            return chart;
        }, { dates: [], in: [], out: []});

        return {
            yAxis: [
                {
                    decimalsInFloat: 2,
                    labels: {
                        show: false
                    }
                },
                {
                    decimalsInFloat: 2,
                    labels: {
                        show: false
                    }
                }
            ],
            xAxis: {
                categories: chartData.dates
            },
            series: [
                { name: 'Received', data: chartData.in },
                { name: 'Sent', data: chartData.out }
            ]
        };
    }
};

export default getters;

const decimalUnits = function (numIn) {

    let divisor = Math.pow(10, CoinConfig.coinUnitPlaces);
    return numIn / divisor;
};

const txModel = function (tx, direction) {

    return Object.assign({
        direction: direction,
        txAmount: decimalUnits(tx.amount),
        txFee: decimalUnits(tx.fee),
        timeStamp: moment.unix(tx.timestamp).format('L LT'),
        txHashLink: WalletConfig.explorer.txHashMask.replace('<hash>', tx.txid)
    }, tx);
};
