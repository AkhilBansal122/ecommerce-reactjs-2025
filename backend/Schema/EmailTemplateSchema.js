const mongoose = require('mongoose');

// Define the Email Template schema
const EmailTemplateSchema = new mongoose.Schema({
    slug: {
        type: String,
        required: [true, 'Email Template Slug is required'], // Custom error message
        unique: true,
        trim: true // Ensures no leading/trailing spaces in the name
    },
    title: {
        type: String,
        required: [true, 'Email Template title is required'], // Custom error message
        unique: true,
        trim: true // Ensures no leading/trailing spaces in the name
    },
    body_content: {
        type: String,
        required: [true, 'Email Template body Content is required'], // Custom error message
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

// Create the Email Template model
const EmailTemplateModel = mongoose.model('EmailTemplate', EmailTemplateSchema);

module.exports = EmailTemplateModel;
