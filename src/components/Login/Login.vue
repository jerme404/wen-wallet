<template>
    <v-layout row class="px-3 login-page primary">
        <v-spacer></v-spacer>
        <v-layout column class="login-container">
            <v-layout row class="px-3 py-2 login-header">
                <img src="@/assets/wen-logo.png" class="mx-3 my-3 login-logo">
            </v-layout>
            <v-layout column class="px-3 mx-3 py-3">
                <v-text-field
                    class="px-1 login-input"
                    dark
                    color="#FAFAFA"
                    label="Wallet Name">
                </v-text-field>
                <v-text-field
                    class="px-1 mb-3 login-input"
                    dark
                    type="password"
                    color="#FAFAFA"
                    label="Password">
                </v-text-field>
                <span
                    class="mx-2 my-3 py-2 login-button no-select cursor-pointer"
                    @click="login">

                    <v-icon v-if="authenticating" color="#FEFEFE" size="18" class="loading-spinner">
                        fas fa-spin fa-spinner
                    </v-icon>
                    <span v-else>
                        Sign In
                    </span>
                </span>
                <span
                    class="signup-button no-select cursor-pointer">
                    create wallet
                </span>
            </v-layout>
        </v-layout>
        <v-spacer></v-spacer>
    </v-layout>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';
import store from '@/store';

export default {
    name: 'login',
    props: {
    },
    data() {
        return {
            username: '',
            password: ''
        };
    },
    computed: {
        ...mapState({
            authenticating: state => state.auth.authenticating
        })
    },
    methods: {
        ...mapActions({
            authenticate: 'authenticate'
        }),
        login () {

            this.authenticate({ username: this.username, password: this.password });
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
}
.login-container {
    border-radius: 12px;
    justify-content: center;
    align-items: center;
    flex-grow: 0;
}
.login-header {
    border-radius: 12px 12px 0px 0px;
    width: 100%;
    align-items: center;
    justify-content: center;
}
.login-logo {
    width: auto;
    height: 64px;
}
.login-input {
    width: 300px;
}
.login-button {
    font-size: 16px;
    color: #D3D3D3;
    text-transform: uppercase;
    border: 1px solid #D3D3D3;
}
.login-button:hover {
    color: #FAFAFA;
    border: 1px solid #FAFAFA;
}
.login-button.disabled {
    color: #DDD;
    border: 1px solid #DDD;
}
.login-button.disabled:hover {
    color: #DDD;
    border: 1px solid #DDD;
}
.signup-button {
    font-size: 18px;
    color: #D3D3D3;
}
.signup-button:hover {
    color: #FAFAFA;
}
.loading-spinner {

}
</style>
