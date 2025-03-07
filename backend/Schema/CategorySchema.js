const mongoose = require('mongoose');

// Define the Category schema
const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'], // Custom error message
        unique: true,
        trim: true // Ensures no leading/trailing spaces in the name
    },
    parent_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',  // Reference to Permission model
            required: false,
            default: null // Set default value to null
            
        },
    slug: {
        type: String,
        unique: true,
        trim: true // Ensures no leading/trailing spaces in the name
    },
    isActive: {
        type: Boolean,
        default: true // Default to true if not provided
    }
}, {
    versionKey: false, // Disable the __v field globally
    timestamps: true // Automatically add createdAt and updatedAt fields
});

// Create the Category model
const CategoryModel = mongoose.model('Category', CategorySchema);

module.exports = CategoryModel;
