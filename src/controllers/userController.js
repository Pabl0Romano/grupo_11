const fs = require('fs');
const { get } = require('http');
const path = require('path');
const {validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const db = require("../database/models");

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
    login: (req,res)=>{
        res.render("login");
    },

    register: (req,res)=>{
        res.render("register");
    },

    processRegister: (req,res)=>{
        const resultValidation = validationResult(req);
        
        if(resultValidation.errors.length > 0){
            return res.render("register", {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }
        let hash = bcrypt.hashSync(req.body.contrasenia, 10);
        db.Users.create({
            first_name: req.body.nombre,
            last_name: req.body.apellido,
            email: req.body.email,
            password: hash,
            phone_number: req.body.telefono,
            cities_id: "1",
            rol: 0,
            image: req.file.filename
      });
		res.redirect('/');

    },

    profile: (req,res) =>{
        db.Users.findByPk(req.params.id)
			.then(function(user){
                console.log(user.image);
				res.render("profile",{user:user})
			})
            
    },

    loginProcess: (req, res) => {
        const resultValidation = validationResult(req);
        
        if(resultValidation.errors.length > 0){
            return res.render("login", {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }
        db.Users.findOne({
            where : {
                email : req.body.email
            }
        })
        .then(usuario => {
            console.log(usuario);
            let comparePassword = bcrypt.compareSync(req.body.contrasenia, usuario.password);
            if (comparePassword) {
                req.session.usuarioLogueado = usuario;
                if(req.body.remember_user) {
                    res.cookie('userEmail', req.body.email, {maxAge: (1000*60)*60})
                }
                return res.redirect('/user/profile/'+usuario.id)
            } else {
                return res.send("error");
            }
        }
    )   
    },
    listar: (req,res) => {
        db.Users.findAll()
			.then(function(users){
				res.render("listado-usuarios",{users:users})
			})
    },
    logout: (req,res) => {
      req.session.destroy();
      return res.redirect('/');
    },
    edit: (req,res) => {
        db.Users.findByPk(req.params.id)
			.then(function(user){
				res.render("profile-edit",{user:user})
			})
    },
    update: (req,res) => {
        const resultValidation = validationResult(req);
        
        if(resultValidation.errors.length > 0){
            return res.render("register", {
                errors: resultValidation.mapped(),
                oldData: req.body
            });
        }
        db.Users.update ({
			first_name: req.body.nombre,
            last_name: req.body.apellido,
            email: req.body.email,
            phone_number: req.body.telefono,
            image: req.file.filename,
		}, {
			where: {
				id: req.params.id
			}
		})
		res.redirect("/user/profile/"+req.params.id);
    },
    profileAdm: (req,res) =>{
        db.Users.findByPk(req.params.id)
			.then(function(user){
                console.log(user.image);
				res.render("profile-edit-adm",{user:user})
			})
            
    },
    profileAdmProcess: (req,res) => {
        if (req.body.rol == 1) {
            db.Users.update ({
                rol: 1
            }, {
                where: {
                    id: req.params.id
                }
            })
        } else {
            db.Users.update ({
                rol: 0
            }, {
                where: {
                    id: req.params.id
                }
            })
        }
        
        res.redirect("/user/list")
    }
};

module.exports = controller;





/*const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

const User = require('../user.js')

const db = require('../database/models');
const Op = db.Sequelize.Op;

const userController = {
    login: (req, res) => {
        
        res.render('./users/login')
    },
    loginProcess: (req, res) => {
        db.Usuarios.findOne({
            where : {
                email : req.body.email
            }
        })
        .then(usuario => {
        if(usuario){
            let comparePassword = bcryptjs.compareSync(req.body.contraseña, usuario.contraseña);
            if (comparePassword) {
                delete usuario.contraseña;
                req.session.userLogged = usuario;

                if(req.body.remember_user) {
                    res.cookie('userEmail', req.body.email, {maxAge: (1000*60)*2})
                }
                return res.redirect('/users/profile')
            }
        }

        return res.render('./users/login', {
            errors: {
                email: {
                    msg: 'Las credenciales son inválidas'
                }
            }
        })
    })
    },
    profile: (req, res) => {
        return res.render('./users/profile',{
            user: req.session.userLogged
        });
    },
    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/')
    },
    registro: (req, res) => {
        res.cookie('testing', 'Hola mundo!', {maxAge: 1000 * 30})
        res.render('./users/registro')
    },
    processRegister: (req, res) => {
        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0) {
            return res.render('users/registro', {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        }
        let userInDB
        db.Usuarios.findAll({
            where : {
                email : {[Op.like] : req.body.email}
            }
        })
        .then (usuarios => {
            userInDB = usuarios
        })
        //let userInDB = User.findByField('email', req.body.email);

        if (userInDB) {
            return res.render('users/registro', {
                errors: {
                    msg: 'Este email ya esta registrado'
                },
                oldData: req.body
            })
        } else {
            db.Usuarios.create ({
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                email: req.body.email,
                contraseña: bcryptjs.hashSync(req.body.contraseña, 10),
                avatar: req.file.filename,
                coleccionista: req.body.coleccionista
            })
            return res.redirect('/users/login');
        }

        // let userToCreate = {
        //     ...req.body,
        //     contraseña: bcryptjs.hashSync(req.body.contraseña, 10),
        //     avatar: req.file.filename
        // }

        //let userCreated = User.create(userToCreate);

        
    },
    store: (req, res) => {
        let idNuevo = products[products.length-1].id + 1;
        let nuevoObjeto = Object.assign({id: idNuevo},req.body);
        products.push(nuevoObjeto);
        fs.writeFileSync(productsFilePath, JSON.stringify(products,null, 4));
        res.redirect('/');
    },
    editar: (req, res) => {
        res.render('./users/editar', {user: req.session.userLogged})
    },
    update: (req, res) => {
		let valoresNuevos = req.body;
		let idUser= req.params.id

        db.Usuarios.update ({
            nombre: valoresNuevos.nombre,
            apellido: valoresNuevos.apellido,
            email: valoresNuevos.email,
            fecha_nacimiento: valoresNuevos.fecha_nacimiento,
            // avatar: req.file.filename,
            coleccionista: valoresNuevos.coleccionista
        }, {
            where : {
                id : idUser
            }
        })
		// for(let i=0;i<users.length;i++){
		// 	if (products[i].id==idUser){
        //         var imagenAnterior = users[i].imagen
        //         users[i].imagen,
		// 		users[i].nombre = valoresNuevos.nombre,
        //         users[i].apellido = valoresNuevos.apellido,
        //         users[i].nombre = valoresNuevos.nombre,
        //         users[i].email = valoresNuevos.email,
        //         users[i].telefono = valoresNuevos.telefono,
        //         users[i].fechaNacimiento = valoresNuevos.fechaNacimiento,
        //         users[i].creador = valoresNuevos.creador,
        //         users[i].coleccionista = valoresNuevos.coleccionista
				

		// 		var userEncontrado = users[i];

		// 		break;
		// 	}
		// }

		// fs.writeFileSync(usersFilePath, JSON.stringify(users,null,4));
		// fs.unlinkSync(path.join(__dirname,'../../public/img/' + imagenAnterior));
		res.redirect('/users/login');
	},
}

module.exports = userController;*/