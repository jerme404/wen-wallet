export default {
    // Wallet creation config.
    defaultLanguage: 'English',
    updateInterval: 45000, // ms
    // Default remote RPC wallet config.
    remoteWallet: {
        rpcAddress: 'http://192.168.1.122:3001',
        jsonRpc: 'json_rpc',
        rpcLogin: {
            rpcUser: 'nerva',
            rpcPassword: 'nerva'
        }
    },
    explorer: {
        api: 'https://us-central1-nerva-248022.cloudfunctions.net/nervaApi',
        txHashMask: 'https://getnerva.org/explorer/detail/<hash>',
        blockHashMask: 'https://getnerva.org/explorer/detail/<hash>'
    },
    tagline: 'Nerva Wallet'
};
