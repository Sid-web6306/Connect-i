const passport = require('passport');
const User = require('../models/user');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');

//tell passport to use a strategy for google login
passport.use(new googleStrategy({
    clientID:"27488934184-671kj6661lc4hn3fs444iqm2jaaojnve.apps.googleusercontent.com",
    clientSecret:"topFZF9GX0v5hCo5Ydedx3qt",
    callbackURL:"http://localhost:8080/users/oauth/google/callback"
},(accessToken,refreshToken, profile,done)=>{
    User.findOne({email:profile.emails[0].value}).exec((err,user)=>{
//fina a user       
        if(err){
            console.log("Error in google oauth of user: ",err);
            return;
        }
        console.log(profile);
        if(user){
            return done(null,user)
        }else{
            //if uset not found creating a user and set it as req.user
            User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            },(err,user)=>{
                if(err){
                    console.log("Error in creating user google strategy-passport: ",err);
                    return;
                }

                return done(null,user);
            })
        }
       
    })
}





))