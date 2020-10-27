const express = require('express');
const router = express.Router();
const posts_api = require('../../../controllers/api/v1/posts_api');
const passport  = require("passport");
router.get('/',posts_api.index);
router.delete('/:id',passport.authenticate('jwt',{session:false}),posts_api.destroy);

module.exports = router;