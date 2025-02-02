const { successResponse, failedResponse, noRecordFoundResponse, serverErrorResponse, alreadyExistsResponse, sendmails } = require("../../../Helper/helper");
const UserModel = require("../../../Schema/UserSchema");
const bcrypt = require("bcryptjs");
require('dotenv').config();

module.exports = {
  create: async (req, res) => {
    try {
      const { first_name, last_name, middle_name, email, password, role_id, country_id, state_id, city_id	, phone_no, country_code } = req.body;
      const hashPassword = await bcrypt.hash(password, 10); // Hashing with salt rounds = 10
      const ExistEmail = await UserModel.findOne({ email });
      if (ExistEmail) {
        return alreadyExistsResponse(res, "Email Already Exists", []);
      }
      const user = new UserModel({
        role_id: role_id, // Ensure role_id is treated as ObjectId
        first_name,
        middle_name,
        last_name,
        email,
        country_id,
        state_id,
        city_id:city_id,
        country_code,
        phone_no,
        isActive: true,
        password: hashPassword, // Store the hashed password
        created_at: new Date(), // Assuming your schema supports 'created_at'
      });
      const savedUser = await user.save();
      await sendmails(email, 'subadmin-create', { first_name, email, password });
      if (savedUser) {
        return successResponse(res, "Sub Admin Created Successfully", savedUser);
      } else {
        return serverErrorResponse(res, "Error creating Sub Admin", "Could not save user to the database");
      }
    } catch (error) {
      return serverErrorResponse(res, "Internal Server Error", error.message);
    }
  },
  list: async (req, res) => {
    try {
      // Retrieve pagination parameters from the query string
      const page = parseInt(req.body.page) || 1;  // Default to 1 if page is not provided
      const limit = parseInt(req.body.limit) || 10;  // Default to 10 if limit is not provided
      const skip = (page - 1) * limit;
      const totalCount = await UserModel.aggregate([
        {
          $lookup: {
            from: 'roles', // The name of the Role collection
            localField: 'role_id', // The field in UserModel that stores the role ID
            foreignField: '_id', // The field in Role collection that corresponds to role ID
            as: 'roleDetails'
          }
        },
        {
          $unwind: '$roleDetails' // Unwind the array created by the lookup
        },
        {
          $lookup: {
            from: 'countries', // The name of the Countries collection
            localField: 'country_id', // The field in UserModel that stores the country ID
            foreignField: '_id', // The field in Countries collection that corresponds to country ID
            as: 'countryDetails'
          }
        },
        { $unwind: '$countryDetails' }, // Unwind the array created by the lookup
        {
          $match: {
            'roleDetails.name': 'SubAdmin' // Filter where the role name is 'SubAdmin'
          }
        },
        {
          $count: 'totalCount' // Count the documents matching the filter
        }
      ]);

      const totalCountValue = totalCount.length > 0 ? totalCount[0].totalCount : 0;

      // Find users where role is "SubAdmin"
      const users = await UserModel.aggregate([
        {
          $lookup: {
            from: 'roles', // The name of the Role collection
            localField: 'role_id', // The field in UserModel that stores the role ID
            foreignField: '_id', // The field in Role collection that corresponds to role ID
            as: 'roleDetails'
          }
        },
        {
          $unwind: '$roleDetails' // Unwind the array created by the lookup
        },
        {
          $match: {
            'roleDetails.name': 'SubAdmin' // Filter where the role name is 'SubAdmin'
          }
        },
        {
          $skip: skip // Skip based on the page and limit
        },
        {
          $limit: limit // Limit the number of results per page
        }
      ]);
      return res.json({
        status: true,
        message: "Sub Admin Fetch successfully",
        data: users, // Send the filtered users
        pagination: {
          page,
          limit,
          total: totalCountValue,
          totalPages: Math.ceil(totalCountValue / limit)
        }
      });
    } catch (error) {
      return serverErrorResponse(res, "Internal Server Error", error.message);
    }
  },
  update: async (req, res) => {
    try {
      const { id, first_name, last_name, middle_name, email, role_id,country_code,phone_no,country_id,state_id,city_id } = req.body;

      // Find the user by ID
      const user = await UserModel.findOne({ _id: id });
      if (!user) {
        return notFoundResponse(res, "User not found", []);
      }

      // Check if email is being updated and if it already exists
      if (email && email !== user.email) {
        const ExistEmail = await UserModel.findOne({ email });
        if (ExistEmail) {
          return alreadyExistsResponse(res, "Email already exists", []);
        }
      }
      if (country_code && country_code !== user.country_code) {
        const ExistPhoneNo = await UserModel.findOne({ country_code:country_code,phone_no:phone_no });
        if (ExistPhoneNo) {
          return alreadyExistsResponse(res, "Phone No already exists", []);
        }
      }

      // Update user fields
      user.first_name = first_name || user.first_name;
      user.middle_name = middle_name || user.middle_name;
      user.last_name = last_name || user.last_name;
      user.email = email || user.email;
      user.country_code = country_code || user.country_code; // Ensure role_id is treated as ObjectId
      user.phone_no = phone_no || user.phone_no; // Ensure role_id is treated as ObjectId
      user.country_id = country_id || user.country_id; // Ensure role_id is treated as ObjectId
      user.state_id = state_id || user.state_id; // Ensure role_id is treated as ObjectId
      user.city_id = city_id || user.city_id; // Ensure role_id is treated as ObjectId
      user.role_id = role_id  || user.role_id;

      // Save the updated user
      const updatedUser = await user.save();
      if (updatedUser) {
        return successResponse(res, "User updated successfully", updatedUser);
      } else {
        return serverErrorResponse(res, "Error updating user", "Could not update user in the database");
      }
    } catch (error) {
      return serverErrorResponse(res, "Internal Server Error", error.message);
    }
  },
  statusChange: async (req,res) => {
    const { id, isActive } = req.body;
    try {
      // Ensure the ID is valid (optional: you can add validation using Joi before this)
      const SubAdmin = await UserModel.findOne({ _id: id });
      if (!SubAdmin) {
        return noRecordFoundResponse(res, "Sub Admin not found.");
      }
      // Update the SubAdmin's name
      SubAdmin.isActive = isActive;
      await SubAdmin.save();

      // Return success response
      return successResponse(res, "SubAdmin Status Change successfully.", []);
    } catch (error) {
      return serverErrorResponse(res, "Internal Server Error", error.message);
    }
  }

}