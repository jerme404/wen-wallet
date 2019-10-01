<template>
    <v-layout
        column
        class="pa-3 no-select">
        <v-layout row shrink>
            <span class="body-2 secondary--text">
                {{ strings.balance || 'Balance' }}
            </span>
            <v-spacer></v-spacer>
        </v-layout>
        <v-layout row shrink class="">
            <span class="title">
                {{ `${balance.total.toFixed(coinConfig.coinUnitPlaces)} ${coinConfig.coinSymbol}` }}
            </span>
        </v-layout>
        <v-spacer></v-spacer>
        <v-layout column shrink class="pt-3">
            <v-layout row shrink>
                <span class="caption font-weight-medium success--text text--lighten-1">
                    {{ strings.unlocked || 'Unlocked' }}
                </span>
                <v-spacer></v-spacer>
                <span class="caption font-weight-medium error--text text--lighten-1">
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
</template>

<script>
import { CoinConfig } from '@/config';
import { mapGetters } from 'vuex';
import store from '@/store';

export default {
    name: 'balance',
    props: {
    },
    data () {
        return {
            coinConfig: CoinConfig
        };
    },
    computed: {
        ...mapGetters({
            strings: 'i18n/strings',
            balance: 'wallet/walletBalance'
        }),
        isMobile () {

            return this.$vuetify.breakpoint.smAndDown;
        },
        unlockedBalanceStyle () {

            let percentUnlocked = Math.floor((this.balance.unlocked / this.balance.total) * 100);

            return {
                'width': `${percentUnlocked}%`
            };
        },
    }
};
</script>

<style scoped>

</style>
