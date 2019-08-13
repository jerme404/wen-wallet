<template>
    <v-layout row class="no-select">
        <v-flex xs4 d-flex align-center>
            <router-link to="/" class="nav-link" exact>
                <span class="nav-text">{{ strings.dashboard || 'Dashboard' }}</span>
            </router-link>
        </v-flex>
        <v-flex xs4 d-flex align-center>
            <router-link to="/send" class="nav-link" exact>
                <span class="nav-text">{{ strings.send || 'Send' }}</span>
            </router-link>
        </v-flex>
        <v-flex xs4 d-flex align-center>
            <router-link to="/receive" class="nav-link" exact>
                <span class="nav-text">{{ strings.receive || 'Receive' }}</span>
            </router-link>
        </v-flex>
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
        ...mapGetters({
            strings: 'i18n/strings',
        }),
        currentRoute () {
            return this.$route.meta.title;
        }
    }
};
</script>

<style scoped>
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
