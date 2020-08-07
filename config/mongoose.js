const mongoose = require('mongoose');

//Connection to database with the help of mongoose in mongoDB
mongoose.connect('mongodb://localhost/connect-i_development');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to mongodb"));

db.once('open', ()=>{
	console.log('Connected to Database :: MongoDB');
});

module.exports = db;