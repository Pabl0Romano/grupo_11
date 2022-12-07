const fs = require('fs');
const { get } = require('http');
const path = require('path');

const productsFilePath = path.join(__dirname,'../data/users.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
    login: (req,res)=>{
        res.render("login");
    },

    register: (req,res)=>{
        res.render("register");
    }
};

module.exports = controller;