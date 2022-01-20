const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    title: {
        type: String,
        required: false,
    },
    branchLabel: {
        type: String,
        required: false,
        default: '',
    },
    price: {
        type: String,
        required: false,
        default: 0,
    },
    mark: {
        type: String,
        required: false,
        default: '',
    },
    sku: {
        type: String,
        required: false,
        default: '',
    },
    attributeOverview: {
        type: String,
        required: false,
        default: '',
    },
    blowerCircuit: {
        type: String,
        required: false,
        default: '',
    },
    heaterStyle: {
        type: String,
        required: false,
        default: '',
    },
    heaterWattage: {
        type: String,
        required: false,
        default: '',
    },
    needToRun: {
        type: String,
        required: false,
        default: '',
    },
    pump1Circuit: {
        type: String,
        required: false,
        default: '',
    },
    pump2Circuit: {
        type: String,
        required: false,
        default: '',
    },
    pump3Circuit: {
        type: String,
        required: false,
        default: '',
    },
    keypadIncluded: {
        type: String,
        required: false,
        default: '',
    },
    systemVoltage: {
        type: String,
        required: false,
        default: '',
    },
    circPumpCircuit: {
        type: String,
        required: false,
        default: '',
    },
    moreInformation: {
        type: Object,
        default: {}
    },
    categoryId: {
        type: String,
        required: false,
    }
}, {
    timestamps: false
});

module.exports = mongoose.model('Product', ProductSchema);