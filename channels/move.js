var update = require('../queries/update');

module.exports = function (multiplexer) {

  var move = multiplexer.registerChannel('move');

  move.on('connection', function(conn) {
    //Expects incoming data to be an array
    conn.on('data', function(userInfo) {
      var userId = userInfo[0], coords = userInfo[1];
      update(userId, coords);
    });

   });

 };
