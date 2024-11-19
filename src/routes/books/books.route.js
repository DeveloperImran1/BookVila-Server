const express = require('express');
const { getAllBooks, getSingleBook, getFeaturedBooks, getRecentlyAddedBooks, getBooks } = require('../../controller/books/book.controller');
const router = express.Router();


router.get('/books', getAllBooks);
router.get('/book/:id', getSingleBook);
router.get('/getBooks', getBooks);
router.get('/getFeaturedBooks', getFeaturedBooks);


module.exports = router;