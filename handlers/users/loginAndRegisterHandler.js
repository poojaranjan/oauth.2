var passport = require('passport');

exports.registerUser=function(req, res, next) {

passport.authenticate('signup',{session:false}, function(err, user, info) {

   console.log("TEST"+req.session.id)


    if (err) {
      return res.json(500, {
        err:err,
        sessionId: req.session.id
      });
    }
    if (!user) {
      return res.json( 400,
        {
        err: info,
        sessionId: req.session.id
        });
    }
    req.login(user,{session:false},  function(err) {

      if (err) {
        return res.json( req.session.id);
      }
      res.send(user);

    });
})(req, res, next);

}

