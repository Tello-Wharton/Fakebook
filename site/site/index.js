var express = require('express');
var app = express();

var algoliasearch = require("algoliasearch")
var client = algoliasearch('TRSE7O3IIG', '883a415024ea2e75c8451da21a42d077');


client.deleteIndex("testing-purposes");

var index = client.initIndex('testing-purposes');

app.use(express.static(__dirname + '/')); // set the static files location /public/img will be /img for users
app.listen(8001);


app.get("/profile", function(req, res) {
    var id = req.query.id;

    index.search(id, function searchDone(err, content) {
      console.log(err, content);
      res.send(JSON.stringify(content.hits[0]));
    });
});


function algoliatest(){

  var objects = [{
    id : "cake",
    firstname : "Aaron",
    surname : "Tello-Wharton",
    profile_pic : "http://ichef-1.bbci.co.uk/news/660/cpsprodpb/14C52/production/_92847058_c3c1256f-1f69-45fe-ade5-a1822e3d9b9c.jpg"
  }, {
    id : "huel",
    firstname: 'Daddy',
    lastname: 'Lowe',
    profile_pic : "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Kanadagans_Branta_canadensis.jpg/220px-Kanadagans_Branta_canadensis.jpg"
  }];

  index.addObjects(objects, function(err, content) {
    console.log(content);
  });


  index.search('Daddy', function searchDone(err, content) {
    console.log(err, content);
  });

}

algoliatest();

console.log("cake");
