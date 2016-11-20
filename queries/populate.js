var  Location = require('mongoose').model("Location");
 london = require('../config/london-coordinates');


//INSERT DOCUMENTS FIRST TIME ONLY TO POPULATE mongo
function createAndSave(i,coords){

  var myLoc = new Location({
    userid: i,
    loc: {
      type:"Point",
      coordinates: coords
    }
  });

  myLoc.save(function (err) {
    console.log("inserting");
    if (err) {
      console.log("error", err);
  		return err;
    }
    else {
    	console.log("myLoc saved");
    }
  });
};

function populate(){
  for(var i=1000; i<2000; i++){
    createAndSave(i+1, london.randomizeCoords())
  }
}

module.exports = populate;

/*function printUsersData(){
  Location.find({}, function(error, data){
      data.forEach(function(d){
        console.log(d.userid,d.loc.coordinates[0])
      })
      //res.json(data);
  });
}

printUsersData();*/
