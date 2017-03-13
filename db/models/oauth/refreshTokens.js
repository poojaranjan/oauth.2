// Load required packages
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var logger = require('../../../logger/logger.js');
// Define our user schema
var RefreshTokenSchema = new mongoose.Schema({
    refreshtoken: {
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
    }


});

module.exports = mongoose.model('RefreshToken', RefreshTokenSchema);
