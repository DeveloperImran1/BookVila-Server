const express = require('express');
const { getAllBooks, getFeaturedBooks } = require('../../controller/books/book.controller');
const router = express.Router();


router.get('/books', getAllBooks);
router.get('/getFeaturedBooks', getFeaturedBooks);


module.exports = router;