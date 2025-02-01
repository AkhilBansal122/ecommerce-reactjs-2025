const mongoose = require('mongoose');

// Define the Permission schema
const PermissionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Permission name is required'], // Custom error message
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

// Create the Permission model
const PermissionModel = mongoose.model('Permission', PermissionSchema);

module.exports = PermissionModel;
