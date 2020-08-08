const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controllers.js');

router.get('/profile', usersController.profile);

router.get('/sign-up', usersController.signup);

router.get('/sign-in',usersController.signin);
module.exports = router;