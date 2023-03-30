const passport = require('passport');
const googleStretgy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

passport.use(new googleStretgy({
        clientID: "108476424849-bcliel364abk8vdg85759o4ccu6qapbo.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8000/users/auth/google/callback"
    }, 
    function(accessToken , refreshToken , profile , done){
        User.findOne({email: profile.emails[0].value}).exec().then((user) => {
            // if(error){
            //     console.log('error in google-stretgy',error); 
            //     return;
            // }
            console.log(profile);

            if(user){
                return done(null , user);
            }else{
                User.create({
                   name: profile.displayName,
                   email: profile.emails[0].value,
                //password: crypto.randomBytes[80].toString('hex')
                   password: crypto.randomBytes(80).toString('hex')

                } , function(error , user){
                    if(error){
                        console.log('error in creating user with google-stretgy',error); 
                        return;
                    }
                    return done(null , user);
                });
            }
        }).catch((err)=>{
            console.log('error in google-stretgy',err);
        });
    }
));


module.exports = passport;