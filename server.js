//require Express
const express = require('express');
const app = express();
const port = 8080;

//Server is running on port.
app.listen(port,(err)=>{
	if(err){
		console.log(`Error: ${err}`);
	}
	console.log(`Server is running on Port: ${port}`);
})