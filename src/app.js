const express = require("express");
const app = express();
const path = require('path');
const index = require("./routes/mainRouter")
const productRouter = require("./routes/productRouter")
const usersRouter = require("./routes/usersRouter")
const apiRouter = require("./routes/apiRouter")
const methodOverride = require("method-override");
const session = require("express-session")
const userLoggedMiddleware = require('./middlewares/userloggedMiddlewares');

let PORT = process.env.PORT || 3000

app.use(express.static("public"));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set('views', path.join(__dirname, '/views'));

app.listen(3000,()=>{
    console.log("Servidor funcionando en puerto " + PORT)
});

app.use(session({secret: "Messi > Maradona"}))
app.use(userLoggedMiddleware);
app.use("/",index);
app.use("/products",productRouter);
app.use("/user",usersRouter)
app.use("/API",apiRouter)






