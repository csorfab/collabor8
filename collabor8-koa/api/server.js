var koa = require('koa')
var app = new koa()

var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


let googleInfo = {"web":{"client_id":"585712562710-cfb4erbilkj3pn7u1uo45ct78u5i7s4a.apps.googleusercontent.com","project_id":"collabor8-elte","auth_uri":"https://accounts.google.com/o/oauth2/auth","token_uri":"https://accounts.google.com/o/oauth2/token","auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs","client_secret":"syzzlqAHVvpFx4LjWufSvRRE","redirect_uris":["http://localhost","http://collabor8.edu"],"javascript_origins":["http://collabor8:3000","http://collabor8.edu"]}}

passport.use(new GoogleStrategy({
    clientID: googleInfo.client_id,
    clientSecret: googleInfo.client_secret,
    callbackURL: "http://www.example.com/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
       User.findOrCreate({ googleId: profile.id }, function (err, user) {
         return done(err, user);
       });
  }
));


app.use(function (ctx) {
    ctx.body = {
        a: 5,
        b: 8
    }
})

app.listen(3001)