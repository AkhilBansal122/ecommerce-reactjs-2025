const express = require("express");
const { successResponse, alreadyExistsResponse, noRecordFoundResponse, serverErrorResponse,generateSlug } = require("../../../Helper/helper");
const ProductModel = require("../../../Schema/ProductSchema");
const SubCategoryModel =require("../../../Schema/SubCategorySchema");
const mongoose = require('mongoose');
const RoleModel = require("../../../Schema/RoleSchema");

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

             // Fetch the role of the user
             const getRole = await RoleModel.findOne({ _id: req.user.role_id });

            
            // Ensure the ID is valid (optional: you can add validation using Joi before this)
            const product = await ProductModel.findOne({ _id: id });
            if (!product) {
                return noRecordFoundResponse(res, "Sub Cateogry not found.");
            }

            // Check if the new product name already exists (excluding the current category)
            const existingCategory = await ProductModel.findOne({ name: name,category_id:category_id,sub_category_id:sub_category_id,color:color,size:size });
            if (existingCategory && existingCategory._id.toString() !== id) {
                return alreadyExistsResponse(res, "Product with this name already exists.");
            }

            slug = await generateSlug(name);
            if (getRole?.name !== 'Admin') {
                product.user_id= user_id;
            }
       
            product.name = name;
            product.slug=slug;
            product.category_id = category_id;
            product.sub_category_id = sub_category_id;
            product.price = price;
            product.sale_price = sale_price;
            product.discount = discount;
            product.color = color;
            product.size = size;
            product.description = description;
            product.isActive=true;
            await product.save();

            // Return success response
            return successResponse(res, "Product updated successfully.", product);
        } catch (error) {
            return serverErrorResponse(res, "Internal Server Error", error.message);
        }
    },
    list: async (req, res) => {
        try {
            const page = parseInt(req.body.page) || 1;  // Default to 1 if page is not provided
            const limit = parseInt(req.body.limit) || 10;  // Default to 10 if limit is not provided

           // Fetch the role of the user
           const getRole = await RoleModel.findOne({ _id: req.user.role_id });

           // Determine the query condition based on the role
           let query = {};
           if (getRole?.name !== 'Admin') {
               query = { user_id: req.user.id }; // If user is not Admin, filter by user_id
           }
            // Fetch the paginated results and exclude the __v field
            const Cateogry = await ProductModel.find(query)
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
              .sort({ createdAt: -1 }) // Sort by createdAt in descending order (latest first)
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
    activeProduct:async (req, res) => {
        try {
            // Fetch the paginated results and exclude the __v field
            const category = await ProductModel.find({isActive:true})
                .select('-__v'); // Exclude the __v field

            // Count the total number of documents for pagination info
        if(category){
            successResponse(res,"Active Product Fetch",category);
        }
        else{
            noRecordFoundResponse(res,"No Record Found",[]);
        }
            
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    },
    statusChangeProduct :async (req, res) => {
        try {
            const { id, isActive } = req.body;

            // Ensure the ID is valid (optional: you can add validation using Joi before this)
            const category = await ProductModel.findOne({ _id: id });
            if (!category) {
                return noRecordFoundResponse(res, "Product not found.");
            }
            // Update the Category's name
            category.isActive=isActive ;
            await category.save();

            // Return success response
            return successResponse(res, "Product Status Change successfully.", []);
        } catch (error) {
            return serverErrorResponse(res, "Internal Server Error", error.message);
        }
    },

activeSubCategoryByCategoryId: async (req, res) => {
    try {
      
        // Fetch the active subcategories based on category ID, excluding the __v field
        const category = await SubCategoryModel.find({
            isActive: true,
            category_id: req.body.category_id
        }).select('-__v'); // Exclude the __v field

        // Check if the category list is not empty
        if (category.length > 0) {
            return successResponse(res, "Active Subcategories fetched successfully", category);
        } else {
            return noRecordFoundResponse(res, "No active subcategories found", []);
        }

    } catch (error) {
        // Handle internal server error with detailed message
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

    
};
