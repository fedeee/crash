var mongoose = require('mongoose'),
  path = require('path'),
  models = path.join(__dirname, '../models');

var exportables =[];
fs.readdirSync(models)
 .filter(function(file){
    return ~file.indexOf('.js')})
 .forEach(function(file){
    var m = require(path.join(models, file))
    exportables.push(m)
  });


mongoose.connect('mongodb://localhost/ash');

module.exports.myFunctions = exportables;
