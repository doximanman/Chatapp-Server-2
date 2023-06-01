const express = require('express');
var router = express.Router();
const userController = require('../controllers/User');

router.route('/api/Users')
    .post(userController.createUser)
router.route('/api/Users/:username')
    .get(userController.getUserByUsername)

module.exports = router;
