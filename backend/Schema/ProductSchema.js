const mongoose = require('mongoose');

// Define the Product schema
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    slug: {
        type: String,
        unique: true,
        trim: true // Ensures no leading/trailing spaces
    },
    description: {
        type: String,
        default: null
    },
    price: {
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    deletedAt: {
        type: Date,
        default: null // For soft delete functionality
    }
}, {
    timestamps: true // Automatically adds createdAt and updatedAt
});

// Create the Product model
const ProductModel = mongoose.model('Product', ProductSchema);

module.exports = ProductModel;