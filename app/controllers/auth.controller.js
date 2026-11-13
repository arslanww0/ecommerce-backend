const authService = require('../services/auth.service');
const response = require('../utils/response');

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

async function login(req, res) {

    try {

        const result = await authService.loginUser(req.body);

        res.cookie('token', result.token, {
            httpOnly: true
        });

        return response.success(
            res,
            200,
            'Login successful',
            result.user
        );

    } catch (err) {

        return response.error(res, 400, err.message);

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
