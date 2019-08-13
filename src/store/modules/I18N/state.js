import I18N from '@/i18n';

let defaultLanguage = I18N.defaultLanguage || 'en';

const state = {
    languages: I18N.languages,
    selectedLanguage: defaultLanguage,
    defaults: I18N.languages[defaultLanguage],
};

// Check browser language or previously selected language.

export default state;
