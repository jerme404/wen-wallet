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

        if (!state.walletInfo.transfers) {

            return [];
        }

        let transfers = Object.keys(state.walletInfo.transfers).reduce((txes, direction) => {

            state.walletInfo.transfers[direction].forEach((tx) => {

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

        if (!state.walletInfo.transfers || !state.walletInfo.transfers.in) {

            return [];
        }
        let transfers = [...state.walletInfo.transfers.in].map(tx => txModel(tx, 'in'));
        transfers.sort((a, b) => {

            return b.timestamp - a.timestamp;
        });
        return transfers;
    },
    walletHistoryOut: (state) => {

        if (!state.walletInfo.transfers || !state.walletInfo.transfers.out) {

            return [];
        }
        let transfers = [...state.walletInfo.transfers.out].map(tx => txModel(tx, 'out'));
        transfers.sort((a, b) => {

            return b.timestamp - a.timestamp;
        });
        return transfers;
    },
    txChart: (state) => {

        let transfers = state.walletInfo.transfers;
        if (!transfers || (!transfers.in && !transfers.out)) {

            return;
        }

        let dateFormat = 'YYYY-MM-DD',
            date = moment().subtract(6, 'd');

        let dateTotals = {};

        // Generate 7 days of dates.
        for (let i = 0; i < 7; i++) {

            dateTotals[date.format(dateFormat)] = {
                dayName: date.format('ddd'),
                in: 0,
                out: 0
            };
            date.add(1, 'd');
        }

        Object.keys(state.walletInfo.transfers).forEach((direction) => {

            state.walletInfo.transfers[direction].forEach((tx) => {

                let txDate = moment.unix(tx.timestamp).format(dateFormat);
                if (dateTotals[txDate]) {

                    dateTotals[txDate][direction] += decimalUnits(tx.amount);
                }
            });
        });

        let chartData = Object.values(dateTotals).reduce((chart, dateTotal) => {

            chart.labels.push(dateTotal.dayName);
            chart.in.push(dateTotal.in);
            chart.out.push(dateTotal.out);
            return chart;
        }, { labels: [], in: [], out: []});

        return {
            labels: chartData.labels,
            datasets: [
                {
                    label: 'In',
                    data: chartData.in,
                    type: 'line',
                    borderColor: '#11D9A0',
                    borderWidth: 2,
                    fill: false,
                    pointRadius: 0,
                    pointHitRadius: 2,
                    lineTension: 0
                },
                {
                    label: 'Out',
                    data: chartData.out,
                    type: 'line',
                    borderColor: '#E65055',
                    borderWidth: 2,
                    fill: false,
                    pointRadius: 0,
                    pointHitRadius: 2,
                    lineTension: 0
                }
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
