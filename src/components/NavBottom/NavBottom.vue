<template>
    <v-layout row class="px-3 py-2 bottom-nav no-select elevation-2">
        <router-link to="/" class="nav-link" exact>
            <span class="nav-text">Dashboard</span>
        </router-link>
        <router-link to="/send" class="nav-link" exact>
            <span class="nav-text">Send</span>
        </router-link>
        <router-link to="/receive" class="nav-link" exact>
            <span class="nav-text">Receive</span>
        </router-link>
    </v-layout>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'navBottom',
    props: {},
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
.bottom-nav {
    flex-grow: 0;
    flex-shrink: 0;
    background-color: #2A2B30;
    align-items: center;
}
.nav-link {
    color: #AEAEAE;
    font-size: 14px;
    text-decoration: none;
    text-transform: uppercase;
    font-weight: 700;
    flex-grow: 1;
}
.nav-link:hover {
    color: #F7F7F7;
}
.nav-link.router-link-active,
.nav-link.router-link-exact-active {
    cursor: default;
    color: #F7F7F7;
}
</style>
