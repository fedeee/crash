var express = require('express'),
  mongoose = require('mongoose'),
  fs = require('fs'),
  path = require('path'),
  app = express(),
  server = require('http').Server(app),
  models = path.join(__dirname, './models');


  require('./config/express')(app);
  require('./config/routes')(app);
  require('./socket.io/socket')(server);

 fs.readdirSync(models)
   .filter(function(file){
      return ~file.indexOf('.js')})
   .forEach(function(file){
      require(path.join(models, file))});


  mongoose.connect('mongodb://localhost/ash');
  server.listen(3000);


  console.log('Listening on port 3000...');
