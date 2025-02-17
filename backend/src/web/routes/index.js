const express = require("express");
const categoryController = require("../../web/controllers/categoryController");


const router = express.Router();

// Example POST route to handle form data

//Caregory management
router.get("/active-category",categoryController.activeCategory);
module.exports = router;
