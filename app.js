var express = require('express');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var app = express();


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

/**
 *Intialize database modify test test1
 * 
 */

require('./db/connection/dbconnection.js')

//*********************configure Session********************/

app.use(expressSession({
    secret: 'thisIsTopSecretSoDontTellAnyone',
    cookie: {
        path: '/',
        httpOnly: true,
        secure: false
    },
    saveUninitialized: true,
    resave: true
}));

//*********************configure Session********************//


//*********************Initialize Passport********************//
//**********************************************************//
require('./passport/passport.js');
//**********************************************************//


//*********************configure Routes********************//
//**********************************************************//
require('./routes')(app);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
