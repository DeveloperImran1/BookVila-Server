const express = require('express');
const { getAllBooks, getSingleBook, getFeaturedBooks, getRecentlyAddedBooks, getBooks, getBudgetFriendlyBooks, getCaterogyBooks } = require('../../controller/books/book.controller');
const router = express.Router();


router.get('/books', getAllBooks);
router.get('/book/:id', getSingleBook);
router.get('/getBooks', getBooks);
router.get('/getFeaturedBooks', getFeaturedBooks);
router.get('/getBudgetFriendlyBooks', getBudgetFriendlyBooks);
router.get('/getCaterogyBooks', getCaterogyBooks);


module.exports = router;