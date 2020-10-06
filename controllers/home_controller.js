const User = require('../models/user');
const Post = require('../models/post');

module.exports.home = async (req,res) =>{
	//set the cookie
	try{
		let posts = await Post.find({})
		.sort('-createdAt')
	.populate('user')
	.populate({
		path:'comments',
		populate:{
			path:'user'
		}
	})
	// .exec((err,posts)=>{
		
	// })
	let users = await User.find({});

		return res.render('home',{
			title:"Connect-i | Home",
			post:posts,
			all_users:users
		});
	}catch(err){
		console.log("Erroin home controller/home: ",err);
		return;
	}

	// Post.find({} , (err,posts)=>{
	// 	return res.render('home',{
	// 		title:"Connect-i | Home",
	// 		post:posts
	// 	})
	// })
	//populate the whole user of each post
	//nested populate 
	
}


//module.exports.actionName = (req,res)=>{}