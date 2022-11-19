const express = require("express");
const app = express();
const path = require('path');

let PORT = process.env.PORT || 3000

app.use(express.static("public"));

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, '/views'));

app.listen(3000,()=>{
    console.log("Servidor funcionando en puerto " + PORT)
});


app.get("/",(req,res)=>{
    res.render("index");
});
app.get("/register",(req,res)=>{
    res.render("register");
});
app.get("/login",(req,res)=>{
    res.render("login");
});
app.get("/producto",(req,res)=>{
    res.render("product");
});
app.get("/carrito",(req,res)=>{
    res.render("carrito");
});






