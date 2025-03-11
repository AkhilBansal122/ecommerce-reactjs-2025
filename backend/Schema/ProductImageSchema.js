const mongoose = require('mongoose');

// Define the Product Image schema
const ProductImageSchema = new mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model
        required: true
    },
    image: {
        type: String,
        default: null // Store image URL or path
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

// Create the ProductImage model
const ProductImageModel = mongoose.model('ProductImage', ProductImageSchema);

module.exports = ProductImageModel;