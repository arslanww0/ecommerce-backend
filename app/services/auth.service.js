const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function registerUser(data) {

    const { userName, email, password } = data;

    const existingUser = await User.findOne({
        where: { email }
    });

    if (existingUser) {
        throw new Error('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        userName,
        email,
        password: hashedPassword
    });

    const userData = user.toJSON();

    delete userData.password;

    return userData;
}

async function loginUser(data) {

    const { email, password } = data;

    const user = await User.findOne({
        where: { email }
    });

    if (!user) {
        throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(
        password,
        user.password
    );

    if (!isMatch) {
        throw new Error('Invalid password');
    }

    const token = jwt.sign(
        {
            id: user.id,
            role: user.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1d'
        }
    );

    const userData = user.toJSON();

    delete userData.password;

    return {
        token,
        user: userData
    };
}

module.exports = {
    registerUser,
    loginUser
};
