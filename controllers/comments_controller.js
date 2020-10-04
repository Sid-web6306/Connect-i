const Comment = require('../models/comments');
const Post = require('../models/post');

module.exports.create = async (req,res)=>{
    try{

        let post= await Post.findById(req.body.post)
        if(post){
            let comment = await Comment.create({
                content: req.body.content,
                post:req.body.post,
                user:req.user._id
        });

                post.comments.push(comment);
                //saving permanently into database
                post.save();
                res.redirect('/');
        }
    }catch(err){
        console.log("Error in comment-controller/create");
        return;
    }
    
}



module.exports.destroy = async(req,res)=>{
    try{
        let comment = await Comment.findById(req.params.id)
        if(comment.user == req.user.id){
            let PostId = comment.post;
            comment.remove();
            let post = await Post.findByIdAndUpdate(PostId,{$pull:{comments: req.param.id}});
            return res.redirect('/');
        }

    }catch(err){
        console.log("Error in comment_controller/destroy: ",err);
        return;
    }
    
}
