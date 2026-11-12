const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const { auth, admin } = require('../middlewares/auth.middleware');

router.get('/get-products', productController.getProducts);

router.post('/add-product', auth, admin, productController.addProduct);

router.put('/update-product/:id', auth, admin, productController.updateProduct);

router.delete('/delete-product/:id', auth, admin, productController.deleteProduct);

module.exports = router;