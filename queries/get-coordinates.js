var london = require('../config/london-coordinates');
var geoIntersect = require('../config/london-coordinates');
var Location = require('mongoose').model("Location");


function getCoordinates(id, callback){ // [long,lat]
  Location.find({userid: { $eq: id } }, function(error, data){
    if(callback){
      callback(data[0].loc.coordinates);
    }
  });
}


module.exports = getCoordinates;
