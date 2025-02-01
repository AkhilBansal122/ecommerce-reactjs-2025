const express = require("express");
const { successResponse, failedResponse, noRecordFoundResponse, serverErrorResponse, alreadyExistsResponse } = require("../../../Helper/helper");
require('dotenv').config();
const PermissionModel = require("../../../Schema/PermissionSchema");
const RolePermissionModel = require("../../../Schema/RolePermissionSchema");
module.exports = {

    create: async (req, res) => {
        try {
            const { name } = req.body;

            // Check if permission already exists
            const permission = await PermissionModel.findOne({ name: name });
            if (permission) {
                return alreadyExistsResponse(res, "Permission already exists.");
            }

            // Create a new permission
            const createPermission = await PermissionModel.create({ name });

            // Return success response
            return successResponse(res, "Permission created successfully.", createPermission);
        } catch (error) {
            return serverErrorResponse(res, "Internal Server Error", error.message);
        }
    },
    update: async (req, res) => {
        try {
            const { id, name,isActive } = req.body;

            // Ensure the ID is valid (optional: you can add validation using Joi before this)
            const permission = await PermissionModel.findOne({ _id: id });
            if (!permission) {
                return noRecordFoundResponse(res, "Permission not found.");
            }

            // Check if the new permission name already exists (excluding the current permission)
            const existingPermission = await PermissionModel.findOne({ name: name });
            if (existingPermission && existingPermission._id.toString() !== id) {
                return alreadyExistsResponse(res, "Permission with this name already exists.");
            }

            // Update the permission's name
            permission.name = name;
            permission.isActive=isActive;
            await permission.save();

            // Return success response
            return successResponse(res, "Permission updated successfully.", permission);
        } catch (error) {
            return serverErrorResponse(res, "Internal Server Error", error.message);
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.body; // Assuming the ID is passed in the request body

            // Validate if the permission exists
            const permission = await PermissionModel.findById(id);
            if (!permission) {
                return noRecordFoundResponse(res, "Permission not found.");
            }
            // Delete associated RolePermission records that reference this permissionId
            await RolePermissionModel.deleteMany({ permission: id });

            // Delete the permission
            await PermissionModel.findByIdAndDelete(id);

            // Return success response
            return successResponse(res, "Permission deleted successfully.");
        } catch (error) {
            return serverErrorResponse(res, "Internal Server Error", error.message);
        }
    },
    list: async (req, res) => {
        try {
            const page = parseInt(req.body.page) || 1;  // Default to 1 if page is not provided
            const limit = parseInt(req.body.limit) || 10;  // Default to 10 if limit is not provided

            // Fetch the paginated results and exclude the __v field
            const permissions = await PermissionModel.find()
                .skip((page - 1) * limit) // Skip based on the page and limit
                .limit(limit) // Limit the number of results per page
                .select('-__v'); // Exclude the __v field

            // Count the total number of documents for pagination info
            const totalPermissions = await PermissionModel.countDocuments();

            // Return success response with pagination info
            return res.status(200).json({
                status:true,
                message:"fetch Permission Successfully",
                data: permissions,
                pagination: {
                    page,
                    limit,
                    total: totalPermissions,
                    totalPages: Math.ceil(totalPermissions / limit)
                }
            });
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    },
    activePermission:async (req, res) => {
        try {
            // Fetch the paginated results and exclude the __v field
            const permissions = await PermissionModel.find({isActive:true})
                .select('-__v'); // Exclude the __v field

            // Count the total number of documents for pagination info
        if(permissions){
            successResponse(res,"Active Permisson Fetch",permissions);
        }
        else{
            noRecordFoundResponse(res,"No Record Found",[]);
        }
            
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    },
    statusChangePermission :async (req, res) => {
        try {
            const { id, isActive } = req.body;

            // Ensure the ID is valid (optional: you can add validation using Joi before this)
            const permission = await PermissionModel.findOne({ _id: id });
            if (!permission) {
                return noRecordFoundResponse(res, "Permission not found.");
            }
            // Update the permission's name
            permission.isActive=isActive ;
            await permission.save();

            // Return success response
            return successResponse(res, "Permission Status Change successfully.", []);
        } catch (error) {
            return serverErrorResponse(res, "Internal Server Error", error.message);
        }
    },
    
};
