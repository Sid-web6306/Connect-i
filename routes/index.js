const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller.js');

//setup router : root link

router.get('/introrouter',(req,res)=>{
	res.send('<h1>Router setup complete<h1>');
})
router.get('/',homeController.home);

module.exports = router;