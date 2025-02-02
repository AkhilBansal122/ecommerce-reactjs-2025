const express = require("express");
const { successResponse, failedResponse, noRecordFoundResponse, serverErrorResponse } = require("../../../Helper/helper");
const UserModel = require("../../../Schema/UserSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require('dotenv').config();
const RoleModel = require("../../../Schema/RoleSchema");
const RolePermissionModel = require("../../../Schema/RolePermissionSchema");  // Assuming you have this schema
const PermissionModel = require("../../../Schema/PermissionSchema");
const { adminlogout } = require("../../../middleware/authmiddleware");
const CountryModel = require("../../../Schema/CountriesSchema");
const StateModel = require("../../../Schema/StateSchema");
const CityModel = require("../../../Schema/CitySchema");

module.exports = {
    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            // Check if the user exists
            const user = await UserModel.findOne({ email });
            if (!user) {
                return noRecordFoundResponse(res, "User not found", null);
            }

            // Validate the password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return failedResponse(res, "Invalid password", null);
            }
            if(user.isActive == false){
                return failedResponse(res, "Block Your Account Please Contact Support Team", null);
            }
            // Fetch the rolePermission entries for the user's role_id
            const rolePermissions = await RolePermissionModel.find({ role_id: user.role_id });
            if (!rolePermissions.length) {
                return failedResponse(res, "No permissions found for this role", null);
            }

            // Get the permission_ids from rolePermission entries
            const permissionIds = rolePermissions.map(rolePermission => rolePermission.permission_id);

            // Fetch the permission names from the Permission model using the permission_ids
            const permissions = await PermissionModel.find({ _id: { $in: permissionIds } });
            if (!permissions.length) {
                return failedResponse(res, "Permissions not found", null);
            }

            // Map the permissions to an array of permission names
            const permissionNames = permissions.map(permission => permission.name);

            // Generate JWT token
            const token = jwt.sign(
                { id: user._id, email: user.email, role_id: user.role_id },  // Payload
                process.env.JWT_SECRET,               // Secret key from environment variables
                { expiresIn: process.env.JWT_EXPIRATION || '1h' } // Token expiration (default 1 hour)
            );

            // Send success response with the token and user info
            const { _id, first_name, last_name, email: userEmail, role_id } = user;
            return successResponse(res, "Login successful", { _id, first_name, last_name, email: userEmail, access_token: token, permissions: permissionNames });

        } catch (error) {
            // Handle unexpected errors gracefully
            console.error("Login error:", error);  // For debugging purposes
            return serverErrorResponse(res, "An unexpected error occurred", null);
        }
    },
    getProfile: async (req, res) => {
        try {
            const getRecord = await UserModel.findOne({ _id: req.user.id }, { first_name: 1, last_name: 1, email: 1 });
            if (getRecord) {
                return successResponse(res, "getProfile", getRecord);
            }
            else {
                return noRecordFoundResponse(res, "No Record Found", []);
            }
        } catch (error) {
            serverErrorResponse(res, "Internal Server Error", error.message);
        }
    },

    changePassword: async (req, res) => {
        try {
            const { currentPassword, newPassword } = req.body;
            const user = await UserModel.findById({ _id: req.user.id });
            if (!user) {
                return noRecordFoundResponse(res, "User not found.");
            }
            // Check if current password matches the user's password in the database
            const isMatch = await bcrypt.compare(currentPassword, user.password);
            if (!isMatch) {
                return failedResponse(res, "Current password is incorrect.");
            }

            // Check if the new password is the same as the current password
            if (currentPassword === newPassword) {
                return failedResponse(res, "New password cannot be the same as the current password.");
            }
            // Hash the new password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(newPassword, salt);

            // Update the user's password in the database
            user.password = hashedPassword;
            await user.save();

            return successResponse(res, "Password updated successfully.");
        } catch (error) {
            serverErrorResponse(res, "Internal Server Error", error.message);
        }
    },
    logout: (req, res) => {
        adminlogout(req, res);
    },
    rolebyPermission: async (req, res) => {
        try {
            const rolePermissions = await RolePermissionModel.find({ role_id: req.user.role_id });
            if (!rolePermissions.length) {
                return failedResponse(res, "No permissions found for this role", null);
            }

            // Get the permission_ids from rolePermission entries
            const permissionIds = rolePermissions.map(rolePermission => rolePermission.permission_id);

            // Fetch the permission names from the Permission model using the permission_ids
            const permissions = await PermissionModel.find({ _id: { $in: permissionIds } });
            if (!permissions.length) {
                return failedResponse(res, "Permissions not found", null);
            }

            // Map the permissions to an array of permission names
            const permissionNames = permissions.map(permission => permission.name);
            return successResponse(res, "Get Permission", permissionNames);


        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    },
    activeCountry: async (req, res) => {
        try {
            const getRecord = await CountryModel.find({ isActive: true }, { __id: 1, name: 1, dial_code: 1, flag: 1 });
            if (!getRecord) {
                return noRecordFoundResponse(res, "No Record Found", getRecord);
            }
            return successResponse(res, "Get Country", getRecord);
        } catch (error) {
            serverErrorResponse(res, "", error.message);
        }
    },
    activeStateByCountryId: async (req, res) => {
        try {
            // Get the country_id from the request parameters
            const { id: country_id } = req.params;
            // Fetch the states with matching country_id and isActive flag
            const getRecord = await StateModel.find({
                isActive: true,
                country_id: country_id
            }, { _id: 1, name: 1, country_id: 1 });
            // If no records found, return a no record found response
            if (!getRecord || getRecord.length === 0) {
                return noRecordFoundResponse(res, "No Record Found", getRecord);
            }

            // Return success response with the fetched states
            return successResponse(res, "Get State", getRecord);
        } catch (error) {
            // Handle server error response
            return serverErrorResponse(res, "Server Error", error.message);
        }
    },

    activeCityByCountryStateId: async (req, res) => {
        try {
            const { country_id, state_id } = req.params;
            const getRecord = await CityModel.find({ isActive: true, country_id: country_id, state_id: state_id }, { _id: 1, name: 1 });
            if (!getRecord) {
                return noRecordFoundResponse(res, "No Record Found", getRecord);
            }
            return successResponse(res, "Get City", getRecord);

        } catch (error) {
            serverErrorResponse(res, "", error.message);
        }
    }
};
