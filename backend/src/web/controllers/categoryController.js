const express = require("express");
require('dotenv').config();
const CategoryModel = require("../../../Schema/CategorySchema");

const { successResponse, failedResponse, noRecordFoundResponse, serverErrorResponse, alreadyExistsResponse,generateSlug } = require("../../../Helper/helper");
module.exports={
    activeCategory:async (req, res) => {
        try {
            // Fetch the paginated results and exclude the __v field
            const category = await CategoryModel.find({isActive:true})
                .select('-__v'); // Exclude the __v field
                

            // Count the total number of documents for pagination info
        if(category){
            successResponse(res,"Active Permisson Fetch",category);
        }
        else{
            noRecordFoundResponse(res,"No Record Found",[]);
        }
            
        } catch (error) {
            return res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    },
}