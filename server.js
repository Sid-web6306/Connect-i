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
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');

//using sass-node-middleware

app.use(sassMiddleware({
	//source
	src:'./assets/scss',
	//destination
	dest:'./assets/css',
	//debugging
	debug: true,
	//Output style : all in one line or multiple line
	outputStyle:'extended',
	//server looking into which file
	prefix: '/css'
}));





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

//mongo store is used to store in mongodb
app.use(session({
	name:'Connect-i',
	//todo change the secret before deployment in production mode
	secret: 'Something',
	//session in not initialized
	saveUninitialized: false,
	//when identity is established do i want to rewrite it save it again and again
	resave: false,
	cookie:{
		maxAge: (1000*60*100)
	},
	store: new MongoStore(
		{
			mongooseConnection: db,
			autoRemove: 'disabled'
		},(err)=>{
			if(err){
				console.log('error in storing the cookie in db',err);
			}
		}
	)

}));


//Passport Setup
app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthentication);


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