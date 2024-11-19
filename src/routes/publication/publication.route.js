const express = require('express');
const { getPublications, getSinglePublication, getPublicationBooks } = require('../../controller/publications/publication.controller');
const router = express.Router();


router.get('/getPublications', getPublications);
router.get('/getSinglePublication/:id', getSinglePublication);
router.get('/getPublicationBooks', getPublicationBooks);


module.exports = router;