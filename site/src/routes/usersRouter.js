var express = require('express');
var router = express.Router();

// ************ Controller Require ************
const usersController = require('../controllers/userController');

router.get("/login",usersController.login);
router.get("/register",usersController.register);

module.exports = router;
