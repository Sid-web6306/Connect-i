//require Express
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const port = 8080;


app.use(expressLayouts);
//use express router
////////URL,/////Path for routes
app.use('/',require('./routes'));

//setup view engine
app.set('view engine', 'ejs');
app.set('views','./views');



//Server is running on port.
app.listen(port,(err)=>{
	if(err){
		console.log(`Error: ${err}`);
	}
	console.log(`Server is running on Port: ${port}`);
})