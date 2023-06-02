const express = require('express');
var router = express.Router();
const userPassNameController = require('../controllers/UserPassName');

// router.route('/api/Users')
router.route('/')
    .post(userPassNameController.createUserPassName)

module.exports = router;
