const { DataTypes } = require('sequelize');
const { connection } = require('../config/db');

/**
 * user table
 */
const User = connection.define('User', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    role: {
        type: DataTypes.STRING,
        defaultValue: 'user'
    }

});

/**
 * product table
 */
const Product = connection.define('Product', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },

    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }

});

/**
 * order table
 */
const Order = connection.define('Order', {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    productId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
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

// Associations

User.hasMany(Order, {
    foreignKey: 'userId'
});

Order.belongsTo(User, {
    foreignKey: 'userId'
});

Product.hasMany(Order, {
    foreignKey: 'productId'
});

Order.belongsTo(Product, {
    foreignKey: 'productId'
});

module.exports = {
    User,
    Product,
    Order
};
