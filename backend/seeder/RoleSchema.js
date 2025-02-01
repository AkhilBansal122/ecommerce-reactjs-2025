const mongoose = require('mongoose');
const PermissionModel = require('../Schema/PermissionSchema');
const RoleModel = require('../Schema/RoleSchema');
const RolePermissionModel = require('../Schema/RolePermissionSchema');


// Insert multiple permissions and assign them to the "Admin" role

module.exports={
    insertRoles:async ()=> {
        try {
            // Define permissions
            const savedPermissions = await PermissionModel.find(); // Corrected: use find() instead of findAll()    
            // Insert all permissions
    
            const role = new RoleModel({
                name: 'Admin'
            });
            const savedRole = await role.save();
            console.log('Role Created:', savedRole);
    
            // Link role with permissions in RolePermission
            for (let permission of savedPermissions) {
                const rolePermission = new RolePermissionModel({
                    role_id: savedRole._id,
                    permission_id: permission._id
                });
                await rolePermission.save();
            }
            return true;
            console.log('Role-Permission relationships created for Admin');
    
        } catch (err) {
            console.error('Error inserting permissions and role:', err);
        } 
    },
    updateRoles: async () => {
        try {
            // Fetch all permissions
            const savedPermissions = await PermissionModel.find();
    
            // Check if the role already exists
            let role = await RoleModel.findOne({ name: 'Admin',isActive:true });
            
            if (!role) {
                // Create new role if it doesn't exist
                role = new RoleModel({
                    name: 'Admin',
                    isActive:true
                });
                const savedRole = await role.save();
                console.log('Role Created:', savedRole);

                        // Clear existing role-permission relationships for the role
            await RolePermissionModel.deleteMany({ role_id: role._id });
    
            // Link role with permissions in RolePermission
            for (let permission of savedPermissions) {
                const rolePermission = new RolePermissionModel({
                    role_id: role._id,
                    permission_id: permission._id
                });
                await rolePermission.save();
            }
        }
        console.log('Role-Permission relationships updated for Admin');
            return true;
    
        } catch (err) {
            console.error('Error inserting/updating permissions and role:', err);
            return false;
        }
    }
    
}