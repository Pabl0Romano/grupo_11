var express = require('express');
var router = express.Router();
const {body} = require("express-validator");
const multer = require("multer");
const path = require("path")

//multer config
const multerDiskStorage = multer.diskStorage({
    destination: (req,file,callback) => {
        let folder = path.join(__dirname,"../../public/images/users");
        callback(null,folder);
    },
    filename: (req,file,callback) => {
        let imageName = Date.now() + path.extname(file.originalname);
        callback(null,imageName);
    }
});
const upload = multer({storage:multerDiskStorage});


// ************ Controller Require ************
const usersController = require('../controllers/userController');
const validaciones = [
    body("nombre").notEmpty().withMessage("El campo no puede estar vacio"),
    body("apellido").notEmpty().withMessage("El campo no puede estar vacio"),
    body("email")
        .notEmpty().withMessage("El campo no puede estar vacio").bail()
        .isEmail().withMessage("Debes escribir un correo válido"),
    body("telefono").notEmpty().withMessage("El campo no puede estar vacio"),
    body("contrasenia")
        .notEmpty().withMessage("El campo no puede estar vacio").bail()
        .isLength({min: 8 }).withMessage('La contraseña debe tener un mínimo de 8 caractéres'),
    body("contraseniaagain")
        .notEmpty().withMessage("El campo no puede estar vacio").bail()
        .isLength({min: 8 }).withMessage('La confirmación de la contraseña debe tener un mínimo de 8 caractéres').bail()
        .custom((value, {req}) =>{
            if(req.body.contraseña == value ){
                return true    // Si yo retorno un true  no se muestra el error     
            }else{
                return false   // Si retorno un false si se muestra el error
            }    
        }).withMessage('Las contraseñas deben ser iguales'),
    body("imgperfil").custom((value, { req }) =>{
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif'];

        if (!file) {
            throw new Error('Tienes que subir una imagen');
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error (`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
            }
        }

    })
]
//Aquí ejecuto mis validaciones
const validacionesLogin = [
    body("email")
        .notEmpty().withMessage("El campo no puede estar vacio").bail()
        .isEmail().withMessage("Debes escribir un correo válido"),
    body("contrasenia")
        .notEmpty().withMessage("El campo no puede estar vacio").bail()
        .isLength({min: 8 }).withMessage('La contraseña debe tener un mínimo de 8 caractéres'),
    // body('email').custom( (value  ) =>{
    //   for (let i = 0; i < archivoUsuarios.length; i++) {
    //       if (archivoUsuarios[i].email == value) {
    //           return true    
    //       }
    //   }
    //   return false
    // }).withMessage('Usuario no se encuentra registrado...'),
  
]

//Aquí armo las validaciones del Registro
/*const validacionesRegistro = [
    //Aquí incoporé otras validaciones, para que las tengan de guía para sus proyectos  
    body('first_name').isLength({
          min: 1
        }).withMessage('El campo nombre no puede estar vacío'),
      body('last_name').isLength({min: 1
        }).withMessage('El campo apellido no puede estar vacío'),
      body('email').isEmail().withMessage('Agregar un email válido'),
  
      //Aquí valido el Password   
      body('password').isLength({min: 6 }).withMessage('La contraseña debe tener un mínimo de 6 caractéres'),
      
      //Aquí valido la confimación del password dispuesto por el usuario
      body('confirm_password').isLength({min: 6 }).withMessage('La confirmación de la contraseña debe tener un mínimo de 6 caractéres'),
  
      //Aquí valido si las contraseñas son iguales o no
      //El ( value ) viene a ser el valor que viaje en el name del del input del campo 
      //El valor { req } corresponde a lo que viene desde el formulario
  
      body('confirm_password').custom((value, {req}) =>{
          if(req.body.password == value ){
              return true    // Si yo retorno un true  no se muestra el error     
          }else{
              return false   // Si retorno un false si se muestra el error
          }    
      }).withMessage('Las contraseñas deben ser iguales'),
  
      //Aquí obligo a que el usuario seleccione su avatar
      body('avatar').custom((value, {req}) =>{
          if(req.file != undefined){
              return true
          }
          return false;
      }).withMessage('Debe elegir su avatar y debe ser un archivo con formato: .JPG ó JPEG ó PNG')
    ]*/

const guestMiddleware = require('../middlewares/guestMiddlewares')
const authMiddleware = require('../middlewares/authMiddlewares')


router.get("/login", guestMiddleware, usersController.login);
router.post("/login",validacionesLogin,usersController.loginProcess)
router.get("/register", guestMiddleware, usersController.register);
router.post("/register",upload.single("imgperfil"),validaciones,usersController.processRegister);
router.get("/profile/:id", authMiddleware, usersController.profile);
router.post("/logout", usersController.logout);
router.get("/list",usersController.listar)
router.get("/edit/:id",usersController.edit)
router.put("/edit/:id",upload.single("imgperfil"),usersController.update)
router.get("/profile/adm/:id", authMiddleware, usersController.profileAdm);
router.put("/profile/adm/:id", authMiddleware, usersController.profileAdmProcess);

module.exports = router;
