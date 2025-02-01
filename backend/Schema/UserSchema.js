const mongoose = require('mongoose');

// Define the User information schema
const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    middle_name: {
        type: String,
        required: false
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    country_code: {
        type: String,
        required: true
    },
    phone_no: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    otp: {
        type: Number,
        default: 0
    },
    verify_otp: {
        type: Boolean,
        default: false
    },
    verify_email: {
        type: Boolean,
        default: false
    },
    role_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role', // Assuming you have a Role model in your system
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
const UserModel = mongoose.model('User', UserSchema); // Collection is not created yet

module.exports = UserModel;
