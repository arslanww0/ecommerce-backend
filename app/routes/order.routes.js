const express = require('express');
const router = express.Router();

const orderController = require('../controllers/order.controller');

const { auth, admin } = require('../middlewares/auth.middleware');

router.post('/place-order', auth, orderController.placeOrder);

router.get('/my-orders', auth, orderController.getMyOrders);

router.get('/all-orders', auth, admin, orderController.getAllOrders);

module.exports = router;