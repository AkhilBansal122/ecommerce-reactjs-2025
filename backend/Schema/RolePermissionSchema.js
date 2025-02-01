const mongoose = require('mongoose');

// Define the RolePermission schema
const RolePermissionSchema = new mongoose.Schema({
    role_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',  // Reference to Role model
        required: true
    },
    permission_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Permission',  // Reference to Permission model
        required: true
    }
});

// Create the RolePermission model
const RolePermissionModel = mongoose.model('RolePermission', RolePermissionSchema);

module.exports = RolePermissionModel;