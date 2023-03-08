const apiController = require('../controllers/apiControllers')

const express = require('express');
const router = express.Router();

router.get('/products',apiController.productsList)
router.get('/products/:id',apiController.productsShow)
router.get('/category',apiController.categoryList)
// router.get('/search/products',apiController.productsSearch)

router.get('/users',apiController.usersList)
router.get('/users/:id',apiController.usersShow)

module.exports = router;