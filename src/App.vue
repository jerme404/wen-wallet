<template>
    <v-app class="primary">
        <login v-if="!address"></login>
        <v-toolbar
            app
            fixed
            flat
            color="primary lighten-1 elevation-1"
            v-if="address && showNav">
            <nav-top app :isMobile="isMobile"></nav-top>
        </v-toolbar>
        <v-content v-if="address">
            <v-container fluid fill-height class="pa-0 primary darken-1">
                <router-view></router-view>
            </v-container>
            <v-dialog
                v-model="showKeys"
                scrollable
                persistent
                lazy
                width="700">
                <wallet-keys
                    v-if="showKeys && walletKeys"
                    :walletKeys="walletKeys">
                </wallet-keys>
            </v-dialog>
        </v-content>
        <v-footer
            app
            fixed
            flat
            color="primary darken-1"
            class="elevation-2"
            v-if="address && showNav && isMobile">
            <nav-bottom app ></nav-bottom>
        </v-footer>
    </v-app>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import store from '@/store';
const Login = () => import('@/components/Login');
const NavBottom = () => import('@/components/NavBottom');
const NavTop = () => import('@/components/NavTop');
const WalletKeys = () => import('@/components/WalletKeys');

export default {
    name: 'App',
    components: {
        'login': Login,
        'nav-bottom': NavBottom,
        'nav-top': NavTop,
        'wallet-keys': WalletKeys
    },
    data () {
        return {};
    },
    watch: {
        address (address) {

            return address ? this.onSignIn() : this.onSignOut();
        }
    },
    computed: {
        ...mapState({
            address: state => state.wallet.walletInfo.address,
            walletKeys: state => state.wallet.walletKeyDisplay
        }),
        isMobile () {

            return this.$vuetify.breakpoint.smAndDown;
        },
        showNav () {

            return this.$route.meta.showNav;
        },
        showKeys () {

            return !!this.walletKeys;
        }
    },
    mounted () {

        this.loadWallet();
    },
    methods: {
        ...mapActions({
            loadExplorer: 'explorer/explorerLoad',
            unloadExplorer: 'explorer/explorerUnload',
            loadWallet: 'wallet/walletLoad'
        }),
        onSignIn () {

            this.loadExplorer();
        },
        onSignOut () {

            this.unloadExplorer();
        }
    }
};
</script>

<style>
body {
    background-color: #2C3033;
}
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #E7E8E9;
    font-size: 16px;
    padding: 0px;
    margin: 0px;
}
.font-mono {
    font-family: 'B612 Mono', monospace !important;
}
.no-select {
    user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    -webkit-touch-callout: none;
    -o-user-select: none;
    -moz-user-select: none;
}
.cursor-pointer {
    cursor: pointer;
}
.cursor-default {
    cursor: default;
}
.row-divider {
    box-shadow: 0px -1px 0px 0px rgba(102,102,102,0.43) inset;
}
.no-grow {
    flex-grow: 0;
}
.nerva-gradient {
    background-image: linear-gradient( 135deg, rgba(85, 168, 191, 1) 0%, rgba(99, 88, 145, 1) 100%);
}
.wen-toast {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    font-weight: 500;
    font-size: 16px;
    background: #191919 !important;
    max-width: calc(100vw - 32px);
    user-select: none;
    word-wrap: break-word;
    -webkit-user-select: none;
    -ms-user-select: none;
    -webkit-touch-callout: none;
    -o-user-select: none;
    -moz-user-select: none;
}
.wen-toast-info {
    box-shadow: 3px 0px 0px 0px #39A0ED inset;
}
.wen-toast-success {
    box-shadow: 3px 0px 0px 0px #0EB384 inset;
}
.wen-toast-error {
    box-shadow: 3px 0px 0px 0px #F2555A inset;
}
</style>
