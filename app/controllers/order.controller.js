const orderService = require('../services/order.service');
const response = require('../utils/response');

async function placeOrder(req, res) {

    try {

        const order = await orderService.placeOrder(
            req.user.id,
            req.body
        );

        return response.success(
            res,
            201,
            'Order placed successfully',
            order
        );

    } catch (err) {

        return response.error(res, 400, err.message);

    }
}

async function getMyOrders(req, res) {

    try {

        const orders = await orderService.getMyOrders(
            req.user.id
        );

        return response.success(
            res,
            200,
            'Your orders fetched successfully',
            orders
        );

    } catch (err) {

        return response.error(res, 400, err.message);

    }
}

async function getAllOrders(req, res) {

    try {

        const orders = await orderService.getAllOrders();

        return response.success(
            res,
            200,
            'All orders fetched successfully',
            orders
        );

    } catch (err) {

        return response.error(res, 400, err.message);

    }
}

module.exports = {
    placeOrder,
    getMyOrders,
    getAllOrders
};
