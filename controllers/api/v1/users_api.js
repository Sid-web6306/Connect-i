const User = require('../../../models/user');
const jwt = require('jsonwebtoken');



module.exports.createSession = async(req,res)=>{
    try{
        let user = User.findOne({email: req.body.email});

        if(!user || user.password != req.body.password){
            return res.json(422,{
                message:"invalid username or password"
            });
        }
        return res.json(200,{
            message:"Sign in successfuly , here is your token, Please keep it safe!",
            data:{
                token: jwt.sign((await user).toJSON(), 'Connect-I', {expiresIn: '10000'})
            }
        })
    }catch(err){
        console.log("Error in user_api: ",err);
        return res.json(500, {
            message:"internal server error"
        });
    }
	
}