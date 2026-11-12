const { User, Product, Order } = require('../dbmodels/association');

async function placeOrder(userId, data) {

    const { productId, quantity } = data;
    const product = await Product.findByPk(productId);

    if (!product) {
        throw new Error('Product not found');
    }

    if (product.stock < quantity) {
        throw new Error('Stock not available');
    }

    const totalPrice = product.price * quantity;

    const order = await Order.create({
        UserId: userId,
        ProductId: productId,
        quantity,
        totalPrice
    });

    await product.update({
        stock: product.stock - quantity
    });
    return order;
}

async function getMyOrders(userId) {

    return await Order.findAll({
        where: {
            UserId: userId
        },
        include: [
            {
                model: User,
                attributes: ['userName', 'email']
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
            }]
    });

}

module.exports = {
    placeOrder,
    getMyOrders,
    getAllOrders
};