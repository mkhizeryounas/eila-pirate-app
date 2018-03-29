var express = require('express');
var router = express.Router();
const common = require('../config/common');
var requireFromString = require('require-from-string');



router.get('/', function(req, res, next) {
  res.status(200).json({
    status:true,
    message: "OK!"
  });
  
});

let strScript = "module.exports = (cb) => { const http = require('http'); http.createServer(function (req, res) {res.write('Hello World!'); res.end(); }).listen(8080); return cb(null, { status: true, message: \"this is from string module\"})};";

router.get('/runner', function(request, response, next) {
  const runner = requireFromString(strScript);
  runner((err, res) => {
    try {
      if(err) throw err;
      response.status(200).json(res);
    }
    catch(err) {
      response.status(500).json(err);
    }
  })

});

module.exports = router;
