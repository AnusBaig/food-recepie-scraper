const express = require("express");
const router = express.Router();
const categoryRecepiesController = require('../controllers/categoryRecepiesController');

router.get("/", categoryRecepiesController.getFoodCategories);

router.get('/:category', categoryRecepiesController.getRecipeCategories);

module.exports = router;