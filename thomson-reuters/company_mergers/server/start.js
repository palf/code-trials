var express = require('express'),
    path = require('path');

var app = express();

app.use('/', express.static(path.join(__dirname, 'public')));

var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
    'use strict';

    var host = server.address().address,
        port = server.address().port;

    console.log('app listening at http://%s:%s', host, port);
});
