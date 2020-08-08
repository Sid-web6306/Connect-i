const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.js');

//authentication using passport
passport.use(new LocalStrategy(()=>{
	usernameField: 'email'
	},(email,password,done)=>{
		//find a user and create identity
		User.findOne({email:email}, (err,user)=>{
			if(err){
				console.log("error in signin for a user-->passport");
				return done(err);
			}
			if(!user || user.password!=password){
				console.log('invalid username/password');
				return done(null,false);
			}

			return done(null,user);
		})
	}

));

//serializing a user to decide which key is to be kept in the cookie
paasport.serializeUser((user,done)=>{
	done(null,user.id);
})


//deserialize the user from the key in the cookie
passport.deserializeUser((id,done)=>{
	User.findById(id,(err,user)=>{
		if(err){
			console.log('Error in finding user --> passport');
			return done(err);
		}

		return done(null,user);
	});
});

module.exports = passport;