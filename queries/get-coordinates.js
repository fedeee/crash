var london = require('../config/london-coordinates');
var Location = require('mongoose').model("Location");


function getCoordinates(id){ // [long,lat]
  Location.find({userid: { $eq: id } }, function(error, data){
    console.log(data);
  });
}


module.exports = geoIntersect;
