const express = require("express");
const categoryController = require("../../web/controllers/categoryController");
const productController = require("../../web/controllers/productController");


const router = express.Router();

// Example POST route to handle form data

//Caregory management
router.get("/active-category",categoryController.activeCategory);
router.get("/active-product",productController.activeProduct);


module.exports = router;
