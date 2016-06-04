var express = require('express'),
  sockjs  = require('sockjs')
  fs = require('fs'),
  app = express(),
  http = require('http'),
  server = http.createServer(app);

  require('./config/express')(app);
  require('./config/routes')(app);
  require('./config/mongodb');

  var sockjs_opts = {sockjs_url: "http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js"};//TODO:have it locally?
  var sockjs_echo = sockjs.createServer(sockjs_opts);

  sockjs_echo.on('connection', function(conn) {
      conn.on('data', function(message) {
          conn.write(message);
      });
   });

   sockjs_echo.installHandlers(server, {prefix:'/echo'});

   console.log(' [*] Listening on 0.0.0.0:9999' );

   server.listen(9999, '0.0.0.0');
