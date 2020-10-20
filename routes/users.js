const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controllers.js');
const passport = require('passport');



router.get('/profile/:id',passport.checkAuthentication, usersController.profile);

router.post('/update/:id', passport.checkAuthentication,usersController.update);

router.get('/sign-up', usersController.signup);

router.get('/sign-in',usersController.signin);

router.post('/create', usersController.create);
//use passport as a middleware to authenticate.
router.post('/create-session',passport.authenticate(
	'local',
	{failureRedirect:'/users/sign-in'}
	), usersController.createSession);
router.get('/sign-out',usersController.deleteSession);


router.get('/oauth/google', passport.authenticate('google',{scope:['profile','email']}));
router.get('/oauth/google/callback', passport.authenticate('google', {failureRedirect: '/users/sign-in'}),usersController.createSession);





module.exports = router;