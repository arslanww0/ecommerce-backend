function validateRegister(req, res, next) {

    const { userName, email, password } = req.body;

    if (!userName || !email || !password) {
        return res.status(400).json({
            message: 'All fields are required'
        });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        return res.status(400).json({
            message: 'Invalid email'
        });
    }

    if (password.length < 8) {
        return res.status(400).json({
            message: 'Password must be at least 8 characters'
        });
    }

    next();
}

function validateLogin(req, res, next) {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: 'Email and password are required'
        });
    }

    next();
}

function validateProduct(req, res, next) {

    const { name, price, stock } = req.body;

    if (!name || !price || stock == null) {
        return res.status(400).json({
            message: 'All fields are required'
        });
    }

    if (price <= 0 || stock < 0) {
        return res.status(400).json({
            message: 'Invalid price or stock'
        });
    }

    next();
}

function validateUpdateProduct(req, res, next) {

    const { name, price, stock } = req.body;

    if (name === '' || price <= 0 || stock < 0) {
        return res.status(400).json({
            message: 'Invalid product details'
        });
    }

    next();
}

function validateOrder(req, res, next) {

    const { productId, quantity } = req.body;

    if (!productId || !quantity || quantity <= 0) {
        return res.status(400).json({
            message: 'Invalid order details'
        });
    }

    next();
}

module.exports = {
    validateRegister,
    validateLogin,
    validateProduct,
    validateUpdateProduct,
    validateOrder
};
