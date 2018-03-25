### Enoch Project
Sample node RESTFul API project


## Automatic restart
This can be done with pm2, thus:-

1. Install pm2 as a global module

    `npm install pm2 -g`

2. Launch your process

    `pm2 start server.js`

Or with nodemon, thus:-
1. Install pm2 as a global module

    `npm install nodemon -g`

2. Launch your process

    `nodemon server.js`

## Reliability
Cluster the app to improve reliability. To start up multiple instances for each core run:

    `pm2 start server.js -i max`

Or add to script section of package.json
```
"scripts": {
  "start": "pm2 start server.js -i max -f"
}
```

## Security 
To secure app in the following ways:-
- XSS Protection
- Prevent Clickingjacking using X-Frame-Options
- Enforcing all connections to be HTTPS
- Setting a Context-Security-Policy header
- Disabling the X-Powered-By header so attackers can’t narrow down their attacks to specific software

1. Using `helmet` that is, install it:-

    `npm install helmet`

2. In code when setting up Express add:-
```
  var helmet = require('helmet');
  app.use(helmet());

```
