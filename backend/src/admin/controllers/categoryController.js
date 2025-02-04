const express = require("express");
const { successResponse, failedResponse, noRecordFoundResponse, serverErrorResponse, alreadyExistsResponse } = require("../../../Helper/helper");
require('dotenv').config();
const CategoryModel = require("../../../Schema/CategorySchema");
module.exports = {

    create: async (req, res) => {
        try {
            const { name } = req.body;

            // Check if category already exists
            const category = await CategoryModel.findOne({ name: name });
            if (category) {
                return alreadyExistsResponse(res, "Category already exists.");
            }

            // Create a new category
            const createcategory = await CategoryModel.create({ name });

            // Return success response
            return successResponse(res, "Category created successfully.", createcategory);
        } catch (error) {
            return serverErrorResponse(res, "Internal Server Error", error.message);
        }
    },
    update: async (req, res) => {
        try {
            const { id, name,isActive } = req.body;

            // Ensure the ID is valid (optional: you can add validation using Joi before this)
            const category = await CategoryModel.findOne({ _id: id });
            if (!category) {
                return noRecordFoundResponse(res, "Category not found.");
            }

            // Check if the new category name already exists (excluding the current category)
            const existingcategory = await CategoryModel.findOne({ name: name });
            if (existingcategory && existingcategory._id.toString() !== id) {
                return alreadyExistsResponse(res, "Category with this name already exists.");
            }

            // Update the category's name
            category.name = name;
            category.isActive=isActive;
            await category.save();

            // Return success response
            return successResponse(res, "Category updated successfully.", category);
        } catch (error) {
            return serverErrorResponse(res, "Internal Server Error", error.message);
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.body; // Assuming the ID is passed in the request body

            // Validate if the category exists
            const category = await CategoryModel.findById(id);
            if (!category) {
                return noRecordFoundResponse(res, "Category not found.");
            }
            // Delete associated Rolecategory records that reference this categoryId
            await RoleCategoryModel.deleteMany({ category: id });

            // Delete the category
            await CategoryModel.findByIdAndDelete(id);

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

            // Fetch the paginated results and exclude the __v field
            const categorys = await CategoryModel.find()
                .skip((page - 1) * limit) // Skip based on the page and limit
                .limit(limit) // Limit the number of results per page
                .select('-__v'); // Exclude the __v field

            // Count the total number of documents for pagination info
            const totalcategorys = await CategoryModel.countDocuments();

            // Return success response with pagination info
            return res.status(200).json({
                status:true,
                message:"fetch Category Successfully",
                data: categorys,
                pagination: {
                    page,
                    limit,
                    total: totalcategorys,
                    totalPages: Math.ceil(totalcategorys / limit)
                }
            });
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    },
    activeCategory:async (req, res) => {
        try {
            // Fetch the paginated results and exclude the __v field
            const categorys = await CategoryModel.find({isActive:true})
                .select('-__v'); // Exclude the __v field

            // Count the total number of documents for pagination info
        if(categorys){
            successResponse(res,"Active Cateogry Fetch",categorys);
        }
        else{
            noRecordFoundResponse(res,"No Record Found",[]);
        }
            
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    },
    statusChangecategory :async (req, res) => {
        try {
            const { id, isActive } = req.body;

            // Ensure the ID is valid (optional: you can add validation using Joi before this)
            const category = await CategoryModel.findOne({ _id: id });
            if (!category) {
                return noRecordFoundResponse(res, "category not found.");
            }
            // Update the category's name
            category.isActive=isActive ;
            await category.save();

            // Return success response
            return successResponse(res, "category Status Change successfully.", []);
        } catch (error) {
            return serverErrorResponse(res, "Internal Server Error", error.message);
        }
    },
    
};
