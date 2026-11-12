const productService = require('../models/product.model');

async function addProduct(req, res) {

    try {

        const { name, price, stock } = req.body;

        if (!name || price == null || stock == null) {
            throw new Error('All fields are required');
        }
        if (price <= 0 || stock < 0) {
            return res.status(400).json({
                message: 'Invalid price or stock'
            });
        }

        const product = await productService.addProduct(req.body);

        res.status(201).json(product);

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

async function getProducts(req, res) {

    try {
        const products = await productService.getProducts();

        res.json(products);

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

async function updateProduct(req, res) {

    try {
        const { name, price, stock } = req.body;

        if (name === '' || (price !== undefined && price <= 0) || (stock !== undefined && stock < 0)) {
            return res.status(400).json({
                message: 'Invalid product details'
            });
        }

        const product = await productService.updateProduct(
            req.params.id,
            req.body
        );

        res.json(product);

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

async function deleteProduct(req, res) {

    try {
        await productService.deleteProduct(req.params.id);

        res.json({
            message: 'Product deleted successfully'
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

module.exports = {
    addProduct,
    getProducts,
    updateProduct,
    deleteProduct
};