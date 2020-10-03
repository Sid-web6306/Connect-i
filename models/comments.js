const mongoose = require('mongoose');

const commentScehma = new mongoose.Schema({
    content:{
        type: String,
        required:true
    },
    // comment belongs to an user
    user:{
        tyoe:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    //For each post no. of comments
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }
},{
    timestamps: true
});

const Comment = mongoose.model('Comment', commentScehma);
module.exports = Comment;