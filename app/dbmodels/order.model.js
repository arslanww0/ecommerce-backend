const { DataTypes } = require('sequelize');
const { connection } = require('../config/db');

const Order = connection.define('Order', {
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false
    },

    status: {
    type: DataTypes.ENUM(
        'pending',
        'confirmed',
        'cancelled',
        'failed'
    ),
    defaultValue: 'pending',
    allowNull: false
}
});

module.exports = Order;