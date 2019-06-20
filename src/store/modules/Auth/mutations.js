const mutations = {
    AUTHENTICATING: (state, authenticating) => {

        state.authenticating = authenticating;
    },
    AUTHENTICATED: (state) => {

        state.authenticating = false;
        state.authenticated = true;
    }
};

export default mutations;
