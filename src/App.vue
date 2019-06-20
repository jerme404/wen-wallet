<template>
    <v-app class="dark-bg">

        <login v-if="!authenticated"></login>
        <nav-top app v-if="authenticated && showNav" :isMobile="isMobile"></nav-top>
        <v-content v-if="authenticated">
            <v-container fluid class="px-0 py-0">
                <router-view></router-view>
            </v-container>
        </v-content>
        <nav-bottom app v-if="authenticated && showNav && isMobile"></nav-bottom>
    </v-app>
</template>

<script>
import { mapState } from 'vuex';
import store from '@/store';
const Login = () => import('@/components/Login');
const NavBottom = () => import('@/components/NavBottom');
const NavTop = () => import('@/components/NavTop');

export default {
    name: 'App',
    components: {
        'login': Login,
        'nav-bottom': NavBottom,
        'nav-top': NavTop
    },
    data () {
        return { };
    },
    computed: {
        ...mapState({
            authenticated: state => state.auth.authenticated
        }),
        isMobile () {

            return this.$vuetify.breakpoint.smAndDown;
        },
        showNav () {

            return this.$route.meta.showNav;
        }
    }
};
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #FEFEFE;
    padding: 0px;
    margin: 0px;
}
.app-content {
    height: 100vh;
    width: 100vw;
    overflow: hidden;
}
.dark-bg {
    background-color: #202020 !important;
}
.light-bg {
    background-color: #EFF7F6 !important;
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
</style>
