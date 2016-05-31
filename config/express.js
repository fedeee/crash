var bodyParser = require('body-parser'),
  textParser = bodyParser.text(),
  jsonParser = bodyParser.json(),
  cors = require('cors');


module.exports = function (app) {

  // allow cross origin requests
  app.use(cors());

  app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    if (req.method == 'OPTIONS') {
      res.status(200).end();
    } else {
      next();
    }
  });


}
