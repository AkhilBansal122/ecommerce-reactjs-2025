const mongoose = require('mongoose');

// Define the Role schema
const RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    isActive: {
        type: Boolean,
        default: true // Default to true if not provided
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

// Create the Role model
const RoleModel = mongoose.model('Role', RoleSchema);

module.exports = RoleModel;
