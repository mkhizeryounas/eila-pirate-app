/** 
 * Auther: mkhizeryounas
 * Usage: db.query(queryString, paramArray, (err, res) => { console.log(res) });
*/

var mysql = require("mysql");
var keys = require('./keys');

var pool = mysql.createPool({
    host     :  keys.mysql.host,
    port     :  keys.mysql.port,
    user     :  keys.mysql.user,
    password :  keys.mysql.password,
    database :  keys.mysql.database,
});

module.exports = {
  getConnection (callback) {
    pool.getConnection((err, conn) => {
      if(err) {
        return callback(err);
      }
      callback(err, conn);
    });
  },
  query (query, params=[], cb) {
    this.getConnection((err, conn) => {
        conn.release();
        if(err) return cb(err, null);
        conn.query(query, params, (err, res) => {
            if(err) return cb(err, null);
            return cb(null, res);
        });
    });
  }
}