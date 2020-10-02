
const Post = require('../models/post');

module.exports.create = (req,res)=>{
	//Creating a Post
	console.log('User: ',req.user._id);
	Post.create({
		content: req.body.content,
		user:req.user._id
	}, (err,post)=>{
		if(err){console.log("Error in creating a post"); return;}

		return res.redirect('back');
	})
}
