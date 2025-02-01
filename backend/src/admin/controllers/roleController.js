const { successResponse, failedResponse, noRecordFoundResponse, serverErrorResponse, alreadyExistsResponse } = require("../../../Helper/helper");
require('dotenv').config();
const RoleModel = require("../../../Schema/RoleSchema");
const PermissionModel = require("../../../Schema/PermissionSchema");
const RolePermissionModel = require("../../../Schema/RolePermissionSchema");
module.exports = {

    create: async (req, res) => {
        try {
            const { name, permissions } = req.body;


            // Check if the role already exists
            const role = await RoleModel.findOne({ name: name });
            if (role) {
                return alreadyExistsResponse(res, "Role already exists.");
            }
            // Create the new role
            const createRole = await RoleModel.create({ name });

            // Associate permissions with the role
            const rolePermissions = permissions.map(permissionId => ({
                role_id: createRole._id,  // Role ID
                permission_id: permissionId  // Permission ID
            }));

            // Store role-permission associations in the role_permission table
            await RolePermissionModel.insertMany(rolePermissions);
            // Return success response
            return successResponse(res, "Role created successfully with permissions.", createRole);
        } catch (error) {
            return serverErrorResponse(res, "Internal Server Error", error.message);
        }
    },
    update: async (req, res) => {
        try {
            const { id, name, permissions } = req.body;
            // Check if the role exists
            const role = await RoleModel.findOne({ _id: id });
            if (!role) {
                return notFoundResponse(res, "Role not found.");
            }
            // Update the role name
            if (name) {
                role.name = name;
                await role.save(); // Save the updated role name
            }

            // Remove old role-permission associations
            await RolePermissionModel.deleteMany({ role_id: role._id });

            // Associate new permissions with the role
            const rolePermissions = permissions.map(permissionId => ({
                role_id: role._id,  // Role ID
                permission_id: permissionId  // Permission ID
            }));
            // console.log("rolePermissions",rolePermissions);
            // return;
            // Insert new role-permission associations
            await RolePermissionModel.insertMany(rolePermissions);

            // Return success response
            return successResponse(res, "Role and permissions updated successfully.", role);
        } catch (error) {
            return serverErrorResponse(res, "Internal Server Error", error.message);
        }
    },
    delete: async (req, res) => {
        try {
            const { id } = req.body;

            // Check if the role exists
            const role = await RoleModel.findById(id);
            if (!role) {
                return notFoundResponse(res, "Role not found.");
            }

            // Delete associated permissions from the role_permission table
            await RolePermissionModel.deleteMany({ roleId: role._id });

            // Delete the role
            await RoleModel.deleteOne({ _id: role._id });

            // Return success response
            return successResponse(res, "Role and associated permissions deleted successfully.");
        } catch (error) {
            return serverErrorResponse(res, "Internal Server Error", error.message);
        }
    },
    list: async (req, res) => {
        try {
            // Retrieve pagination parameters from the query string
            const page = parseInt(req.body.page) || 1;  // Default to 1 if page is not provided
            const limit = parseInt(req.body.limit) || 10;  // Default to 10 if limit is not provided

            // Get total count of roles for pagination info
            const totalCount = await RoleModel.countDocuments();

            // Retrieve roles with pagination
            const roles = await RoleModel.find()
                .skip((page - 1) * limit) // Skip based on the page and limit
                .limit(limit) // Limit the number of results per page

            // Retrieve the associated permissions for each role
            const rolesWithPermissions = await Promise.all(
                roles.map(async (role) => {
                    const rolePermissions = await RolePermissionModel.find({ role_id: role._id });
                    const permissionIds = rolePermissions.map(rp => rp.permission_id);

                    // Get permission details from the PermissionModel
                    const permissions = await PermissionModel.find({ _id: { $in: permissionIds } }, { name: 1, _id: 1 });

                    // Return the role with its permissions
                    return {
                        ...role.toObject(),
                        permissions: permissions
                    };
                })
            );

            // Return paginated response

            return res.status(200).json({
                status: true,
                message: "fetch Permission Successfully",
                data: rolesWithPermissions,
                pagination: {
                    page,
                    limit,
                    total: totalCount,
                    totalPages: Math.ceil(totalCount / limit)
                }
            });
        } catch (error) {
            return serverErrorResponse(res, "Internal Server Error", error.message);
        }
    },
    activeRole: async (req, res) => {
        try {
            const getRole = await RoleModel.find({
                isActive: true,
                name: { $ne: 'Admin' } // Select roles where name is not 'Admin'
            }).select('-__v'); // Exclude the __v field
            
            if (getRole.length >0) {
              return  successResponse(res, "Active Role Fetch", getRole);
            }
            else {
                return   noRecordFoundResponse(res, "No Record Found", []);

            }
        } catch (error) {
            return serverErrorResponse(res, "Internal Server Error", error.message);
        }

    }
};
