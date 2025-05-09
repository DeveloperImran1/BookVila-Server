const express = require("express");
const {
  getAllAuthors,
  getSingleWriter,
  getAuthorBooks,
  getAuthorLength,
  addNewAuthor,
  deleteAuthor,
  updateAuthor,
  getAllAuthorsWithParams,
} = require("../../controller/authors/author.controller");
const router = express.Router();

router.get("/getAllAuthors", getAllAuthors);
router.get("/getSingleWriter/:id", getSingleWriter);
router.get("/getAuthorBooks", getAuthorBooks);
router.get("/getAuthorLength", getAuthorLength);
router.post("/addNewAuthor", addNewAuthor);
router.delete("/deleteAuthor/:id", deleteAuthor);
router.put("/updateAuthor/:id", updateAuthor);
router.get("/getAllAuthorsWithParams", getAllAuthorsWithParams);

module.exports = router;
