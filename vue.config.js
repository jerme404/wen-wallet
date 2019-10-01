module.exports = {

    chainWebpack: config => {
        config.module
            .rule('images')
            .use('url-loader')
            .loader('url-loader')
            .tap(options => Object.assign(options, { limit: 10240 }));
    },

    publicPath: (process.env.npm_lifecycle_event.includes('android') || process.env.npm_lifecycle_event.includes('ios')) ?
        '' : process.env.VUE_PUBLIC_PATH,

    pluginOptions: {
        cordovaPath: 'cordova-app'
    }
};
