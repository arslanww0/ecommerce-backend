const { User } = require('../models/dbModel');
const bcrypt = require('bcryptjs');

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

module.exports = { registerUser };