const Category = require('../models/category.model');
const mongoose = require('mongoose');

exports.create = async (data) => {
    const { title, parentId } = data
    const category = new Category();
    category.title = title;
    category.parentId = parentId;
    
    return await category.save();
}

exports.bulkCreate = async arr => {
    return await Category.insertMany(arr)
}

exports.getById = async id => {
    return await Category.findById(id);
}

exports.getByName = async name => {
    return await Category.findOne({ name }).exec();
}

exports.findAll = async () => {
    return await Category.find({})
}