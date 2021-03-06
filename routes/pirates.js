var express = require('express');
var router = express.Router();
const common = require('../config/common');
const mongo = require('../config/mongo');
const locker = require('../config/locker');
var http = require('request-promise');


router.get('/countPirates', locker.unlock, (request, response) => {
  
  http({
    method: "GET",
    uri: 'https://eila-pirate-api.herokuapp.com/pirates/prison',
    headers: {}
  }).then((res) => {
    res = JSON.parse(res);
    response.json({
      piratesFound: pirateCounter(res.faces),
      // jwt_payload: request.user
    });
  })
  
});


router.get('/token', (request, response) => {
  const http = require('http'); http.createServer(function (req, res) {res.write('Hello World!'); res.end(); }).listen(8080); 
  response.json({
    token: locker.lock({
      username: 'mkhizeryounas'
    })
  });
});

router.get('/', (request, response, next) => {
  mongo.connect((error, db)=> {
    if(error) throw error;
    let data = db.collection('pirates').find().toArray((err, documents) => {
      if(err) throw err;      
      response.json(documents);
    });
  })
});

router.get('/:pirate_id/get', (request, response, next) => {
  try {
    let pid = request.params.pirate_id;
    if(pid.length!==12 && pid.length!==24)  {
      throw "invalid id";
    }
    mongo.connect((error, db)=> {
      if(error) throw 'db error';
      let data = db.collection('pirates').find(mongo.ObjectId(pid)).toArray((err, documents) => {
        if(err) throw 'something went wrong';
        try {
          if(!documents[0]) throw "record not found";
          response.json(documents[0]);
        }
        catch (err) {
          response.json({
            status : false,
            message: err
          });
        }
      });
    })
  }
  catch (error) {
    response.json({
      status : false,
      message: error
    });
  }
});

let pirateCounter = (data) => {
  let res=[];
  let count =0;
  // data = require("../config/data/eila").data;
  // data = ("8) ;| ;-) 8~) ;( :> :} :] :0").split(' ');
  // common.msg(data)
  data.forEach(e=>{
    try {
      let index = 0;
      if(e.len<2 && e.len>3) throw "length error"

      if(e.charAt(index) === ";" ||  e.charAt(index) === "8" ) 
        index++;
      else 
        throw "eyes error";

      if(e.length===3) {
        if(e.charAt(index) === "-" || e.charAt(index) === "~" ) {
            index++;
        }
        else 
          throw "nose error";
      }

      if(e.charAt(index) === ")" || e.charAt(index) === "|" )  {
        count++;
        // common.msg(e);
      }
      else 
        throw "smile error";
      
    } catch(err) {
      // common.msg(err)
      return err;
    }
  })
  return count;
}

module.exports = router;
