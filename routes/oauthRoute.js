var express = require('express');
var router = express.Router();
var logger=require('../logger/logger.js');
var oauth = require('../oauth.2/oauth.js');

//*********************************Login Route*******************************************************//
//This route will render the login form
//***************************************************************************************************//

router.post('/token',oauth.token);

//******************************************************************************************************//

module.exports = router;
