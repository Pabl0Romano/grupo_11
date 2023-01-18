var express = require('express');
var router = express.Router();
const {body} = require("express-validator");

// ************ Controller Require ************
const usersController = require('../controllers/userController');
const validaciones = [
    body("nombre").notEmpty().withMessage("El campo no puede estar vacio"),
    body("apellido").notEmpty().withMessage("El campo no puede estar vacio"),
    body("email").notEmpty().withMessage("El campo no puede estar vacio"),
    body("contraseña").notEmpty().withMessage("El campo no puede estar vacio"),
    body("contraseñaagain").notEmpty().withMessage("El campo no puede estar vacio")
]

router.get("/login",usersController.login);
router.get("/register",usersController.register);
router.post("/register",validaciones,usersController.processRegister);
router.get("/profile/:id",usersController.profile);

module.exports = router;
