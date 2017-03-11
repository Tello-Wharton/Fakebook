var express = require('express');
var app = express();

var algoliasearch = require("algoliasearch")
var client = algoliasearch('TRSE7O3IIG', '883a415024ea2e75c8451da21a42d077');

app.use(express.static(__dirname + '/')); // set the static files location /public/img will be /img for users
app.listen(8001);

function algoliatest(){
  var index = client.initIndex('indexName');

  var objects = [{
    firstname: 'Jimmie',
    lastname: 'Barninger'
  }, {
    firstname: 'Warren',
    lastname: 'Speach'
  }];

  index.addObjects(objects, function(err, content) {
    console.log(content);
  });


  index.search('Jimmie', function searchDone(err, content) {
    console.log(err, content);
  });

  
}

algoliatest();

console.log("cake");
