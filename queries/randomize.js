var london = require('../config/london-coordinates');
var Location = require('mongoose').model("Location");

function updateRows(){
    for(var i=0; i<2000; i++){
      var coords = london.randomizeCoords();
      Location.update({userid: {$eq:i} }, { loc: { type: "Point", coordinates: coords } },{ multi:true},function (err, numAffected) {
      });
    }
}

function randomize(conn){
    var callback = function(){
      Location.find({}, function(error, data){
          var coordinates = [];
          data.forEach(function(o){
            if(o.loc.coordinates.length > 0){
              coordinates.push(o.loc.coordinates);
            }
          })
          conn.write(JSON.stringify(coordinates));
      });
    };
    updateRows();
    setTimeout( callback, 3000 );
};

module.exports = randomize;
