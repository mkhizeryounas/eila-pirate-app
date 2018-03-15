var express = require('express');
var router = express.Router();
const common = require('../config/common');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
