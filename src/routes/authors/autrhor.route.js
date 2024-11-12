const express = require('express');
const { getAllAuthors } = require('../../controller/authors/author.controller');
const router = express.Router();


router.get('/getAllAuthors', getAllAuthors)


module.exports = router;