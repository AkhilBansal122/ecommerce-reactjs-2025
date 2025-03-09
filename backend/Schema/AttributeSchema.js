const mongoose = require('mongoose');

// Define the Category schema
const AttributeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'], // Custom error message
        unique: false,
        trim: true // Ensures no leading/trailing spaces in the name
    },
    slug: {
        type: String,
        unique: true,
        trim: true // Ensures no leading/trailing spaces in the name
    },
    isActive: {
        type: Boolean,
        default: true // Default to true if not provided
    },
    deletedAt: {
        type: Date,
        default: null // Default to null (not deleted)
    }
}, {
    versionKey: false, // Disable the __v field globally
    timestamps: true // Automatically add createdAt and updatedAt fields
});

// Add a static method for soft delete
AttributeSchema.statics.softDelete = async function (id) {
    return this.findByIdAndUpdate(
        id,
        { deletedAt: new Date() }, // Set deletedAt to the current timestamp
        { new: true } // Return the updated document
    );
};

// Add a static method for restore
AttributeSchema.statics.restore = async function (id) {
    return this.findByIdAndUpdate(
        id,
        { deletedAt: null }, // Reset deletedAt to null
        { new: true } // Return the updated document
    );
};

// Add a query helper to exclude soft-deleted categories
AttributeSchema.query.notDeleted = function () {
    return this.where({ deletedAt: null });
};

// Add a query helper to include only soft-deleted categories
AttributeSchema.query.deleted = function () {
    return this.where({ deletedAt: { $ne: null } });
};

// Create the Category model
const AttributeModel = mongoose.model('Attribute', AttributeSchema);

module.exports = AttributeModel;