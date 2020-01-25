<template>
    <v-layout row grow class="no-select">
        <v-flex xs12 xl10 offset-xl1>
            <v-layout row align-center>
                <v-layout row grow align-center v-if="!isMobile">
                    <img
                        src="@/assets/nerva-wallet.png"
                        alt="Logo"
                        class="nav-logo">
                </v-layout>
                <v-layout row grow align-center v-else>
                    <v-flex xs3>
                        <v-layout align-center justify-start>
                            <img
                                src="@/assets/logo.png"
                                alt="Logo"
                                class="nav-logo-mobile">
                        </v-layout>
                    </v-flex>
                    <v-flex xs6>
                        <v-layout row align-center justify-center>
                            <span class="subheading font-weight-medium secondary--text text--lighten-1">
                                {{ currentRoute }}
                            </span>
                        </v-layout>
                    </v-flex>
                    <v-flex xs3>
                        <v-layout row align-center justify-end>
                            <v-menu bottom left>
                                <v-icon
                                    slot="activator"
                                    size="16"
                                    class="nav-link cursor-pointer">
                                    fas fa-fw fa-ellipsis-v
                                </v-icon>
                                <v-layout column class="primary darken-1">
                                    <v-layout
                                        row
                                        align-center
                                        class="px-3 py-2 menu-link cursor-pointer no-select"
                                        @click="showWalletKeys">
                                        <v-icon size="18" color="accent">fas fa-fw fa-sign-out-alt</v-icon>
                                        <span class="px-3">{{ strings.walletKeys || 'Wallet Keys' }}</span>
                                    </v-layout>
                                    <v-divider></v-divider>
                                    <v-layout
                                        row
                                        align-center
                                        class="px-3 py-2 menu-link cursor-pointer no-select"
                                        @click="signOut">
                                        <v-icon size="18" color="accent">fas fa-fw fa-sign-out-alt</v-icon>
                                        <span class="px-3">{{ strings.signOut || 'Sign Out' }}</span>
                                    </v-layout>
                                </v-layout>
                            </v-menu>
                        </v-layout>
                    </v-flex>
                </v-layout>
                <v-layout
                    row
                    shrink
                    align-center
                    class="px-3"
                    v-if="!isMobile">
                    <router-link to="/" class="px-2 mx-1 py-2 nav-link" exact>
                        <span>{{ strings.dashboard || 'Dashboard' }}</span>
                    </router-link>
                    <router-link to="/send" class="px-2 mx-1 py-2 nav-link" exact>
                        <span>{{ strings.send || 'Send' }}</span>
                    </router-link>
                    <router-link to="/receive" class="px-2 mx-1 py-2 nav-link" exact>
                        <span>{{ strings.receive || 'Receive' }}</span>
                    </router-link>
                </v-layout>
                <v-menu bottom left v-if="!isMobile">
                    <v-icon
                        slot="activator"
                        size="16"
                        class="nav-link cursor-pointer">
                        fas fa-fw fa-ellipsis-v
                    </v-icon>
                    <v-layout column class="primary darken-1">
                        <!-- Commenting out for first release since settings page is empty -->
                        <!--<router-link to="/settings" exact>
                            <v-layout
                                row
                                align-center
                                class="px-3 py-2 menu-link cursor-pointer no-select">
                                <v-icon size="18" color="accent">fas fa-fw fa-cog</v-icon>
                                <span class="px-3">{{ strings.settings || 'Settings' }}</span>
                            </v-layout>
                        </router-link>
                        <v-divider></v-divider>-->
                        <v-layout
                            row
                            align-center
                            class="px-3 py-2 menu-link cursor-pointer no-select"
                            @click="showWalletKeys">
                            <v-icon size="18" color="accent">fas fa-fw fa-sign-out-alt</v-icon>
                            <span class="px-3">{{ strings.walletKeys || 'Wallet Keys' }}</span>
                        </v-layout>
                        <v-divider></v-divider>
                        <v-layout
                            row
                            align-center
                            class="px-3 py-2 menu-link cursor-pointer no-select"
                            @click="signOut">
                            <v-icon size="18" color="accent">fas fa-fw fa-sign-out-alt</v-icon>
                            <span class="px-3">{{ strings.signOut || 'Sign Out' }}</span>
                        </v-layout>
                    </v-layout>
                </v-menu>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import store from '@/store';

export default {
    name: 'navTop',
    props: {
        isMobile: Boolean
    },
    computed: {
        ...mapGetters({
            strings: 'i18n/strings'
        }),
        currentRoute () {

            return this.strings[this.$route.meta.title] || this.$route.meta.title;
        }
    },
    methods: {
        ...mapActions({
            closeWallet: 'wallet/closeWallet',
            getKeys: 'wallet/getKeys'
        }),
        showWalletKeys () {

            this.getKeys();
        },
        signOut () {

            this.closeWallet();
            this.$router.push({ name: 'dashboard' });
        }
    }
};
</script>

<style scoped>
.nav-logo {
    height: 42px;
    width: auto;
}
.nav-logo-mobile {
    height: 36px;
    width: auto;
}
.nav-link{
    color: #AEAEAE;
    font-size: 14px;
    text-decoration: none;
    text-transform: uppercase;
    font-weight: 700;
}
.nav-link:hover, .nav-link:hover i {
    color: #EDEFF0;
}
.router-link-active.nav-link,
.router-link-exact-active.nav-link {
    cursor: default;
    color: #EDEFF0;
}
.menu-link {
    color: #AEAEAE;
    font-size: 16px;
    font-weight: 500;
    text-decoration: none;
}
.menu-link:hover {
    color: #EDEFF0;
}
.router-link-active .menu-link,
.router-link-exact-active .menu-link {
    cursor: default;
    color: #FAFBFC;
}
</style>
