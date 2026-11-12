const orderService = require('../models/order.model');

async function placeOrder(req, res) {

    try {

        const { productId, quantity } = req.body;

        if (!productId || !quantity || quantity <= 0) {
            throw new Error('Invalid order details');
        }
        const order = await orderService.placeOrder(
            req.user.id,
            req.body
        );

        res.status(201).json({
            message: 'Order placed successfully',
            data: order
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

async function getMyOrders(req, res) {

    try {
        const orders = await orderService.getMyOrders(
            req.user.id
        );

        res.json(orders);

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

async function getAllOrders(req, res) {

    try {
        const orders = await orderService.getAllOrders();

        res.json(orders);

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

module.exports = {
    placeOrder,
    getMyOrders,
    getAllOrders
};