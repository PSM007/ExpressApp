# Merchant Server

## PaymentJSv2 Documentation

https://docs.paymentjs.firstdata.com/

## Getting Started

1. npm install
2. npm run build
3. npm start

URL: http://localhost:3000/{env}

env: uat, prod


## Configuration

Gateway and PaymentJSv2 developer app credentials are stored in env.js

Note: changes to env.js require rebuilding
Note2: for the webhook callback to work, an accessible webhook url needs to be registered in the developer app for PaymentJSv2.

## HTTPS

Generally you will have a server sitting in front of nodejs that
will handle the SSL handshake thus an https listener in the nodejs
code is not normally necessary.
It's easy to add in however as shown below:

```javascript
const express = require('express');
const https = require('https');

const app = express();

// ...

// see node documentation for additional options such as ssl passphrase
const options = {
  cert: fs.readFileSync(/* ... */),
  key: fs.readFileSync(/* ... */),
};

const httpsServer = https.createServer(options, app);
httpsServer.listen(443);
```

## Features

- integrates with PaymentJSv2 Client Library on the client side
- includes a gateway select field and a zero dollar auth
checkbox for testing different gateway integrations.
- includes an api client for /merchant/authorize-session in folder "sdk".

## NodeJS SDK Usage (example)

```javascript
const sdkConstants = require("sdk/constants");
const sdk = require("sdk/merchant-client");

const clientLogger = (level: string, msg: string) => {
  console.log(`${level}: "${msg}"`);
};

const client = new sdk.MerchantClient(
  sdkConstants.ServiceUrl.UAT, // uat (aka sandbox/cert) env url
  clientLogger, // OPTIONAL
);

const authReqData = {
  gatewayConfig: { // example for Bluepay Gateway
    gateway: sdkConstants.GatewayName.BLUEPAY, // "BLUEPAY"
    accountId: "BLUEPAY_ACCOUNT_ID",
    secretKey: "BLUEPAY_SECRET_KEY",
    zeroDollarAuth: false, // boolean, support varies between gateways
                           // in the case of bluepay it depends
                           // on account configuration
  },
  apiSecret: "", // PaymentJSv2 Developer App Consumer Secret
  apiKey: "", // PaymentJSv2 Developer App Consumer Key

  // OPTIONAL (missing values are generated within the client)
  // nonce: "RANDOM_VALUE", <- UUIDv4 recommended
  // timestamp: 132412341, <- seconds since epoch
  // msgSignature: "", <- HMAC SHA256, Base64 encoded
};

const logSessionAuth = (sessionAuth) => {
  console.log(`sessionAuth.clientToken = "${sessionAuth.clientToken}"`);
  console.log(`sessionAuth.publicKeyBase64 = "${sessionAuth.publicKeyBase64}"`);
};

const handleError = (err) => {
};

client
  .authorizeSession(authReqData)
  .then(logSessionAuth)
  .catch(handleError);
```
