<template>
    <v-layout column class="primary">
        <v-flex d-flex shrink>
            <v-layout row align-center class="pa-3 no-select">
                <v-spacer v-if="isMobile"></v-spacer>
                <img
                    src="@/assets/logo.png"
                    class="login-logo"
                    v-bind:class="{ 'login-logo-mobile': isMobile }">
                <v-spacer></v-spacer>
                <login-menu v-if="!isMobile" :activeTab="activeTab" @setActiveTab="setActiveTab"></login-menu>
            </v-layout>
        </v-flex>
        <v-flex fill-height d-flex>
            <v-layout column align-center justify-center>
                <span class="py-2 display-1 no-select">{{ tagline }}</span>
                <v-layout column shrink class="pa-3 login-container" v-if="activeTab == 'create'">
                    <v-text-field
                        v-model="username"
                        class="px-1 login-input"
                        dark
                        color="#FAFAFA"
                        :label="strings.walletName">
                    </v-text-field>
                    <v-text-field
                        v-model="password"
                        class="px-1 login-input"
                        dark
                        type="password"
                        color="#FAFAFA"
                        :label="strings.password">
                    </v-text-field>
                    <v-text-field
                        v-model="passwordConfirm"
                        class="px-1 login-input"
                        dark
                        type="password"
                        color="#FAFAFA"
                        v-on:keyup.enter="createWallet"
                        :label="strings.confirmPassword">
                    </v-text-field>
                    <v-btn
                        depressed
                        dark
                        color="info"
                        :loading="walletLoading"
                        :disabled="createDisabled"
                        @click="createWallet">
                        {{ strings.createWallet }}
                    </v-btn>
                </v-layout>
                <v-layout column shrink class="pa-3 login-container" v-else-if="activeTab == 'import'">
                    <v-text-field
                        v-model="username"
                        class="px-1 login-input"
                        dark
                        color="#FAFAFA"
                        validate-on-blur
                        :label="strings.walletName">
                    </v-text-field>
                    <v-text-field
                        v-model="seed"
                        class="px-1 login-input"
                        dark
                        color="#FAFAFA"
                        :label="strings.seedPhrase">
                    </v-text-field>
                    <v-text-field
                        v-model="password"
                        class="px-1 login-input"
                        dark
                        type="password"
                        color="#FAFAFA"
                        :label="strings.password">
                    </v-text-field>
                    <v-text-field
                        v-model="passwordConfirm"
                        class="px-1 login-input"
                        dark
                        type="password"
                        color="#FAFAFA"
                        v-on:keyup.enter="importWallet"
                        :label="strings.confirmPassword">
                    </v-text-field>
                    <v-btn
                        depressed
                        dark
                        color="info"
                        :loading="walletLoading"
                        :disabled="importDisabled"
                        @click="importWallet">
                        {{ strings.importWallet }}
                    </v-btn>
                </v-layout>
                <v-layout column shrink class="pa-3 login-container" v-else>
                    <v-text-field
                        v-model="username"
                        class="px-1 login-input"
                        dark
                        color="#FAFAFA"
                        :label="strings.walletName">
                    </v-text-field>
                    <v-text-field
                        v-model="password"
                        class="px-1 login-input"
                        dark
                        type="password"
                        color="#FAFAFA"
                        v-on:keyup.enter="openWallet"
                        :label="strings.password">
                    </v-text-field>
                    <v-btn
                        class="mt-4"
                        depressed
                        dark
                        color="info"
                        :loading="walletLoading"
                        :disabled="openDisabled"
                        @click="openWallet">
                        {{ strings.openWallet }}
                    </v-btn>
                </v-layout>
            </v-layout>
        </v-flex>
        <v-flex shrink class="pa-3">
            <login-menu v-if="isMobile" :activeTab="activeTab" @setActiveTab="setActiveTab"></login-menu>
        </v-flex>
    </v-layout>
</template>

<script>
import { WalletConfig } from '@/config';
import { mapActions, mapGetters, mapState } from 'vuex';
import store from '@/store';
const LoginMenu = () => import('./components/LoginMenu');

export default {
    name: 'login',
    components: {
        'login-menu': LoginMenu
    },
    props: {
    },
    data() {
        return {
            tagline: WalletConfig.tagline,
            username: '',
            password: '',
            passwordConfirm: '',
            seed: '',
            activeTab: 'open',
            rules: {
                required: v => !!value || this.strings.required,
                minPassword: v => v.length >= 8 || 'Min 8 characters',
                passwordMatch: v => v == this.passwordCreate || this.strings.passwordMatch
            },
        };
    },
    computed: {
        ...mapGetters({
            strings: 'i18n/strings'
        }),
        ...mapState({
            walletLoading: state => state.wallet.walletLoading
        }),
        isMobile () {

            return this.$vuetify.breakpoint.smAndDown;
        },
        openDisabled () {

            return this.walletLoading || !this.username || !this.password;
        },
        createDisabled () {

            return this.walletLoading || !this.username || !this.password || !this.passwordConfirm;
        },
        importDisabled () {

            return this.walletLoading || !this.username || !this.password || !this.passwordConfirm || !this.seed;
        }
    },
    methods: {
        ...mapActions({
            authenticate: 'auth/authenticate',
            walletCreate: 'wallet/createWallet',
            walletImport: 'wallet/importWallet',
            walletOpen: 'wallet/openWallet'
        }),
        setActiveTab (tab) {

            if (this.activeTab == tab) {

                return;
            }
            this.password = '';
            this.passwordConfirm = '';
            this.activeTab = tab;
        },
        createWallet () {

            if (this.walletLoading) {

                return;
            }
            if (this.username.length === 0) {

                return;
            }
            if (this.password.length === 0 || this.password != this.passwordConfirm) {

                return;
            }
            this.walletCreate({
                walletName: this.username,
                password: this.password
            });
        },
        openWallet () {

            if (this.walletLoading) {

                return;
            }
            if (this.username.length === 0 || this.password.length === 0) {

                return;
            }
            this.walletOpen({
                walletName: this.username,
                password: this.password
            });
        },
        importWallet () {

            if (this.walletLoading) {

                return;
            }
            if (this.username.length === 0) {

                return;
            }
            if (this.password.length === 0 || this.password != this.passwordConfirm) {

                return;
            }
            if (this.seed.length == 0) {

                return;
            }
            this.walletImport({
                walletName: this.username,
                password: this.password,
                seed: this.seed
            });
        }
    }
};
</script>

<style scoped>
.login-page {
    height: 100vh;
    width: 100vw;
    justify-content: center;
    align-items: center;
    /*background-image: linear-gradient( 109.6deg,  rgba(35,11,68,1) 11.2%, rgba(45,21,76,1) 91.1% );*/
    /*background-image: linear-gradient( 175.9deg,  rgba(70,80,98,1) 7%, rgba(90,104,127,1) 93.8% );*/
    /*background-image: linear-gradient( 109.6deg,  rgba(57,106,252,1) 11.2%, rgba(48,86,253,1) 91.1% );*/
    /*background-image: linear-gradient( 109.6deg,  rgba(212,80,80,1) 11.2%, rgba(177,57,57,1) 100.2% );*/
    /*background-image: linear-gradient( 247.3deg,  rgba(0,133,195,1) 49.6%, rgba(0,157,229,1) 95% );*/
}
.login-container {
    width: 360px;
    max-width: calc(100vw);
}
.login-header {
    border-radius: 12px 12px 0px 0px;
    width: 100%;
    align-items: center;
    justify-content: center;
}
.login-logo {
    width: auto;
    height: 48px;
}
.login-logo-mobile {
    width: auto;
    height: 48px;
}
</style>
