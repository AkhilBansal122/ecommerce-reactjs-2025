const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // For hashing the password
const PermissionModel = require('../Schema/PermissionSchema');
const RoleModel = require('../Schema/RoleSchema');
const RolePermissionModel = require('../Schema/RolePermissionSchema');
const UsesModel = require('../Schema/UserSchema');  // Assuming you have this Schema for "Uses"

module.exports = {
    insertUsers: async () => {
        try {
            // Step 1: Find the Admin role
            const savedRole = await RoleModel.findOne({ name: 'Admin', isActive:true});
            if (!savedRole) {
                console.log("Admin role not found");
                return;
            }

            // Step 2: Find all permissions
            const savedPermissions = await PermissionModel.find(); // Corrected: find() to get all permissions
            if (!savedPermissions || savedPermissions.length === 0) {
                console.log("No permissions found");
                return;
            }

            // Step 3: Link role with permissions in RolePermission
            for (let permission of savedPermissions) {
                const rolePermission = new RolePermissionModel({
                    role_id: savedRole._id,
                    permission_id: permission._id
                });
                await rolePermission.save();
            }
            console.log('Role-Permission relationships created for Admin');

            // Step 4: Hash the password for the user
            const hashPassword = await bcrypt.hash('123456', 10); // Hashing with salt rounds = 10

            // Step 5: Create Uses Record
            const uses = new UsesModel({
                role_id: savedRole._id,  // Use the role ID from the saved role
                first_name: "Admin",
                middle_name: "",
                last_name: "admin",
                email: "admin1@yopmail.com",
                country_code:"91",
                phone_no:"9898989898",
                image:"",
                isActive:true,
                password: hashPassword, // Store the hashed password
                created_at: new Date(), // Assuming your schema supports 'created_at'
            });
            const savedUses = await uses.save();
            console.log('Uses record created:', savedUses);

        } catch (err) {
            console.error('Error inserting permissions, role, or user:', err);
        } 
    }
};
