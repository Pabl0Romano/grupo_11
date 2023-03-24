var express = require('express');
var router = express.Router();
const {body} = require("express-validator");
const multer = require('multer');
const path = require('path');

const multerDiskStorage = multer.diskStorage({
    destination: (req,file,callback) => {
        let folder = path.join(__dirname,"../../public/images/products");
        callback(null,folder);
    },
    filename: (req,file,callback) => {
        let imageName = Date.now() + path.extname(file.originalname);
        callback(null,imageName);
    }
});
const upload = multer({storage:multerDiskStorage});
const productControllers = require("../controllers/productControllers");

router.get("/",productControllers.index);
router.get("/listado",productControllers.listado)
router.get("/create",productControllers.create);
router.get("/:id",productControllers.detail);
router.post("/create",upload.single("imgProducto"),productControllers.store);
router.get("/:id/edit",productControllers.edit);
router.put("/:id/edit",productControllers.update);
router.post("/delete/:id",productControllers.destroy);

/*router.post('/create', uploadFile.single('imagen'), productControllers.store);
router.get('/carrito/', productControllers.carrito);*/

module.exports = router;