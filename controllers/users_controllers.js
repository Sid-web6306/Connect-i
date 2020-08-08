const User = require('../models/user.js');

//render user-profile
module.exports.profile = (req,res)=>{
	//if cookie is present
	if(req.cookies.user_id){
		User.findById(req.cookies.user_id,(err,user)=>{
			//if user is present
			if(user){
				return res.render('user_profile',{
					title:"User Profile",
					user:user
				})
			}
		});
	}else{
		return res.redirect('/users/sign-in');
	}
}
//render signup page
module.exports.signup = (req,res)=>{
	return res.render('user_signup',{
		title:"Connect-i | Signup"
	})
}
//render signin page
module.exports.signin = (req,res)=>{
	return res.render('user_signin',{
		title:"Connect-i | Signin"
	})
}
//get the sign up data
module.exports.create = (req,res)=>{
	if (req.body.password!=req.body.confirm_password) {
		console.log("Password didn't match");
		return res.redirect('back');
	}

	User.findOne({email: req.body.email},(err,user)=>{
		if(err){
			console.log('error in finding user in signup');
			return;
		}
		if(!user){
			User.create(req.body,(err,user)=>{
				if(err){
					console.log('error in finding user in signup');
					return;
				}
				return res.redirect('/users/sign-in');
			});
		}else{
			return res.redirect('back');
		}
	});

}
//signin and create the session for user
module.exports.createSession = (req,res)=>{
//Step to authenticate mannually
	//find the user
	User.findOne({email: req.body.email},(err,user)=>{
		if(err){
			console.log('error in finding user in signing in');
			return ;
		}
		if(user){

			//handle password which doesn't match
			if(user.password != req.body.password){
				return res.redirect('back');
			}
			//handle session creation
			res.cookie('user_id', user.id);
			return res.redirect('/users/profile');

		}else{
			//Handle user not found
			return res.redirect('back');
		}
	})
}

module.exports.removeCookie = (req,res)=>{
	res.clearCookie('user_id');
	return res.redirect('/users/sign-in');
}