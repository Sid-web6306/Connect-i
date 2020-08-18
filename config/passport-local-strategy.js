//require passport
const passport = require('passport');
//require LocalStrategy
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.js');

//authentication using passport
passport.use(new LocalStrategy({
	usernameField: 'email'
	},function(email,password,done){
		//find a user and establiished the identity
				//property:valuelbj
	User.findOne({email:email}, function(err,user){
			if(err){
				console.log("error in signin for a user-->passport");
				return done(err);
			}
			if(!user || user.password!=password){
				console.log('invalid username/password');
				return done(null,false);
			}
			console.log(user);
			return done(null,user);
		});
	}

));

//serializing a user to decide which key is to be kept in the cookie
passport.serializeUser(function(user,done){
	done(null,user.id);
});


//deserialize the user from the key in the cookie
passport.deserializeUser(function(id,done){
	User.findById(id,function(err,user){
		if(err){
			console.log('Error in finding user --> passport');
			return done(err);
		}

		return done(null,user);
	});
});

module.exports = passport;