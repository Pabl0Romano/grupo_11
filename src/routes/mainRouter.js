var express = require('express');
var router = express.Router();



const mainController = require('../controllers/mainController');

router.get('/', mainController.index); 
router.get('/search', mainController.search);
router.get('/contact', mainController.contact);
router.get('/history', mainController.history);
module.exports = router;
