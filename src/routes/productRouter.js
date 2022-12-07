var express = require('express');
var router = express.Router();
const productControllers = require("../controllers/productControllers");

router.get("/index",productControllers.index);
router.get("/create",productControllers.create);
router.get("/detail/:id",productControllers.detail);



module.exports = router;