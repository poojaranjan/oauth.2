var express = require('express');
var router = express.Router();
var logger=require('../logger/logger.js');
var loginAndRegisterHandler = require('../handlers/users/loginAndRegisterHandler.js');

//*********************************Login Route*******************************************************//
//This route will render the login form
//***************************************************************************************************//

router.post('/registeruser',loginAndRegisterHandler.registerUser);

//******************************************************************************************************//

module.exports = router;
