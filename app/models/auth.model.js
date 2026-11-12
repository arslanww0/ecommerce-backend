const { User } = require('../dbmodels/association');
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

    return user;
}

async function loginUser(data) {
    const { email, password } = req.body;
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

    return { token, user };
}

module.exports = {
    registerUser,
    loginUser
};