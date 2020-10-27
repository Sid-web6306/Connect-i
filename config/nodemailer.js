const nodeMailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

let transporter = nodeMailer.createTransport({
    service:'gmail',
    port: 587,
    host: 'smtp.gmail.com',
    secure:false,
    auth:{
        user: 'ohgurusiddhu15298@gmail.com',
        pass:'Sid@15298'
    }
});


let renderTemplate = (data,relativepath)=>{
    let mailHTML ;
    ejs.renderFile(
        path.join(__dirname, '../views/mailer_template',relativepath),
        data,
        (err,template)=>{
            if(err){
                console.log('Error in rendering a template: ',err);return;
            }
            mailHTML = template;
        }
    )
    return mailHTML;
}


module.exports = {
    transporter,
    renderTemplate
}