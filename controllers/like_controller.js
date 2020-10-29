const Like = require('../models/like');
const Post = require('../models/post');
const Comment = require('../models/comments');

module.exports.toogleLike = async (req,res)=>{
    try{


        //likes/toggle/?abcdef&type=Posts/Comments
        let likeable;
        let deleted = false;// for not negative likes


        if(req.query.type == 'Post'){
            likeable = await  Post.findById(req.query.id).populate('likes');
        }else{
            likeable = await Comment.findById(req.query.id).populate('likes');
        }

        //check if like already exists

        let existingLikes = await Like.findOne({
            likeable:req.query.id,
            onModel: req.query.type,
            user: req.user._id
        });

        //if a like already exist then deleted

        if(existingLikes){
            likeable.like.pull(existingLikes._id);
            likeable.save();

            existingLikes.remove();
        }else{
            //make a new like

            let newLike = await Like.create({
                user:req.user._id,
                likeable: req.query.id,
                onModel: req.query.type
            });

            likeable.likes.push(like._id);
            likeable.save();

        }
        
        return res.json(200,{
            message:"Request Successful",
            data:{
                deleted:deleted
            }
        })


    }catch(err){
        console.log("error in Controler/Like: " ,err);
        res.json(500,{
            message:"Internal Server Error"
        });
    }
}
