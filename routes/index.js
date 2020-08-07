const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller.js');



//setup router : root link

router.get('/introrouter',(req,res)=>{
	res.send('<h1>Router setup complete<h1>');
})
router.get('/',homeController.home);

router.use('/users',require('./users'));
//for any futher routes,access from here
// router.use('/routerName', require('/routerFile'));
router.use('/posts',require('./post'),(req,res)=>{
	res.send('<h1>Users Posts</h1>');
});


module.exports = router;