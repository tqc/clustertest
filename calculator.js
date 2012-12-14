(function() {
    
    module.exports.start = function(localPort, remotePort, remoteHost) {

    	var express = require('express');
var request = require('request');
var url = require('url');
var log = console.log;
var http = require('http');


var app = express.createServer(express.logger());

app.configure(function() {
    app.use(express.bodyParser());
});

app.get('/', function(request, response) {
  response.send('Hello World!');
});


app.get('/calc', function(request, response) {
  var responses = 0;
  var accumulator = 0;

  var calc = function(index) {
  var client = http.createClient(remotePort, remoteHost);
    var req = client.request("GET", "/calc2/"+index, {host: remoteHost});
    req.end();
    req.once("response", function(res) {

      console.log("got response for "+index);
    res.once("data", function(data) {
      console.log("got response for "+index +" - "+data);
      responses ++;
      accumulator+= parseInt(data);
      if (responses >= 100) {

        response.send("got all responses - "+(accumulator));
      }
    })

    })


  }

  for (var i = 0; i < 100; i++) {
    calc(i);    
  }

  
});

function isPrime1(n) {
 if (isNaN(n) || !isFinite(n) || n%1 || n<2) return false; 
 var m=Math.sqrt(n);
 for (var i=2;i<=m;i++) if (n%i==0) return false;
 return true;
}

app.get('/calc2/:index', function(request, response) {
  var result =0;
  var index = parseInt(request.params.index)
  for (var i = 0; i < 50000; i++) {
  if (isPrime1(index*50000+i)) result++;
  }
  response.send(""+result);
});



app.listen(localPort, function() {

  console.log("Listening on " + localPort);
});





    }

}());



