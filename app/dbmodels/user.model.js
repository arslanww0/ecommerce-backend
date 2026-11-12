const { DataTypes } = require('sequelize');
const { connection } = require('../config/db');

const User = connection.define('User', {
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

module.exports = User;