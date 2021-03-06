
const Post = require('../models/post');
const Comment = require('../models/comments');
const Like = require('../models/like');


module.exports.create = async (req,res)=>{
	//Creating a Post
	try{
		let posts = await Post.create({
			content: req.body.content,
			user:req.user._id
		});

		if(req.xhr){
			return res.status(200).json({
				data:{
					post:posts
				},
				message:"Post Created"
			})
		}

		req.flash('success','Post Created Successfully');
		return res.redirect('back');

	}catch(err){
		console.log("error in post_controller/create: ",err);
		req.flash('error',err);
		return;
	}
}
		


module.exports.destroy =async (req,res)=>{
	try{
		let post = await Post.findById(req.params.id);

		//.id means converting the object id into string)
		if(post.user == req.user.id){

			await Like.deleteMany({likeable: post, onModel: 'Post'});
			await Like.deleteMany({_id:{$in: post.comments}});

			post.remove();
			await Comment.deleteMany({post:req.params.id})
			if(req.xhr){
				return res.status(200).json({
					data:{
						post_id: req.params.id
					},
					message: "Post deleted Successfully"
				})
			}
			req.flash('success','Post Deleted Successfully!');
			return res.redirect('back');

		}else{
			req.flash('Error','Post Cannot Deleted');
			return res.redirect('back');
		}
	}catch(err){
		console.log("Error in post_controller/destroy: ",err);
		req.flash('error',err);
		return;
	}
	

}