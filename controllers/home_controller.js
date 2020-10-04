const User = require('../models/user');
const Post = require('../models/post');

module.exports.home = (req,res) =>{
	//print the cookie
	console.log(req.cookies);
	//set the cookie


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
		User.find({},(err,users)=>{
			return res.render('home',{
				title:"Connect-i | Home",
				post:posts,
				all_users:users
			})
		});


		
	})
}


//module.exports.actionName = (req,res)=>{}