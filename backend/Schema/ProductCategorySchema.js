const mongoose = require('mongoose');

// Define the Product Categories schema
const ProductCategoriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to the Product model
        required: true
    },
    main_category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // Reference to the Main Category model
        required: true
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // Reference to the Category model
        required: true
    },
    sub_category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // Reference to the Sub-Category model
        required: true
    },
    is_primary: {
        type: Boolean,
        default: true
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

// Create the ProductCategories model
const ProductCategoriesModel = mongoose.model('ProductCategories', ProductCategoriesSchema);

module.exports = ProductCategoriesModel;