var express = require('express');
var router = express.Router();
const common = require('../config/common');
const mongo = require('../config/mongo');

var passport = require('passport'),
    JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

var opts = {
  jwtFromRequest : ExtractJwt.fromAuthHeaderWithScheme('bearer'),
  secretOrKey : 'secret-top-secret',
}

passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
  common.msg(jwt_payload)
  if(common.time() <= jwt_payload.exp) {
    return done(null, {
      status: true,
      payload: jwt_payload
    });
  }
  else {
    err = {
      message: "Unauthorized",
      status: false
    }
    return done(null, false, err);
  }
}));


router.get('/countPirates', passport.authenticate('jwt', { session: false }), (request, response) => {
  response.json({
    piratesFound: pirateCounter(),
    // jwt_payload: request.user.payload
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

let pirateCounter = () => {
  let res=[];
  let count =0;
  let data = require("../config/data/eila").data;
  // let data = ("8) ;| ;-) 8~) ;( :> :} :] :0").split(' ');
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
