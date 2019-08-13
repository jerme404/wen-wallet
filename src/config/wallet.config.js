export default {
    // Wallet creation config.
    defaultLanguage: 'English',
    updateInterval: 45000, // ms
    // Remote RPC wallet config.
    remoteWallet: {
        address: 'http://192.168.1.122:3001',
        jsonRpc: 'json_rpc',
        rpcCredentials: {
            username: 'nerva',
            password: 'nerva'
        }
    },
    explorer: {
        api: 'https://us-central1-nerva-248022.cloudfunctions.net/nervaApi',
        txHashMask: 'https://explorer.getnerva.org/?hash=<hash>#blockchain_transaction',
        blockHashMask: 'https://explorer.getnerva.org/?hash=<hash>#blockchain_block'
    },
    tagline: 'Wen Wallet?'
};
