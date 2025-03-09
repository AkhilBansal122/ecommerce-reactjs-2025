const mongoose = require('mongoose');

// Define the AttributeValue schema
const AttributeValueSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'], // Custom error message
        unique: false,
        trim: true // Ensures no leading/trailing spaces in the name
    },
    attribute_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attribute',  // Reference to Category model
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
AttributeValueSchema.statics.softDelete = async function (id) {
    return this.findByIdAndUpdate(
        id,
        { deletedAt: new Date() }, // Set deletedAt to the current timestamp
        { new: true } // Return the updated document
    );
};

// Add a static method for restore
AttributeValueSchema.statics.restore = async function (id) {
    return this.findByIdAndUpdate(
        id,
        { deletedAt: null }, // Reset deletedAt to null
        { new: true } // Return the updated document
    );
};

// Add a query helper to exclude soft-deleted categories
AttributeValueSchema.query.notDeleted = function () {
    return this.where({ deletedAt: null });
};

// Add a query helper to include only soft-deleted categories
AttributeValueSchema.query.deleted = function () {
    return this.where({ deletedAt: { $ne: null } });
};

// Create the Attribute Value model
const AttributeValueModel = mongoose.model('AttributeValue', AttributeValueSchema);

module.exports = AttributeValueModel;