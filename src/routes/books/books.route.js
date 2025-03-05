const express = require("express");
const {
  getAllBooks,
  getSingleBook,
  getAttributeBooks,
  getRecentlyAddedBooks,
  getBooks,
  getBudgetFriendlyBooks,
  getCaterogyBooks,
  getBooksLength,
  addNewBook,
  deleteBook,
  updateBook,
} = require("../../controller/books/book.controller");
const router = express.Router();

router.get("/books", getAllBooks);
router.get("/book/:id", getSingleBook);
router.get("/getBooks", getBooks);
router.get("/getAttributeBooks", getAttributeBooks);
router.get("/getBudgetFriendlyBooks", getBudgetFriendlyBooks);
router.get("/getCaterogyBooks", getCaterogyBooks);
router.get("/getBooksLength", getBooksLength);
router.post("/addNewBook", addNewBook);
router.delete("/deleteBook/:id", deleteBook);
router.put("/updateBook/:id", updateBook);

module.exports = router;
