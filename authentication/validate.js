var jwt = require("jsonwebtoken");
var knex = require("../model")

module.exports = function callback (req,res,next) {
    var decode = jwt.verify(req.headers.authorization,"thaman")
    console.log(decode)
    if (decode){
        res.status(200)
        next();
    }else{
        res.status(404).json({
            "error": {
              "status": 401,
              "code": "AUT_02",
              "message": "Access Unauthorized",
              "field": "NoAuth"
            }
          })
    }
}