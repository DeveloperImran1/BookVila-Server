const { ObjectId } = require("mongodb");
const Subject = require("../../models/Subject");

const getAllSubjects = async (req, res) => {
  try {
    const result = await Subject.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// add new Subject
const addNewSubject = async (req, res) => {
  const subjectObj = req.body;
  try {
    const result = await Subject.create(subjectObj);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete subject with _id
const deleteSubject = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Subject.deleteOne({ _id: new ObjectId(id) });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update a specific subjec with id
const updateSubject = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body; // Extract updated data from the request body
  console.log(id, updatedData);
  try {
    const subject = await Subject.findOneAndUpdate(
      { _id: new ObjectId(id) },
      updatedData,
      { new: true, runValidators: true }
    );

    if (!subject) {
      return res.status(404).json({ message: "subject not found" });
    }

    res.status(200).json(subject); // Send the updated book as a response
  } catch (error) {
    res.status(500).json({ message: error.message }); // Send error message
  }
};

module.exports = {
  getAllSubjects,
  addNewSubject,
  deleteSubject,
  updateSubject,
};
