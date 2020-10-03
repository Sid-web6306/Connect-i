const Comment = require('../models/comments');
const Post = require('../models/post');

module.exports.create = (req,res)=>{
    Post.findById(req.body.post,(err,post)=>{
        if(err){
            console.log('Error in finding a post');
            return;
        }else if(post){
            Comment.create({
                content: req.body.content,
                post:req.body.post,
                user:req.user._id
            },(err,comment)=>{
                if(err){
                    console.log("Error in creating a post");
                    return ;
                }

                post.comments.push(comment);
                //saving permanently into database
                post.save();
                res.redirect('/');
            });
        }
    });
}