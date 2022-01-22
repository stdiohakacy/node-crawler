const Product = require('../models/product.model');

exports.create = async (data) => {
    const product = new Product(data);
    return await product.save();
}

exports.isExist = async(name, sku) => {
    return await Product.findOne({ name, sku }).exec();
}