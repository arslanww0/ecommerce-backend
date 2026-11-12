const authService = require('../models/auth.model');

async function register(req, res) {

    try {

        const { userName, email, password } = req.body;

        if (!userName || !email || !password) {

            throw new Error('All fields are required');
        }
        const user = await authService.registerUser(req.body);

        res.status(201).json({
            message: 'User registered successfully',
            data: user
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

async function login(req, res) {

    try {
        const result = await authService.loginUser(req.body);

        res.cookie('token', result.token, {
            httpOnly: true,
        });

        res.status(200).json({
            message: 'Login successful',
            data: result.user
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

function logout(req, res) {

    res.clearCookie('token');

    res.json({
        message: 'Logout successful'
    });
}

module.exports = {
    register,
    login,
    logout
};