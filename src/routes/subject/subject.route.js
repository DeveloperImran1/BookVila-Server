const express = require("express");
const {
  getAllSubjects,
  addNewSubject,
  deleteSubject,
  updateSubject,
} = require("../../controller/subject/subject.controller");

const router = express.Router();

router.get("/getAllSubjects", getAllSubjects);
router.post("/addNewSubject", addNewSubject);
router.delete("/deleteSubject/:id", deleteSubject);
router.put("/updateSubject/:id", updateSubject);

module.exports = router;
