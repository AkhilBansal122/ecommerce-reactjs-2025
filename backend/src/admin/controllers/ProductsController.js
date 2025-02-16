const express = require("express");
const { successResponse, alreadyExistsResponse, noRecordFoundResponse, serverErrorResponse,generateSlug } = require("../../../Helper/helper");
const ProductModel = require("../../../Schema/ProductSchema");
require('dotenv').config();

module.exports = {
    create: async (req, res) => {
        try {
            const { name,category_id,sub_category_id,color,size,description,price,sale_price,discount } = req.body;
            const user_id = req.user.id;
            // Check if category already exists
            const category = await ProductModel.findOne({ name: name,category_id:category_id,sub_category_id:sub_category_id,color:color,size:size });
            if (category) {
                return alreadyExistsResponse(res, "Product already exists.");
            }
            slug = await generateSlug(name);
            // Create a new category
            const productCreated = await ProductModel.create({ name,category_id,sub_category_id,slug,color,size,description,price,sale_price,discount,user_id });

            // Return success response
            return successResponse(res, "Product created successfully.", productCreated);
        } catch (error) {
            return serverErrorResponse(res, "Internal Server Error", error.message);
        }
    },
    update: async (req, res) => {
        try {
            const { id, name,category_id,sub_category_id,color,size,description,price,sale_price,discount } = req.body;
            const user_id = req.user.id;

            // Ensure the ID is valid (optional: you can add validation using Joi before this)
            const category = await ProductModel.findOne({ _id: id });
            if (!category) {
                return noRecordFoundResponse(res, "Sub Cateogry not found.");
            }

            // Check if the new category name already exists (excluding the current category)
            const existingCategory = await ProductModel.findOne({ name: name,category_id:category_id,sub_category_id:sub_category_id,color:color,size:size });
            if (existingCategory && existingCategory._id.toString() !== id) {
                return alreadyExistsResponse(res, "Product with this name already exists.");
            }

            slug = await generateSlug(name);
            category.name = name;
            category.slug=slug;
            category.category_id = category_id;
            category.sub_category_id = sub_category_id;
            category.price = price;
            category.sale_price = sale_price;
            category.discount = discount;
            category.description = description;
            category.isActive=true;
            await category.save();

            // Return success response
            return successResponse(res, "Product updated successfully.", category);
        } catch (error) {
            return serverErrorResponse(res, "Internal Server Error", error.message);
        }
    },
    list: async (req, res) => {
        try {
            const page = parseInt(req.body.page) || 1;  // Default to 1 if page is not provided
            const limit = parseInt(req.body.limit) || 10;  // Default to 10 if limit is not provided

            // Fetch the paginated results and exclude the __v field
            const Cateogry = await ProductModel.find()
            .populate({
                path: 'category_id',
                 // Assuming 'category' is the field in ProductModel that references the Category model
                select: 'name' // Optionally, you can specify which fields to include from the Category model (e.g., 'name')
              })  
              .populate({
                path: 'sub_category_id',
                 // Assuming 'category' is the field in ProductModel that references the Category model
                select: 'name' // Optionally, you can specify which fields to include from the Category model (e.g., 'name')
              })  
            .skip((page - 1) * limit) // Skip based on the page and limit
                .limit(limit) // Limit the number of results per page
                .select('-__v'); // Exclude the __v field

            // Count the total number of documents for pagination info
            const totalCateogry = await ProductModel.countDocuments();

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
            const category = await ProductModel.find({isActive:true})
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
            const category = await ProductModel.findOne({ _id: id });
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
