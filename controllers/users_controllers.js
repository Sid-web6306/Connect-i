const User = require('../models/user.js');

//render user-profile
module.exports.profile = async (req,res)=>{
	try{
		let user = await User.findById(req.params.id );
			return res.render('user_profile',{
				title:"Connect-I | User Profile",
				profile_user:user
			});	
	}catch(err){
		console.log("Error in user_controller/profile: ",err);
		return;
	}
	
}

module.exports.update = async (req,res)=>{
	try{
		if(req.user.id===req.params.id){
			let user = await User.findByIdAndUpdate(req.params.id, req.body);
			return res.redirect('back');
		}else{
			res.status(401).send('Umauthorized')
		}
	}catch(err){
		console.log("Error in user_controller/update");
		return;
	}
	
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
module.exports.create = async (req,res)=>{

	try{
		if (req.body.password!=req.body.confirm_password) {
			console.log("Password didn't match");
			req.flash('error','Password didnt match');
			return res.redirect('back');
		}
	
		let user = await User.findOne({email: req.body.email})
		if(!user){
			let user = await User.create(req.body);
			req.flash('success','User SignUp Successfully');
			return res.redirect('/users/sign-in');
		}else{
			req.flash('error','Email Id Already Exist');
			return res.redirect('back');
		}
	}catch(err){
		req.flash('error',err);
		console.log("Error in user_controller/create: ",err);
		return;
	}



	
}
//signin and create the session for user
module.exports.createSession = (req,res)=>{
	req.flash('success', 'Logged In Successfully');
	return res.redirect('/');
}


module.exports.deleteSession = (req,res)=>{
	req.flash('success', 'You have Logged Out');
	
	// res.clearCookie('Connect-i');
	
	 req.logout();
	return res.redirect('/users/sign-in');
}