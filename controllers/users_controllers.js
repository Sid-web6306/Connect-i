const User = require('../models/user.js');
const fs = require('fs');
const path = require('path');
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
//please reproduce the error ok

module.exports.update = async (req,res)=>{
	try{
		if(req.user.id==req.params.id){
			let user = await User.findById(req.params.id);
			// console.log(req.params.id,user,req.body,req.file);
			User.uploadedAvatar(req,res,(err)=>{
				if(err){
					console.log("Error in uploading a avatar in user",err);
				}
				user.name = req.body.name;
				user.email = req.body.email;
				if(req.file){
					if(user.avatar){
						fs.unlinkSync(path.join(__dirname, '..' , user.avatar));
					}
					//this is saving the path of the uploaded file into avatar field in the user
					user.avatar = User.avatarPath + '/' + req.file.filename;
			
				}

				user.save();
				console.log(user.avatar);
				return res.redirect('back');
				
			});
		}else{
			res.status(401).send('Unauthorized')
		}
	}catch(err){
		console.log("Error in user_controller/update");
		return res.redirect('back');
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
	req.flash('success', 'You have been Logged Out');
	
	// res.clearCookie('Connect-i');
	
	 req.logout();
	return res.redirect('/users/sign-in');
}