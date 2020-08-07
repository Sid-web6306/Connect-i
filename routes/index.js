const express = require('express');
const router = express.Router();

//setup router : root link
router.get('/',(req,res)=>{
	res.send("<h1>Setup of Router Complete!</h1>")
});

module.exports = router;