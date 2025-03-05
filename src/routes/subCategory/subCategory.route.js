const express = require("express");
const {
  getAllSubCategories,
  addNewSubCategorie,
  deleteSubCategory,
  updateSubCategory,
} = require("../../controller/subCategory/subCategory.controller");

const router = express.Router();

router.get("/getAllSubCategories", getAllSubCategories);
router.post("/addNewSubCategorie", addNewSubCategorie);
router.delete("/deleteSubCategory/:id", deleteSubCategory);
router.put("/updateSubCategory/:id", updateSubCategory);

module.exports = router;
