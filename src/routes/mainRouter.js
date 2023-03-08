var express = require('express');
var router = express.Router();



const mainController = require('../controllers/mainController');

router.get('/', mainController.index); 
router.get('/search', mainController.search);
router.get('/contact', mainController.contact);
router.get('/history', mainController.history);
router.get('/envio', mainController.envio);
router.get('/preguntas', mainController.preguntas);
router.get('/regalo', mainController.regalo);
router.get('/categorias', mainController.categorias);
router.get('/productos-destacados', mainController.destacados);
router.get('/ayuda', mainController.ayuda);

module.exports = router;
