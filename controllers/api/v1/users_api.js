const User = require('../../../models/user');
const jwt = require('jsonwebtoken');



module.exports.createSession = async(req,res)=>{

    try{
        let user =await User.findOne({email: req.body.email});

        if(!user || user.password != req.body.password){
            return res.status(422).json({
                message:"invalid username or password"
            });
        }
        return res.status(200).json({
            message:"Sign in successfuly , here is your token, Please keep it safe!",
            data:{
                token: jwt.sign((await user).toJSON(), 'Connect-I', {expiresIn: '100000'})
            }
        })
    }catch(err){
        console.log("Error in user_api: ",err);
        return res.status(500).json({
            message:"internal server error"
        });
    }
	
}