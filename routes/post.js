const express = require('express');
const router = express.Router();

const postController = require('../controllers/post_controller.js');

//creating post and store into mongodb
router.post('/create', postController.create);


module.exports = router;