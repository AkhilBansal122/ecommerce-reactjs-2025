const express = require("express");
const { successResponse, alreadyExistsResponse, noRecordFoundResponse, serverErrorResponse } = require("../../../Helper/helper");
const SubCategoryModel = require("../../../Schema/SubCategorySchema");
require('dotenv').config();

module.exports = {
    create: async (req, res) => {
        try {
            const { name,category_id } = req.body;

            // Check if category already exists
            const category = await SubCategoryModel.findOne({ name: name,category_id });
            if (category) {
                return alreadyExistsResponse(res, "Sub Category already exists.");
            }

            // Create a new category
            const subcreatecategory = await SubCategoryModel.create({ name,category_id });

            // Return success response
            return successResponse(res, "Sub Category created successfully.", subcreatecategory);
        } catch (error) {
            return serverErrorResponse(res, "Internal Server Error", error.message);
        }
    },
    update: async (req, res) => {
        try {
            const { id, name,category_id,isActive } = req.body;

            // Ensure the ID is valid (optional: you can add validation using Joi before this)
            const category = await SubCategoryModel.findOne({ _id: id });
            if (!category) {
                return noRecordFoundResponse(res, "Sub Cateogry not found.");
            }

            // Check if the new category name already exists (excluding the current category)
            const existingCategory = await SubCategoryModel.findOne({ name: name,category_id });
            if (existingCategory && existingCategory._id.toString() !== id) {
                return alreadyExistsResponse(res, "Sub Category with this name already exists.");
            }

            // Update the category's name
            category.name = name;
            category.category_id = category_id;
            category.isActive=isActive;
            await category.save();

            // Return success response
            return successResponse(res, "Sub Category updated successfully.", category);
        } catch (error) {
            return serverErrorResponse(res, "Internal Server Error", error.message);
        }
    },
    list: async (req, res) => {
        try {
            const page = parseInt(req.body.page) || 1;  // Default to 1 if page is not provided
            const limit = parseInt(req.body.limit) || 10;  // Default to 10 if limit is not provided

            // Fetch the paginated results and exclude the __v field
            const Cateogry = await SubCategoryModel.find()
                .skip((page - 1) * limit) // Skip based on the page and limit
                .limit(limit) // Limit the number of results per page
                .select('-__v'); // Exclude the __v field

            // Count the total number of documents for pagination info
            const totalCateogry = await SubCategoryModel.countDocuments();

            // Return success response with pagination info
            return res.status(200).json({
                status:true,
                message:"fetch sub Category Successfully",
                data: Cateogry,
                pagination: {
                    page,
                    limit,
                    total: totalCateogry,
                    totalPages: Math.ceil(totalCateogry / limit)
                }
            });
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    },
    activeSubCategory:async (req, res) => {
        try {
            // Fetch the paginated results and exclude the __v field
            const category = await SubCategoryModel.find({isActive:true})
                .select('-__v'); // Exclude the __v field

            // Count the total number of documents for pagination info
        if(category){
            successResponse(res,"Active Sub Category Fetch",category);
        }
        else{
            noRecordFoundResponse(res,"No Record Found",[]);
        }
            
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    },
    statusChangeSubCategory :async (req, res) => {
        try {
            const { id, isActive } = req.body;

            // Ensure the ID is valid (optional: you can add validation using Joi before this)
            const category = await SubCategoryModel.findOne({ _id: id });
            if (!category) {
                return noRecordFoundResponse(res, "Sub Category not found.");
            }
            // Update the Category's name
            category.isActive=isActive ;
            await category.save();

            // Return success response
            return successResponse(res, "Sub Category Status Change successfully.", []);
        } catch (error) {
            return serverErrorResponse(res, "Internal Server Error", error.message);
        }
    },
};
