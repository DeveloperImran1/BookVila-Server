const express = require('express');
const { getAllBooks } = require('../../controller/books/book.controller');
const router = express.Router();


router.get('/books', getAllBooks)


module.exports = router;