const path = require('path');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");


const controller = {
	index: (req, res) => {
		res.render('index')
	},	
	search: (req, res) => {

	},
	contact: (req, res) => {
		res.render('contacto')

	},
	history: (req, res) => {
		res.render('historia')

	}

}
module.exports = controller;


/*const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../database/productsDatabase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const homeController = {
    home: (req, res) => {
        res.render('home',{productos: products})},
}

module.exports = homeController;*/
