const express = require("express");
const { successResponse, failedResponse, noRecordFoundResponse, serverErrorResponse, alreadyExistsResponse, generateSlug } = require("../../../Helper/helper");
require('dotenv').config();
const CategoryModel = require("../../../Schema/CategorySchema");
const mongoose = require('mongoose');

module.exports = {
    create: async (req, res) => {
        try {
            const { name } = req.body;
    
            // Check if a category with the same name exists (including soft-deleted)
            const existingCategory = await CategoryModel.findOne({ name });
    
            if (existingCategory) {
                // If the category is soft-deleted, restore it
                if (existingCategory.deletedAt) {
                    existingCategory.deletedAt = null; // Restore the category
                    existingCategory.isActive = true; // Ensure the category is active
                    await existingCategory.save();
    
                    return successResponse(res, "Main Category restored successfully.", existingCategory);
                } else {
                    // If the category is not soft-deleted, return an error
                    return alreadyExistsResponse(res, "Main Category already exists.");
                }
            }
    
            // Generate a slug from the name
            const slug = await generateSlug(name);
    
            // Create a new category
            const newCategory = await CategoryModel.create({ 
                name, 
                slug, 
                isActive: true, 
                parent_id: null 
            });
    
            // Return success response
            return successResponse(res, "Main Category created successfully.", newCategory);
        } catch (error) {
            console.error("Error in create category:", error); // Log the error for debugging
            return serverErrorResponse(res, "Internal Server Error", error.message);
        }
    },
    

    update: async (req, res) => {
        try {
            const { id, name, isActive } = req.body;
    
            // Ensure the ID is valid
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ status: false, message: "Invalid category ID" });
            }
    
            // Find the category by ID (including soft-deleted)
            const category = await CategoryModel.findOne({ _id: id });
            if (!category) {
                return noRecordFoundResponse(res, "Main Category not found.");
            }
    
            // Check if the new category name already exists (excluding the current category and soft-deleted categories)
            const existingCategoryWithSameName = await CategoryModel.findOne({
                name: name,
                _id: { $ne: id }, // Exclude the current category
                deletedAt: null   // Exclude soft-deleted categories
            });
    
            if (existingCategoryWithSameName) {
                return alreadyExistsResponse(res, "Main Category with this name already exists.");
            }
    
            // Generate a new slug
            const slug = await generateSlug(name);
    
            // Update the category's name, slug, and isActive status
            category.name = name;
            category.slug = slug;
            category.isActive = true;
            await category.save();
    
            // Return success response
            return successResponse(res, "Main Category updated successfully.", category);
        } catch (error) {
            console.error("Error updating category:", error); // Log the error for debugging
            return serverErrorResponse(res, "Internal Server Error", error.message);
        }
    },
    

    delete: async (req, res) => {
        try {
            const { id } = req.body; // Assuming the ID is passed in the request body
            // Validate the ID
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ status: false, message: "Invalid category ID" });
            }

            // Soft delete the category
            const deletedCategory = await CategoryModel.softDelete(id);

            if (!deletedCategory) {
                return noRecordFoundResponse(res, "Category not found.");
            }

            // Return success response
            return successResponse(res, "Category deleted successfully.", deletedCategory);
        } catch (error) {
            return serverErrorResponse(res, "Internal Server Error", error.message);
        }
    },

    list: async (req, res) => {
        try {
            const page = parseInt(req.body.page) || 1;  // Default to 1 if page is not provided
            const limit = parseInt(req.body.limit) || 10;  // Default to 10 if limit is not provided

            // Fetch the paginated top-level categories where parent_id is null
            const categories = await CategoryModel.find({ parent_id: null }).notDeleted() // Filter where parent_id is null
                .sort({ createdAt: -1 }) // Sort by createdAt in descending order (latest first)
                .skip((page - 1) * limit) // Skip based on the page and limit
                .limit(limit) // Limit the number of results per page
                .select('-__v'); // Exclude the __v field

            // Count the total number of top-level categories for pagination info
            const totalCategories = await CategoryModel.countDocuments({ parent_id: null }).notDeleted();

            // Return success response with pagination info
            return res.status(200).json({
                status: true,
                message: "Fetched main categories successfully",
                data: categories,
                pagination: {
                    page,
                    limit,
                    total: totalCategories,
                    totalPages: Math.ceil(totalCategories / limit)
                }
            });
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    },

    activeMainCategory: async (req, res) => {
        try {
            // Fetch active main categories (where parent_id is null, isActive is true, and not soft-deleted)
            const categories = await CategoryModel.find({ 
                parent_id: null, // Parent ID is null (main categories)
                isActive:true,
            })
                .notDeleted() // Exclude soft-deleted categories
                .select('-__v') // Exclude the __v field
                .exec(); // Execute the query
    
            if (categories.length > 0) {
                return res.status(200).json({
                    status: true,
                    message: "Active Main Categories Fetched Successfully",
                    data: categories
                });
            } else {
                return res.status(404).json({
                    status: false,
                    message: "No Active Main Categories Found",
                    data: []
                });
            }
        } catch (error) {
            return res.status(500).json({ 
                message: 'Internal Server Error', 
                error: error.message 
            });
        }
    },

    statusChangeCategory: async (req, res) => {
        try {
            const { id, isActive } = req.body;

            // Ensure the ID is valid
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ status: false, message: "Invalid category ID" });
            }

            // Find the category by ID (excluding soft-deleted)
            const category = await CategoryModel.findOne({ _id: id }).notDeleted();
            if (!category) {
                return noRecordFoundResponse(res, "Main Category not found.");
            }

            // Update the category's isActive status
            category.isActive = isActive;
            await category.save();

            // Return success response
            return successResponse(res, "Main Category Status Change successfully.", category);
        } catch (error) {
            return serverErrorResponse(res, "Internal Server Error", error.message);
        }
    },

    restoreCategory: async (req, res) => {
        try {
            const { id } = req.params;

            // Validate the ID
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ status: false, message: "Invalid category ID" });
            }

            // Restore the soft-deleted category
            const restoredCategory = await CategoryModel.restore(id);

            if (!restoredCategory) {
                return res.status(404).json({ status: false, message: "Category not found" });
            }

            // Return success response
            return res.status(200).json({
                status: true,
                message: "Category restored successfully",
                data: restoredCategory
            });
        } catch (error) {
            console.error("Error restoring category:", error);
            return res.status(500).json({ status: false, message: "Internal Server Error", error: error.message });
        }
    }
};