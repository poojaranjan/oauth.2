// Load required packages
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var logger = require('../../../logger/logger.js');
// Define our user schema
var AccessTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    clientid: {
        type: String,
        required: true
    },
    userid: {
        type: String,
        required: true
    },
    scope: {
        type: String

    },
    expirationdate:{
        type: Date
    } 


});

module.exports = mongoose.model('AccessToken', AccessTokenSchema);

