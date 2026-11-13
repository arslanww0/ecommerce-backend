const productService = require('../services/product.service');
const response = require('../utils/response');

async function addProduct(req, res) {

    try {

        const product = await productService.addProduct(req.body);

        return response.success(
            res,
            201,
            'Product added successfully',
            product
        );

    } catch (err) {

        return response.error(res, 400, err.message);

    }
}

async function getProducts(req, res) {

    try {

        const products = await productService.getProducts();

        return response.success(
            res,
            200,
            'Products fetched successfully',
            products
        );

    } catch (err) {

        return response.error(res, 400, err.message);

    }
}

async function updateProduct(req, res) {

    try {

        const product = await productService.updateProduct(
            req.params.id,
            req.body
        );

        return response.success(
            res,
            200,
            'Product updated successfully',
            product
        );

    } catch (err) {

        return response.error(res, 400, err.message);

    }
}

async function deleteProduct(req, res) {

    try {

        await productService.deleteProduct(req.params.id);

        return response.success(
            res,
            200,
            'Product deleted successfully'
        );

    } catch (err) {

        return response.error(res, 400, err.message);

    }
}

module.exports = {
    addProduct,
    getProducts,
    updateProduct,
    deleteProduct
};
