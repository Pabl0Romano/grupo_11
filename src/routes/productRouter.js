const productControllers = require("../controllers/productControllers");
const express = require('express');
const router = express.Router();
/*const multer = require('multer');
const path = require('path');

let multerDiskStorage = multer.diskStorage({
	destination: function(req, file, callback){
        let folder = path.join(__dirname, "../../public/img/products");
        callback(null, folder)
},
	filename: function(req, file, callback){
		let imageName = 'img' + '-' + file.originalname;
		callback(null, imageName);
}
});

let uploadFile = multer({storage: multerDiskStorage});*/


router.get("/",productControllers.index);
router.get("/create",productControllers.create);
router.get("/:id",productControllers.detail);
router.post("/create",productControllers.store);
router.get("/:id/edit",productControllers.edit);
router.put("/:id/edit",productControllers.update);
router.delete("/:id",productControllers.destroy);

/*router.post('/create', uploadFile.single('imagen'), productControllers.store);
router.get('/carrito/', productControllers.carrito);*/

module.exports = router;