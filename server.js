var express = require('express'),
  sockjs  = require('sockjs')
  fs = require('fs'),
  app = express(),
  http = require('http'),
  server = http.createServer(app);
  multiplex_server = require('websocket-multiplex');

  require('./config/express')(app);
  require('./config/routes')(app);
  require('./config/mongodb');

  var geoIntersect = require('./queries/geo-intersect');

  //require('./queries/populate')(); //TODO Populate db first time

  var service = sockjs.createServer();
  var multiplexer = new multiplex_server.MultiplexServer(service);

  require('./channels/move.js')(multiplexer);
  require('./channels/match.js')(multiplexer);
  require('./channels/randomize.js')(multiplexer);

  service.installHandlers(server, {prefix:'/multiplex'});

   console.log(' [*] Listening on 0.0.0.0:9999' );

   server.listen(9999, '0.0.0.0');
