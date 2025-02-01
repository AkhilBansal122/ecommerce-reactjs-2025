const Joi = require('joi');
const validationRequest = require('../../../middleware/validationRequest');
module.exports = {
    loginValidation: async (req, res, next) => {
        // Define the validation schema using Joi
        const schema = Joi.object({
            email: Joi.string()
                .email()
                .pattern(/^\S*$/) // Ensures email does not contain spaces
                .required()
                .messages({
                    'string.email': 'Email must be a valid email address.',
                    'string.pattern.base': 'Email must not contain spaces.',
                    'any.required': 'Email is required.',
                }),
            device_token: Joi.string().allow(''),
            password: Joi.string()
                .min(6) // Ensures password is at least 6 characters long
                .pattern(/^\S*$/) // Ensures password does not contain spaces
                .required()
                .messages({
                    'string.min': 'Password must be at least 6 characters long.',
                    'string.pattern.base': 'Password must not contain spaces.',
                    'any.required': 'Password is required.',
                }),
        });


        validationRequest(req, res, next, schema);
    },
    changePasswordValidation: async (req, res, next) => {
        // Define the validation schema using Joi
        const schema = Joi.object({
            currentPassword: Joi.string()
                .min(6) // Ensures password is at least 6 characters long
                .pattern(/^\S*$/) // Ensures password does not contain spaces
                .required()
                .messages({
                    'string.min': 'Current password must be at least 6 characters long.',
                    'string.pattern.base': 'Current password must not contain spaces.',
                    'any.required': 'Current password is required.',
                }),
            newPassword: Joi.string()
                .min(6) // Ensures new password is at least 6 characters long
                .pattern(/^\S*$/) // Ensures new password does not contain spaces
                .required()
                .messages({
                    'string.min': 'New password must be at least 6 characters long.',
                    'string.pattern.base': 'New password must not contain spaces.',
                    'any.required': 'New password is required.',
                }),
            confirmPassword: Joi.string()
                .valid(Joi.ref('newPassword')) // Ensures confirmPassword matches newPassword
                .required()
                .messages({
                    'any.only': 'Confirm password must match the new password.',
                    'any.required': 'Confirm password is required.',
                })
        });
    
        validationRequest(req, res, next, schema);
    }
    
    
}