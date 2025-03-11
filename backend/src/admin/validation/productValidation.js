const Joi = require('joi');
const mongoose = require('mongoose');
const validationRequest = require('../../../middleware/validationRequest');

module.exports = {
  createProductValidation: async (req, res, next) => {
    // Define the validation schema using Joi
    const schema = Joi.object({
      name: Joi.string()
        .min(3) // Ensures the name is at least 3 characters long
        .required()
        .messages({
          'string.min': 'Name must be at least 3 characters long.',
          'any.required': 'Name is required.',
        }),
      main_category_id: Joi.string()
        .custom((value, helpers) => {
          // Validate the category_id as a valid MongoDB ObjectId
          if (!mongoose.Types.ObjectId.isValid(value)) {
            return helpers.message('Main Category ID must be a valid MongoDB ObjectId.');
          }
          return value; // Valid ObjectId, return it
        })
        .required()
        .messages({
          'any.required': 'Main Category ID is required.',
        }),
      category_id: Joi.string()
        .custom((value, helpers) => {
          // Validate the category_id as a valid MongoDB ObjectId
          if (!mongoose.Types.ObjectId.isValid(value)) {
            return helpers.message('Category ID must be a valid MongoDB ObjectId.');
          }
          return value; // Valid ObjectId, return it
        })
        .required()
        .messages({
          'any.required': 'Category ID is required.',
        }),
      sub_category_id: Joi.string()
        .custom((value, helpers) => {
          // Validate the sub_category_id as a valid MongoDB ObjectId
          if (!mongoose.Types.ObjectId.isValid(value)) {
            return helpers.message('Sub Category ID must be a valid MongoDB ObjectId.');
          }
          return value; // Valid ObjectId, return it
        })
        .required()
        .messages({
          'any.required': 'Sub Category ID is required.',
        }),
      attribute_id: Joi.string()
        .custom((value, helpers) => {
          // Validate the attribute_id as a valid MongoDB ObjectId
          if (!mongoose.Types.ObjectId.isValid(value)) {
            return helpers.message('Attribute ID must be a valid MongoDB ObjectId.');
          }
          return value; // Valid ObjectId, return it
        })
        .required()
        .messages({
          'any.required': 'Attribute ID is required.',
        }),
      attribute_value_id: Joi.string()
        .custom((value, helpers) => {
          // Validate the attribute_value_id as a valid MongoDB ObjectId
          if (!mongoose.Types.ObjectId.isValid(value)) {
            return helpers.message('Attribute Value ID must be a valid MongoDB ObjectId.');
          }
          return value; // Valid ObjectId, return it
        })
        .required()
        .messages({
          'any.required': 'Attribute Value ID is required.',
        }),
      price: Joi.number() // Use number type for price
        .required()
        .messages({
          'any.required': 'Price is required.',
        }),
      description: Joi.string().optional(), // Optional field
      stock_quantity: Joi.number() // Stock quantity must be a number
        .required()
        .messages({
          'any.required': 'Stock quantity is required.',
        }),
    });

    // Validate the request against the schema
    validationRequest(req, res, next, schema);
  },

  updateProductValidation: async (req, res, next) => {
    // Define the validation schema using Joi
    const schema = Joi.object({
      id: Joi.string()
        .length(24) // Ensures the id is exactly 24 characters long (for MongoDB ObjectId)
        .hex() // Ensures the id contains only hexadecimal characters
        .required()
        .messages({
          'string.length': 'ID must be a 24-character long string.',
          'string.hex': 'ID must be a valid hexadecimal string.',
          'any.required': 'ID is required.',
        }),
      name: Joi.string()
        .min(3) // Ensures the name is at least 3 characters long
        .required()
        .messages({
          'string.min': 'Name must be at least 3 characters long.',
          'any.required': 'Name is required.',
        }),
      main_category_id: Joi.string()
        .custom((value, helpers) => {
          // Validate the category_id as a valid MongoDB ObjectId
          if (!mongoose.Types.ObjectId.isValid(value)) {
            return helpers.message('Main Category ID must be a valid MongoDB ObjectId.');
          }
          return value; // Valid ObjectId, return it
        })
        .required()
        .messages({
          'any.required': 'Main Category ID is required.',
        }),
      category_id: Joi.string()
        .custom((value, helpers) => {
          // Validate the category_id as a valid MongoDB ObjectId
          if (!mongoose.Types.ObjectId.isValid(value)) {
            return helpers.message('Category ID must be a valid MongoDB ObjectId.');
          }
          return value; // Valid ObjectId, return it
        })
        .required()
        .messages({
          'any.required': 'Category ID is required.',
        }),
      sub_category_id: Joi.string()
        .custom((value, helpers) => {
          // Validate the sub_category_id as a valid MongoDB ObjectId
          if (!mongoose.Types.ObjectId.isValid(value)) {
            return helpers.message('Sub Category ID must be a valid MongoDB ObjectId.');
          }
          return value; // Valid ObjectId, return it
        })
        .required()
        .messages({
          'any.required': 'Sub Category ID is required.',
        }),
      attribute_id: Joi.string()
        .custom((value, helpers) => {
          // Validate the attribute_id as a valid MongoDB ObjectId
          if (!mongoose.Types.ObjectId.isValid(value)) {
            return helpers.message('Attribute ID must be a valid MongoDB ObjectId.');
          }
          return value; // Valid ObjectId, return it
        })
        .required()
        .messages({
          'any.required': 'Attribute ID is required.',
        }),
      attribute_value_id: Joi.string()
        .custom((value, helpers) => {
          // Validate the attribute_value_id as a valid MongoDB ObjectId
          if (!mongoose.Types.ObjectId.isValid(value)) {
            return helpers.message('Attribute Value ID must be a valid MongoDB ObjectId.');
          }
          return value; // Valid ObjectId, return it
        })
        .required()
        .messages({
          'any.required': 'Attribute Value ID is required.',
        }),
      price: Joi.number() // Use number type for price
        .required()
        .messages({
          'any.required': 'Price is required.',
        }),
      description: Joi.string().optional(), // Optional field
      stock_quantity: Joi.number() // Stock quantity must be a number
        .required()
        .messages({
          'any.required': 'Stock quantity is required.',
        }),
    });

    // Validate the request
    validationRequest(req, res, next, schema);
  },

  listProductValidation: async (req, res, next) => {
    // Define the validation schema using Joi
    const schema = Joi.object({
      page: Joi.number()
        .integer() // Ensure the page is an integer
        .min(1) // Page must be at least 1
        .optional() // Page is optional, defaults to 1 if not provided
        .messages({
          'number.integer': 'Page must be an integer.',
          'number.min': 'Page must be at least 1.',
        }),
      limit: Joi.number()
        .integer() // Ensure the limit is an integer
        .min(1) // Limit must be at least 1
        .optional() // Limit is optional, defaults to a set value if not provided
        .messages({
          'number.integer': 'Limit must be an integer.',
          'number.min': 'Limit must be at least 1.',
        }),
    });

    validationRequest(req, res, next, schema);
  },

  statusChangeProductValidation: async (req, res, next) => {
    // Define the validation schema using Joi
    const schema = Joi.object({
      id: Joi.string()
        .length(24) // Ensures the id is exactly 24 characters long (for MongoDB ObjectId)
        .hex() // Ensures the id contains only hexadecimal characters
        .required()
        .messages({
          'string.length': 'ID must be a 24-character long string.',
          'string.hex': 'ID must be a valid hexadecimal string.',
          'any.required': 'ID is required.',
        }),
      isActive: Joi.boolean() // Ensures isActive is a boolean value
        .required()
        .messages({
          'boolean.base': 'isActive must be a boolean value (true or false).',
          'any.required': 'isActive is required.',
        }),
    });

    validationRequest(req, res, next, schema);
  },

  activeSubCategoryByCategoryIdValidation: async (req, res, next) => {
    // Define the validation schema using Joi
    const schema = Joi.object({
      category_id: Joi.string()
        .length(24) // Ensures the id is exactly 24 characters long (for MongoDB ObjectId)
        .hex() // Ensures the id contains only hexadecimal characters
        .required()
        .messages({
          'string.length': 'ID must be a 24-character long string.',
          'string.hex': 'ID must be a valid hexadecimal string.',
          'any.required': 'ID is required.',
        }),
    });

    validationRequest(req, res, next, schema);
  },
};