const mongoose = require('mongoose');

// Define the User information schema
const CitiesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    country_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Countries',  // Reference to Countries model
        required: true
    },
    state_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'States',  // Reference to Countries model
        required: true
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

// Create the User model
const CityModel = mongoose.model('Cities', CitiesSchema); // Collection is not created yet

module.exports = CityModel;
