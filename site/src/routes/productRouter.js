var express = require('express');
var router = express.Router();
const productControllers = require("../controllers/productControllers");

router.get("/",productControllers.index);
router.get("/create",productControllers.create);
router.get("/:id",productControllers.detail);
router.post("/create",productControllers.store);
router.get("/:id/edit",productControllers.edit);
router.put("/:id/edit",productControllers.update);
router.delete("/:id",productControllers.destroy);



module.exports = router;