const Joi = require('joi');
const validationRequest = require('../../../middleware/validationRequest');
module.exports = {
    createCategoryValidation: async (req, res, next) => {
        // Define the validation schema using Joi
        const schema = Joi.object({
            name: Joi.string()
                .min(3) // Ensures the name is at least 3 characters long (adjustable based on requirements)
                .required()
                .messages({
                    'string.min': 'Name must be at least 3 characters long.',
                    'any.required': 'Name is required.',
                }),
        });
    
        validationRequest(req, res, next, schema);
    },
    updateCategoryValidation: async (req, res, next) => {
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
        });
    
        validationRequest(req, res, next, schema);
    },
    deleteCategorynValidation: async (req, res, next) => {
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
        });
        validationRequest(req, res, next, schema);
    },
    listCategoryValidation:async (req, res, next) => {
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
    statusChanngeCategoryValidation: async (req, res, next) => {
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
}