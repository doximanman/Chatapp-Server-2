const express = require('express');
var router = express.Router();
const TokensController = require('../controllers/Tokens');

router.route('/')
    .post(TokensController.createToken)

module.exports = router;
