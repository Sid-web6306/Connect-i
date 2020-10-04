const User = require('../models/user.js');

//render user-profile
module.exports.profile = (req,res)=>{

	User.findById(req.params.id ,(err,user)=>{
		return res.render('user_profile',{
			title:"Connect-I | User Profile",
			profile_user:user
		});
	});

	
}
//render signup page
module.exports.signup = (req,res)=>{
	//if user is logged in
	if(req.isAuthenticated()){
		return res.redirect('/users/profile');
	}



	return res.render('user_signup',{
		title:"Connect-i | Signup"
	})
}
//render signin page
module.exports.signin = (req,res)=>{
	//if user is logged in
	if(req.isAuthenticated()){
		return res.redirect('/users/profile');
	}
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
			console.log('error in finding user in signup',err);
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
	return res.redirect('/');
}


module.exports.deleteSession = (req,res)=>{
	res.clearCookie('Connect-i');
	 // req.logout();
	return res.redirect('/users/sign-in');
}