var express = require('express');
var router = express.Router();
const common = require('../config/common');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/bot', (request, response, next) => {
  let res=[];
  let count =0;
  let data = require("../config/data/eila")['data'];
  // let data = ("8) ;| ;-) 8~) ;( :> :} :] :0").split(' ');
  common.msg(data)
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
        common.msg(e);
      }
      else 
        throw "smile error";
      
    } catch(err) {
      common.msg(err)
    }
  })
  response.json({
    count:count
  })
})

module.exports = router;
