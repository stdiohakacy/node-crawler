const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    parentId: {
        type: String,
        required: false,
        default: '',
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Category', CategorySchema);