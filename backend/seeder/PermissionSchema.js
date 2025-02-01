const mongoose = require('mongoose');
const PermissionModel = require('../Schema/PermissionSchema');


// Insert multiple permissions and assign them to the "Admin" role

module.exports={
    insertPermissions:async ()=> {
        try {
            // Define permissions
            const permissions = [
                { name: 'Dashboard' },
                { name: 'Role Management' },
                { name: 'Permission Management' },
                { name: 'User Management' },
                { name: 'Customer Management' },
                { name: 'Category Management' },
                { name: 'Sub Category Management' }
            ];
    
            // Insert all permissions
            const savedPermissions = await PermissionModel.insertMany(permissions);
            if(savedPermissions){
                console.log('Permissions Inserted:', savedPermissions);

                return true;
                
            }

            else{
                console.log('Permissions false');
                return false;
            }
    
        } catch (err) {
            console.error('Error inserting permissions', err);
        } 
    },
    updatePermissions: async () => {
        try {
            // Define permissions
            const permissions = [
                { name: 'Dashboard',isActive:true },
                { name: 'Role Management',isActive:true },
                { name: 'Permission Management',isActive:true },
                { name: 'User Management',isActive:true },
                { name: 'Customer Management',isActive:true },
                { name: 'Category Management',isActive:true },
                { name: 'Sub Category Management',isActive:true },
                { name: 'Products Management',isActive:true },
                
            ];
    
            for (const permission of permissions) {
                // Check if permission exists
                const existingPermission = await PermissionModel.findOne({ name: permission.name });
    
                if (existingPermission) {
                    // Update existing permission if needed
                    await PermissionModel.updateOne(
                        { _id: existingPermission._id },
                        { $set: permission }
                    );
                    console.log(`Permission updated: ${permission.name}`);
                } else {
                    // Insert new permission
                    const newPermission = await PermissionModel.create(permission);
                    console.log(`Permission inserted: ${newPermission.name}`);
                }
            }
    
            return true;
        } catch (err) {
            console.error('Error updating or inserting permissions', err);
            return false;
        }
    }
    
}