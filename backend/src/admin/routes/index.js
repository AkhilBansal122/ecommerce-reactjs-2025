const express = require("express");
const {adminverifyToken } = require("../../../middleware/authmiddleware");
const userController = require("../controllers/userController");
const permissionController = require("../controllers/permissionController");
const roleController = require("../controllers/roleController");
const subAdminController = require("../controllers/subAdminController");
const { loginValidation,changePasswordValidation } = require("../validation/authValidation");
const {createPermissionValidation,updatePermissionValidation,deletePermissionValidation,listPermissionValidation} = require("../validation/permissionValidation");
const {createRoleValidation,updateRoleValidation,deleteRoleValidation,listRoleValidation} = require("../validation/roleValidation");
const { subAdminCreateValidation,listsubAdmineValidation,subAdminUpdateValidation } = require("../validation/SubAdminValidation");

const router = express.Router();

// Example POST route to handle form data
router.post("/login",loginValidation,userController.login);
router.get("/getProfile",adminverifyToken,userController.getProfile);
router.post("/change-password",adminverifyToken,changePasswordValidation,userController.changePassword);
router.get('/rolebyPermission',adminverifyToken,userController.rolebyPermission);
//Permission management
router.post("/permission-create",adminverifyToken,createPermissionValidation,permissionController.create);
router.put("/permission-update",adminverifyToken,updatePermissionValidation,permissionController.update);
router.delete("/permission-delete",adminverifyToken,deletePermissionValidation,permissionController.delete);
router.post("/permission-list",adminverifyToken,listPermissionValidation,permissionController.list);
router.get("/active-permission",adminverifyToken,permissionController.activePermission);
router.put("/permission-statusChange",adminverifyToken,permissionController.statusChangePermission);

//Role management
router.post("/role-create",adminverifyToken,createRoleValidation,roleController.create);
router.put("/role-update",adminverifyToken,updateRoleValidation,roleController.update);
router.delete("/role-delete",adminverifyToken,deleteRoleValidation,roleController.delete);
router.post("/role-list",adminverifyToken,listRoleValidation,roleController.list);
router.get("/active-role",adminverifyToken,roleController.activeRole);

//Sub Admin management
router.post("/subadmin-create",adminverifyToken,subAdminCreateValidation,subAdminController.create);
router.post("/subadmin-list",adminverifyToken,listsubAdmineValidation,subAdminController.list);
router.put("/subadmin-update",adminverifyToken,subAdminUpdateValidation,subAdminController.update);


//Country 
router.get("/active-country",adminverifyToken,userController.activeCountry);
// Correct route for active state by country ID
router.get("/active-state/:id", adminverifyToken, userController.activeStateByCountryId);
// Correct route for active city by country and state IDs
router.get("/active-city/:country_id/:state_id", adminverifyToken, userController.activeCityByCountryStateId);

router.post('/logout', adminverifyToken,userController.logout);

module.exports = router;
