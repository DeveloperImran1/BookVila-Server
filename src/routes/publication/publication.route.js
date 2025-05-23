const express = require("express");
const {
  getPublications,
  getSinglePublication,
  getPublicationBooks,
  addNewPublication,
  deletePublication,
  updatePublication,
  getAllPublicationWithParams,
} = require("../../controller/publications/publication.controller");
const router = express.Router();

router.get("/getPublications", getPublications);
router.get("/getSinglePublication/:id", getSinglePublication);
router.get("/getPublicationBooks", getPublicationBooks);
router.post("/addNewPublication", addNewPublication);
router.delete("/deletePublication/:id", deletePublication);
router.put("/updatePublication/:id", updatePublication);
router.get("/getAllPublicationWithParams", getAllPublicationWithParams);

module.exports = router;
