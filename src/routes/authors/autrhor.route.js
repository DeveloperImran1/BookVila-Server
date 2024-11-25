const express = require('express');
const { getAllAuthors, getSingleWriter, getAuthorBooks,  } = require('../../controller/authors/author.controller');
const router = express.Router();


router.get('/getAllAuthors', getAllAuthors);
router.get('/getSingleWriter/:id', getSingleWriter);
router.get('/getAuthorBooks', getAuthorBooks);


module.exports = router;