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


//INSERT DOCUMENTS
/*var myLoc = new Location({
  id: 2,
  loc: {
    type:"Point",
    coordinates: [-0.086693100,51.464857]}
});

//save model to MongoDB
myLoc.save(function (err) {
  if (err) {
		return err;
  }
  else {
  	console.log("myLoc saved");
  }
});*/


Location.find({}, function(error, data){
    console.log(data);
    //res.json(data);
});
