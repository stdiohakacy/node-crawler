const Product = require('../models/product.model');
const mongoose = require('mongoose');

exports.create = async (data) => {
    const {
        branchLabel,
        title,
        price,
        mark,
        sku,
        productDetail,
        productMoreInfo,
        categoryId
    } = data;
    const { 
        blowerCircuit,
        pump1Circuit,
        heaterStyle,
        pump2Circuit,
        heaterWattage,
        pump3Circuit,
        needToRun,
        keypadIncluded,
        circPumpCircuit,
        systemVoltage,
        attributeOverview
    } = productDetail;

    const product = new Product()
    product.title = title
    product.branchLabel = branchLabel
    product.price = price
    product.mark = mark
    product.sku = sku
    product.attributeOverview = attributeOverview
    product.blowerCircuit = blowerCircuit
    product.heaterStyle = heaterStyle
    product.heaterWattage = heaterWattage
    product.needToRun = needToRun
    product.pump1Circuit = pump1Circuit
    product.pump2Circuit = pump2Circuit
    product.pump3Circuit = pump3Circuit
    product.keypadIncluded = keypadIncluded
    product.systemVoltage = systemVoltage
    product.circPumpCircuit = circPumpCircuit
    product.moreInformation = productMoreInfo
    product.categoryId = categoryId
    return await product.save();
}

exports.getByTitle = async (title) => {
    return Product.findOne({ title })
}