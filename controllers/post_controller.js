
const Post = require('../models/post');
const Comment = require('../models/comments');


module.exports.create = async (req,res)=>{
	//Creating a Post
	try{
		let posts = await Post.create({
			content: req.body.content,
			user:req.user._id
		});
		return res.redirect('back');

	}catch(err){
		console.log("error in post_controller/create: ",err);
		return;
	}
}
		


module.exports.destroy =async (req,res)=>{
	try{
		let post = await Post.findById(req.params.id);

		//.id means converting the object id into string)
		if(post.user == req.user.id){
			post.remove();
			await Comment.deleteMany({post:req.params.id})
			return res.redirect('back');

		}else{
			return res.redirect('back');
		}
	}catch(err){
		console.log("Error in post_controller/destroy: ",err);
	}
	

}