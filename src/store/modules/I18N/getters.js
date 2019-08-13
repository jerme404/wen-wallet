const getters = {

    strings: state => {

        return state.languages[state.selectedLanguage].strings;
    }
};

export default getters;
