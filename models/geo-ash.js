var mongoose = require('mongoose');

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



var london_bbox = [[-0.489,51.28],[0.236,51.686]];//place users within London

function randomizeCoords(){
  var x = (Math.random() * Math.abs(london_bbox[1][1]-london_bbox[0][1])) + london_bbox[0][1];
  var y = (Math.random() * Math.abs(london_bbox[0][0]-london_bbox[1][0])) + london_bbox[0][0];
  return [y,x]
}

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
  for(var i=0; i<1000; i++){
    createAndSave(i+1, randomizeCoords())
  }
}

function updateRows(conn){
  for(var i=0; i<1000; i++){
    var coords = randomizeCoords();
    Location.update({userid: {$eq:i} }, { loc: { type: "Point", coordinates: coords } },{ multi:true},function (err, numAffected) {
      /*Location.find({}, function(error, data){
        data.forEach(function(o){
          if(o.loc.coordinates.length > 0){
            conn.write(JSON.stringify(o.loc.coordinates));
          }
        })
      })*/
    });
  }
}


function update(conn){
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
  updateRows(conn);
  setTimeout( callback, 3000 );
}

function printUsersData(){
  Location.find({}, function(error, data){
      data.forEach(function(d){
        console.log(d.userid,d.loc.coordinates[0])
      })
      //res.json(data);
  });
}

printUsersData();

module.exports = {
  populate: populate,
  update: update,
  printData: printUsersData
};
