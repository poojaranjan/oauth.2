var oauth2orize = require('oauth2orize'),
    passport = require('passport'),
    AccessToken = require('../db/models/oauth/accessTokens.js'),
    RefreshToken = require('../db/models/oauth/refreshTokens.js'),
    User = require('../db/models/users/users.js');
    SHA256 = require('crypto-js/sha256'),
    bcrypt = require('bcrypt-nodejs')


// create OAuth 2.0 server
var server = oauth2orize.createServer();
const uuid = require('uuid/v1');

//Resource owner password
server.exchange(oauth2orize.exchange.password(function(client, username, password, scope, done) {
    User.findOne({ username: username }, function(err, user) {
        if (err) return done(err)
        if (!user) return done(null, false)
        bcrypt.compare(password, user.password, function(err, res) {
            
            if (!res) return done(null, false)

            var token = uuid();
            var refreshToken = uuid();
            var tokenHash = SHA256(token);
            var refreshTokenHash = SHA256(tokenHash);
            var expirationDate = new Date(new Date().getTime() + (3600 * 1000))
            var accessToken = new AccessToken({ token: tokenHash, expirationdate: expirationDate, clientid: client.clients[0].clientid, userid: username, scope: scope });
            var refreshTokenObject = new RefreshToken({ refreshtoken: refreshTokenHash, clientid: client.clients[0].clientid, userid: username });
            accessToken.save( function(err) {
                 
                if (err) return done(err)
                    
                refreshTokenObject.save( function(err) {
                    if (err) return done(err)

                   // done(null, token, refreshToken, { expires_in: expirationDate })
                done(null, token, refreshToken, { expires_in: expirationDate })
                })
            })
        })
    })
}))


// //Refresh Token
// server.exchange(oauth2orize.exchange.refreshToken(function(client, refreshToken, scope, done) {
//     var refreshTokenHash = SHA256(refreshToken);

//     RefreshToken.findOne({ refreshtoken: refreshTokenHash }, function(err, token) {
//         if (err) return done(err)
//         if (!token) return done(null, false)
//         if (client.clientId !== token.clientId) return done(null, false)

//         var newAccessToken = uuid();
//         var accessTokenHash = SHA256(newAccessToken);

//         var expirationDate = new Date(new Date().getTime() + (3600 * 1000))

//         db.collection('accessTokens').update({ userId: token.userid }, { $set: { token: accessTokenHash, scope: scope, expirationdate: expirationDate } }, function(err) {
//             if (err) return done(err)
//             done(null, newAccessToken, refreshToken, { expires_in: expirationDate });
//         })
//     })
// }))

// token endpoint
exports.token = [
    passport.authenticate(['clientBasic', 'clientPassword'], { session: false }),
    server.token(),
    server.errorHandler()
]
