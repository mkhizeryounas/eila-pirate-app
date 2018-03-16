var jwt = require('jsonwebtoken');
var common = require('./common');
const cert = "secret-top-secret"

let data = {
    unlock: (request, response, next) => {
        let authHeader = request.headers['authorization'] || "";
        if(typeof authHeader !== "undefined") {
            try {
                authHeader = authHeader.split(" ");
                if(authHeader[0].toLowerCase() !== "bearer") throw "Token type Bearer required";
                authHeader = authHeader[1];
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
                        return false;
                    }
                });
            }
            catch (error) {
                response.json({
                    status: false,
                    message: error,
                });
                return false;
            }
        }
    },
    lock: (obj) => {
        obj['iat'] = common.time();
        obj['exp'] = common.time() + (60*60);
        return jwt.sign(obj, cert);
    }
};


module.exports = data;