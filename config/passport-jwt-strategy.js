const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');



const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
    secretOrKey : 'Connect-I'
}

passport.use(new JwtStrategy(opts,(jwt_payload,done)=>{
    User.findById(jwt_payload._id,(err,user)=>{
        if(err){
            console.log('Error in finding user in jwt: ',err);
            return;
        }
        if(user){
            return done(null,user);
        }else{
            return done(null,false);
        }
    });
}));

module.exports = passport;