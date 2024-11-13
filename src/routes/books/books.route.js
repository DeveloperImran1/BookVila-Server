const express = require('express');
const { getAllBooks, getFeaturedBooks, getRecentlyAddedBooks, getBooks } = require('../../controller/books/book.controller');
const router = express.Router();


router.get('/books', getAllBooks);
router.get('/getBooks', getBooks);
router.get('/getFeaturedBooks', getFeaturedBooks);


module.exports = router;