<template>
    <v-layout column class="primary">
        <v-layout row class="pa-3">
            <span class="title">
                Connection Settings
            </span>
        </v-layout>
        <v-layout column class="px-3 pt-1 pb-3">
            <v-layout row align-center class="py-1">
                <v-flex xs8 class="pr-2">
                    <v-text-field
                        v-model="walletAddress"
                        class=""
                        dark
                        hide-details
                        color="#FAFAFA"
                        label="Wallet Address">
                    </v-text-field>
                </v-flex>
                <v-flex xs4>
                    <v-text-field
                        v-model="walletPort"
                        class=""
                        dark
                        hide-details
                        type="number"
                        prefix=":"
                        color="#FAFAFA"
                        label="Port">
                    </v-text-field>
                </v-flex>
            </v-layout>
            <v-flex xs12 class="py-1">
                <v-text-field
                    v-model="rpcUsername"
                    class=""
                    dark
                    hide-details
                    color="#FAFAFA"
                    label="RPC Username">
                </v-text-field>
            </v-flex>
            <v-flex xs12 class="py-1">
                <v-text-field
                    v-model="rpcPassword"
                    class=""
                    dark
                    hide-details
                    type="password"
                    color="#FAFAFA"
                    label="RPC Password">
                </v-text-field>
            </v-flex>
        </v-layout>
        <v-layout row align-center justify-end>
            <v-btn
                flat
                color="error"
                @click="$emit('cancel')">
                Cancel
            </v-btn>
            <v-btn
                flat
                color="success"
                @click="save">
                Save
            </v-btn>
        </v-layout>
    </v-layout>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import store from '@/store';

export default {
    name: 'loginSettings',
    props: {},
    data () {
        return {
            walletAddress: 'http://',
            walletPort: '',
            rpcUsername: '',
            rpcPassword: ''
        };
    },
    computed: {
        ...mapGetters({
            strings: 'i18n/strings'
        }),
        ...mapState({
            walletService: state => state.wallet.walletService
        }),
        isMobile () {

            return this.$vuetify.breakpoint.smAndDown;
        },
    },
    methods: {
        save () {

            let rpcConnection = {
                rpcAddress: this.walletAddress.includes('http') ?
                    `${this.walletAddress}:${this.walletPort}` :
                    `http://${this.walletAddress}:${this.walletPort}`,
                rpcUser: this.rpcUsername,
                rpcPassword: this.rpcPassword
            };

            this.walletService.rpcConnection = rpcConnection;
            this.$emit('cancel');
        }
    }
};
</script>

<style scoped>
.login-tab {
    color: #AEAEAE;
font-weight: 600;

}
.tab-active {
    color: #7D83FF;

}
</style>
