const mongoose = require('mongoose');

// Define the Product Attribute schema
const ProductAttributeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model
        required: true
    },
    attribute_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attribute', // Reference to the Attribute model
        required: true
    },
    attribute_value_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AttributeValue', // Reference to the Attribute model
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

// Create the ProductAttribute model
const ProductAttributeModel = mongoose.model('ProductAttribute', ProductAttributeSchema);

module.exports = ProductAttributeModel;