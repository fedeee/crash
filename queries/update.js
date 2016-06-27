var Location = require('mongoose').model("Location");


//USED to update user coordinates on the MOVE
function updateUserCoords(userId, coords){
  Location.update({userid: {$eq: userId} }, { loc: { type: "Point", coordinates: coords } },{ multi:true},function (err, numAffected) {
  });
}



module.exports = updateUserCoords;
