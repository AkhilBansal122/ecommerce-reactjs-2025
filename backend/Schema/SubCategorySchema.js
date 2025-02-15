const mongoose = require('mongoose');

// Define the User information schema
const SubCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category_id: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', // Assuming you have a Category model in your system
    },
    slug: {
        type: String,
        unique: true,
        trim: true // Ensures no leading/trailing spaces in the name
    },
    isActive: {
        type: Boolean,
        default:true
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
},{
    timestamps: true // Automatically adds createdAt and updatedAt
});

// Create the SubCategory model
const SubCategoryModel = mongoose.model('SubCategory', SubCategorySchema); // Collection is not created yet

module.exports = SubCategoryModel;
