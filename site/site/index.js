var express = require('express');
var app = express();

var algoliasearch = require("algoliasearch")
var client = algoliasearch('TRSE7O3IIG', '883a415024ea2e75c8451da21a42d077');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

client.deleteIndex("testing-purposes");

var id_weight = "SuperAwesomeMakeAmericaGreatAganAndGetMyId";
var post_weight = "amazingnotterriblepostidentifyer";
var profile_weight = "superduperprofileweightingofgoodness";

var index = client.initIndex('testing-purposes');



app.use(express.static(__dirname + '/')); // set the static files location /public/img will be /img for users
app.listen(8001);
app.listen(80);


app.get("/profile", function(req, res) {
    var id = id_weight + req.query.id;

    index.search(id, function searchDone(err, content) {
      console.log(err, content);
      res.send(JSON.stringify(content.hits[0]));
    });
});

app.get("/set-status2", function(req, res) {
    var id = id_weight + req.query.id;
    var content = req.query.content;

    var objects = [{
      type : post_weight,
      id : id,
      content : content,
      time : Date.now()
    }];

    index.addObjects(objects, function(err, content) {
      console.log(content);
      res.send("cake");
    });
});

app.post("/set-status", urlencodedParser, function(req, res) {
    console.log(req.body.id);
    var id = id_weight + req.body.id;
    var content = req.body.content;

    var objects = [{
      type : post_weight,
      id : id,
      content : content,
      time : Date.now()
    }];

    index.addObjects(objects, function(err, content) {
      console.log(content);
      res.redirect("/userArea");
    });
});

app.post("/add-user", urlencodedParser, function(req, res) {
    console.log(req.body.id);
    var id = id_weight + req.body.id;
    var name = req.body.name;

    var objects = [{
      type : profile_weight,
      id : id,
      content : name
    }];

    index.addObjects(objects, function(err, content) {
      console.log(content);
      res.send("cake");
    });
});

app.get("/feed", function(req, res) {
  index.search(post_weight, function searchDone(err, content) {
    console.log(err, content);

    var cleanhits = [];
    content.hits.forEach(function(hit){
      cleanhits.push({
        id : hit.id.replace("SuperAwesomeMakeAmericaGreatAganAndGetMyId",""),
        content : hit.content,
        time : hit.time
      });
    });

    res.send(JSON.stringify(cleanhits));
  });
});


function algoliatest(){

  var objects = [{
    type : "profile",
    id : id_weight + "cake",
    firstname : "Aaron",
    surname : "Tello-Wharton",
    profile_pic : "http://ichef-1.bbci.co.uk/news/660/cpsprodpb/14C52/production/_92847058_c3c1256f-1f69-45fe-ade5-a1822e3d9b9c.jpg"
  }, {
    type : "profile",
    id : id_weight + "huel",
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
