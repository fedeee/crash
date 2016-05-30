var express = require('express'),
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  textParser = bodyParser.text(),
  jsonParser = bodyParser.json(),
  cors = require('cors'),
  path = require('path'),
  app = express(),
  server = require('http').Server(app),
  io = require('socket.io')(server);


// allow cross origin requests
app.use(cors());
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});


var locationSchema = new mongoose.Schema({
  userid: { type: Number, required: true },
  loc: {
    type: {
      type: "String",
      required: true,
      enum: ['Point', 'LineString', 'Polygon'],
      default: 'Point'
    },
    coordinates: [Number]
  },
  create_date: { type: Date, default: Date.now }
});

locationSchema.index({ 'loc': '2dsphere' });
var Location = mongoose.model( 'Location', locationSchema );



mongoose.connect('mongodb://localhost/ash');
server.listen(3000);



/*||||||||||||||||SOCKET|||||||||||||||||||||||*/
//Listen for connection
io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
/*||||||||||||||||||||END SOCKETS||||||||||||||||||*/

console.log('Listening on port 3000...');
