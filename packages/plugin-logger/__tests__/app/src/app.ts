import * as request from 'request';
import Ursa from '@ursajs/core';
import { Router } from '@ursajs/router';

const ursa = Ursa.instance({
    Router,
    bodyParser: false,
    ROOT: __dirname,
    env: process.argv.indexOf('production') > -1 ? 'production' : 'development',
});

ursa.start(8058);
request('http://localhost:8059/a', function(error, response, body){
    process.exit();
})