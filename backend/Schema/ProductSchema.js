const mongoose = require('mongoose');

// Define the User information schema
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category_id: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // Assuming you have a Category model in your system
    },
    sub_category_id: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory', // Assuming you have a SubCategory model in your system
    },
    slug: {
        type: String,
        unique: true,
        trim: true // Ensures no leading/trailing spaces in the name
    },
    description: {
        type: String,
        required: false,
        default: null
    },
    price: {
        type: Number,
        required: true, // Price is mandatory
    },
    sale_price: {
        type: Number,
        required: false,
        default: null // Sale price is optional
    },
    discount: {
        type: Number,
        required: false,
        default: 0 // Discount is optional, default is 0%
    },
    color: {
        type: String,
        required: false,
        default: null // Color is optional
    },
    size: {
        type: String,
        required: false,
        default: null // Size is optional
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Assuming you have a User model for the product creator/owner
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    },
    deletedAt: {
        type: Date
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt
});

// Create the Product model
const ProductModel = mongoose.model('Product', ProductSchema); // Collection is not created yet

module.exports = ProductModel;
