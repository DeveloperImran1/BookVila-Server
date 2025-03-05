const { ObjectId } = require("mongodb");
const SubCategory = require("../../models/SubCategory");

const getAllSubCategories = async (req, res) => {
  try {
    const result = await SubCategory.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// add new Categori
const addNewSubCategorie = async (req, res) => {
  const subCategoryObj = req.body;
  try {
    const result = await SubCategory.create(subCategoryObj);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete category with _id
const deleteSubCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await SubCategory.deleteOne({ _id: new ObjectId(id) });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update a specific SubCategory
const updateSubCategory = async (req, res) => {
  const { id } = req.params; // Extract bookID from the URL
  const updatedData = req.body; // Extract updated data from the request body
  console.log(id, updatedData);
  try {
    const subCategory = await SubCategory.findOneAndUpdate(
      { _id: new ObjectId(id) },
      updatedData,
      { new: true, runValidators: true }
    );

    if (!subCategory) {
      return res.status(404).json({ message: "Sub Category not found" });
    }

    res.status(200).json(subCategory); // Send the updated book as a response
  } catch (error) {
    res.status(500).json({ message: error.message }); // Send error message
  }
};

module.exports = {
  getAllSubCategories,
  addNewSubCategorie,
  deleteSubCategory,
  updateSubCategory,
};
