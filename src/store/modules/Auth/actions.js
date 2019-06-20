const actions = {
    authenticate: ({ commit, dispatch, state }, credentials) => {

        commit('AUTHENTICATING', true);
        return setTimeout(() => {

            commit('AUTHENTICATED');
        }, 1000);
    }
};

export default actions;
