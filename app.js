const express = require('express');
const app = express();
const  router = require('./routes/router');

//add the router
app.use(express.static(__dirname + '/components'));
//Store all HTML files in view folder.
app.use(express.static(__dirname + '/resources'));
//Store all JS and CSS in Scripts folder.

app.use('/', router.getRouter());
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');