module.exports.profile = (req,res)=>{
	return res.render('user_profile',{
		title:"User Profile"
	})
}

module.exports.signup = (req,res)=>{
	return res.render('user_signup',{
		title:"Connect-i | Signup"
	})
}

module.exports.signin = (req,res)=>{
	return res.render('user_signin',{
		title:"Connect-i | Signin"
	})
}