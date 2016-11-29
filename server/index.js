var express = require('express');
var path = require('path');

var app = express();


app.use(express.static(path.join(__dirname, '../client')));

app.get('*', function (req, res) {
  res.send('booyah!');
});


var port = process.env.PORT || 8080;

app.listen(port, function () {
  console.log('Now listening on port:', port);
});



