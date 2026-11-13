const { User, Product, Order } = require('../models');
const { connection } = require('../config/db');

async function placeOrder(userId, data) {

    const { productId, quantity } = data;

    return await connection.transaction(async (transaction) => {

        const product = await Product.findByPk(productId, {
            transaction
        });

        if (!product) {
            throw new Error('Product not found');
        }

        if (product.stock < quantity) {
            throw new Error('Stock not available');
        }

        const totalPrice = (
            Number(product.price) * Number(quantity)
        ).toFixed(2);

        const order = await Order.create({
            userId,
            productId,
            quantity,
            totalPrice
        }, {
            transaction
        });

        await product.update({
            stock: product.stock - quantity
        }, {
            transaction
        });

        return order;
    });
}

async function getMyOrders(userId) {

    return await Order.findAll({
        where: {
            userId
        },
        include: [
            {
                model: Product
            }
        ]
    });
}

async function getAllOrders() {

    return await Order.findAll({
        include: [
            {
                model: User,
                attributes: ['userName', 'email']
            },
            {
                model: Product
            }
        ]
    });
}

module.exports = {
    placeOrder,
    getMyOrders,
    getAllOrders
};
