const Category = require('../models/category.model');

exports.create = async (data) => {
    const { title } = data
    const category = new Category();
    category.title = title;
    
    return await category.save();
}