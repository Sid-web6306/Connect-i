const mongoose = require('mongoose');

const likeScehma = new mongoose.Schema({
    user:{
        type: mongoose.Schema.ObjectId
    },
    likeable:{
        type: mongoose.Schema.ObjectId,
        required: true,
        refPath: 'onModel'
    },
    onModel:{
        type:String,
        required: true,
        enum: ['Post','Comment']
    }
},
{
    timestamps:true
});

const Like = mongoose.model('Like',likeScehma);

module.exports = Like;