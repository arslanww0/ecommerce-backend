const express = require('express');
const router = express.Router();

const passport = require('passport');

const authController = require('../controllers/auth.controller');
const productController = require('../controllers/product.controller');
const orderController = require('../controllers/order.controller');

const { admin } = require('../middlewares/auth.middleware');

const {
    validateRegister,
    validateLogin,
    validateProduct,
    validateUpdateProduct,
    validateOrder
} = require('../middlewares/validation');


// REGISTER
router.post(
    '/auth/register',
    validateRegister,
    authController.register
);


// LOGIN
router.post(
    '/auth/login',
    validateLogin,
    passport.authenticate('local', { session: false }),
    authController.login
);


// LOGOUT
router.post(
    '/auth/logout',
    authController.logout
);


// PUBLIC PRODUCT ROUTE
router.get(
    '/products/get-products',
    productController.getProducts
);


// ADMIN PRODUCT ROUTES
router.post(
    '/products/add-product',
    passport.authenticate('jwt', { session: false }),
    admin,
    validateProduct,
    productController.addProduct
);

router.put(
    '/products/update-product/:id',
    passport.authenticate('jwt', { session: false }),
    admin,
    validateUpdateProduct,
    productController.updateProduct
);

router.delete(
    '/products/delete-product/:id',
    passport.authenticate('jwt', { session: false }),
    admin,
    productController.deleteProduct
);


// ORDER ROUTES
router.post(
    '/orders/place-order',
    passport.authenticate('jwt', { session: false }),
    validateOrder,
    orderController.placeOrder
);

router.get(
    '/orders/my-orders',
    passport.authenticate('jwt', { session: false }),
    orderController.getMyOrders
);

router.get(
    '/orders/all-orders',
    passport.authenticate('jwt', { session: false }),
    admin,
    orderController.getAllOrders
);

module.exports = router;