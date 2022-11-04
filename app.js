const express = require("express");
const app = express();
const path = require('path');

let PORT = process.env.PORT || 3000

app.use(express.static("public"));

app.listen(3000,()=>
    console.log("Servidor funcionando en puerto " + PORT)
);

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"/views/index.html"));
});