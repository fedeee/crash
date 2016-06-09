var mongodb = require('mongodb');
var populate = require('../queries/populate');


exports.up = function(db, next){
  console.log("Mongo populated");
  populate();
  console.log(next)
};

exports.down = function(db, next){
  console.log("skipping")
    next();
};
