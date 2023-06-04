const express = require('express');
var router = express.Router();
const UsersController = require('../controllers/Users');

// router.route('/api/Users')
router.route('/')
    .post(UsersController.createUser)
router.route('/:username')
    .get(UsersController.isLoggedIn, UsersController.getUserByUsername)
module.exports = router;
