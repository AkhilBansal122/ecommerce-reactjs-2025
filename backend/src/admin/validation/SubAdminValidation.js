const Joi = require('joi');
const mongoose = require("mongoose");
const validationRequest = require('../../../middleware/validationRequest');
module.exports = {
    
  subAdminCreateValidation: async (req, res, next) => {
    // Define the validation schema using Joi
    const schema = Joi.object({
      first_name: Joi.string()
        .min(2)
        .max(30)
        .required()
        .messages({
          'string.min': 'First name must be at least 2 characters long.',
          'string.max': 'First name must be less than 30 characters.',
          'any.required': 'First name is required.',
        }),
      middle_name: Joi.string()
        .allow('', null) // Optional field, can be empty or null
        .max(30)
        .messages({
          'string.max': 'Middle name must be less than 30 characters.',
        }),
      last_name: Joi.string()
        .min(2)
        .max(30)
        .required()
        .messages({
          'string.min': 'Last name must be at least 2 characters long.',
          'string.max': 'Last name must be less than 30 characters.',
          'any.required': 'Last name is required.',
        }),
      email: Joi.string()
        .email()
        .required()
        .messages({
          'string.email': 'Please provide a valid email address.',
          'any.required': 'Email is required.',
        }),
      role_id: Joi.string()
        .custom((value, helpers) => {
          // Validate the role_id as a valid MongoDB ObjectId
          if (!mongoose.Types.ObjectId.isValid(value)) {
            return helpers.message('Role ID must be a valid MongoDB ObjectId.');
          }
          return value; // Valid ObjectId, return it
        })
        .required()
        .messages({
          'any.required': 'Role ID is required.',
        }),
      state_id: Joi.string()
        .custom((value, helpers) => {
          // Validate the state_id as a valid MongoDB ObjectId
          if (!mongoose.Types.ObjectId.isValid(value)) {
            return helpers.message('State ID must be a valid MongoDB ObjectId.');
          }
          return value;
        })
        .required()
        .messages({
          'any.required': 'State ID is required.',
        }),
      country_id: Joi.string()
        .custom((value, helpers) => {
          // Validate the country_id as a valid MongoDB ObjectId
          if (!mongoose.Types.ObjectId.isValid(value)) {
            return helpers.message('Country ID must be a valid MongoDB ObjectId.');
          }
          return value;
        })
        .required()
        .messages({
          'any.required': 'Country ID is required.',
        }),
      password: Joi.string()
        .min(6) // Ensures password is at least 6 characters long
        .pattern(/^\S*$/) // Ensures password does not contain spaces
        .required()
        .messages({
          'string.min': 'Password must be at least 6 characters long.',
          'string.pattern.base': 'Password must not contain spaces.',
          'any.required': 'Password is required.',
        }),
      country_code: Joi.string()
        .pattern(/^\d+$/) // Ensures only digits
        .required()
        .messages({
          'string.pattern.base': 'Country code must contain only digits.',
          'any.required': 'Country code is required.',
        }),
      phone_no: Joi.string()
        .pattern(/^\d{10,15}$/) // Ensures phone number is 10 to 15 digits
        .required()
        .messages({
          'string.pattern.base': 'Phone number must be between 10 and 15 digits.',
          'any.required': 'Phone number is required.',
        }),
    });
    validationRequest(req, res, next, schema);
},

    listsubAdmineValidation:async (req, res, next) => {
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
              'number.min': 'Limit must be at least 1.'
             
          }),
      });
  
      validationRequest(req, res, next, schema);
  },
  subAdminUpdateValidation: async (req, res, next) => {
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
      first_name: Joi.string()
        .min(2)
        .max(30)
        .required()
        .messages({
          'string.min': 'First name must be at least 2 characters long.',
          'string.max': 'First name must be less than 30 characters.',
          'any.required': 'First name is required.',
        }),
      middle_name: Joi.string()
        .allow('', null) // Optional field, can be empty or null
        .max(30)
        .messages({
          'string.max': 'Middle name must be less than 30 characters.',
        }),
      last_name: Joi.string()
        .min(2)
        .max(30)
        .required()
        .messages({
          'string.min': 'Last name must be at least 2 characters long.',
          'string.max': 'Last name must be less than 30 characters.',
          'any.required': 'Last name is required.',
        }),
      email: Joi.string()
        .email()
        .required()
        .messages({
          'string.email': 'Please provide a valid email address.',
          'any.required': 'Email is required.',
        }),
      role_id: Joi.string()
        .custom((value, helpers) => {
          // Validate the role_id as a valid MongoDB ObjectId
          if (!mongoose.Types.ObjectId.isValid(value)) {
            return helpers.message('Role ID must be a valid MongoDB ObjectId.');
          }
          return value; // Valid ObjectId, return it
        })
        .required()
        .messages({
          'any.required': 'Role ID is required.',
        }),
      state_id: Joi.string()
        .custom((value, helpers) => {
          // Validate the state_id as a valid MongoDB ObjectId
          if (!mongoose.Types.ObjectId.isValid(value)) {
            return helpers.message('State ID must be a valid MongoDB ObjectId.');
          }
          return value;
        })
        .required()
        .messages({
          'any.required': 'State ID is required.',
        }),
      country_id: Joi.string()
        .custom((value, helpers) => {
          // Validate the country_id as a valid MongoDB ObjectId
          if (!mongoose.Types.ObjectId.isValid(value)) {
            return helpers.message('Country ID must be a valid MongoDB ObjectId.');
          }
          return value;
        })
        .required()
        .messages({
          'any.required': 'Country ID is required.',
        }),
      password: Joi.string()
        .min(6) // Ensures password is at least 6 characters long
        .pattern(/^\S*$/) // Ensures password does not contain spaces
        .optional() // Password might not be required during update
        .messages({
          'string.min': 'Password must be at least 6 characters long.',
          'string.pattern.base': 'Password must not contain spaces.',
        }),
      country_code: Joi.string()
        .pattern(/^\d+$/) // Ensures only digits
        .required()
        .messages({
          'string.pattern.base': 'Country code must contain only digits.',
          'any.required': 'Country code is required.',
        }),
      phone_no: Joi.string()
        .pattern(/^\d{10,15}$/) // Ensures phone number is 10 to 15 digits
        .required()
        .messages({
          'string.pattern.base': 'Phone number must be between 10 and 15 digits.',
          'any.required': 'Phone number is required.',
        }),
    });
    validationRequest(req, res, next, schema);
  },  
}