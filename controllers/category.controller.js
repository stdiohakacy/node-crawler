const Category = require('../models/category.model');

exports.create = async (data) => {
    const { title, parentId, path } = data
    const category = new Category();
    category.title = title;
    category.parentId = parentId;
    category.path = path;
    
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

exports.findLikeTitle = async title => {
    return await Category.findOne({ title:{ $regex: '.*' + title + '.*' } });
}

exports.findAll = async () => {
    return await Category.find({})
}