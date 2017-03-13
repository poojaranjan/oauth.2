var loginAndRegisterRoute = require('./loginAndRegisterRoute.js');
var oauthRoute = require('./oauthRoute.js');
var apiRoute = require('./apiRoute.js');






module.exports = function(app) {

    app.use('/user', loginAndRegisterRoute);
    app.use('/oauth', oauthRoute);
    app.use('/api/v1', apiRoute);


}
