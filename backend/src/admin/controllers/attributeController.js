const express = require("express");
const { successResponse, failedResponse, noRecordFoundResponse, serverErrorResponse, alreadyExistsResponse,generateSlug } = require("../../../Helper/helper");
require('dotenv').config();
const mongoose = require("mongoose");

const AttributeModel = require("../../../Schema/AttributeSchema");

module.exports = {

    create: async (req, res) => {
        try {
            const { name } = req.body;
            // Check if Attribute already exists
            const existingAttribute = await AttributeModel.findOne({ name: name });
           
            if (existingAttribute) {
                return alreadyExistsResponse(res, "Attribute already exists.");
            }
            slug = await generateSlug(name);
            // Create a new Attribute
            const createAttribute = await AttributeModel.create({ name,slug });

            // Return success response
            return successResponse(res, "Attribute created successfully.", createAttribute);
        } catch (error) {
            return serverErrorResponse(res, "Internal Server Error", error.message);
        }
    },
    update: async (req, res) => {
        try {
            const { id, name, isActive } = req.body;
    
            // Ensure the ID is valid
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ status: false, message: "Invalid Attribute ID" });
            }
    
            // Find the Attribute by ID (including soft-deleted)
            const Attribute = await AttributeModel.findOne({ _id: id });
            if (!Attribute) {
                return noRecordFoundResponse(res, "Attribute not found.");
            }
    
            // Check if a Attribute with the same name and parent_id already exists (excluding the current Attribute)
            const check = await AttributeModel.findOne({ 
                name: name,           // Match the name
                _id: { $ne: id }      // Exclude the current document
            });
    
            if (check) {
                return alreadyExistsResponse(res, "Attribute with this name already exists under the same parent.");
            }
    
            // Generate a new slug
            const slug = await generateSlug(name);
    
            // Update the Attribute's name, slug, and isActive status
            Attribute.name = name;
            Attribute.slug = slug;
            Attribute.isActive = isActive;
            await Attribute.save();
    
            // Return success response
            return successResponse(res, "Attribute updated successfully.", Attribute);
        } catch (error) {
            console.error("Error updating Attribute:", error); // Log the error for debugging
            return serverErrorResponse(res, "Internal Server Error", error.message);
        }
    },
    list: async (req, res) => {
        try {
            const page = parseInt(req.body.page) || 1;  // Default to 1 if page is not provided
            const limit = parseInt(req.body.limit) || 10;  // Default to 10 if limit is not provided
          
            let subAttribute = await AttributeModel.find()
            .sort({ createdAt: -1 }) // Sort by createdAt in descending order (latest first)
                .skip((page - 1) * limit) // Skip based on the page and limit
                .limit(limit) // Limit the number of results per page
                .select('-__v'); // Exclude the __v field
    
    
        
    
            // Count the total number of subAttribute for pagination info
            const totalSubAttribute = await AttributeModel.countDocuments({ 
            });
    
            if (subAttribute.length === 0) {
                return res.status(404).json({ status: false, message: "No Record Found", data: [] });
            }
    
            // Return success response with pagination info
            return res.status(200).json({
                status: true,
                message: "Attribute fetched successfully",
                data: subAttribute,
                pagination: {
                    page,
                    limit,
                    total: totalSubAttribute,
                    totalPages: Math.ceil(totalSubAttribute / limit)
                }
            });
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    },
    statusChangeAttribute :async (req, res) => {
        try {
            const { id, isActive } = req.body;
            // Ensure the ID is valid (optional: you can add validation using Joi before this)
            const Attribute = await AttributeModel.findOne({ _id: id });
            if (!Attribute) {
                return noRecordFoundResponse(res, "Attribute not found.");
            }
            // Update the Attribute's name
            Attribute.isActive=isActive ;
            await Attribute.save();

            // Return success response
            return successResponse(res, "Attribute Status Change successfully.", []);
        } catch (error) {
            return serverErrorResponse(res, "Internal Server Error", error.message);
        }
    },
    activeAttrubute: async (req, res) => {
        try {
    
            // Calculate skip value for pagination
    
            // Fetch active Attrubute by parent_id (excluding soft-deleted)
            const Attrubute = await AttributeModel.find({ 
                isActive: true, // Only active Attrubute
            })
                .notDeleted() // Exclude soft-deleted Attrubute
                .select('-__v') // Exclude the __v field
                .exec(); // Execute the query
    
            // Check if any Attrubute were found
            if (Attrubute.length > 0) {
                return res.status(200).json({
                    status: true,
                    message: "Active Attrubute Fetched Successfully",
                    data: Attrubute
                });

            } else {
                return noRecordFoundResponse(res, "No active Attrubute found for the given parent ID.", []);
            }
        } catch (error) {
            console.error("Error fetching active Attrubute by parent ID:", error); // Log the error for debugging
            return res.status(500).json({ 
                status: false, 
                message: "Internal Server Error", 
                error: error.message 
            });
        }
    },
};
