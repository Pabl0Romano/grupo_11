const express = require("express");
const app = express();

const path = require('path');

let PORT = 3000

app.listen(PORT, console.log("Listen on port 3000", PORT));

app.use(express.static ("public"))

app.get("/", (req, res) =>{

res.sendFile(path.join(__dirname,"./views/index.html"))

})

const path = require("path");

app.use(express.static("public"));

app.listen(3000,()=>
    console.log("Server UP")
);

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"/views/index.html"));
});
