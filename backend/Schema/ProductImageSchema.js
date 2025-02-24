const mongoose = require('mongoose');

// Define the User information schema
const ProductImageSchema = new mongoose.Schema({
    product_id: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Assuming you have a Product model in your system
    },
    image: {
        type: String,
        default:null
    },
    primary_image: {
        type: Boolean,
        default:false
    },
    secondary_image: {
        type: Boolean,
        default:false
    },
    isActive: {
        type: Boolean,
        default: true
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
}, {
    timestamps: true // Automatically adds createdAt and updatedAt
});

// Create the Product Image model
const ProductImageModel = mongoose.model('ProductImage', ProductImageSchema); // Collection is not created yet

module.exports = ProductImageModel;
