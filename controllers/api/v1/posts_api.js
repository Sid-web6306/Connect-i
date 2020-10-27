const Post = require('../../../models/post');
const Comment = require('../../../models/comments');


module.exports.index = async (req,res)=>{

    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })


    return res.json(200, {
        message: "Lists of Posts",
        posts: posts
    })
}


module.exports.destroy =async (req,res)=>{
	try{
		let post = await Post.findById(req.params.id);

		//.id means converting the object id into string)
		if(post.user == req.user.id){
			post.remove();
			await Comment.deleteMany({post:req.params.id})
			res.json(200,{
                message:"Posts and associated comments deleted successfully!"
            })
			// req.flash('success','Post Deleted Successfully!');
			

		}else{
			return res.status(401).json({
				message:"You cannot delete this poat"
			})
		}
	}catch(err){
		console.log("Error in post_controller/destroy: ",err);
		// req.flash('error',err);
		return res.json(500, {
            message:"Internal Server Error"
        });
	}
	

}