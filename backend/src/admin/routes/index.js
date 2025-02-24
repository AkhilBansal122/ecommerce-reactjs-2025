const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const {adminverifyToken } = require("../../../middleware/authmiddleware");
const userController = require("../controllers/userController");
const permissionController = require("../controllers/permissionController");
const categoryController = require("../controllers/categoryController");
const subCategoryController = require("../controllers/SubCategoryController");
const productController = require("../controllers/ProductsController");

const productImageController = require("../controllers/ProductImageController");

const roleController = require("../controllers/roleController");
const subAdminController = require("../controllers/subAdminController");
const { loginValidation,changePasswordValidation } = require("../validation/authValidation");

const {createPermissionValidation,updatePermissionValidation,deletePermissionValidation,listPermissionValidation} = require("../validation/permissionValidation");
const {createRoleValidation,updateRoleValidation,deleteRoleValidation,listRoleValidation} = require("../validation/roleValidation");
const { subAdminCreateValidation,listsubAdmineValidation,subAdminUpdateValidation } = require("../validation/SubAdminValidation");
const { createCategoryValidation, updateCategoryValidation, listCategoryValidation,statusChanngeCategoryValidation } = require("../validation/categoryValidation");
const { createSubCategoryValidation, updateSubCategoryValidation, listSubCategoryValidation,statusChangeSubCategoryValidation } = require("../validation/subCategoryValidation");
const { createProductValidation, updateProductValidation,activeSubCategoryByCategoryIdValidation, listProductValidation,statusChangeProductValidation } = require("../validation/productValidation");

const router = express.Router();


// Set up multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(__dirname, "../../uploads");
    
      // Check if the folder exists, if not, create it
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true }); // Create folder recursively
      }
      
      cb(null, uploadPath); // Specify the folder for uploads
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`); // Create a unique filename
    },
  });
  
  // Initialize multer with storage configuration
  const upload = multer({ storage });

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
router.put("/subadmin-statusChange",adminverifyToken,subAdminController.statusChange);


//Country 
router.get("/active-country",adminverifyToken,userController.activeCountry);
// Correct route for active state by country ID
router.get("/active-state/:id", adminverifyToken, userController.activeStateByCountryId);
// Correct route for active city by country and state IDs
router.get("/active-city/:country_id/:state_id", adminverifyToken, userController.activeCityByCountryStateId);

router.post('/logout', adminverifyToken,userController.logout);


//Caregory management
router.post("/category-create",adminverifyToken,createCategoryValidation,categoryController.create);
router.put("/category-update",adminverifyToken,updateCategoryValidation,categoryController.update);
router.post("/category-list",adminverifyToken,listCategoryValidation,categoryController.list);
router.get("/active-category",adminverifyToken,categoryController.activeCategory);
router.put("/category-statusChange",adminverifyToken,statusChanngeCategoryValidation,categoryController.statusChangeCategory);

//Sub Caregory management
router.post("/sub-category-create",adminverifyToken,createSubCategoryValidation,subCategoryController.create);
router.put("/sub-category-update",adminverifyToken,updateSubCategoryValidation,subCategoryController.update);
router.post("/sub-category-list",adminverifyToken,listSubCategoryValidation,subCategoryController.list);
router.get("/active-sub-category",adminverifyToken,subCategoryController.activeSubCategory);
router.put("/sub-category-statusChange",adminverifyToken,statusChangeSubCategoryValidation,subCategoryController.statusChangeSubCategory);

//Product Management
router.post("/product-create",adminverifyToken,createProductValidation,productController.create);
router.put("/product-update",adminverifyToken,updateProductValidation,productController.update);
router.post("/product-list",adminverifyToken,listProductValidation,productController.list);
router.get("/active-product",adminverifyToken,productController.activeProduct);
router.post("/active-subCategoryByCategoryId",adminverifyToken,activeSubCategoryByCategoryIdValidation,productController.activeSubCategoryByCategoryId);
router.post("/product-statusChange",adminverifyToken,statusChangeProductValidation,productController.statusChangeProduct);

//Product image
router.post("/product-image-create",adminverifyToken,upload.any(),productImageController.create);

module.exports = router;
