const express = require("express");
const { successResponse, alreadyExistsResponse, noRecordFoundResponse, serverErrorResponse,generateSlug } = require("../../../Helper/helper");
const SubCategoryModel = require("../../../Schema/CategorySchema");
require('dotenv').config();

module.exports = {
    create: async (req, res) => {
        try {
            const { name,parent_id } = req.body;

            // Check if category already exists
            const category = await SubCategoryModel.findOne({ name: name,parent_id:parent_id }).notDeleted();
            if (category) {
                return alreadyExistsResponse(res, "Sub Category already exists.");
            }
            slug = await generateSlug(name);
            // Create a new category
            const subcreatecategory = await SubCategoryModel.create({ name,parent_id:parent_id,slug,isActive:true });

            // Return success response
            return successResponse(res, "Sub Category created successfully.", subcreatecategory);
        } catch (error) {
            return serverErrorResponse(res, "Internal Server Error", error.message);
        }
    },
    update: async (req, res) => {
        try {
            const { id, name,parent_id,isActive } = req.body;

            // Ensure the ID is valid (optional: you can add validation using Joi before this)
            const category = await SubCategoryModel.findOne({ _id: id }).notDeleted();
            if (!category) {
                return noRecordFoundResponse(res, "Sub Cateogry not found.");
            }

            // Check if the new category name already exists (excluding the current category)
            const existingCategory = await SubCategoryModel.findOne({ name: name,parent_id:parent_id }).notDeleted();
            if (existingCategory && existingCategory._id.toString() !== id) {
                return alreadyExistsResponse(res, "Sub Category with this name already exists.");
            }

            slug = await generateSlug(name);
            category.name = name;
            category.slug=slug;
            category.parent_id = parent_id;
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
            const page = parseInt(req.body.page) || 1;
            const limit = parseInt(req.body.limit) || 10;
            const skip = (page - 1) * limit;
    
            // Fetch main categories (first-level categories)
            const subCategories = await SubCategoryModel.find({ isActive:true,parent_id: null }).notDeleted();
    
            // Fetch second-level categories (children of main categories)
            const secondLevelRecord = await SubCategoryModel.find({
                isActive:true,
                parent_id: { $in: subCategories.map((item) => item._id) }
            }).notDeleted();
    
            // Fetch third-level subcategories (children of second-level categories)
            const thirdLevelRecordPromise = SubCategoryModel.find({
                parent_id: { $in: secondLevelRecord.map((item) => item._id) }
            })
            .populate({
                path: 'parent_id',  // Populate parent subcategory (second level)
                select: 'name parent_id',  // Select name and parent_id from second level
                populate: {
                    path: 'parent_id',  // Populate main category (first level)
                    select: 'name'  // Select only the name field from main category
                }
            })
            .notDeleted()
            .skip(skip)
            .limit(limit)
            .select('-__v -createdAt -updatedAt');  // Exclude versioning and timestamps
    
            // Count the total number of third-level records for pagination purposes
            const totalThirdLevelRecordsPromise = SubCategoryModel.countDocuments({
                parent_id: { $in: secondLevelRecord.map((item) => item._id) }
            });
    
            // Execute queries concurrently for efficiency
            const [thirdLevelRecord, totalThirdLevelRecords] = await Promise.all([thirdLevelRecordPromise, totalThirdLevelRecordsPromise]);
    
            // Handle no records found scenario
            if (!thirdLevelRecord.length) {
                return res.status(404).json({ status: false, message: "No Record Found", data: [] });
            }
    
            // Return success response with pagination info
            return res.status(200).json({
                status: true,
                message: "Subcategories fetched successfully",
                data: thirdLevelRecord,
                pagination: {
                    page,
                    limit,
                    total: totalThirdLevelRecords,
                    totalPages: Math.ceil(totalThirdLevelRecords / limit)
                }
            });
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    },
    
    activeSubCategory:async (req, res) => {
        try {
            // Fetch the paginated results and exclude the __v field
            const category = await SubCategoryModel.find({isActive:true}).notDeleted()
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
            const category = await SubCategoryModel.findOne({ _id: id }).notDeleted();
            if (!category) {
                return noRecordFoundResponse(res, "Sub Category not found.");
            }
            // Update the Category's name
            category.isActive=isActive;
            await category.save();

            // Return success response
            return successResponse(res, "Sub Category Status Change successfully.", []);
        } catch (error) {
            return serverErrorResponse(res, "Internal Server Error", error.message);
        }
    },
     delete: async (req, res) => {
            try {
                const { id } = req.body; // Assuming the ID is passed in the request body
    
                // Validate if the category exists
                const category = await SubCategoryModel.findById(id);
                if (!category) {
                    return noRecordFoundResponse(res, "category not found.");
                }
                // Delete the category
                const deletedCategory = await SubCategoryModel.softDelete(id);
    
                if (!deletedCategory) {
                    return noRecordFoundResponse(res, "Category not found.");
                }
    
                // Return success response
                return successResponse(res, "Category deleted successfully.");
            } catch (error) {
                return serverErrorResponse(res, "Internal Server Error", error.message);
            }
        },
};
