var path = require('path');

module.exports = function (app, passport) {

  app.get('/test', function(req, res) {
    res.sendFile(path.join(__dirname , '../index.html'));
  });

};
