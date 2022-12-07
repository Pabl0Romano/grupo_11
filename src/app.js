const express = require("express");
const app = express();
const path = require('path');
const index = require("./routes/mainRouter")
const productRouter = require("./routes/productRouter")
const usersRouter = require("./routes/usersRouter")

let PORT = process.env.PORT || 3000

app.use(express.static("public"));

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, '/views'));

app.listen(3000,()=>{
    console.log("Servidor funcionando en puerto " + PORT)
});


app.use("/",index);
app.use("/producto",productRouter);
app.use("/user",usersRouter)






