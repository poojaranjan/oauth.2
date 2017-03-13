var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var needle = require('needle');
var hash = require('bcrypt-nodejs');
var logger = require('../logger/logger.js');
var User = require('../db/models/users/users.js');
var shortid = require('shortid');
var BasicStrategy = require('passport-http').BasicStrategy;
var ClientPasswordStrategy = require('passport-oauth2-client-password').Strategy;
var BearerStrategy = require('passport-http-bearer').Strategy;
var AccessToken = require('../db/models/oauth/accessTokens.js');
var SHA256 = require('crypto-js/sha256');
var User = require('../db/models/users/users.js');


// define 'signup' strategy, used for login
passport.use('signup', new localStrategy({
            // need req in callback to get post params
            passReqToCallback: true
        },
        function(req, password, username, authCheckDone) {

            var user = new User({
                username: req.body.username,
                password: req.body.password,
                clients: [{ "clientid": (new Date).getTime(), "clientsecret": shortid.generate() }]
            });


            user.save(function(err, data) {
                if (err)
                    if (err) return authCheckDone(err);

                authCheckDone(null, data);
            });
        })



);

passport.use("clientBasic", new BasicStrategy({
        // need req in callback to get post params
        passReqToCallback: true
    },
    function(req, clientId, clientSecret, done) {
        console.log("sadadadasda::" + clientId);
        User.findOne({ username: req.body.username }, function(err, client) {
            if (err) return done(err)
            if (!client) return done(null, false)

            if (client.clients[0].clientsecret == clientSecret) return done(null, client)
            else return done(null, false)
        });
    }
));

passport.use("clientPassword", new ClientPasswordStrategy(
    function(clientId, clientSecret, done) {
        console.log("sadadadasdasssssssssss");
        User.findOne({ clientid: clientId }, function(err, client) {
            if (err) return done(err)
            if (!client) return done(null, false)


            if (client.clients[0].clientsecret == clientSecret) return done(null, client)
            else return done(null, false)
        });
    }
));

/**
 * This strategy is used to authenticate users based on an access token (aka a
 * bearer token).
 */
passport.use("accessToken", new BearerStrategy(
    function(accessToken, done) {

        var accessTokenHash = SHA256(accessToken).toString();


        AccessToken.findOne({ token: accessTokenHash }, function(err, token) {

            if (err) return done(err)

            if (!token) return done(null, false)
            if (new Date() > token.expirationdate) {
                done(null, false)
            } else {

                User.findOne({ username: token.userid }, function(err, user) {
                    if (err) return done(err)
                    if (!user) return done(null, false)
                        // no use of scopes for no
                    var info = { scope: token.scope }
                    done(null, user, info);
                })
            }
        })
    }
))


