<template>
    <v-card class="primary white--text">
        <v-card-text class="primary">
            <v-layout column class="pt-3">
                <span class="body-1 no-select">Wallet Address</span>
                <span class="pt-1 pb-2 body-1 success--text address">{{ walletKeys.address }}</span>
                <span class="body-1 no-select">Public View</span>
                <span class="py-2 body-1 info--text address">{{ walletKeys.keys.public_view_key }}</span>
                <span class="body-1 no-select">Public Spend</span>
                <span class="py-2 body-1 info--text address">{{ walletKeys.keys.public_spend_key }}</span>
                <span class="body-1 no-select">Private View</span>
                <span class="py-2 body-1 error--text address">{{ walletKeys.keys.private_view_key }}</span>
                <span class="body-1 no-select">Private Spend</span>
                <span class="py-2 body-1 error--text address">{{ walletKeys.keys.private_spend_key }}</span>
                <span class="body-1 no-select">Seed Phrase</span>
                <span class="py-2 body-1 error--text">{{ walletKeys.keys.mnemonic }}</span>
            </v-layout>
        </v-card-text>
        <v-card-actions class="primary">
            <v-spacer></v-spacer>
            <v-btn flat dark :ripple="false" @click="closeKeys">GOT IT</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import { CoinConfig } from '@/config';
import { mapActions, mapGetters } from 'vuex';
import store from '@/store';

export default {
    name: 'walletKeys',
    props: {
        walletKeys: Object
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
    },
    methods: {
        ...mapActions({
            closeKeys: 'wallet/closeKeys'
        })
    }
};
</script>

<style scoped>
.address {
    word-break: break-all;
}
</style>
