const User = require('./user.model');
const Product = require('./product.model');
const Order = require('./order.model');

User.hasMany(Order);
Order.belongsTo(User);

Product.hasMany(Order);
Order.belongsTo(Product);

module.exports = {
    User,
    Product,
    Order
};