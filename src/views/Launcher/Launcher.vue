<template>
    <v-layout column justify-center class="no-select launcher">
        <v-layout row shrink align-center justify-center>
            <img
                src="@/assets/logo.png"
                class="launcher-logo"
                v-bind:class="{ 'launcher-logo-mobile': isMobile }">
        </v-layout>
        <v-layout row wrap shrink>
            <v-flex xs12 md6>

            </v-flex>
            <!--<v-flex xs12 md6>
                <v-layout row align-center justify-center>
                    <v-layout
                        column
                        shrink
                        align-center
                        class="launcher-button cursor-pointer"
                        v-bind:class="{ 'px-4 py-3 mx-2': isMobile, 'px-4 py-3 mx-3': !isMobile }">
                        <v-icon :size="isMobile? 36 : 48">fas fa-fw fa-cubes</v-icon>
                        <span class="pt-3" v-bind:class="{ 'caption font-weight-medium': isMobile }">Explorer</span>
                    </v-layout>
                    <v-layout
                        column
                        shrink
                        align-center
                        class="launcher-button cursor-pointer"
                        v-bind:class="{ 'px-4 py-3 mx-2': isMobile, 'px-4 py-3 mx-3': !isMobile }">
                        <v-icon :size="isMobile? 36 : 48">fas fa-fw fa-wallet</v-icon>
                        <span class="pt-3" v-bind:class="{ 'caption font-weight-medium': isMobile }">Wallet</span>
                    </v-layout>
                    <v-layout
                        column
                        shrink
                        align-center
                        class="launcher-button cursor-pointer"
                        v-bind:class="{ 'px-4 py-3 mx-2': isMobile, 'px-4 py-3 mx-3': !isMobile }">
                        <v-icon :size="isMobile? 36 : 48">fas fa-fw fa-screwdriver</v-icon>
                        <span class="pt-3" v-bind:class="{ 'caption font-weight-medium': isMobile }">Miner</span>
                    </v-layout>
                </v-layout>
            </v-flex>-->
        </v-layout>

        <span class="pa-3 headline">Nerva Unified Toolkit</span>
        <v-layout row shrink justify-center class="px-3">
            <v-flex xs12 md8 lg6 xl3>
                <v-layout
                    row
                    align-center
                    justify-center
                    class="py-3 mt-3 launcher-button-container">
                    <v-flex xs4>
                        <v-layout
                            column
                            shrink
                            class="pa-3 mx-3 launcher-button cursor-pointer">
                            <v-icon size="48">fas fa-cubes</v-icon>
                            <span class="pt-2">Explorer</span>
                        </v-layout>
                    </v-flex>
                    <v-flex xs4>
                        <v-layout
                            column
                            shrink
                            class="pa-3 mx-3 launcher-button cursor-pointer">
                            <v-icon size="48">fas fa-wallet</v-icon>
                            <span class="pt-2">Wallet</span>
                        </v-layout>
                    </v-flex>
                    <v-flex xs4>
                        <v-layout
                            column
                            shrink
                            class="pa-3 mx-3 launcher-button cursor-pointer">
                            <v-icon size="48">fas fa-screwdriver</v-icon>
                            <span class="pt-2">Miner</span>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-layout>
</template>

<script>
import { CoinConfig } from '@/config';
import { mapActions, mapGetters, mapState } from 'vuex';
import store from '@/store';

export default {
    name: 'launcher',
    components: {},
    props: {},
    data () {
        return {
            coinConfig: CoinConfig
        };
    },
    computed: {
        ...mapGetters({
            strings: 'i18n/strings'
        }),
        ...mapState({
            explorerInfo: state => state.explorer.explorerInfo
        }),
        explorerHeight () {

            return this.explorerInfo ? this.explorerInfo.height : undefined;
        },
        isMobile () {

            return this.$vuetify.breakpoint.smAndDown;
        },
    }
};
</script>

<style>
.launcher {
    /*background-image: linear-gradient( 109.6deg,  rgba(35,11,68,1) 11.2%, rgba(45,21,76,1) 91.1% );*/
    /*background-image: linear-gradient( 175.9deg,  rgba(70,80,98,1) 7%, rgba(90,104,127,1) 93.8% );*/
    /*background-image: linear-gradient( 109.6deg,  rgba(57,106,252,1) 11.2%, rgba(48,86,253,1) 91.1% );*/
    /*background-image: linear-gradient( 109.6deg,  rgba(212,80,80,1) 11.2%, rgba(177,57,57,1) 100.2% );*/
    /*background-image: linear-gradient( 247.3deg,  rgba(0,133,195,1) 49.6%, rgba(0,157,229,1) 95% );*/
    /*background-image: linear-gradient( 135deg, rgba(85, 168, 191, 1) 0%, rgba(99, 88, 145, 1) 100%);*/
    /*background-image: url('../../assets/cloud-bg.jpeg');
    background-position: center;
    background-size: cover;*/
}
.launcher-logo {
    width: 96px;
    height: auto;
}
.launcher-logo-mobile {
    width: 96px;
    height: auto;
}
.launcher-button-container {
    box-shadow: 0px -1px 0px rgba(255,255,255,0.2);
}
.launcher-button {
    box-shadow: 0px 0px 3px rgba(85, 168, 191, 1);
    border-radius: 8px;
}
.launcher-button:hover {
    background-color: rgba(85, 168, 191, 1);
}
.launcher-button, .launcher-button i {
    color: #828282 !important;
}
.launcher-button:hover, .launcher-button:hover i {
    color: #FEFEFE !important;
}
</style>
