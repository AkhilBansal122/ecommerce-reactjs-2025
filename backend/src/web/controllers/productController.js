const express = require("express");
require('dotenv').config();
const ProductModel = require("../../../Schema/ProductSchema");

const { successResponse, failedResponse, noRecordFoundResponse, serverErrorResponse, alreadyExistsResponse,generateSlug } = require("../../../Helper/helper");
module.exports={
    activeProduct:async (req, res) => {
        try {
            // Fetch the paginated results and exclude the __v field
            const product = await ProductModel.find({isActive:true})
                .select('-__v'); // Exclude the __v field
                

            // Count the total number of documents for pagination info
        if(product){
            successResponse(res,"Active Permisson Fetch",product);
        }
        else{
            noRecordFoundResponse(res,"No Record Found",[]);
        }
            
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    },
}