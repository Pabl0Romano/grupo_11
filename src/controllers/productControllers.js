const { Console } = require('console');
const fs = require('fs');
const { get } = require('http');
const path = require('path');
const db = require("../database/models");
const op = db.sequelize.op

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const controller = {

	detail: (req, res) => {
		let productos = db.product.findAll();
		let productoEnDetalle = db.product.findByPk(req.params.id);
		Promise.all([productos, productoEnDetalle])
		.then(([products, productoEncontrado]) => {
			res.render('detail', {productoEncontrado: productoEncontrado, productos: products});
		})
	},

	index: (req,res) => {
		res.render("product");
	},

	listado: (req,res) => {
		db.product.findAll()
			.then(function(productos){
				res.render("listado-productos",{productos:productos})
			})
	},

	// Create - Form to create
	create: (req, res) => {
		let brands = db.brand.findAll()
		let categories = db.categories.findAll()
		Promise.all([brands, categories])
		.then(([brands, categories]) => {
			return res.render('product-create-form', {brands: brands, categories: categories});
		})

	},

	store: (req, res) => {
		db.product.create({
			name: req.body.name,
			description: req.body.description,
			price: req.body.price,
			category_id: req.body.category,
			brand_id: req.body.brand,
			image: req.file.filename
		})
			.then(function (newProduct) {
			res.redirect('/products/' + newProduct.id)
		})
},
	// Update - Form to edit
	edit: (req, res) => {
		db.product.findByPk(req.params.id)
			.then(function(product){
				res.render("product-edit-form",{product:product})
			})
	},
	// Update - Method to update
	update: (req, res) => {
		db.product.update ({
			name: req.body.name,
			description: req.body.description,
			price: req.body.price,
			image: req.file.filename
		}, {
			where: {
				id: req.params.id
			}
		})
		res.redirect("/products/listado");

	},
	// Delete - Delete one product from DB
	destroy : (req, res) => {
		db.product.destroy({
			where: {
				id: req.params.id
			}
		})
		res.redirect("/products/listado")
	},
	listadoCategoria: (req,res) => {
		let cat = req.params.id
		db.product.findAll({
			where: {
				category_id: cat
			}
		})
		.then (productos =>{
			res.render("listado-xcategoria",{productos:productos})
		})
	},
	search: (req,res) => {
		let target = req.query.search
		db.product.findAll()
		.then(productos => {
			let resultado = [];
			for (let i = 0; i < productos.length; i++) {
				if (productos[i].name.toLowerCase().includes(target.toLowerCase()) || productos[i].description.toLowerCase().includes(target.toLowerCase()))
				resultado.push(productos[i]);
			}
			res.render("resultado-busqueda",{productos:resultado})
		})

	}
};

module.exports = controller




/*const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../database/productsDatabase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const db = require('../database/models');
const Op = db.Sequelize.Op;

const productController = {
    producto: (req, res) => {
		db.Productos.findAll()
			.then(products => {
				res.render('./products/producto', {productos: products})
			})
    },

    detalle: (req, res) => {		
		let productos = db.Productos.findAll();
		let productoEnDetalle = db.Productos.findByPk(req.params.id);
		Promise.all([productos, productoEnDetalle])
		.then(([products, productoEncontrado]) => {
			res.render('./products/productoDetalle', {productoEnDetalle: productoEncontrado, productos: products});
		})
	},

    crear: (req, res) => {
		db.Categorias.findAll()
			.then(categorias => {
				res.render('./products/crear', {categoria: categorias})
			})
    },

    store: (req, res) => {
		db.Productos.create({
			nombre: req.body.nombreProducto,
			  descripcion: req.body.descripcion ,
			  imagen: req.file.filename,
			  precio: req.body.precio,
			  FKseccion : req.body.seccion,
			  FKcategoria : req.body.categoria,
			  fechaDeCreacion: req.body.fechaDeCreacion,
			  creador : req.body.creador,
			  FKformato : req.body.formato,
			  FKcoleccionista: req.session.userLogged.id
		});
		res.redirect('/products');

        // let nombreImagen = req.file.filename;
        // let idNuevo = products[products.length-1].id + 1;
        // let nuevoObjeto = Object.assign({id: idNuevo},req.body,{imagen:nombreImagen});
        // products.push(nuevoObjeto);
        // fs.writeFileSync(productsFilePath, JSON.stringify(products,null,4));
        // res.redirect('/');
    },

    editar: (req, res) => {
		let categoria = db.Categorias.findAll();
		let formato = db.Formatos.findAll();
		let usuario = db.Usuarios.findAll();
		let productoEnDetalle = db.Productos.findByPk(req.params.id);
		Promise.all([categoria, formato, usuario, productoEnDetalle])
		.then(([categorias, formatos, usuarios, productoEncontrado]) => {
			res.render('./products/editar', {productoEnDetalle: productoEncontrado, formato: formatos, usuario: usuarios, categoria: categorias});
		})
	},

    update: (req, res) => {
		db.Productos.update({
			nombre: req.body.nombreProducto,
			  descripcion: req.body.descripcion,
			// imagen: req.file.filename,
			  precio: req.body.precio,
			  FKseccion : req.body.seccion,
			//   FKcategoria : req.body.categoria,
			  creador : req.body.creador,
			  FKformato : req.body.formato,
		}, {where: {
			id: req.params.id
		}
	});
		res.redirect('/products/' + req.params.id);

		// let valoresNuevos = req.body;
		// let idProducto= req.params.id

		// let nombreImagen = req.file.filename

		// for(let i=0;i<products.length;i++){
		// 	if (products[i].id==idProducto){
				
		// 		var imagenAnterior = products[i].imagen
		// 		products[i].nombreProducto = valoresNuevos.nombreProducto;
		// 		products[i].precio = valoresNuevos.precio;
        //         products[i].fechaDeCreacion = valoresNuevos.fechaDeCreacion;
        //         products[i].creador = valoresNuevos.creador;
        //         products[i].coleccionista = valoresNuevos.coleccionista;
		// 		products[i].categoria = valoresNuevos.categoria;
		// 		products[i].descripcion = valoresNuevos.descripcion;
		// 		products[i].imagen = nombreImagen;

		// 		var productoEncontrado = products[i];

		// 		break;
			// }
		// }

		// fs.writeFileSync(productsFilePath, JSON.stringify(products,null,4));
		// fs.unlinkSync(path.join(__dirname,'../../public/img/products/' + imagenAnterior));
		// res.render('productoDetalle', {productoEnDetalle: productoEncontrado});
	},

    destroy : (req, res) => {
		db.Productos.destroy({
			where: {
				id: req.params.id
		}
	});
		res.redirect('/products/');
		// let idProducto= req.params.id
		// for(let i=0;i<products.length;i++){
		// 	if (products[i].id==idProducto){
		// 		var nombreImagen = products[i].imagen;
		// 		products.splice(i,1);
		// 		break;
		// 	}
        // }
		// 	fs.writeFileSync(productsFilePath, JSON.stringify(products,null,4));
		// 	fs.unlinkSync(path.join(__dirname,'../../public/img/products/' + nombreImagen));
		// 	res.render('home', {productos: products});
		// res.redirect('/');
		},

    carrito: (req, res) => {		
		db.Productos.findAll()
		.then(products => {
			res.render('./products/carrito', {productos: products})
		})
    },
	search: (req, res) => {
        db.Productos.findAll({
            where: {
				[Op.or]: [{nombre: {[Op.like]: '%' + req.query.keyword + '%'}}, {creador: {[Op.like]: '%' + req.query.keyword + '%'}}]
            }
        })
        .then(async products => {
            if (products.length > 0){
                res.render('./products/productoSearch', {productos: products})
            } else {
				res.send('No se encontro producto')
			}
        })
}
}
module.exports = productController;*/