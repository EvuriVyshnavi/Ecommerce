// backend/models/Product.js

const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true,
        enum: ['Fruits', 'Vegetables', 'Dairy', 'Meat', 'Grains', 'Beverages', 'Other']
    },
    price: {
        type: Number,
        required: true,
        default: 0.00
    },
    // Critical for inventory tracking
    countInStock: {
        type: Number,
        required: true,
        default: 0
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String, // URL to the image
        required: true,
    }
}, { timestamps: true });

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
