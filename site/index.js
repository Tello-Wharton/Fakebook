var express = require('express');
var app = express();


app.use(express.static(__dirname + '/')); // set the static files location /public/img will be /img for users
app.listen(8001);



console.log("cake");
