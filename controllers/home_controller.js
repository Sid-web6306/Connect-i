const Post = require('../models/post');
module.exports.home = (req,res) =>{
	//print the cookie
	console.log(req.cookies);
	//set the cookie

	//populate in mongoose for fetching user name instead of id
	// Post.find({} , (err,posts)=>{
	// 	return res.render('home',{
	// 		title:"Connect-i | Home",
	// 		post:posts
	// 	})
	// })
	//populate the whole user of each post
	//nested populate 
	Post.find({})
	.populate('user')
	.populate({
		path:'comments',
		populate:{
			path:'user'
		}
	})
	.exec((err,posts)=>{
		return res.render('home',{
			title:"Connect-i | Home",
			post:posts
		})
	})
}


//module.exports.actionName = (req,res)=>{}