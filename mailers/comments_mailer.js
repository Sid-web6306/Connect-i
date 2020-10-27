const nodemailer = require('../config/nodemailer');
const ejs = require('ejs');
const path = require('path');

//This is another way of export a function
exports.newComment = (comment)=>{
    let htmlString = nodemailer.renderTemplate({comment:comment},'/comments/new_comments.ejs')

    nodemailer.transporter.sendMail({
        from:'siddhantjain15298@gmail.com',
        to: comment.user.email,
        subject:"New Comment Published",
        html:htmlString
    },(err,info)=>{
        if(err){
            console.log("error in sending mail",err);
        }
        console.log("message Sent!",info);
        return ;
    });
}