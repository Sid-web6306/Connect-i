const Comment = require('../models/comments');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');
const commentMailWorker = require('../workers/comment_email_worker');
const queue= require('../config/kue');

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
                comment = await comment.populate('user','name email').execPopulate();
                // commentsMailer.newComment(comment);
                let job = await queue.create('emails', comment).save(err=>{
                    if(err){
                        console.log("Error in creating a queue");
                    }
                    console.log(job.id);
                });
                if (req.xhr){
                
    
                    return res.status(200).json({
                        data: {
                            comment: comment
                        },
                        message: "Post created!"
                    });
                }
                req.flash('success','Comment Published!');
                res.redirect('/');
        }
    }catch(err){
        console.log("Error in comment-controller/create");
        req.flash('error',err);
        return;
    }
    
}



module.exports.destroy = async(req,res)=>{
    try{
        let comment = await Comment.findById(req.params.id)
        if(comment.user == req.user.id){
            await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});

            let PostId = comment.post;
            comment.remove();
            let post = await Post.findByIdAndUpdate(PostId,{$pull:{comments: req.param.id}});
            req.flash('success','Comment Deleted Successfully!');
            return res.redirect('/');
        }

    }catch(err){
        console.log("Error in comment_controller/destroy: ",err);
        req.flash('error',err);
        return;
    }
    
}
