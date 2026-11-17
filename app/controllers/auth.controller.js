const authService = require('../services/auth.service');
const response = require('../utils/response');
const jwt = require('jsonwebtoken');

async function register(req, res) {
    try {
        const user = await authService.registerUser(req.body);

        return response.success(
            res,
            201,
            'User registered successfully',
            user
        );

    } catch (err) {
        return response.error(res, 400, err.message);
    }
}


function login(req, res) {
    try {
        // Passport Local Strategy ne user verify kiya hai
        const user = req.user;

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

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000
        });

        return response.success(
            res,
            200,
            'Login successful',
            userData
        );

    } catch (err) {
        return response.error(res, 500, err.message);
    }
}


function logout(req, res) {
    res.clearCookie('token');

    return response.success(
        res,
        200,
        'Logout successful'
    );
}

module.exports = {
    register,
    login,
    logout
};