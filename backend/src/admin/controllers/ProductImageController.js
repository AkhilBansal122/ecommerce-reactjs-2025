const express = require("express");
const { successResponse, alreadyExistsResponse, noRecordFoundResponse, serverErrorResponse,generateSlug } = require("../../../Helper/helper");
const ProductImageModel = require("../../../Schema/ProductImageSchema");
const ProductModel = require("../../../Schema/ProductSchema");
const mongoose = require('mongoose');
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

module.exports = {
    
    create: async (req, res) => {
        try {
            const { product_id } = req.body;
            const files = req.files;
            // Check if product ID is provided
            if (!product_id) {
              return res.status(400).json({ error: "Product ID is required" });
            }
        
            // Check if files were uploaded
            if (!files || files.length === 0) {
              return res.status(400).json({ error: "Please select a product image" });
            }
            checkProduct = await ProductModel.findOne({ _id: product_id });
            if(!checkProduct){
               return  noRecordFoundResponse([],"No Record Found");
            }

            if (files && files.length > 0) {
              // Loop through all the uploaded files
              for (const file of files) {
                  const randomFileName = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
                  const fileExtension = path.extname(file.originalname);
                  const newFileName = `${randomFileName}${fileExtension}`;
            
                  const uploadDir = path.join(__dirname, '../../../public/uploads/product_images');
                  const filePath = path.join(uploadDir, newFileName);
            
                  // Create directory if it doesn't exist
                  if (!fs.existsSync(uploadDir)) {
                      fs.mkdirSync(uploadDir, { recursive: true });
                  }
            
                  // Move the uploaded file to the correct location
                  await new Promise((resolve, reject) => {
                      fs.rename(file.path, filePath, (err) => {
                          if (err) {
                              return reject(err);
                          }
                          resolve();
                      });
                  });
            
                  // Store each uploaded image in the product's image array and save to database
                  await ProductImageModel.create({
                      product_id,
                      image: `uploads/product_images/${newFileName}`,
                      secondary_image: true,
                      isActive: true
                  });
              }
          
              // Once all files have been uploaded and inserted successfully
              return res.status(200).json({
                  success: true,
                  message: 'All files uploaded and inserted successfully!'
              });
          } else {
              return res.status(400).json({
                  success: false,
                  message: 'No files were uploaded.'
              });
          }
        } catch (error) {
          return res.status(500).json({ error: 'Internal Server Error', details: error.message });
        }
      },
    update: async (req, res) => {
        try {
            const { id, name,category_id,sub_category_id,color,size,description,price,sale_price,discount } = req.body;
            const user_id = req.user.id;

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
            const Cateogry = await ProductImageModel.find(query)
            .populate({
                path: 'category_id',
                 // Assuming 'category' is the field in ProductImageModel that references the Category model
                select: 'name' // Optionally, you can specify which fields to include from the Category model (e.g., 'name')
              })  
              .populate({
                path: 'sub_category_id',
                 // Assuming 'category' is the field in ProductImageModel that references the Category model
                select: 'name' // Optionally, you can specify which fields to include from the Category model (e.g., 'name')
              })  
              .sort({ createdAt: -1 }) // Sort by createdAt in descending order (latest first)
            .skip((page - 1) * limit) // Skip based on the page and limit
                .limit(limit) // Limit the number of results per page
                .select('-__v'); // Exclude the __v field

            // Count the total number of documents for pagination info
            const totalCateogry = await ProductImageModel.countDocuments();

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
    
    activeProductImage:async (req, res) => {
        try {
            // Fetch the paginated results and exclude the __v field
            const category = await ProductImageModel.find({isActive:true})
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
            const category = await ProductImageModel.findOne({ _id: id });
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
    }
};