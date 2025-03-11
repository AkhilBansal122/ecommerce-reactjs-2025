const mongoose = require('mongoose');

// Define the Product Variants schema
const ProductVariantsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model
        required: true
    },
    sku: {
        type: String,
        required: true,
        unique: true // SKU should be unique
    },
    price: {
        type: Number, // Use Number for price, or install mongoose-float for precise decimals
        required: true
    },
    stock_quantity: {
        type: Number,
        default: 0 // Use default instead of defaultValue
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

// Create the ProductVariants model
const ProductVariantsModel = mongoose.model('ProductVariants', ProductVariantsSchema);

module.exports = ProductVariantsModel;