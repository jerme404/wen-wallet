module.exports = {
    root: true,
    env: {
        browser: true,
        es6: true,
        node: true,
        jest: true
    },
    extends: [
        'plugin:vue/essential',
    ],
    rules: {
        indent: ['error', 4],
        semi: ['error', 'always'],
        'vue/html-indent': ['error', 4, {
            'attribute': 1,
            'closeBracket': 1
        }],
        'quotes': ['error', 'single'],
        // 'vue/script-indent': ['error', 4],
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    },
    parserOptions: {
        parser: 'babel-eslint',
    },
};
