var express = require('express');
var router = express.Router();
var logger=require('../logger/logger.js');
var apiHandler = require('../handlers/api/apiHandler.js');
var passport = require('passport');

//*********************************Login Route*******************************************************//
//This route will render the login form
//***************************************************************************************************//

router.post('/protect',passport.authenticate('accessToken', { session: false }),apiHandler.dosomething);

//******************************************************************************************************//

module.exports = router;
