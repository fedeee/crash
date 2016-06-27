var randomize = require('../queries/randomize');

module.exports = function (multiplexer) {

  var simulate = multiplexer.registerChannel('simulate');

  simulate.on('connection', function(conn) {
    setInterval(function(){randomize(conn)}, 4000);
   });

 };
