const { Product } = require('../dbmodels/association');

async function addProduct(data) {
    const { name, price, stock } = data;
    return await Product.create({
        name,
        price,
        stock
    });
}

async function getProducts() {

    return await Product.findAll();
}

async function updateProduct(id, data) {

    const product = await Product.findByPk(id);

    if (!product) {
        throw new Error('Product not found');
    }

    await product.update(data);

    return product;
}

async function deleteProduct(id) {

    const product = await Product.findByPk(id);

    if (!product) {
        throw new Error('Product not found');
    }

    await product.destroy();

    return true;
}

module.exports = {
    addProduct,
    getProducts,
    updateProduct,
    deleteProduct
};