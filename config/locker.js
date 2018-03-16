var jwt = require('jsonwebtoken');
var common = require('./common');
const cert = "secret-top-secret"

let data = {
    unlock: (request, response, next) => {
        let authHeader = request.headers['authorization'] || "";
        if(typeof authHeader !== "undefined") {
            jwt.verify(authHeader, cert, (err, decode) => {
                try {
                    if(err) throw err;
                    request.user = decode;
                    next();
                }
                catch (error) {
                    response.json({
                        status: false,
                        message: "JWT error occoured",
                        data: error
                    });
                }
            });
        }
    },
    lock: (obj) => {
        obj['iat'] = common.time();
        obj['exp'] = common.time() + (60*60);
        return jwt.sign(obj, cert);
    }
};


module.exports = data;