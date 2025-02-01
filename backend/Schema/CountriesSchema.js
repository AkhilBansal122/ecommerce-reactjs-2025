const { required } = require('joi');
const mongoose = require('mongoose');

// Define the User information schema
const CountriesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: false
    },
    dial_code: {
        type: String,
        required: true
    },
    flag: {
        type: String,
        required: true
    },
    currency:{
        type:String,
        required:false,
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
const CountriesModel = mongoose.model('Countries', CountriesSchema); // Collection is not created yet

module.exports = CountriesModel;
