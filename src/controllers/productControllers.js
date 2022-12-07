const fs = require('fs');
const { get } = require('http');
const path = require('path');

const productsFilePath = path.join(__dirname,'../data/productoDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const controller = {

	detail: (req, res) => {
		let product = products.find(product=>product.id == req.params.id);
		res.render('detail', {product})
	},

	index: (req,res) => {
		res.render("product");
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form')
	},
	
	/*
	store: (req, res) => {
		let newProduct = {
			"id": products[products.length -1]["id"]+1,
			"name": req.body.name,
			"price": req.body.price,
			"discount": req.body.discount,
			"category": req.body.category,
			"description": req.body.description 
		}

		products.push(newProduct);
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ""));

		res.redirect('/');
	},

	// Update - Form to edit
	edit: (req, res) => {
		let product = products.find(product=>product.id == req.params.id);
		res.render('product-edit-form',{product})
	},
	
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
		let productEdit = products.find(product=>product.id == req.params.id)
		let addProduct = {
			"id": productEdit.id,
			"name": req.body.name,
			"price": req.body.price,
			"discount": req.body.discount,
			"category": req.body.category,
			"description": req.body.description, 
	};
	let newProduct = product.map(product =>{
		if(productEdit == product.id){
		  return product = addProduct
		}	

	})
	fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ""));

	
	},
	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
	}
	*/
};
module.exports = controller