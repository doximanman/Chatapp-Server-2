const express = require('express');
var router = express.Router();
const userController = require('../controllers/User');

// router.route('/api/Users')
router.route('/')
    .post(userController.createUser)
router.route('/:username')
    .get(userController.getUserByUsername)

module.exports = router;
