var getCoordinates = require('../queries/get-coordinates');
var geoIntersect = require('../queries/geo-intersect');

module.exports = function (multiplexer) {

  var match = multiplexer.registerChannel('match');

  match.on('connection', function(conn) {
    //Expects incoming data to be an array
    conn.on('data', function(userId) {
      getCoordinates(userId, function(coordinates){
        conn.write(geoIntersect(coordinates));
      });

    });

   });

 };
