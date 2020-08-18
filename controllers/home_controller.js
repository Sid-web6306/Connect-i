module.exports.home = (req,res) =>{
	//print the cookie
	console.log(req.cookies);
	//set the cookie
	return res.render('home',{
		title: "Home"
	})
}


//module.exports.actionName = (req,res)=>{}