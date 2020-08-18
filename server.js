//require Express
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose.js');
const cookieParser = require('cookie-parser');
//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy.js');
const port = 8080;

app.use(express.urlencoded());
app.use(cookieParser());

//looking static files    path name
app.use(express.static('./assets'));

app.use(expressLayouts);

//extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

//setup view engine
app.set('view engine', 'ejs');
app.set('views','./views');

app.use(session({
	name:'Connect-i',
	//todo change the secret before deployment in production mode
	secret: 'Something',
	saveUninitialized: false,
	resave: false,
	cookie:{
		maxAge: (1000*60*100)
	}
}));

app.use(passport.initialize());
app.use(passport.session());


//use express router
////////URL,/////Path for routes
app.use('/',require('./routes'));
//Server is running on port.
app.listen(port,(err)=>{
	if(err){
		console.log(`Error: ${err}`);
	}
	console.log(`Server is running on Port: ${port}`);
})