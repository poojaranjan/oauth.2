var passport = require('passport');

exports.dosomething=function(req, res, next) {
console.log(req._passport)
 res.send("pass");

}

