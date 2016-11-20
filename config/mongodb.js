var mongoose = require('mongoose'),
  path = require('path'),
  models = path.join(__dirname, '../models');


fs.readdirSync(models)
 .filter(function(file){
    return ~file.indexOf('.js')})
 .forEach(function(file){
    require(path.join(models, file))
  });


mongoose.connect('mongodb://localhost/ash');
