var express = require('express');
var router = express.Router();
const db = require('../config/db');
const common = require('../config/common');

var readline = require('readline');
var {google} = require('googleapis');
var OAuth2 = google.auth.OAuth2;

/* GET users listing. */
router.get('/', (request, response, next) => {
  let obj = {
    status :  true,
    message: "Youtube endpoint is working"
  };
  response.json(obj);
  common.msg(obj);
});



module.exports = router;
