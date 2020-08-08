//require Express
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose.js');
const cookieParser = require('cookie-parser');
const port = 8080;

app.use(express.urlencoded());
app.use(cookieParser());

//looking static files    path name
app.use(express.static('./assets'));

app.use(expressLayouts);
//extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
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