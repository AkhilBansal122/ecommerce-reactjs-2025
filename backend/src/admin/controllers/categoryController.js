const express = require("express");
const { successResponse, failedResponse, noRecordFoundResponse, serverErrorResponse, alreadyExistsResponse,generateSlug } = require("../../../Helper/helper");
require('dotenv').config();
const mongoose = require("mongoose");

const CategoryModel = require("../../../Schema/CategorySchema");

module.exports = {

    create: async (req, res) => {
        try {
            const { name,parent_id } = req.body;
            let parentId =parent_id;
            // Check if category already exists
            const existingCategory = await CategoryModel.findOne({ name: name,parent_id:parentId });
           
            if (existingCategory) {
                return alreadyExistsResponse(res, "Main Category already exists.");
            }
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
            slug = await generateSlug(name);
            // Create a new category
            const createcategory = await CategoryModel.create({ name,slug,parent_id:parentId });

            // Return success response
            return successResponse(res, "Main Category created successfully.", createcategory);
        } catch (error) {
            return serverErrorResponse(res, "Internal Server Error", error.message);
        }
    },
    update: async (req, res) => {
        try {
            const { id, name, parent_id, isActive } = req.body;
    
            // Ensure the ID is valid
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).json({ status: false, message: "Invalid category ID" });
            }
    
            // Find the category by ID (including soft-deleted)
            const category = await CategoryModel.findOne({ _id: id });
            if (!category) {
                return noRecordFoundResponse(res, "Category not found.");
            }
    
            // Check if a category with the same name and parent_id already exists (excluding the current category)
            const check = await CategoryModel.findOne({ 
                parent_id: parent_id, // Match the parent_id
                name: name,           // Match the name
                _id: { $ne: id }      // Exclude the current document
            });
    
            if (check) {
                return alreadyExistsResponse(res, "Category with this name already exists under the same parent.");
            }
    
            // Generate a new slug
            const slug = await generateSlug(name);
    
            // Update the category's name, slug, and isActive status
            category.name = name;
            category.slug = slug;
            category.parent_id = parent_id;
            category.isActive = isActive;
            await category.save();
    
            // Return success response
            return successResponse(res, "Category updated successfully.", category);
        } catch (error) {
            console.error("Error updating category:", error); // Log the error for debugging
            return serverErrorResponse(res, "Internal Server Error", error.message);
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.body; // Assuming the ID is passed in the request body

            // Validate if the category exists
            const category = await CategoryModel.findById(id);
            if (!category) {
                return noRecordFoundResponse(res, "category not found.");
            }
            // Delete the category
            const deletedCategory = await CategoryModel.softDelete(id);

            if (!deletedCategory) {
                return noRecordFoundResponse(res, "Category not found.");
            }

            // Return success response
            return successResponse(res, "Category deleted successfully.");
        } catch (error) {
            return serverErrorResponse(res, "Internal Server Error", error.message);
        }
    },
    list: async (req, res) => {
        try {
            const page = parseInt(req.body.page) || 1;  // Default to 1 if page is not provided
            const limit = parseInt(req.body.limit) || 10;  // Default to 10 if limit is not provided
            
            const topLevelCategory = await CategoryModel.find({
                isActive:true,
                parent_id: null, // Filter for subcategories with parent_id not null
                'parent_id.deletedAt': null // Ensure the parent category is not soft-deleted
            })
            // Fetch the paginated subcategories where parent_id is not null and parent is not soft-deleted
            let subCategories = await CategoryModel.find({ 
                parent_id: { $in: topLevelCategory.map((item) => item._id) },
                'parent_id.deletedAt': null // Ensure the parent category is not soft-deleted
            })
                .populate({
                    path: 'parent_id',  // Populate the parent_id field
                    select: 'name',     // Select only the 'name' field from the Category model
                    match: { deletedAt: null } // Ensure the populated parent is not soft-deleted
                })
                .sort({ createdAt: -1 }) // Sort by createdAt in descending order (latest first)
                .skip((page - 1) * limit) // Skip based on the page and limit
                .limit(limit) // Limit the number of results per page
                .select('-__v'); // Exclude the __v field
    
            // Filter out subcategories with soft-deleted parents (if any)
            subCategories = subCategories.filter(subCategory => subCategory.parent_id !== null);
    
            // Map parent_id to parentMainCategory
            subCategories = subCategories.map(subCategory => {
                const { parent_id, ...rest } = subCategory.toObject(); // Convert Mongoose object to plain JavaScript object
                return {
                    ...rest,
                    parentMainCategory: parent_id  // Rename parent_id to parentMainCategory
                };
            });
    
            // Count the total number of subcategories for pagination info
            const totalSubCategories = await CategoryModel.countDocuments({ 
                parent_id: { $in: topLevelCategory.map((item) => item._id) },
                'parent_id.deletedAt': null 
            });
    
            if (subCategories.length === 0) {
                return res.status(404).json({ status: false, message: "No Record Found", data: [] });
            }
    
            // Return success response with pagination info
            return res.status(200).json({
                status: true,
                message: "Categories fetched successfully",
                data: subCategories,
                pagination: {
                    page,
                    limit,
                    total: totalSubCategories,
                    totalPages: Math.ceil(totalSubCategories / limit)
                }
            });
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    },
    getActiveCategoryByParentId: async (req, res) => {
        try {
            const { parent_id } = req.body;
    
            // Calculate skip value for pagination
    
            // Fetch active categories by parent_id (excluding soft-deleted)
            const categories = await CategoryModel.find({ 
                isActive: true, // Only active categories
                parent_id      // Match the provided parent_id
            })
                .notDeleted() // Exclude soft-deleted categories
                .select('-__v') // Exclude the __v field
                .exec(); // Execute the query
    
         
    
            // Check if any categories were found
            if (categories.length > 0) {
                return res.status(200).json({
                    status: true,
                    message: "Active Categories Fetched Successfully",
                    data: categories
                });

            } else {
                return noRecordFoundResponse(res, "No active categories found for the given parent ID.", []);
            }
        } catch (error) {
            console.error("Error fetching active categories by parent ID:", error); // Log the error for debugging
            return res.status(500).json({ 
                status: false, 
                message: "Internal Server Error", 
                error: error.message 
            });
        }
    },
    statusChangeCategory :async (req, res) => {
        try {
            const { id, isActive } = req.body;

            // Ensure the ID is valid (optional: you can add validation using Joi before this)
            const category = await CategoryModel.findOne({ _id: id }).notDeleted();
            if (!category) {
                return noRecordFoundResponse(res, "Main Category not found.");
            }
            // Update the Category's name
            category.isActive=isActive ;
            await category.save();

            // Return success response
            return successResponse(res, "Main Category Status Change successfully.", []);
        } catch (error) {
            return serverErrorResponse(res, "Internal Server Error", error.message);
        }
    },
};
