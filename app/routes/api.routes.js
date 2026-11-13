const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const productController = require('../controllers/product.controller');
const orderController = require('../controllers/order.controller');

const { auth, admin } = require('../middlewares/middleware');

const {
    validateRegister,
    validateLogin,
    validateProduct,
    validateUpdateProduct,
    validateOrder
} = require('../validations/validation');

// Auth Routes

router.post(
    '/auth/register',
    validateRegister,
    authController.register
);

router.post(
    '/auth/login',
    validateLogin,
    authController.login
);

router.post(
    '/auth/logout',
    authController.logout
);

// Product Routes

router.get(
    '/products/get-products',
    productController.getProducts
);

router.post(
    '/products/add-product',
    auth,
    admin,
    validateProduct,
    productController.addProduct
);

router.put(
    '/products/update-product/:id',
    auth,
    admin,
    validateUpdateProduct,
    productController.updateProduct
);

router.delete(
    '/products/delete-product/:id',
    auth,
    admin,
    productController.deleteProduct
);

// Order Routes

router.post(
    '/orders/place-order',
    auth,
    validateOrder,
    orderController.placeOrder
);

router.get(
    '/orders/my-orders',
    auth,
    orderController.getMyOrders
);

router.get(
    '/orders/all-orders',
    auth,
    admin,
    orderController.getAllOrders
);

module.exports = router;
