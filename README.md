# wen-wallet

![dashboard screenshot](docs/img/dashboard-screenshot.png)

## Project setup

#### Install vue-cli dev tools

```bash
npm install vue-cli -g
```

#### Clone the project and install dependencies

```bash
git clone https://github.com/jerme404/wen-wallet
cd wen-wallet
npm install
```

#### Compile with hot-reloading for development

```bash
npm run dev
```

#### Compile and minify for production

```bash
npm run build
```

#### Build with URL path

Set `VUE_PUBLIC_PATH=/<path>/` in `./env.withpath`

```bash
npm run build-with-path
```

#### Hosting
Some specific configuration may be needed depending on your web server.

For nginx
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

See the [vue-router history mode docs](https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations).


## Connecting to wallet-rpc
```bash
./nerva-wallet-rpc --rpc-bind-port <whatever port you want wallet to listen on> --wallet-dir <wallet directory on disk> --rpc-login nerva:nerva --rpc-access-control-origins <CORS addresses, your web server URL> --rpc-auth-basic --trusted-daemon --log-level 3 --rpc-bind-ip <0.0.0.0 or your IP address> --confirm-external-bind --confirm-cleartext-auth```
