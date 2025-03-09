const express = require("express");
const { successResponse, failedResponse, noRecordFoundResponse, serverErrorResponse, alreadyExistsResponse,generateSlug } = require("../../../Helper/helper");
require('dotenv').config();
const mongoose = require("mongoose");

const AttributeValueModel = require("../../../Schema/AttributeValueSchema");

module.exports = {

    create: async (req, res) => {
        try {
            const { name,attribute_id } = req.body;
            // Check if AttributeValue already exists
            const existingAttributeValue = await AttributeValueModel.findOne({ name: name,attribute_id:attribute_id });
           
            if (existingAttributeValue) {
                return alreadyExistsResponse(res, "Main AttributeValue already exists.");
            }
            slug = await generateSlug(name);
            // Create a new AttributeValue
            const createAttributeValue = await AttributeValueModel.create({ name,slug,attribute_id:attribute_id });

            // Return success response
            return successResponse(res, "Attribute created successfully.", createAttributeValue);
        } catch (error) {
            return serverErrorResponse(res, "Internal Server Error", error.message);
        }
    },
    update: async (req, res) => {
        try {
            const { id, name, attribute_id, isActive } = req.body;
    
            // Ensure the ID is valid
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ status: false, message: "Invalid AttributeValue ID" });
            }
    
            // Find the AttributeValue by ID (including soft-deleted)
            const AttributeValue = await AttributeValueModel.findOne({ _id: id });
            if (!AttributeValue) {
                return noRecordFoundResponse(res, "AttributeValue not found.");
            }
    
            // Check if a AttributeValue with the same name and attribute_id already exists (excluding the current AttributeValue)
            const check = await AttributeValueModel.findOne({ 
                attribute_id: attribute_id, // Match the attribute_id
                name: name,           // Match the name
                _id: { $ne: id }      // Exclude the current document
            });
    
            if (check) {
                return alreadyExistsResponse(res, "AttributeValue with this name already exists under the same parent.");
            }
    
            // Generate a new slug
            const slug = await generateSlug(name);
    
            // Update the AttributeValue's name, slug, and isActive status
            AttributeValue.name = name;
            AttributeValue.slug = slug;
            AttributeValue.attribute_id = attribute_id;
            AttributeValue.isActive = isActive;
            await AttributeValue.save();
    
            // Return success response
            return successResponse(res, "Attribute Value updated successfully.", AttributeValue);
        } catch (error) {
            console.error("Error updating Attribute Value:", error); // Log the error for debugging
            return serverErrorResponse(res, "Internal Server Error", error.message);
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.body; // Assuming the ID is passed in the request body

            // Validate if the AttributeValue exists
            const AttributeValue = await AttributeValueModel.findById(id);
            if (!AttributeValue) {
                return noRecordFoundResponse(res, "Attribute Value not found.");
            }
            // Delete the AttributeValue
            const deletedAttributeValue = await AttributeValueModel.softDelete(id);

            if (!deletedAttributeValue) {
                return noRecordFoundResponse(res, "AttributeValue not found.");
            }

            // Return success response
            return successResponse(res, "Attribute Value deleted successfully.");
        } catch (error) {
            return serverErrorResponse(res, "Internal Server Error", error.message);
        }
    },
    list: async (req, res) => {
        try {
            const page = parseInt(req.body.page) || 1;  // Default to 1 if page is not provided
            const limit = parseInt(req.body.limit) || 10;  // Default to 10 if limit is not provided
            
            // Fetch the paginated attributeValue where attribute_id is not null and parent is not soft-deleted
            let attributeValue = await AttributeValueModel.find({ 
                'attribute_id.deletedAt': null // Ensure the parent AttributeValue is not soft-deleted
            })
                .populate({
                    path: 'attribute_id',  // Populate the attribute_id field
                    select: 'name',     // Select only the 'name' field from the AttributeValue model
                    match: { deletedAt: null } // Ensure the populated parent is not soft-deleted
                })
                .sort({ createdAt: -1 }) // Sort by createdAt in descending order (latest first)
                .skip((page - 1) * limit) // Skip based on the page and limit
                .limit(limit) // Limit the number of results per page
                .select('-__v'); // Exclude the __v field
    
            // Filter out attributeValue with soft-deleted parents (if any)
            attributeValue = attributeValue.filter(attributeValue => attributeValue.attribute_id !== null);
    
            // Map attribute_id to parentMainAttributeValue
            attributeValue = attributeValue.map(attributeValue => {
                const { attribute_id, ...rest } = attributeValue.toObject(); // Convert Mongoose object to plain JavaScript object
                return {
                    ...rest,
                    attribute: attribute_id  // Rename attribute_id to parentMainAttributeValue
                };
            });
    
            // Count the total number of attributeValue for pagination info
            const totalattributeValue = await AttributeValueModel.countDocuments({ 
              'attribute_id.deletedAt': null 
            });
    
            if (attributeValue.length === 0) {
                return res.status(404).json({ status: false, message: "No Record Found", data: [] });
            }
    
            // Return success response with pagination info
            return res.status(200).json({
                status: true,
                message: "attribute Value fetched successfully",
                data: attributeValue,
                pagination: {
                    page,
                    limit,
                    total: totalattributeValue,
                    totalPages: Math.ceil(totalattributeValue / limit)
                }
            });
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    },
    getActiveAttributeValueByAttributeId: async (req, res) => {
        try {
            const { attribute_id } = req.body;
    
            // Calculate skip value for pagination
    
            // Fetch active attributeValue by attribute_id (excluding soft-deleted)
            const attributeValue = await AttributeValueModel.find({ 
                isActive: true, // Only active attributeValue
                attribute_id      // Match the provided attribute_id
            })
                .notDeleted() // Exclude soft-deleted attributeValue
                .select('-__v') // Exclude the __v field
                .exec(); // Execute the query
    
         
    
            // Check if any attributeValue were found
            if (attributeValue.length > 0) {
                return res.status(200).json({
                    status: true,
                    message: "Active Attribute Value Fetched Successfully",
                    data: attributeValue
                });

            } else {
                return noRecordFoundResponse(res, "No active attributeValue found for the given attribute ID.", []);
            }
        } catch (error) {
            console.error("Error fetching active attributeValue by attribute ID:", error); // Log the error for debugging
            return res.status(500).json({ 
                status: false, 
                message: "Internal Server Error", 
                error: error.message 
            });
        }
    },
    statusChangeAttributeValue :async (req, res) => {
        try {
            const { id, isActive } = req.body;

            // Ensure the ID is valid (optional: you can add validation using Joi before this)
            const AttributeValue = await AttributeValueModel.findOne({ _id: id }).notDeleted();
            if (!AttributeValue) {
                return noRecordFoundResponse(res, "Main AttributeValue not found.");
            }
            // Update the AttributeValue's name
            AttributeValue.isActive=isActive ;
            await AttributeValue.save();

            // Return success response
            return successResponse(res, "Main Attribute Value Status Change successfully.", []);
        } catch (error) {
            return serverErrorResponse(res, "Internal Server Error", error.message);
        }
    },
};
