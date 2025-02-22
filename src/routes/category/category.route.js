const express = require("express");
const {
  getAllCategories,
  addNewCategorie,
  deleteCategory,
  updateCategory,
} = require("../../controller/category/category.controller");

const router = express.Router();

router.get("/getAllCategories", getAllCategories);
router.post("/addNewCategorie", addNewCategorie);
router.delete("/deleteCategory/:id", deleteCategory);
router.put("/updateCategory/:id", updateCategory);

module.exports = router;
