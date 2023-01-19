var express = require('express');
var router = express.Router();
const {body} = require("express-validator");
const multer = require("multer");
const path = require("path")

//multer config
let multerDiskStorage = multer.diskStorage({
    destination: (req,file,callback) => {
        let folder = path.join(__dirname,"../");
        callback(null,folder);
    },
    filename: (req,file,callback) => {
        let imageName = Date.now() + path.extname(file.originalname);
        callback(null,imageName);
    }
});
const upload = multer({multerDiskStorage});


// ************ Controller Require ************
const usersController = require('../controllers/userController');
const validaciones = [
    body("nombre").notEmpty().withMessage("El campo no puede estar vacio"),
    body("apellido").notEmpty().withMessage("El campo no puede estar vacio"),
    body("email").notEmpty().withMessage("El campo no puede estar vacio"),
    //body("contraseña").notEmpty().withMessage("El campo no puede estar vacio"),
    //body("contraseñaagain").notEmpty().withMessage("El campo no puede estar vacio")
]

router.get("/login",usersController.login);
router.get("/register",usersController.register);
router.post("/register",upload.single("imgperfil"),validaciones,usersController.processRegister);
router.get("/profile/:id",usersController.profile);

module.exports = router;
