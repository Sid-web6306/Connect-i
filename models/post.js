const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
	content:{
		type:String,
		required: true,
	},
	//refer to user schema
	user:{
		type:mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	//inside the array of ids of all comments in this scehma itself
	comments:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'comment'
	}
	
},{
	timestamps: true
});

const Post = mongoose.model('Post',postSchema);


module.exports = Post;