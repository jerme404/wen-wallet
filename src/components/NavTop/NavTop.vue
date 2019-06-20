<template>
    <v-layout
        row
        class="px-3 py-2 top-nav no-select elevation-1 primary"
        v-bind:class="{ 'py-3': !isMobile }">

        <div style="width: 22px;" v-if="isMobile"></div>
        <v-spacer v-if="isMobile"></v-spacer>

        <img
            src="@/assets/wen-logo.png"
            alt="Logo"
            class="nav-logo"
            v-bind:class="{ 'ml-2': !isMobile }">

        <v-layout row class="px-3" v-if="!isMobile">
            <router-link to="/" class="px-3 mx-1 nav-link" exact>
                <span class="nav-text">Dashboard</span>
            </router-link>
            <router-link to="/send" class="px-3 mx-1 nav-link" exact>
                <span class="nav-text">Send</span>
            </router-link>
            <router-link to="/receive" class="px-3 mx-1 nav-link" exact>
                <span class="nav-text">Receive</span>
            </router-link>
        </v-layout>

        <v-spacer></v-spacer>
        <router-link to="/settings" class="nav-link" exact>
            <v-icon size="22" class="cursor-pointer">fas fa-cog</v-icon>
        </router-link>

    </v-layout>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'navTop',
    props: {
        isMobile: Boolean
    },
    data () {
        return {};
    },
    computed: {
        currentRoute () {
            return this.$route.meta.title;
        }
    }
};
</script>

<style scoped>
.top-nav {
    flex-grow: 0;
    flex-shrink: 0;

    align-items: center;
}
.nav-logo {
    height: 32px;
    width: auto;
}
.nav-link, .nav-link i {
    color: #AEAEAE;
    font-size: 14px;
    text-decoration: none;
    text-transform: uppercase;
    font-weight: 700;
}
.nav-link:hover, .nav-link:hover i {
    color: #F7F7F7;
}
.nav-link.router-link-active,
.nav-link.router-link-exact-active,
.nav-link.router-link-active i,
.nav-link.router-link-exact-active i {
    cursor: default;
    color: #F7F7F7;
}
</style>
